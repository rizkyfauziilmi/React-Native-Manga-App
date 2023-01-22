import { Center, Box, VStack, Heading, FormControl, Input, Button, Text } from 'native-base'
import BottomBar from '../../components/BottomBar'
import TopBar from '../../components/TopBar'
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase/firebaseConfig'
import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
const Register = ({ navigation, route }) => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [
        signInWithEmailAndPassword,
        userSignIn,
        loadingSignIn,
        errorSignIn,
    ] = useSignInWithEmailAndPassword(auth);

    const register = () => {
        createUserWithEmailAndPassword(email, password)
            .then(async () => {
                if (auth.currentUser) {
                    if (auth.currentUser.metadata.creationTime === auth.currentUser.metadata.lastSignInTime) {
                        try {
                            await setDoc(doc(db, "users", auth.currentUser.email), {
                                email: email,
                                readingManga: [],
                                finishedChapter: [],
                                finishedManga: [],
                                favoriteManga: []
                            })
                        } catch (error) {
                            console.log("Error: ", error)
                        }
                    }
                }
                if (user) {
                    signInWithEmailAndPassword(email, password)
                    if (auth.currentUser.metadata.creationTime === auth.currentUser.metadata.lastSignInTime) {
                        navigation.navigate('account')
                    }
                }
            })
    }

    return (
        <VStack justifyContent={'space-between'} height={'100%'}>
            <TopBar headingTitle='Register' />
            <Center w="100%">
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <Heading size="lg" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }} fontWeight="semibold">
                        Welcome
                    </Heading>
                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        Register to continue!
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl isRequired>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input variant={'filled'} onChangeText={(text) => setEmail(text)} />
                        </FormControl>
                        <FormControl isRequired isInvalid={password !== confirmPassword && confirmPassword !== ""}>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input variant={'filled'} type="password" onChangeText={(text) => setPassword(text)} />
                        </FormControl>
                        <FormControl isRequired isInvalid={password !== confirmPassword && confirmPassword !== ""}>
                            <FormControl.Label>Confirm Password</FormControl.Label>
                            <Input variant={'filled'} type="password" onChangeText={(text) => setConfirmPassword(text)} />
                            <FormControl.ErrorMessage>
                                Password and confirm password not same!
                            </FormControl.ErrorMessage>
                        </FormControl>
                        {error ? <Text color={'red.500'}>⚠️ {error.message}</Text> : ""}
                        {errorSignIn ? <Text color={'red.500'}>⚠️ {errorSignIn.message}</Text> : ""}
                        <Button isLoading={loading || loadingSignIn} mt="2" colorScheme="amber" onPress={register} isDisabled={email === "" || password === "" || confirmPassword === ""}>
                            <Text fontWeight={'bold'}>Register</Text>
                        </Button>
                    </VStack>
                </Box>
            </Center>
            <BottomBar navigationProps={navigation} routeProps={route} />
        </VStack>
    )
}

export default Register
import { Text, VStack, Center, Box, FormControl, Heading, Button, HStack, Link, Input, useToast } from 'native-base'
import BottomBar from '../../components/BottomBar'
import TopBar from '../../components/TopBar'
import { FontAwesome } from '@expo/vector-icons'
import { auth } from '../../firebase/firebaseConfig'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useState } from 'react'

const Login = ({ navigation, route }) => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        signInWithEmailAndPassword(email, password)
        if (!loading && user) {
            navigation.popToTop()
        }
    }

    return (
        <VStack justifyContent={'space-between'} height={'100%'}>
            <TopBar headingTitle='Login' />
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Login to continue!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl isRequired>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input placeholder='Type Email Here...' onChangeText={(text) => setEmail(text)} variant={'filled'} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input placeholder='Type Password Here...' type="password" variant={'filled'} onChangeText={(text) => setPassword(text)} />
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link>
                        </FormControl>
                        {error ? <Text color={'red.500'}>⚠️ {error.message}</Text> : ""}
                        <Button isLoading={loading} mt="2" colorScheme="amber" onPress={login} isDisabled={email === "" || password === ""}>
                            <Text fontWeight={'bold'}>Login</Text>
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                I'm a new user.{" "}
                            </Text>
                            <Button variant={'link'} p={0} colorScheme={'amber'} onPress={() => navigation.navigate("register")} >
                                Register
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
            <BottomBar navigationProps={navigation} routeProps={route} />
        </VStack>
    )
}

export default Login
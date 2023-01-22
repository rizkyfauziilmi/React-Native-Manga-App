import { VStack, Text, Avatar, FormControl, Input, Center, HStack, Button, Icon, ScrollView, useDisclose, Modal } from 'native-base'
import { useState } from 'react'
import BottomBar from '../../components/BottomBar'
import { auth, db } from '../../firebase/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useDeleteUser, useUpdateProfile } from 'react-firebase-hooks/auth'

const Account = ({ navigation, route }) => {
    const [photoUrl, setPhotoUrl] = useState("")
    const [nickname, setNickname] = useState("")
    const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth)
    const [deleteUser, loading, error] = useDeleteUser(auth);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    if (auth.currentUser) {
        return (
            <VStack height={'100%'} justifyContent={'space-between'} safeArea>
                <ScrollView height={'80%'}>
                    <VStack paddingY={10} paddingX={5} justifyContent={'space-between'}>
                        <VStack>
                            <Center>
                                <Avatar size={'xl'} bg="green.500" source={{
                                    uri: photoUrl || auth.currentUser.photoURL
                                }}>
                                    RFI
                                </Avatar>
                            </Center>
                            <VStack space={3} pb={10}>
                                <FormControl>
                                    <FormControl.Label>Photo URL</FormControl.Label>
                                    <Input onChangeText={(text) => setPhotoUrl(text)} placeholder={auth.currentUser.photoURL || "Type your photo url here..."} type='text' variant={'filled'} size={'sm'} />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Nickname</FormControl.Label>
                                    <Input onChangeText={(text) => setNickname(text)} placeholder={auth.currentUser.displayName || "Display Name"} type='text' variant={'filled'} size={'sm'} />
                                </FormControl>
                                {error ? <Text color={'red.500'}>⚠️ {error.message}</Text> : ""}
                            </VStack>
                        </VStack>
                        <HStack width={'100%'} justifyContent={'space-around'}>
                            <Button isLoading={updating} spinnerPlacement="start" isLoadingText="Updating" isDisabled={(photoUrl === "" || photoUrl === auth.currentUser.photoURL) && (nickname === "" || nickname === auth.currentUser.displayName) ? true : false} leftIcon={<Icon as={AntDesign} name="save" />} fontWeight={'bold'} width={'40%'} colorScheme={'success'} onPress={async () => {
                                const success = await updateProfile({ displayName: nickname || auth.currentUser.displayName, photoURL: photoUrl || auth.currentUser.photoURL });
                                if (success) {
                                    navigation.popToTop()
                                    navigation.navigate('dashboard')
                                }
                            }}>Save</Button>
                            <Button leftIcon={<Icon as={AntDesign} name="deleteuser" />} fontWeight={'bold'} width={'40%'} colorScheme={'error'} onPress={onOpen}>Delete Account</Button>
                        </HStack>
                    </VStack>
                </ScrollView>
                <BottomBar navigationProps={navigation} routeProps={route} />
                <Center>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <Modal.Content>
                            <Modal.CloseButton />
                            <Modal.Header fontSize="4xl" fontWeight="bold">
                                Delete User?
                            </Modal.Header>
                            <Modal.Body>
                                {`This will remove all data relating to ${auth.currentUser.email}. This action cannot bereversed. Deleted data can not be recovered.`}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="unstyled" mr="1" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button leftIcon={<Icon as={Ionicons} name="ios-trash-outline" />} isLoading={loading} spinnerPlacement="start" isLoadingText="Deleting" colorScheme="error" onPress={async () => {
                                    await deleteDoc(doc(db, "users", auth.currentUser.email))
                                        .then(async () => {
                                            const success = await deleteUser();
                                            if (success) {
                                                navigation.popToTop()
                                            }
                                        })
                                }}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>
            </VStack>
        )
    }
}

export default Account
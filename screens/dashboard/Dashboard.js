import { Avatar, Button, Center, Heading, HStack, Text, VStack } from 'native-base'
import { useSignOut } from 'react-firebase-hooks/auth'
import BottomBar from '../../components/BottomBar'
import TopBar from '../../components/TopBar'
import { auth } from '../../firebase/firebaseConfig'

const Dashboard = ({ navigation, route }) => {
    const [signOut, loading, error] = useSignOut(auth)

    const logout = async () => {
        await signOut()
    }

    return (
        <VStack height={'100%'} justifyContent={'space-between'}>
            <TopBar headingTitle='Dashboard' />
            <Center>
                <HStack space={2} alignItems={'center'}>
                    <Avatar size={'xl'} bg="green.500" source={{
                        uri: auth.currentUser.photoURL
                    }}>
                        RFI
                    </Avatar>
                    <VStack>
                        <Heading size={'lg'}>
                            {auth.currentUser.displayName||"Display Name"}
                        </Heading>
                        <Text fontWeight={'bold'} opacity={0.5}>
                            {auth.currentUser.email}
                        </Text>
                    </VStack>
                </HStack>
                <Button isLoading={loading} onPress={logout}>
                    Logout
                </Button>
            </Center>
            {error ? <Text color={'red.500'}>⚠️ {error.message}</Text> : ""}
            <BottomBar navigationProps={navigation} routeProps={route} />
        </VStack>
    )
}

export default Dashboard
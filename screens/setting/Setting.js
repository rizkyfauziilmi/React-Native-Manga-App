import { VStack, Text, HStack, Icon, Heading, IconButton, Input, Divider, ScrollView, Button } from "native-base"
import BottomBar from "../../components/BottomBar"
import { Ionicons, AntDesign, Octicons, EvilIcons, Feather, SimpleLineIcons } from '@expo/vector-icons'
import { auth } from "../../firebase/firebaseConfig"
import { useSignOut } from 'react-firebase-hooks/auth'

const Setting = ({ navigation, route }) => {
  const [signOut, loading, error] = useSignOut(auth)

  return (
    <VStack height={'100%'} justifyContent={'space-between'} safeArea>
      <VStack paddingX={10} paddingTop={5}>
        <Heading textAlign={'center'} pb={5}>Setting</Heading>
        <Input InputLeftElement={<Icon as={EvilIcons} name="search" size={8} />} marginY={5} type="text" placeholder="Search for a setting..." variant={'filled'} size={'md'} />
        <ScrollView>
          <VStack space={7}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} space={2}>
                <Icon as={Octicons} name="person" size={5} />
                <Text>Account</Text>
              </HStack>
              <IconButton _icon={{ as: AntDesign, name: 'right' }} onPress={() => navigation.navigate(auth.currentUser ? 'account' : 'login')} />
            </HStack>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} space={2}>
                <Icon as={Ionicons} name="ios-notifications-outline" size={5} />
                <Text>Notifications</Text>
              </HStack>
              <IconButton _icon={{ as: AntDesign, name: 'right' }} />
            </HStack>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} space={2}>
                <Icon as={Feather} name="eye" size={5} />
                <Text>Appearance</Text>
              </HStack>
              <IconButton _icon={{ as: AntDesign, name: 'right' }} />
            </HStack>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} space={2}>
                <Icon as={Feather} name="lock" size={5} />
                <Text>Privacy & Security</Text>
              </HStack>
              <IconButton _icon={{ as: AntDesign, name: 'right' }} />
            </HStack>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} space={2}>
                <Icon as={Feather} name="headphones" size={5} />
                <Text>Help & Support</Text>
              </HStack>
              <IconButton _icon={{ as: AntDesign, name: 'right' }} onPress={() => navigation.navigate('helpAndSupport')} />
            </HStack>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} space={2}>
                <Icon as={AntDesign} name="questioncircleo" size={5} />
                <Text>About</Text>
              </HStack>
              <IconButton _icon={{ as: AntDesign, name: 'right' }} onPress={() => navigation.navigate('about')} />
            </HStack>
            {auth.currentUser && <HStack mr={3} alignSelf={'flex-end'} alignItems={'center'} justifyContent={'space-between'}>
              <Button isLoading={loading} spinnerPlacement="start" isLoadingText="Loading..." leftIcon={<Icon as={SimpleLineIcons} name="logout" />} colorScheme={'danger'} onPress={async () => {
                const success = await signOut();
                if (success) {
                  navigation.popToTop()
                }
              }} >
                Logout
              </Button>
            </HStack>}
          </VStack>
        </ScrollView>
      </VStack>
      <BottomBar navigationProps={navigation} routeProps={route} />
    </VStack>
  )
}

export default Setting
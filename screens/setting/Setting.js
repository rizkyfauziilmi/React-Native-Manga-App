import { VStack, Text, HStack, Icon, Heading, IconButton, Input, ScrollView, Button, Modal, Switch, useColorMode, Radio, FormControl } from "native-base"
import BottomBar from "../../components/BottomBar"
import { Ionicons, AntDesign, Octicons, EvilIcons, Feather, SimpleLineIcons, FontAwesome } from '@expo/vector-icons'
import { auth } from "../../firebase/firebaseConfig"
import { useSignOut } from 'react-firebase-hooks/auth'
import { useState } from "react"

const Setting = ({ navigation, route }) => {
  const [signOut, loading, error] = useSignOut(auth)
  const [showModal, setShowModal] = useState(false);
  const { setColorMode, colorMode } = useColorMode()

  console.log(colorMode)

  return (
    <>
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
                <IconButton _icon={{ as: AntDesign, name: 'right' }} onPress={() => setShowModal(true)} />
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
                <Button isLoading={loading} spinnerPlacement="start" isLoadingText="Loading" leftIcon={<Icon as={SimpleLineIcons} name="logout" />} colorScheme={'danger'} onPress={async () => {
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Appearance</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label _text={{
                fontSize: "lg",
                bold: true
              }}>
                Theme
              </FormControl.Label>
              <Radio.Group defaultValue="dark" size="lg" name="exampleGroup" accessibilityLabel="pick a choice" onChange={nextValue => {
                setColorMode(nextValue)
              }}>
                <Radio _text={{
                  mx: 2
                }} colorScheme="purple" value="dark" icon={<Icon as={<FontAwesome name="moon-o" />} />} my={1}>
                  Dark
                </Radio>
                <Radio _text={{
                  mx: 2
                }} colorScheme="green" value="light" icon={<Icon as={<FontAwesome name="sun-o" />} />} my={1}>
                  Light
                </Radio>
              </Radio.Group>
            </FormControl>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default Setting
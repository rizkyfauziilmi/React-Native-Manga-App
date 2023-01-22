import { Divider, Heading, HStack, Icon, List, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import BottomBar from '../../components/BottomBar'

const About = ({ navigation, route }) => {
    return (
        <VStack safeArea height={'100%'} justifyContent={'space-between'}>
            <ScrollView>
                <VStack space={3} paddingX={5}>
                    <Heading textAlign={'center'} pb={2} pt={5}>About</Heading>
                    <HStack alignItems={'center'} space={2}>
                        <Icon as={MaterialCommunityIcons} name="application-brackets-outline" size={5} />
                        <Text fontWeight={'medium'}>App Name: Jozu</Text>
                    </HStack>
                    <Divider />
                    <HStack alignItems={'center'} space={2}>
                        <Icon as={MaterialIcons} name="update" />
                        <Text fontWeight={'medium'}>Version: 3.1.2</Text>
                    </HStack>
                    <Divider />
                    <HStack alignItems={'center'} space={2}>
                        <Icon as={AntDesign} name="contacts" />
                        <Text fontWeight={'medium'}>Contact: rizkyfauziilmi@gmail.com</Text>
                    </HStack>
                    <Divider />
                    <VStack>
                        <Heading pb={1} size={'md'} textAlign={'center'}>Licence</Heading>
                        <Text fontWeight={'medium'} >This app is licensed under the MIT license. You may copy, modify and distribute this application in accordance with the terms and conditions of the MIT license. This application is provided without warranty of any kind. Developers and companies are not responsible for any losses that may arise from using this application. Please read the full text of the MIT license for more information.</Text>
                    </VStack>
                    <Divider />
                    <VStack>
                        <Heading pb={1} size={'md'} textAlign={'center'}>Privacy Policy</Heading>
                        <Text fontWeight={'medium'} pb={2}>The information we collect when registering includes email and passwords which are encrypted and used with the Firebase authentication system. Apart from that, you can also provide optional information such as phone number, photo profile url, nickname. This information is used to manage the user's history of using the application, such as dashboard features, favorite manga, currently reading manga, and notifications.</Text>
                        <Text fontWeight={'medium'} pb={2}>We will not sell, rent or provide your information to third parties without your consent. We will also make efforts to protect your information from unauthorized access by using encryption and other security technologies.</Text>
                        <Text fontWeight={'medium'} pb={2}>You can change or delete your information at any time by accessing your account settings. You can also ask us to delete your information by contacting us via the email listed in the contact section.</Text>
                        <Text fontWeight={'medium'} pb={2}>This Privacy Policy may change from time to time. We will provide notification if there are significant changes. By using this application, you agree to this Privacy Policy.</Text>
                    </VStack>
                    <Divider />
                    <VStack>
                        <Heading pb={1} size={'md'} textAlign={'center'}>update version 3.1.2</Heading>
                        <List p={3} mb={5}>
                            <Text fontWeight={'medium'}>• Securtiy Improvement: Use Environtment Variable</Text>
                            <Text fontWeight={'medium'}>• Fix Bugs: update Profile</Text>
                            <Text fontWeight={'medium'}>• Update UI: Improve UI a little bit</Text>
                            <Text fontWeight={'medium'}>• Live Search feature: users can do searching now.</Text>
                            <Text fontWeight={'medium'}>• Favorite feature: users can add their favorite comic.</Text>
                            <Text fontWeight={'medium'} textAlign={'center'} pt={5}>-Always make sure to update your app to the latest version to enjoy the latest features and improvements we've made.-</Text>
                        </List>
                    </VStack>
                    <Divider />
                    <VStack>
                        <Heading pb={1} size={'md'} textAlign={'center'}>Package</Heading>
                        <List p={3} mb={5}>
                            <Text>
                                {`"dependencies": {
    "@expo/vector-icons": "^13.0.0",
    "@react-navigation/native": "^6.1.1",
    "@react-navigation/native-stack": "^6.9.7",
    "expo": "47.0.0",
    "expo-mail-composer": "^12.0.0",
    "firebase": "^9.15.0",
    "native-base": "^3.4.25",
    "react": "18.1.0",
    "react-dom": "18.1.0",
    "react-firebase-hooks": "^5.1.1",
    "react-native": "0.70.5",
    "react-native-safe-area-context": "4.4.1",
    "react-native-screens": "~3.18.0",
    "react-native-svg": "13.4.0"
  }`}
                            </Text>
                        </List>
                    </VStack>
                </VStack>
            </ScrollView>
            <BottomBar navigationProps={navigation} routeProps={route} />
        </VStack>
    )
}

export default About
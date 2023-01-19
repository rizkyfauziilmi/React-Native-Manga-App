import { Button, HStack, Icon, Link, Box, VStack, Heading } from 'native-base'
import * as MailComposer from 'expo-mail-composer'
import { auth } from '../../firebase/firebaseConfig'
import BottomBar from '../../components/BottomBar'
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'

const HelpAndSupport = ({ navigation, route }) => {
    const handleEmail = () => {
        MailComposer.composeAsync({
            recipients: ['rizkyfauziilmi@gmail.com'],
            subject: `Feedback from ${auth.currentUser ? `${auth.currentUser.email} with nickname ${auth.currentUser.displayName}` : "Anonymous User"}`,
            body: 'Type here...',
            isHtml: true
        })
    }

    return (
        <VStack safeArea height={'100%'} justifyContent={'space-between'}>
            <Heading pt={2} textAlign={'center'}>Contact Me at</Heading>
            <VStack paddingX={5} alignItems={'center'} space={5}>
                <Link onPress={handleEmail}>
                    <Box px="3" py="2" bg="#C71610" rounded="sm" _text={{
                        color: "white",
                        fontWeight: "medium",
                        textAlign: 'center'
                    }}>
                        <Icon as={MaterialCommunityIcons} color={'white'} name="gmail" size={20}/>
                        Gmail
                    </Box>
                </Link>
                <Link isExternal href='https://ig.me/m/fauzirizkyw'>
                    <Box px="3" py="2" bg="#8134AF" rounded="sm" _text={{
                        color: "white",
                        fontWeight: "medium",
                        textAlign: 'center'
                    }}>
                        <Icon as={AntDesign} color={'white'} name="instagram" size={20}/>
                        Instagram
                    </Box>
                </Link>
                <Link isExternal href='https://github.com/RizkyFauziIlmi/'>
                    <Box px="3" py="2" bg="white" rounded="sm" _text={{
                        color: "black",
                        fontWeight: "medium",
                        textAlign: 'center'
                    }}>
                        <Icon as={AntDesign} color={'black'} name="github" size={20}/>
                        Github
                    </Box>
                </Link>
                <Link isExternal href='https://discordapp.com/channels/888812488253124698/300449633547583488'>
                    <Box px="3" py="2" bg="white" rounded="sm" _text={{
                        color: "#5865F2",
                        fontWeight: "medium",
                        textAlign: 'center'
                    }}>
                        <Icon as={MaterialCommunityIcons} color={'#5865F2'} name="discord" size={20}/>
                        Discord
                    </Box>
                </Link>
            </VStack>
            <BottomBar navigationProps={navigation} routeProps={route} />
        </VStack>

    )
}

export default HelpAndSupport
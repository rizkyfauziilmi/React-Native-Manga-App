import { HStack, IconButton, useToast, VStack } from "native-base"
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react"
import { auth } from "../firebase/firebaseConfig"

const BottomBar = ({ navigationProps, routeProps }) => {

    const [routeName, setRouteName] = useState(routeProps.name)
    const toast = useToast()

    useEffect(() => {
        setRouteName(routeProps.name)
    }, [])

    return (
        <VStack>
            <HStack justifyContent={'space-between'} borderColor={'black'} borderTopWidth={2} p={3}>
                <IconButton variant={'ghost'} colorScheme={'amber'} _icon={{ as: MaterialCommunityIcons, name: "archive-eye-outline" }} />
                <IconButton variant={routeName === 'favorite' ? 'solid' : 'ghost'} colorScheme={'amber'} _icon={{ as: MaterialIcons, name: "favorite-outline" }} onPress={() => navigationProps.navigate(auth.currentUser ? 'favorite' : 'login')} />
                <IconButton variant={routeName === 'home' ? 'solid' : 'ghost'} colorScheme={'amber'} _icon={{ as: Ionicons, name: "ios-home-outline" }} onPress={() => navigationProps.navigate('home')} />
                <IconButton variant={routeName === 'login' || routeName === 'register' || routeName === 'dashboard' ? 'solid' : 'ghost'} colorScheme={'amber'} _icon={{ as: Ionicons, name: "ios-person-circle-outline" }} onPress={() => navigationProps.navigate(auth.currentUser ? 'dashboard' : 'login')} />
                <IconButton variant={routeName === 'setting' || routeName === 'about' || routeName === 'account' || routeName === 'helpAndSupport' ? 'solid' : 'ghost'} colorScheme={'amber'} _icon={{ as: AntDesign, name: "setting" }} onPress={() => navigationProps.navigate('setting')} />
            </HStack>
        </VStack>
    )
}

export default BottomBar
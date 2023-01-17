import { HStack, IconButton } from "native-base"
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from "react"

const BottomBar = ({ navigationProps, routeProps }) => {

    const [routeName, setRouteName] = useState(routeProps.name)

    useEffect(() => {
        setRouteName(routeProps.name)
        console.log(routeName)
    }, [])

    return (
        <HStack justifyContent={'space-between'} borderColor={'black'} borderTopWidth={2} p={3}>
            <IconButton variant={'ghost'} colorScheme={'amber'} _icon={{ as: MaterialCommunityIcons, name: "archive-eye-outline" }} />
            <IconButton variant={'ghost'} colorScheme={'amber'} _icon={{ as: MaterialIcons, name: "favorite-outline" }} />
            <IconButton variant={routeName === 'home' ? 'solid' : 'ghost'} colorScheme={'amber'} _icon={{ as: Ionicons, name: "ios-home-outline" }} onPress={() => navigationProps.navigate('home')} />
            <IconButton variant={'ghost'} colorScheme={'amber'} _icon={{ as: Ionicons, name: "ios-person-circle-outline" }} />
            <IconButton variant={routeName === 'setting' ? 'solid' : 'ghost'} colorScheme={'amber'} _icon={{ as: AntDesign, name: "setting" }} onPress={() => navigationProps.navigate('setting')} />
        </HStack>
    )
}

export default BottomBar
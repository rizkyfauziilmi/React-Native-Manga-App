import { useNavigation } from '@react-navigation/native'
import { Heading, HStack, IconButton, SearchIcon, SunIcon, useColorMode, MoonIcon, ChevronLeftIcon } from 'native-base'
import React, { useEffect } from 'react'
import shortenSentence from '../utils/shortenSentence'

const TopBar = ({ headingTitle = "JOZU" }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [isCanGoBack, setIsCanGoBack] = React.useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        if (navigation.canGoBack()) {
            setIsCanGoBack(true)
        } else {
            setIsCanGoBack(false)
        }
    }, [])


    return (
        <HStack justifyContent={'space-between'} alignItems={"center"} safeArea paddingY={2}>
            <HStack>
                {isCanGoBack ? <IconButton icon={<ChevronLeftIcon />} onPress={() => navigation.goBack()} /> : ""}
                <IconButton icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />} onPress={toggleColorMode} />
            </HStack>
            <Heading size="sm" justifyContent={'space-between'}>{shortenSentence(headingTitle, 20)}</Heading>
            <IconButton icon={<SearchIcon />} />
        </HStack>
    )
}

export default TopBar
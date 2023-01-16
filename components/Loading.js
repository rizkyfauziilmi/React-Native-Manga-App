import React from 'react'
import { Center, Image, HStack, VStack, useColorMode } from 'native-base'

const Loading = () => {
    const { colorMode } = useColorMode()

    return (
        <Center safeArea height={'100%'} style={{ backgroundColor: colorMode === 'dark' ? '#2D3545' : 'white' }}>
            <VStack>
                <Image alt={'Loading...'} size={"lg"} source={colorMode === 'dark' ? require('../assets/darkLoading.gif') : require('../assets/lightLoading.gif')} />
                <Image alt={'Loading bar'} size={"lg"} source={colorMode === 'dark' ? require('../assets/darkBarLoading.gif') : require('../assets/lightBarLoading.gif')} />
            </VStack>
        </Center>
    )
}

export default Loading
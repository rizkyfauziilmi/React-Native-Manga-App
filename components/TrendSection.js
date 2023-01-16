import React, { useEffect, useState } from 'react'
import { Badge, Heading, HStack, Image, Text, VStack, Pressable, useColorMode, Skeleton } from 'native-base'
import shortenSentence from '../utils/shortenSentence'

const TrendSection = ({ navigationProps }) => {
    const { colorMode } = useColorMode()
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://komikindo-api.vercel.app/komik-list?limit=10&type=hot&sort=score')
            const data = await response.json()
            setInterval(() => {
                setIsLoading(false)
            }, 1000)

            setData(data)
        }

        getData()
    }, [])

    if (data) {
        return (
            <VStack paddingX={10} paddingY={5} space={5}>
                {data.map((value) => {
                    return (
                        <Skeleton size={90} key={value._id} isLoaded={!isLoading} startColor="amber.300">
                            <HStack justifyContent={'flex-start'} alignItems={'center'} space={2} p={2} borderRadius={5} borderColor="coolGray.200" borderWidth="1" _dark={{
                                borderColor: "coolGray.600",
                            }} _light={{
                                backgroundColor: "gray.50"
                            }}>
                                <Pressable onPress={() => {
                                    navigationProps.navigate('komikDetail', {
                                        title: value.title,
                                        endpoint: value.endpoint
                                    })
                                }}>
                                    <Image shadow={10} source={{
                                        uri: value.thumb
                                    }} alt={value.title} borderRadius={100} size={90} />
                                </Pressable>
                                <VStack>
                                    <HStack space={1}>
                                        <Pressable onPress={() => {
                                            navigationProps.navigate('komikDetail', {
                                                title: value.title,
                                                endpoint: value.endpoint
                                            })
                                        }}>
                                            <Heading noOfLines={1} size={'xs'}>{shortenSentence(value.title, 15)}</Heading>
                                        </Pressable>
                                        {value.type === 'hot' ? <Image source={require('../assets/hot.png')} alt={value.type} size={15} /> : ""}
                                    </HStack>
                                    <HStack pt={2} space={2}>
                                        <Text opacity={0.5}>Score</Text>
                                        <Badge colorScheme={colorMode === 'dark' ? 'warning' : 'success'} variant={'solid'} borderRadius={5}>{value.score}</Badge>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Skeleton>
                    )
                })}
            </VStack>
        )
    }
}

export default TrendSection
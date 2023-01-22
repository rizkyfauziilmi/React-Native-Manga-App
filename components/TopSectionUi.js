import { Box, Heading, HStack, Text, VStack, Image, Badge, ScrollView, Pressable, useColorMode, Skeleton } from 'native-base'
import { useState, useEffect } from 'react'

const TopSectionUi = ({ type = "Manga", navigationProps, title = "TOP SECTION UI" }) => {
    const { colorMode } = useColorMode()
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://komikindo-api.vercel.app/komik-list?limit=10&sort=score&type=${type}`)
            const data = await response.json()
            setInterval(() => {
                setIsLoading(false)
            })

            setData(data)
        }

        getData()
    }, [])

    if (data) {
        return (
            <VStack p={5}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Heading size={'xs'}>{title}</Heading>
                    <Text>MORE</Text>
                </HStack>
                <ScrollView horizontal pt={5}>
                    <HStack space={6}>
                        {data.map((value) => {
                            return (
                                <Pressable key={value._id} onPress={() => navigationProps.navigate('komikDetail', {
                                    title: value.title,
                                    endpoint: value.endpoint
                                })}>
                                    <VStack width={150}>
                                        <Skeleton height={200} isLoaded={!isLoading}>
                                            <Image position={'relative'} shadow={10} source={{ uri: value.thumb }} borderRadius={5} alt={value.title} style={{ resizeMode: 'contain' }} size={210} />
                                        </Skeleton>
                                        <Skeleton.Text lines={1} pt={2} isLoaded={!isLoading}>
                                            <Heading width={150} paddingY={3} pb={2} size={'xs'} noOfLines={1}>{value.title}</Heading>
                                        </Skeleton.Text>
                                        {
                                            value.type === "Manga" ? <Image top={1} right={2} position={'absolute'} source={require('../assets/japan.png')} alt={'manga'} size={6} /> :
                                                value.type === "Manhwa" ? <Image top={1} right={2} position={'absolute'} source={require('../assets/korea.png')} alt={'manhwa'} size={6} /> :
                                                    value.type === "Manhua" ? <Image top={1} right={2} position={'absolute'} source={require('../assets/china.png')} alt={'manhwa'} size={6} /> :
                                                        value.type === 'hot' ? <Image top={1} right={2} position={'absolute'} source={require('../assets/hot.png')} alt={'manga'} size={6} /> :
                                                            <Text>{value.type}</Text>
                                        }
                                        <HStack position={'relative'} width={150} space={2} alignItems={'center'}>
                                            <Skeleton borderRadius={5} size={5} mt={2} isLoaded={!isLoading}>
                                                <Badge size={5} colorScheme={colorMode === 'dark' ? 'warning' : 'success'} variant={'solid'} borderRadius={5}>{!isNaN(value.score) ? value.score : "null"}</Badge>
                                            </Skeleton>
                                            {
                                                value.warna ? <Skeleton rounded={'full'} size={5} isLoaded={!isLoading}><Image source={require('../assets/colorful.png')} alt={'manga'} size={5} /></Skeleton> : ""
                                            }
                                        </HStack>
                                    </VStack>
                                </Pressable>
                            )
                        })}
                    </HStack>
                </ScrollView>
            </VStack>
        )
    }
}

export default TopSectionUi
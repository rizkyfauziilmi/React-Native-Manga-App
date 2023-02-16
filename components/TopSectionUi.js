import { Heading, HStack, Text, VStack, Image, Badge, ScrollView, Pressable, useColorMode, Skeleton, Icon } from 'native-base'
import { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';

const TopSectionUi = ({ type = "Manga", navigationProps, title = "TOP SECTION UI" }) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const response = await fetch(`https://komikindo-api.vercel.app/komik-list?limit=10&sort=score&type=${type}`)
            const data = await response.json()

            setData(data)
            setLoading(false)
        }

        getData()
    }, [])

    if (data && !loading) {
        return (
            <VStack p={5}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Heading size={'xs'}>{title}</Heading>
                    <Text>MORE</Text>
                </HStack>
                <ScrollView horizontal pt={5}>
                    <HStack space={3}>
                        {data.map((value) => {
                            return (
                                <Pressable key={value._id} onPress={() => navigationProps.navigate('komikDetail', {
                                    title: value.title,
                                    endpoint: value.endpoint
                                })}>
                                    <VStack width={150} pb={1} pt={1} paddingX={1}>
                                        <Image borderWidth={'2'} borderColor={'black'} position={'relative'} shadow={10} source={{ uri: value.thumb }} borderRadius={5} alt={value.title} style={{ resizeMode: 'contain' }} size={210} />
                                        <Heading width={150} paddingY={3} pb={2} size={'xs'} noOfLines={1}>{value.title}</Heading>
                                        {
                                            value.type === "Manga" ? <Image top={1} right={2} position={'absolute'} source={require('../assets/japan.png')} alt={'manga'} size={6} /> :
                                                value.type === "Manhwa" ? <Image top={1} right={2} position={'absolute'} source={require('../assets/korea.png')} alt={'manhwa'} size={6} /> :
                                                    value.type === "Manhua" ? <Image top={1} right={2} position={'absolute'} source={require('../assets/china.png')} alt={'manhwa'} size={6} /> :
                                                        value.type === 'hot' ? <Image top={1} right={2} position={'absolute'} source={require('../assets/hot.png')} alt={'manga'} size={6} /> :
                                                            <Text>{typeof value.type}</Text>
                                        }
                                        <HStack position={'relative'} width={160} space={2} alignItems={'center'}>
                                            {[...Array(5)].map((arr, index) => {
                                                return index < parseInt(value.score/2) ? <Icon key={index} as={AntDesign} name="star" color={'yellow.500'} /> : <Icon key={index} color={'coolGray.500'} as={AntDesign} name="star" />
                                            })}
                                            {
                                                value.warna ? <Skeleton rounded={'full'} size={5} isLoaded={!loading}><Image source={require('../assets/colorful.png')} alt={'manga'} size={5} /></Skeleton> : ""
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
    } else {
        return (
            <HStack p={5} space={3} mb={2}>
                <VStack w="50%" space={1}>
                    <Skeleton h={'200'} w="100%" />
                    <Skeleton.Text lines={1} />
                    <HStack space={1}>
                        <Skeleton h={'4'} w="20%" borderRadius={'md'} />
                        <Skeleton w={'10%'} h={4} borderRadius="full" />
                    </HStack>
                </VStack>
                <VStack w="50%" space={1}>
                    <Skeleton h={'200'} w="100%" />
                    <Skeleton.Text lines={1} />
                    <HStack space={1}>
                        <Skeleton h={'4'} w="20%" borderRadius={'md'} />
                        <Skeleton w={'10%'} h={4} borderRadius="full" />
                    </HStack>
                </VStack>
            </HStack>
        )
    }
}

export default TopSectionUi
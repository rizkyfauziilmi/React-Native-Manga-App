import { Heading, HStack, Image, Pressable, Progress, Spinner, Text, VStack } from "native-base"
import { useEffect, useState } from "react"

const CompletedHistory = ({ navigationProps, routeProps, endpoint, date }) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const response = await fetch(`https://komikindo-api.vercel.app/komik-detail/${endpoint}`)
            const data = await response.json()

            setData(data[0])
            setLoading(false)
        }

        getData()
    }, [])

    if (loading) {
        return (
            <HStack space={2} justifyContent="center">
                <Spinner color="emerald.500" accessibilityLabel="Loading" />
                <Heading color="emerald.500" fontSize="xl">
                    Loading
                </Heading>
            </HStack>
        )
    }

    if (data) {
        return (
            <VStack paddingX={10}>
                <Text fontWeight={'bold'}>{date}</Text>
                <Pressable onPress={() => {
                    navigationProps.navigate('komikDetail', {
                        title: data.title,
                        endpoint: endpoint
                    })
                }}>
                    <HStack space={2} width={'100%'} opacity={0.5}>
                        <Image borderRadius={2} shadow={10} source={{
                            uri: data.thumb
                        }} alt={data.title} style={{ resizeMode: 'contain', width: '38%' }} size={150} />
                        <VStack width={'60%'} justifyContent={'space-around'}>
                            <Heading size={'sm'}>{data.title}</Heading>
                            <VStack mb={2}>
                                <Text noOfLines={3}>{data.sinopsis.replace("Manga", "").replace("Manhwa", "").replace("Manhua", "").replace(` ${data.title} yang dibuat oleh komikus bernama `, "").replace(`${data.info.filter(item => item.hasOwnProperty('Pengarang')).map(item => item.Pengarang)} ini bercerita tentang `, "")}</Text>
                                <Text opacity={0.5} fontWeight={'bold'}>{data.chapter_list.length}/{data.chapter_list.length} • 100%</Text>
                                <Progress colorScheme="warning" size="sm" value={100} />
                            </VStack>
                        </VStack>
                    </HStack>
                </Pressable>
            </VStack>
        )
    }
}

export default CompletedHistory
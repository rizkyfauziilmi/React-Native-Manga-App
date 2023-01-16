import { useNavigation } from "@react-navigation/native"
import { HStack, IconButton, Image, ScrollView, MinusIcon, VStack, SearchIcon } from "native-base"
import { useEffect, useState } from "react"
import { Button } from "react-native"
import Loading from "../../components/Loading"
import TopBar from "../../components/TopBar"

const KomikChapterSceen = ({ route }) => {
    const navigation = useNavigation()

    const { endpoint } = route.params
    const [komikChapter, setKomikChapter] = useState(null)
    const [zoom, setZoom] = useState(800)

    useEffect(() => {
        const getKomikchapter = async () => {
            const response = await fetch(`https://komikindo-api.vercel.app/komik-chapter/${endpoint}`)
            const data = await response.json()

            setKomikChapter(data[0])
        }

        getKomikchapter()
    }, [])

    if (komikChapter) {
        return (
            <>
                <TopBar headingTitle={komikChapter.title.replace("Komik", "")} />
                <ScrollView>
                    <HStack space={2} justifyContent={'center'} pb={2} flexWrap={'wrap'}>
                        {komikChapter.relative.map((value, index) => {
                            return (
                                <Button key={index} title={value.relative_title} onPress={() => {
                                    if (value.relative_endpoint.includes('chapter')) {
                                        navigation.goBack()
                                        navigation.navigate('komikChapter', {
                                            endpoint: value.relative_endpoint
                                        })
                                    } else {
                                        navigation.goBack()
                                    }
                                }} />
                            )
                        })}
                    </HStack>
                    <VStack position={'relative'}>
                        {komikChapter.images.map((value) => {
                            return (
                                <Image key={value._id} source={{
                                    uri: value.image_link
                                }} alt={value.image_alt} size={zoom} style={{ resizeMode: 'contain' }} />
                            )
                        })}
                    </VStack>
                    <HStack space={2} justifyContent={'center'} pb={2} flexWrap={'wrap'}>
                        {komikChapter.relative.map((value, index) => {
                            return (
                                <Button key={index} title={value.relative_title} onPress={() => {
                                    if (value.relative_endpoint.includes('chapter')) {
                                        navigation.goBack()
                                        navigation.navigate('komikChapter', {
                                            endpoint: value.relative_endpoint
                                        })
                                    } else {
                                        navigation.goBack()
                                    }
                                }} />
                            )
                        })}
                    </HStack>
                </ScrollView>
                <VStack position={'absolute'} bottom={12} style={{ backgroundColor: 'unset' }} right={5} space={3}>
                    <IconButton size={10} colorScheme={'success'} variant={'solid'} icon={<SearchIcon />} onPress={() => setZoom(zoom + 50)} />
                    <IconButton size={10} colorScheme={'success'} variant={'solid'} icon={<MinusIcon />} onPress={() => setZoom(zoom - 50)} />
                </VStack>
            </>
        )
    } else {
        return (
            <Loading />
        )
    }
}

export default KomikChapterSceen
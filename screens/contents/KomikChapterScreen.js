import { useNavigation } from "@react-navigation/native"
import { HStack, IconButton, Image, ScrollView, VStack } from "native-base"
import { useEffect, useState } from "react"
import { Button } from "react-native"
import { Fontisto, MaterialIcons } from '@expo/vector-icons'
import Loading from "../../components/Loading"
import TopBar from "../../components/TopBar"

const KomikChapterSceen = ({ route }) => {
    const navigation = useNavigation()

    const { endpoint } = route.params
    const [komikChapter, setKomikChapter] = useState(null)
    const [zoom, setZoom] = useState(500)
    const [fullScreen, setFullScreen] = useState(false)
    const [isOpacity, setIsOpacity] = useState(false)

    useEffect(() => {
        const getKomikchapter = async () => {
            const response = await fetch(`https://komikindo-api.vercel.app/komik-chapter/${endpoint}`)
            const data = await response.json()

            setKomikChapter(data[0])
        }

        if (!isOpacity) {
            setIsOpacity(true)
        }
        
        getKomikchapter()
    }, [])

    if (komikChapter) {
        return (
            <>
                {!fullScreen && <TopBar headingTitle={komikChapter.title.replace("Komik", "")} />}
                <ScrollView>
                    {!fullScreen &&
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
                    }
                    <VStack position={'relative'}>
                        {komikChapter.images.map((value) => {
                            return (
                                <Image key={value._id} source={{
                                    uri: value.image_link
                                }} alt={value.image_alt} size={zoom} style={{ resizeMode: 'contain' }} />
                            )
                        })}
                    </VStack>
                    {!fullScreen &&
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
                    }
                </ScrollView>
                <VStack position={'absolute'} bottom={12} style={{ backgroundColor: 'unset' }} right={5} space={3}>
                    <IconButton size={10} opacity={isOpacity ? 0.5 : 1} colorScheme={'amber'} _icon={{ as: Fontisto, name: "zoom-plus" }} variant={'solid'} onPress={() => {
                        setZoom(zoom + 50)
                        setIsOpacity(false)
                    }} />
                    <IconButton size={10} opacity={isOpacity ? 0.5 : 1} colorScheme={'amber'} _icon={{ as: MaterialIcons, name: !fullScreen ? "fullscreen" : "fullscreen-exit" }} variant={'solid'} onPress={() => {
                        setFullScreen(!fullScreen)
                        setIsOpacity(false)
                    }} />
                    <IconButton size={10} opacity={isOpacity ? 0.5 : 1} colorScheme={'amber'} _icon={{ as: Fontisto, name: "zoom-minus" }} variant={'solid'} onPress={() => {
                        setZoom(zoom - 50)
                        setIsOpacity(false)
                    }} />
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
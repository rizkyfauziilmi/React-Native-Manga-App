import { useNavigation } from "@react-navigation/native"
import { HStack, IconButton, Image, ScrollView, VStack, Button } from "native-base"
import { useEffect, useState } from "react"
import { Fontisto, MaterialIcons } from '@expo/vector-icons'
import Loading from "../../components/Loading"
import TopBar from "../../components/TopBar"
import { arrayUnion, updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore"
import { auth, db } from "../../firebase/firebaseConfig"
import { useDocument } from "react-firebase-hooks/firestore"

const KomikChapterSceen = ({ route }) => {
    const navigation = useNavigation()

    const { endpoint } = route.params
    const [komikChapter, setKomikChapter] = useState(null)
    const [zoom, setZoom] = useState(500)
    const [fullScreen, setFullScreen] = useState(false)
    const [isOpacity, setIsOpacity] = useState(false)
    const [value, loading, error] = useDocument(
        doc(db, 'users', auth.currentUser ? auth.currentUser.email : 'user@example.com'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    let timestamp = new Timestamp.now()
    const data = value?.data()
    const chapter = data?.finishedChapter?.map((item) => item.chapterEndpoint)

    useEffect(() => {
        const getKomikchapter = async () => {
            const response = await fetch(`https://komikindo-api.vercel.app/komik-chapter/${endpoint}`)
            const data = await response.json()

            setKomikChapter(data[0])
        }

        getKomikchapter()
    }, [])

    if (komikChapter && !loading && value) {
        return (
            <>
                {!fullScreen && <TopBar headingTitle={komikChapter.title.replace("Komik", "")} />}
                <ScrollView>
                    {!fullScreen &&
                        <HStack space={2} justifyContent={'center'} pb={2} flexWrap={'wrap'}>
                            {komikChapter.relative.map((value, index) => {
                                return (
                                    <Button mb={2} key={index} colorScheme={'amber'} onPress={async () => {
                                        if (value.relative_endpoint.includes('chapter')) {
                                            if (auth.currentUser && !chapter.includes(value.relative_endpoint)) {
                                                await updateDoc(doc(db, 'users', auth.currentUser.email), {
                                                    finishedChapter: arrayUnion({ title: komikChapter.relative[1].relative_endpoint, chapterEndpoint: value.relative_endpoint, date: timestamp })
                                                })
                                            }
                                            navigation.goBack()
                                            navigation.navigate('komikChapter', {
                                                endpoint: value.relative_endpoint
                                            })
                                        } else {
                                            navigation.goBack()
                                        }
                                    }} >
                                        {value.relative_title}
                                    </Button>
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
                        <HStack space={2} pt={2} justifyContent={'center'} pb={2} flexWrap={'wrap'}>
                            {komikChapter.relative.map((value, index) => {
                                return (
                                    <Button colorScheme={'amber'} mb={2} key={index} onPress={async () => {
                                        if (value.relative_endpoint.includes('chapter')) {
                                            if (auth.currentUser && !chapter.includes(value.relative_endpoint)) {
                                                await updateDoc(doc(db, 'users', auth.currentUser.email), {
                                                    finishedChapter: arrayUnion({ title: komikChapter.relative[1].relative_endpoint, chapterEndpoint: value.relative_endpoint, date: timestamp })
                                                })
                                            }
                                            navigation.goBack()
                                            navigation.navigate('komikChapter', {
                                                endpoint: value.relative_endpoint
                                            })
                                        } else {
                                            navigation.goBack()
                                        }
                                    }} >
                                        {value.relative_title}
                                    </Button>
                                )
                            })}
                        </HStack>
                    }
                </ScrollView>
                <VStack position={'absolute'} bottom={12} style={{ backgroundColor: 'unset' }} right={5} space={3}>
                    <IconButton size={10} opacity={isOpacity ? 1 : 0.5} colorScheme={'amber'} _icon={{ as: Fontisto, name: "zoom-plus" }} variant={'solid'} onPress={() => {
                        setZoom(zoom + 50)
                        setIsOpacity(true)
                        setTimeout(() => {
                            setIsOpacity(false)
                        }, 4000)
                    }} />
                    <IconButton size={10} opacity={isOpacity ? 1 : 0.5} colorScheme={'amber'} _icon={{ as: MaterialIcons, name: !fullScreen ? "fullscreen" : "fullscreen-exit" }} variant={'solid'} onPress={() => {
                        setFullScreen(!fullScreen)
                        setIsOpacity(true)
                        setTimeout(() => {
                            setIsOpacity(false)
                        }, 4000)
                    }} />
                    <IconButton size={10} opacity={isOpacity ? 1 : 0.5} colorScheme={'amber'} _icon={{ as: Fontisto, name: "zoom-minus" }} variant={'solid'} onPress={() => {
                        setZoom(zoom - 50)
                        setIsOpacity(true)
                        setTimeout(() => {
                            setIsOpacity(false)
                        }, 4000)
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
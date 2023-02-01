import { useNavigation } from "@react-navigation/native"
import { HStack, IconButton, Image, ScrollView, VStack, Button, Text } from "native-base"
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
    const [totalChapter, setTotalChapter] = useState(null)
    const [loadingDatabase, setLoadingDatabase] = useState(false)
    const [change, setChange] = useState(false)
    const [zoom, setZoom] = useState(255)
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
    const lastChapter = totalChapter?.map((item) => item.chapter_endpoint).filter((item) => chapter?.includes(item)).length

    useEffect(() => {
        const getKomikchapter = async () => {
            const response = await fetch(`https://komikindo-api.vercel.app/komik-chapter/${endpoint}`)
            const data = await response.json()

            setKomikChapter(data[0])

        }
        
        const getTotalChapter = async () => {
            const responseTotalChapter = await fetch(`https://komikindo-api.vercel.app/komik-detail/${endpoint.substring(0, endpoint.indexOf("-chapter-"))}`)
            const dataTotalChapter = await responseTotalChapter.json()
    
            setTotalChapter(dataTotalChapter[0]?.chapter_list)
        }

        getKomikchapter()
        getTotalChapter()
    }, [])

    if (komikChapter && !loading && value && totalChapter) {
        return (
            <>
                {!fullScreen && <TopBar headingTitle={komikChapter.title.replace("Komik", "")} />}
                <VStack height={'100%'} justifyContent={'space-between'} pt={2}>
                    {!fullScreen &&
                        <HStack height={komikChapter.relative.length <= 2 ? '10%' : '15%'} space={2} justifyContent={'center'} pb={2} flexWrap={'wrap'}>
                            {komikChapter.relative.map((value, index) => {
                                return (
                                    <Button isLoading={loadingDatabase} spinnerPlacement="start" isLoadingText="Loading" mb={2} key={index} colorScheme={'amber'} onPress={async () => {
                                        if (value.relative_endpoint.includes('chapter')) {
                                            setLoadingDatabase(true)
                                            if (auth.currentUser && !chapter.includes(value.relative_endpoint)) {
                                                await updateDoc(doc(db, 'users', auth.currentUser.email), {
                                                    finishedChapter: arrayUnion({ title: endpoint.substring(0, endpoint.indexOf("-chapter-")), chapterEndpoint: value.relative_endpoint, date: timestamp })
                                                })
                                                if (lastChapter === totalChapter.length - 1) {
                                                    await updateDoc(doc(db, 'users', auth.currentUser.email), {
                                                        finishedManga: arrayUnion({ title: endpoint.substring(0, endpoint.indexOf("-chapter-")), date: timestamp })
                                                    })
                                                }
                                            }
                                            setLoadingDatabase(false)
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
                    <VStack alignItems={'center'} position={'relative'} width={'100%'}>
                        <ScrollView>
                            {komikChapter.images.map((value) => {
                                return (
                                    <Image key={value._id} source={{
                                        uri: value.image_link
                                    }} alt={value.image_alt} size={!change ? '2xl' : zoom} resizeMode="contain" />
                                )
                            })}
                        </ScrollView>
                    </VStack>
                </VStack>
                <VStack position={'absolute'} bottom={12} style={{ backgroundColor: 'unset' }} right={5} space={3}>
                    <IconButton size={10} opacity={isOpacity ? 1 : 0.5} colorScheme={'amber'} _icon={{ as: Fontisto, name: "zoom-plus" }} variant={'solid'} onPress={() => {
                        setZoom(zoom + 50)
                        setIsOpacity(true)
                        if (!change) {
                            setChange(true)
                        }
                        setTimeout(() => {
                            setIsOpacity(false)
                        }, 4000)
                    }} />
                    <IconButton size={10} opacity={isOpacity ? 1 : 0.5} colorScheme={'amber'} _icon={{ as: MaterialIcons, name: !fullScreen ? "fullscreen" : "fullscreen-exit" }} variant={'solid'} onPress={() => {
                        setFullScreen(!fullScreen)
                        setIsOpacity(true)
                        if (!change) {
                            setChange(true)
                        }
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
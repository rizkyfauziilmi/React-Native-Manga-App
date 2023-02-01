import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { Button, Heading, HStack, Image, Progress, Spinner, Text, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase/firebaseConfig'

const ReadingComponent = ({ endpoint, navigationProps, routeProps }) => {
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [loadingDatabase, setLoadingDatabase] = useState(false)
    const [value, loading, error] = useDocument(
        doc(db, 'users', auth.currentUser.email),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    const alreadyRead = value?.data().finishedChapter.filter((item) => item.title === endpoint)
    const allEndpoint = data?.chapter_list?.map((item) => item.chapter_endpoint)
    const nextChapter = allEndpoint?.filter((item) => !alreadyRead?.map((item) => item.chapterEndpoint).includes(item)).slice(-1)[0]
    const timestamp = new Timestamp.now()

    useEffect(() => {
        const getData = async () => {
            setFetching(true)
            const response = await fetch(`https://komikindo-api.vercel.app/komik-detail/${endpoint}`)
            const data = await response.json()

            setData(data[0])
            setFetching(false)
        }

        getData()
    }, [])

    if (loading || fetching) {
        return (
            <HStack space={2} justifyContent="center">
                <Spinner color="emerald.500" accessibilityLabel="Loading" />
                <Heading color="emerald.500" fontSize="xl">
                    Loading
                </Heading>
            </HStack>
        )
    }


    if (data && value) {
        return (
            <VStack width={'100%'} paddingX={10}>
                <HStack space={2} width={'100%'}>
                    <Image borderRadius={2} shadow={10} source={{
                        uri: data.thumb
                    }} alt={data.title} style={{ resizeMode: 'contain', width: '38%' }} size={150} />
                    <VStack width={'60%'} justifyContent={'space-around'}>
                        <Heading size={'sm'}>{data.title}</Heading>
                        <VStack mb={2}>
                            <Text noOfLines={3}>{data.sinopsis.replace("Manga", "").replace("Manhwa", "").replace("Manhua", "").replace(` ${data.title} yang dibuat oleh komikus bernama `, "").replace(`${data.info.filter(item => item.hasOwnProperty('Pengarang')).map(item => item.Pengarang)} ini bercerita tentang `, "")}</Text>
                            <Text opacity={0.5} fontWeight={'bold'}>{!nextChapter || (alreadyRead.length === data.chapter_list.length - 1 && loadingDatabase) ? `${data.chapter_list.length}/${data.chapter_list.length} • 100%` : `${alreadyRead.length}/${data.chapter_list.length} • ${((alreadyRead.length / data.chapter_list.length) * 100).toFixed()}%`}</Text>
                            <Progress colorScheme="warning" size="sm" value={!nextChapter || (alreadyRead.length === data.chapter_list.length - 1 && loadingDatabase) ? 100 : ((alreadyRead.length / data.chapter_list.length) * 100).toFixed()} />
                        </VStack>
                    </VStack>
                </HStack>
                <Button mt={1} spinnerPlacement="start" isLoadingText="Loading" isLoading={loadingDatabase} size={'sm'} colorScheme={'amber'} onPress={async () => {
                    if (alreadyRead.length === data.chapter_list.length - 1) {
                        setLoadingDatabase(true)
                        await updateDoc(doc(db, 'users', auth.currentUser.email), {
                            finishedChapter: arrayUnion({ title: data.endpoint, chapterEndpoint: nextChapter, date: timestamp })
                        })
                            .finally(async () => {
                                await updateDoc(doc(db, 'users', auth.currentUser.email), {
                                    finishedManga: arrayUnion({ title: data.endpoint, date: timestamp })
                                })
                                    .finally(() => {
                                        setLoadingDatabase(false)
                                    })
                            })
                        navigationProps.popToTop()
                        navigationProps.navigate('komikChapter', {
                            endpoint: nextChapter
                        })
                    } else {
                        setLoadingDatabase(true)
                        await updateDoc(doc(db, 'users', auth.currentUser.email), {
                            finishedChapter: arrayUnion({ title: data.endpoint, chapterEndpoint: nextChapter, date: timestamp })
                        })
                            .finally(() => {
                                setLoadingDatabase(false)
                            })
                        navigationProps.navigate('komikChapter', {
                            endpoint: nextChapter
                        })
                    }
                }}>
                    <Text fontWeight={'bold'}>Continue</Text>
                </Button>
            </VStack>
        )
    }
}

export default ReadingComponent
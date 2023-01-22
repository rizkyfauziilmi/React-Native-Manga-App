import { Button, Heading, HStack, Icon, Image, Text, VStack } from "native-base"
import { useEffect, useState } from "react"
import { Entypo, Ionicons } from '@expo/vector-icons'
import { arrayRemove, doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebaseConfig"
import { useDocument } from "react-firebase-hooks/firestore"

const FavoriteComponent = ({ endpoint, date, navigationProps, routeProps }) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [value, loadingDoc, error] = useDocument(
        doc(db, 'users', auth.currentUser ? auth.currentUser.email : 'user@example.com'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    const favorite = value?.data().favoriteManga.filter((item) => item.endpoint === endpoint)[0]

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://komikindo-api.vercel.app/komik-detail/${endpoint}`)
            const data = await response.json()
            setData(data[0])
        }

        getData()
    }, [])

    if (data && !loadingDoc) {
        return (
            <HStack width={'100%'} alignItems={'flex-start'} justifyContent={'center'} marginX={5} space={2}>
                <Image borderRadius={2} shadow={10} source={{
                    uri: data.thumb
                }} alt={data.title} style={{ resizeMode: 'contain', width: '30%' }} size={150} />
                <VStack width={'50%'}>
                    <Heading size={'sm'} textTransform={'uppercase'} >{data.title}</Heading>
                    <Text opacity={0.5}>Added at {date}</Text>
                    <VStack space={1} width={'100%'}>
                        <Button size={'sm'} leftIcon={<Icon as={Entypo} name="open-book" />} colorScheme={'yellow'} onPress={() => {
                            navigationProps.navigate('komikDetail', {
                                endpoint: data.endpoint,
                                title: data.title
                            })
                        }}>Read Now</Button>
                        <Button spinnerPlacement="start" isLoadingText="Loading" isLoading={loading} size={'sm'} leftIcon={<Icon as={Ionicons} name="heart-dislike-outline" />} colorScheme={'red'} onPress={async () => {
                            setLoading(true)
                            await updateDoc(doc(db, 'users', auth.currentUser.email), {
                                favoriteManga: arrayRemove(favorite)
                            })
                                .finally(() => {
                                    setLoading(false)
                                })
                        }}>Remove Favorite</Button>
                    </VStack>
                </VStack>
            </HStack>
        )
    }

}

export default FavoriteComponent
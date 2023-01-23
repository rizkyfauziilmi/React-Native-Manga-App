import { doc } from "firebase/firestore"
import { ScrollView, VStack, Heading } from "native-base"
import { useDocument } from "react-firebase-hooks/firestore"
import BottomBar from "../../components/BottomBar"
import FavoriteComponent from "../../components/FavoriteComponent"
import Loading from "../../components/Loading"
import { auth, db } from "../../firebase/firebaseConfig"

const Favorite = ({ navigation, route }) => {
    const [value, loading, error] = useDocument(
        doc(db, 'users', auth.currentUser.email),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )
    const favoriteManga = value?.data().favoriteManga.reverse()

    if (value) {
        return (
            <VStack height={'100%'} pt={10} justifyContent={'space-between'}>
                <Heading pb={2} textAlign={'center'}>Favorite</Heading>
                <ScrollView >
                    <VStack alignItems={'center'} width={'100%'} pt={5} space={3}>
                        {favoriteManga.map((item, index) => {
                            return (
                                <FavoriteComponent key={index} date={new Date((item.date.seconds * 1000) + (item.date.nanoseconds / 1000000)).toDateString()} endpoint={item.endpoint} navigationProps={navigation} routeProps={route} />
                            )
                        })}
                    </VStack>
                </ScrollView>
                <BottomBar navigationProps={navigation} routeProps={route} />
            </VStack>
        )
    } else {
        return (
            <Loading />
        )
    }

}

export default Favorite
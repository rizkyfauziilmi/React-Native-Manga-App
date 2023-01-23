import { Divider, Heading, ScrollView, Text, VStack } from 'native-base'
import Loading from '../../components/Loading'
import { auth, db } from '../../firebase/firebaseConfig'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import ReadingComponent from '../../components/ReadingComponent'
import BottomBar from '../../components/BottomBar'

const History = ({ navigation, route }) => {
    const [value, loading, error] = useDocument(
        doc(db, 'users', auth.currentUser.email),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    const chapterDuplicate = value?.data().finishedChapter.map((item) => item.title)
    const chapterTitle = chapterDuplicate?.filter((item, index) => chapterDuplicate.indexOf(item) === index)

    if (loading) {
        return (
            <Loading />
        )
    }

    if (value) {
        return (
            <VStack height={'100%'} justifyContent={'space-between'} safeArea>
                <Heading pb={2} textAlign={'center'}>History</Heading>
                <ScrollView>
                    <Text paddingX={10} opacity={0.5}>Reading ({chapterTitle.length})</Text>
                    <Divider mb={2} />
                    <VStack space={5} width={'100%'} mb={5}>
                        {chapterTitle.map((value, index) => {
                            return (
                                <ReadingComponent navigationProps={navigation} routeProps={route} endpoint={value} key={index} />
                            )
                        })}
                    </VStack>
                </ScrollView>
                <BottomBar navigationProps={navigation} routeProps={route} />
            </VStack>
        )
    }

}

export default History
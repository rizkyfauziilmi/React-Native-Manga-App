import { Divider, Heading, ScrollView, Text, VStack } from 'native-base'
import Loading from '../../components/Loading'
import { auth, db } from '../../firebase/firebaseConfig'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import ReadingComponent from '../../components/ReadingComponent'
import BottomBar from '../../components/BottomBar'
import CompletedHistory from '../../components/CompletedHistory'

const History = ({ navigation, route }) => {
    const [value, loading, error] = useDocument(
        doc(db, 'users', auth.currentUser.email),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    const chapterDuplicate = value?.data().finishedChapter.map((item) => item.title)
    const finishedManga = value?.data().finishedManga
    const chapterTitle = chapterDuplicate?.filter((item, index) => chapterDuplicate.indexOf(item) === index).filter((item) => !finishedManga?.map((item) => item.title).includes(item))

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
                    <Text paddingX={10} opacity={0.5}>Reading ({chapterTitle ? chapterTitle.length : "0"})</Text>
                    <Divider mb={2} />
                    <VStack space={5} width={'100%'} mb={5}>
                        {chapterTitle?.map((value, index) => {
                            return (
                                <ReadingComponent navigationProps={navigation} routeProps={route} endpoint={value} key={index} />
                            )
                        })}
                    </VStack>
                    <Text paddingX={10} opacity={0.5}>Completed ({finishedManga ? finishedManga.length : "0"})</Text>
                    <Divider mb={2} />
                    <VStack pb={5}>
                        {finishedManga?.map((item, index) => {
                            return (
                                <CompletedHistory key={index} date={new Date((item.date.seconds * 1000) + (item.date.nanoseconds / 1000000)).toDateString()} navigationProps={navigation} routeProps={route} endpoint={item.title} />
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
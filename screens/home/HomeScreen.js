import { Heading, ScrollView, VStack } from 'native-base'
import BottomBar from '../../components/BottomBar'
import TopBar from '../../components/TopBar'
import TopSectionUi from '../../components/TopSectionUi'
import TrendSection from '../../components/TrendSection'

const HomeScreen = ({ navigation, route }) => {
    return (
        <>
            <TopBar />
            <ScrollView>
                <Heading size={'sm'} paddingX={10} pt={5} textAlign={'center'} noOfLines={2}>What are the TOP-RATED comics of all time?</Heading>
                <TopSectionUi type='Manga' navigationProps={navigation} title="TOP MANGA" />
                <TopSectionUi type='Manhwa' navigationProps={navigation} title="TOP MANHWA" />
                <TopSectionUi type='Manhua' navigationProps={navigation} title="TOP MANHUA" />
                <Heading size={'sm'} paddingX={10} pt={5} textAlign={'center'} noOfLines={2}>What are the TRENDING comics of the moment?</Heading>
                <TrendSection navigationProps={navigation} />
            </ScrollView>
            <BottomBar routeProps={route} navigationProps={navigation} />
        </>
    )
}

export default HomeScreen
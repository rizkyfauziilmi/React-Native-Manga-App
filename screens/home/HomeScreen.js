import { Flex, Heading, IconButton, ScrollView, Text } from 'native-base'
import BottomBar from '../../components/BottomBar'
import TopBar from '../../components/TopBar'
import TopSectionUi from '../../components/TopSectionUi'
import TrendSection from '../../components/TrendSection'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
    return (
        <>
            <TopBar />
            <ScrollView>
                <Flex flexDir={'row'} justifyContent={'space-between'} borderColor="amber.500" borderRadius={'md'} borderLeftWidth="7" bgColor={'amber.800'} p={5} marginX={'12'} mt={10} mb={5} alignItems={'center'} >
                    <Flex flexDir={'column'} flex={6}>
                        <Heading size={'sm'}>Advance Search</Heading>
                        <Text fontSize={'xs'} opacity={0.5}>Want to search specific?</Text>
                    </Flex>
                    <IconButton colorScheme={'amber'} onPress={() => navigation.navigate('advanceSearch')} variant={'solid'} flex={1} _icon={{ as: MaterialCommunityIcons, name: "database-search" }} />
                </Flex>
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
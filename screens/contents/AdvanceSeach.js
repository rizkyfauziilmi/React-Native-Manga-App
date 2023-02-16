import { Text, Input, VStack, Button, Icon, HStack, Flex, Image, ScrollView, Heading, Badge, Skeleton, PresenceTransition, Radio, Checkbox, useColorMode, Slider } from "native-base";
import { useState } from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { getSinopsis } from "../../utils/stringModify";

const AdvanceSearch = ({ route, navigation }) => {
    const [input, setInput] = useState("")
    const [first, setFirst] = useState(true)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState("All")
    const [sort, setSort] = useState("None")
    const [groupGenres, setGroupGenres] = useState([])
    const [alphabetOrder, setAlphabetOrder] = useState("az")
    const [limit, setLimit] = useState(undefined)
    const { colorMode } = useColorMode()
    const listGenre = ["Romance", "Drama", "Action", "Adventure", "Comedy", "Demons", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Josei", "Magic", "Martial Arts", "Mecha", "Military", "Music", "Mystery", "Psychological", "Parody", "Police", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Slice of Life", "Sports", "Space", "Super Power", "Supernatural", "Thiller", "Vampire"]
    const url = input === "" && type === "All" && groupGenres.length === 0 && sort === "None" && limit === undefined ? `https://komikindo-api.vercel.app/komik-detail` : `https://komikindo-api.vercel.app/komik-detail?${input === "" ? "" : `&q=${input}`}${type === "All" ? "" : `&type=${type}`}${groupGenres.length === 0 ? "" : `&genre=${groupGenres.toString()}`}${sort === "score" ? `&sort=${sort}` : ""}${sort === "alphabet" ? `&alphabet=${alphabetOrder}` : ""}${limit !== undefined ? `&limit=${limit}` : ""}`

    const searchHandler = async () => {
        setFirst(false)
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        setIsOpen(false)
        setResults(data)
        setLoading(false)
    }

    return (
        <VStack safeArea p={10} space={2} height={'100%'}>
            <Text fontWeight={'bold'} textAlign={'center'}>{results.length !== 0 ? `Results (${results.length})` : ""}</Text>
            <Input InputLeftElement={<Icon as={<MaterialIcons name="title" />} />} _input={{ fontWeight: 'bold' }} variant={'underlined'} placeholder="Search Title here..." onChangeText={(text) => setInput(text)} />
            <HStack space={1}>
                <Button w="75%" leftIcon={<Icon as={<AntDesign name="search1" />} />} _text={{ fontWeight: 'bold' }} colorScheme={'orange'} isLoading={loading} onPress={searchHandler}>Search</Button>
                <Button w="25%" _text={{ fontWeight: 'bold' }} colorScheme={'amber'} leftIcon={<Icon as={<AntDesign name="filter" />} />} onPress={() => setIsOpen(!isOpen)}>Filter</Button>
            </HStack>
            {!loading ?
                <ScrollView>
                    {isOpen ? <PresenceTransition visible={isOpen} initial={{
                        opacity: 0,
                        scale: 0
                    }} animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 250
                        }
                    }}>
                        <VStack w="100%" my={2} bgColor={'coolGray.900'} space={2} rounded="md" p={2}>
                            <Heading size={'sm'} textAlign={'center'} w="100%">Type</Heading>
                            <Radio.Group value={type} name="genreGroup" accessibilityLabel="pick a type" onChange={(nextValue) => setType(nextValue)}>
                                <VStack bg="coolGray.900" space={2}>
                                    <Radio value="All" size={'sm'}>
                                        All
                                    </Radio>
                                    <Radio value="Manga" size={'sm'}>
                                        Manga
                                    </Radio>
                                    <Radio value="Manhwa" size={'sm'}>
                                        Manhwa
                                    </Radio>
                                    <Radio value="Manhua" size={'sm'}>
                                        Manhua
                                    </Radio>
                                    <Radio value="Top" size={'sm'}>
                                        Top
                                    </Radio>
                                </VStack>
                            </Radio.Group>
                            <Heading size={'sm'} textAlign={'center'} w="100%">Genres</Heading>
                            <Checkbox.Group onChange={setGroupGenres} value={groupGenres} accessibilityLabel="choose genres">
                                <HStack space={2} flexWrap={'wrap'} alignItems={'center'}>
                                    {listGenre.map((genre) => {
                                        return (
                                            <Checkbox colorScheme="orange" key={genre} size="sm" value={genre}>
                                                {genre}
                                            </Checkbox>
                                        )
                                    })}
                                </HStack>
                            </Checkbox.Group>
                            <Heading size={'sm'} textAlign={'center'} w="100%">Sorting</Heading>
                            <Radio.Group value={sort} name="sortGroup" accessibilityLabel="pick a sort method" onChange={(nextValue) => setSort(nextValue)}>
                                <HStack space={2} w="100%" justifyContent={'center'}>
                                    <Radio size={'sm'} value="None">
                                        None
                                    </Radio>
                                    <Radio size={'sm'} value="score">
                                        Score
                                    </Radio>
                                    <Radio size={'sm'} value="alphabet">
                                        Alphabet
                                    </Radio>
                                </HStack>
                            </Radio.Group>
                            {sort === "alphabet" ?
                                <Radio.Group value={alphabetOrder} name="alphabetGroupOrder" accessibilityLabel="Pick a Aplhabet Order" onChange={(nextValue) => setAlphabetOrder(nextValue)}>
                                    <HStack space={1} w="100%" justifyContent={'center'}>
                                        <Radio size={'sm'} value="az">
                                            A-Z
                                        </Radio>
                                        <Radio size={'sm'} value="za">
                                            Z-A
                                        </Radio>
                                    </HStack>
                                </Radio.Group>
                                : ""
                            }
                            <Heading size={'sm'} textAlign={'center'} w="100%">Limit [ {limit === undefined ? "Not Set" : limit} ]</Heading>
                            <Slider defaultValue={limit} onChange={(v) => setLimit(Math.floor(v))} step={1} minValue={1} maxValue={100}>
                                <Slider.Track>
                                    <Slider.FilledTrack />
                                </Slider.Track>
                                <Slider.Thumb />
                            </Slider>
                        </VStack>
                    </PresenceTransition> : ""}
                    <VStack space={5}>
                        {results.map((data, index) => {
                            return (
                                <VStack bgColor={'coolGray.900'} key={data._id} space={3} p={2} borderRadius="md" alignItems={'flex-start'}>
                                    <Image source={{
                                        uri: data.thumb
                                    }} alt={data.title} position={'relative'} borderRadius={'md'} size={'2xl'} resizeMode="stretch" />
                                    {
                                        data.info.filter((item) => item['Jenis Komik'])[0]['Jenis Komik'].trim() === "Manga" ? <Image top={3} right={5} position={'absolute'} source={require('../../assets/japan.png')} alt={'manga'} size={6} /> :
                                            data.info.filter((item) => item['Jenis Komik'])[0]['Jenis Komik'].trim() === "Manhwa" ? <Image top={3} right={5} position={'absolute'} source={require('../../assets/korea.png')} alt={'manhwa'} size={6} /> :
                                                data.info.filter((item) => item['Jenis Komik'])[0]['Jenis Komik'].trim() === "Manhua" ? <Image top={3} right={5} position={'absolute'} source={require('../../assets/china.png')} alt={'manhwa'} size={6} /> :
                                                    data.info.filter((item) => item['Jenis Komik'])[0]['Jenis Komik'].trim() === 'hot' ? <Image top={3} right={5} position={'absolute'} source={require('../../assets/hot.png')} alt={'manga'} size={6} /> :
                                                        <Text>{typeof data.info.filter((item) => item['Jenis Komik'])[0]['Jenis Komik'].trim()}</Text>
                                    }
                                    <Heading textAlign={'center'} size={'sm'}>{`${data.title} | ${data.info[0].Status.trim()}`}</Heading>
                                    <Text fontWeight={'bold'} opacity={0.8}>⭐ {data.score} / 10</Text>
                                    <ScrollView horizontal>
                                        <HStack space={1}>
                                            {data.genre.map((value, index) => {
                                                return (
                                                    <Badge variant={'solid'} borderRadius={'md'} colorScheme={'success'} key={index}>
                                                        {value.genre_title}
                                                    </Badge>
                                                )
                                            })}
                                        </HStack>
                                    </ScrollView>
                                    <Text opacity={0.5} w={'100%'} noOfLines={3}>{getSinopsis(data.sinopsis.trim(), data)}</Text>
                                    <Button w="100%" borderRadius={'3xl'} colorScheme="amber" size={'sm'} _text={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('komikDetail', {
                                        title: data.title,
                                        endpoint: data.endpoint
                                    })}>Read Now</Button>
                                </VStack>
                            )
                        })}
                    </VStack>
                </ScrollView>
                :
                <VStack>
                    <Skeleton borderRadius={'md'} h={260} mb={8} />
                    <Skeleton.Text lines={1} mb={5} />
                    <HStack alignItems={'center'} space={2} mb={2}>
                        <Skeleton size="5" rounded="full" />
                        <Skeleton.Text lines={1} w="25%" />
                    </HStack>
                    <HStack space={1} mb={5}>
                        <Skeleton h={25} w="19%" />
                        <Skeleton h={25} w="19%" />
                        <Skeleton h={25} w="19%" />
                        <Skeleton h={25} w="19%" />
                        <Skeleton h={25} w="19%" />
                    </HStack>
                    <Skeleton.Text lines={3} mb={2} />
                    <Skeleton mb="3" w="100%" rounded="20" />
                </VStack>
            }
            {results.length === 0 && !first && !isOpen ?
                <Flex height={'80%'} alignItems={'center'} justifyContent={'center'}>
                    <MaterialIcons name="search-off" size={50} color={colorMode === 'dark' ? 'white' : 'black'} />
                    <Heading>404 Not Found</Heading>
                    <Text fontWeight={'bold'} textAlign={'center'} opacity={0.5}>Go search something else!</Text>
                </Flex>
                : ""
            }
        </VStack>
    )
}

export default AdvanceSearch;
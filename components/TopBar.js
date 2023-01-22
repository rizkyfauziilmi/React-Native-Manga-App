import { useNavigation, useRoute } from '@react-navigation/native'
import { Heading, HStack, IconButton, ChevronLeftIcon, VStack, Input, Icon, Image, Text, ScrollView, Pressable } from 'native-base'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseConfig'
import shortenSentence from '../utils/shortenSentence'
import { Feather } from '@expo/vector-icons'

const TopBar = ({ headingTitle = "JOZU" }) => {
    const [isCanGoBack, setIsCanGoBack] = React.useState(false)
    const navigation = useNavigation()
    const route = useRoute()
    const [isLogin, setIsLogin] = useState()
    const [searchData, setSearchData] = useState([])

    const handleSearch = async (text) => {
        if (text.length <= 2) {
            setSearchData([]);
            return;
        } else {
            console.log(text)
            const response = await fetch(`https://komikindo-api.vercel.app/komik-detail?q=${text}`)
            const data = await response.json()

            setSearchData(data)
        }
    }

    useEffect(() => {

        if (navigation.canGoBack()) {
            setIsCanGoBack(true)
        } else {
            setIsCanGoBack(false)
        }

        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        })
    }, [])


    return (
        <VStack alignItems={'center'} pb={2} borderColor={'black'} borderWidth={'1px'} space={2} pt={1}>
            <HStack justifyContent={'space-between'} alignItems={"center"} safeArea>
                {isCanGoBack ? <IconButton icon={<ChevronLeftIcon />} onPress={() => navigation.goBack()} /> : ""}
                {route.name === 'home' && isLogin ? <Heading size={'sm'}>Hi, {auth.currentUser.displayName || auth.currentUser.email} 👋</Heading> : ""}
                {route.name !== 'home' ? <Heading alignSelf={'center'} size="sm" justifyContent={'space-between'}>{shortenSentence(headingTitle, 20)}</Heading> : ""}
            </HStack>
            {route.name === 'home' ? <Input leftElement={<Icon as={Feather} name="search" size={5} ml={2} />} width={'90%'} borderRadius={20} type='text' variant={'filled'} placeholder="Search..." onChangeText={(text) => {
                handleSearch(text)
            }} /> : ""}
            {searchData.length !== 0 ? <ScrollView horizontal>
                <HStack space={1} width={'100%'} justifyContent={'center'} pl={5} pr={10}>
                    {searchData.map((value) => {
                        return (
                            <Pressable key={value._id} onPress={() => {
                                navigation.navigate('komikDetail', {
                                    title: value.title,
                                    endpoint: value.endpoint
                                })
                            }}>
                                <HStack>
                                    <Image shadow={10} source={{
                                        uri: value.thumb
                                    }} alt={value.title} style={{ resizeMode: 'contain' }} size={90} />
                                    <VStack>
                                        <Heading size={'xs'}>{shortenSentence(value.title, 20)}</Heading>
                                        <Text fontSize={'xs'} opacity={0.5} fontWeight={'bold'}>⭐ {value.score} / 10</Text>
                                        <Text fontSize={'xs'} opacity={0.5} width={150} noOfLines={3}>{value.sinopsis.replace(`Manga ${value.title} yang dibuat oleh komikus bernama `, "").replace(`${value.info.filter(item => item.hasOwnProperty('Pengarang')).map(item => item.Pengarang)} ini bercerita tentang `, "")}</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        )
                    })}
                </HStack>
            </ScrollView> : ""}
        </VStack>
    )
}

export default TopBar
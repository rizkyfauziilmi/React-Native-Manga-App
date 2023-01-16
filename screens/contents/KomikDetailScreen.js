import { Badge, Heading, HStack, Image, ScrollView, Text, useColorMode, VStack, ChevronDownIcon, ChevronUpIcon, ChevronRightIcon, IconButton, ChevronLeftIcon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import Loading from '../../components/Loading'
import TopBar from '../../components/TopBar'

const KomikDetailScreen = ({ route, navigation }) => {
  const { endpoint, title } = route.params
  const [komikDetail, setKomikDetail] = useState(null)
  const { colorMode } = useColorMode()

  useEffect(() => {
    const getKomikDetail = async () => {
      const response = await fetch(`https://komikindo-api.vercel.app/komik-detail/${endpoint}`)
      const data = await response.json()

      setKomikDetail(data[0])
    }

    getKomikDetail()
  }, [])

  if (komikDetail) {
    const pengarang = komikDetail.info.filter(item => {
      return item.hasOwnProperty('Pengarang');
    })

    return (
      <>
        <TopBar headingTitle={title} />
        <ScrollView>
          <VStack justifyContent={'center'} safeArea>
            <HStack width={'50%'} pl={4}>
              <Image shadow={100} source={{
                uri: komikDetail.thumb
              }} alt="Alternate Text" size={200} rounded="md" />
              <VStack width={'100%'} pl={5}>
                <Heading size={'md'}>{komikDetail.title}</Heading>
                <Text opacity={0.5} width={'100%'}>By {pengarang[0].Pengarang.trim()}</Text>
                <HStack space={1}>
                  <Image shadow={2} source={require('../../assets/star.png')} alt="Alternate Text" size={5} />
                  <Text fontWeight={'bold'}>{komikDetail.score}</Text>
                </HStack>
              </VStack>
            </HStack>
            <VStack paddingX={4}>
              <HStack paddingY={5} justifyContent={'space-between'} alignItems={'center'}>
                <Heading size={'sm'}>Synopsis</Heading>
              </HStack>
              <Text noOfLines={0}>{komikDetail.sinopsis.trim()}</Text>
            </VStack>
            <ScrollView horizontal>
              <HStack space={3} p={5}>
                {komikDetail.genre.map((value, index) => {
                  return (
                    <Badge colorScheme={colorMode === 'dark' ? 'warning' : 'success'} borderRadius={10} key={index}>{value.genre_title}</Badge>
                  )
                })}
              </HStack>
            </ScrollView>
            <ScrollView horizontal>
              <HStack space={4} paddingX={5}>
                {komikDetail.teaser.map((value, index) => {
                  return (
                    <Image key={index} shadow={100} source={{
                      uri: value.teaser_image
                    }} alt="Alternate Text" size={200} rounded="md" />
                  )
                })}
              </HStack>
            </ScrollView>
            {/* <HStack paddingX={4} pb={2} justifyContent={'space-around'}>
              {komikDetail.relative.map((value, index) => {
                return (
                  <HStack bgColor={'yellow.100'} color={'black'} key={value.link_ref} alignItems={'center'}>
                    {index === 0 && <IconButton icon={<ChevronLeftIcon />} />}
                    <Text>{value.title_ref.replace(' End', "")}</Text>
                    {index === 1 && <IconButton icon={<ChevronRightIcon />} />}
                  </HStack>
                )
              })}
            </HStack> */}
            <HStack paddingX={4} pt={10} pb={5} justifyContent={'space-between'} alignItems={'center'}>
              <Heading size={'sm'}>Episodes - {komikDetail.chapter_list.length}</Heading>
              <IconButton variant={'solid'} icon={<ChevronDownIcon />} onPress={() => {

              }} />
            </HStack>
            <VStack paddingX={4} pb={2} space={2}>
              {komikDetail.chapter_list.map((value) => {
                return (
                  <HStack key={value.chapter_title} justifyContent={'space-between'}>
                    <HStack alignItems={'center'} space={1}>
                      <Image shadow={100} source={{
                        uri: komikDetail.thumb
                      }} alt="Alternate Text" size={50} rounded="md" />
                      <VStack>
                        <Heading color={'yellow.100'} size={'xs'}>Episode {value.chapter_title}</Heading>
                        <Text opacity={0.5}>{value.chapter_date}</Text>
                      </VStack>
                    </HStack>
                    <IconButton icon={<ChevronRightIcon />} onPress={() => {
                      navigation.navigate('komikChapter', {
                        endpoint: value.chapter_endpoint
                      })
                    }} />
                  </HStack>
                )
              })}
            </VStack>
          </VStack>
        </ScrollView>
      </>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default KomikDetailScreen
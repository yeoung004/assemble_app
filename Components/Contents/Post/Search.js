import { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AppContext } from '../../../utils/context'
import {
  Entypo,
  Ionicons,
  AntDesign
} from "@expo/vector-icons"
import { getDataFromStorage, saveDataInStorage } from '../../Common/Common'
import { CustomText } from '../../Common/Text'
import { styles } from './styles/Search_style'
import axios from "axios"
import { IP_ADDRESS } from '../../../config/key'
import { POST_SEARCH_HISTORY_KEY } from '../../AsyncKeys/userKey'

export const Search = ({ navigation, route }) => {
  const [history, setHistory] = useState([])
  const [searchTxt, setSearchTxt] = useState('')
  const { userID, lan } = useContext(AppContext)
  const { Search: lanText } = lan.current

  const showInfoModal = (text, isError = false) => {
    if (isError)
      text = lanText.info(text)
    navigation.navigate('InfoModal', { text, state: isError })
  }

  const saveHistoryInStorage = async (items) => {
    await saveDataInStorage(POST_SEARCH_HISTORY_KEY, items)
    setHistory([...items])
  }
  const getHistoryFromStorage = async () => {
    const data = await getDataFromStorage(POST_SEARCH_HISTORY_KEY)
    if (data)
      setHistory([...data])
  }
  const removeHistory = async (historyIndex) => {
    let temp = []
    history.forEach((value, index) => {
      if (index !== historyIndex)
        temp.push(value)
    })
    saveHistoryInStorage(temp)
  }
  const getSearchedPost = async (text) => {
    let body = {
      params: {
        ID: userID,
        SEARCHTXT: text
      }
    }
    try {
      const { data } = await axios.get(IP_ADDRESS + '/post/posts', body)
      let temp = { text }
      if (data.length > 0)
        temp.posts = [...data]
      else
        temp = []
      route.params.setSearchTxt(text)
      route.params.setPosts([...temp])
      navigation.goBack()
    } catch (error) {
      console.log('getSearchedPost', error)
      showInfoModal(lanText.infos.search, true)
    }
  }
  const searchHandler = async(text) => {
    saveHistoryInStorage([...new Set([...history, text])])
    await getSearchedPost(text)
  }
  useEffect(() => {
    if (route.params?.searchTxt)
      setSearchTxt(route.params.searchTxt)
  }, [route.params])

  useEffect(() => {
    getHistoryFromStorage()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          if(searchTxt.length == 0)
            route.params.setSearchTxt('')
          navigation.replace('Post')
        }}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerBox}>
          <TextInput
            style={{ width: '100%' }}
            maxLength={50}
            autoFocus
            showSoftInputOnFocus
            numberOfLines={1}
            multiline={false}
            value={searchTxt}
            onChangeText={setSearchTxt}
            onSubmitEditing={() => {
              if (searchTxt.length > 0)
                searchHandler(searchTxt)
            }}
            placeholder={lanText.search} />
          {searchTxt.length > 0 &&
            <TouchableOpacity
              style={{ position: 'absolute', right: 5 }}
              onPress={() => setSearchTxt('')}>
              <Entypo name="cross" size={30} color="black" />
            </TouchableOpacity>}
        </View>
        <Ionicons name="search" size={30} color="black" />
      </View>
      <ScrollView style={styles.searchModalBody}>
        <CustomText text={lanText.history} textStyle={{ fontSize: 20, marginBottom: 10 }} />
        {history?.length > 0 ?
          history.map((item, index) => {
            return (
              <View
                style={styles.searchModalBodyItem}
                key={index}>
                <TouchableOpacity style={styles.searchModalBodyItemFront}
                  onPress={() => {
                    setSearchTxt(item)
                    searchHandler(item)
                  }}>
                  <Ionicons style={{ marginRight: 15 }} name="search" size={30} color="lightgray" />
                  <Text
                    ellipsizeMode="tail"
                    maxFontSizeMultiplier={1}
                    numberOfLines={1}
                    style={{ fontFamily: 'Lato', fontSize: 20, flex: 1 }}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeHistory(index)}>
                  <Entypo name="cross" size={30} color="lightgray" />
                </TouchableOpacity>
              </View>
            )
          })
          : <CustomText text={lanText.empty} textStyle={{ paddingHorizontal: 15, fontSize: 20 }} />
        }
      </ScrollView>
    </View>
  )
}
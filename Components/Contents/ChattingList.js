import { useContext, useEffect, useRef, useState } from "react"
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions
} from "react-native"
import { styles } from "./styles/ChattingList_style"
import moment from 'moment'
import {
  deleteChattingUser,
  getUsersInfoFromDB,
  saveNonDisturbList
} from '../../utils/chatting'
import { Navigate } from "../Common/Navigate"
import { Ionicons } from '@expo/vector-icons'
import { AppContext } from "../../utils/context"
import { ProfileImage } from "../Common/ProfileImage"
import { CustomText } from "../Common/Text"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import { IP_ADDRESS } from "../../config/key"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/project'

export const ChattingList = ({ navigation, route }) => {
  const {
    nonDisturbList,
    chatInfoList: infoList,
    lan,
    userID
  } = useContext(AppContext)
  const [groupIndex, setGroupIndex] = useState(0)
  const [disturbList, setDisturbList] = useState(nonDisturbList.current)
  const [chatUsers, setChatUsers] = useState({})
  const [chatInfoList, setChatInfoList] = useState({})
  const [groupChatList, setGroupChatList] = useState([])
  const groupScroll = useRef()
  const { ChattingList: lanText } = lan.current

  const removeChatting = async (partnerID) => {
    const list = await deleteChattingUser(partnerID, chatInfoList)
    if (list) {
      infoList.current = { ...list }
      setChatInfoList({ ...list })
    } else {
      infoList.current = null
      setChatInfoList(null)
    }
  }
  const getGroupChatList = async () => {
    const { data } = await axios.post(baseURL, {
      query: `
        query { 
          projects(USERID:"${userID}") {
            PROJECT_NAME
            PROFILE
            ID
          }
      }`
    })
    if (data.data?.projects)
      setGroupChatList(data.data.projects)
  }
  const init = async ({ chatOrder }) => {
    const data = await getUsersInfoFromDB(chatOrder)
    if (data) setChatUsers(data)
  }

  useEffect(() => {
    if (Object.keys(chatInfoList).length)
      init(chatInfoList)
  }, [chatInfoList])

  useEffect(() => {
    getGroupChatList()
    navigation.setParams({ setChatInfoList, chatInfoList })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity
          onPress={() => {
            groupScroll.current.scrollTo({ x: 0 })
            setGroupIndex(0)
          }}
          style={[styles.topButton, {
            backgroundColor: groupIndex == 0 ? 'white' : '#EFF4F5'
          }]}>
          <Text style={[styles.topButtonTxt, {
            color: groupIndex == 0 ? 'black' : 'white'
          }]}>Single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            groupScroll.current.scrollTo({ x: SCREEN_WIDTH })
            setGroupIndex(1)
          }}
          style={[styles.topButton, {
            backgroundColor: groupIndex == 1 ? 'white' : '#EFF4F5'
          }]}>
          <Text style={[styles.topButtonTxt, {
            color: groupIndex == 1 ? 'black' : 'white'
          }]}>Group</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={groupScroll}
        style={styles.group}
        scrollEnabled={false}
        overScrollMode='never'
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        pagingEnabled
        horizontal>
        <ScrollView
          style={styles.group}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}>
          {Object.keys(chatInfoList).length > 0 ?
            <SafeAreaView style={styles.chatList}>
              {Object.keys(chatUsers).length > 0 &&
                Object.keys(chatInfoList.chatList).map((chatItem, index) => {
                  const partnerID = chatInfoList.chatOrder[index]
                  const USER_NAME = chatUsers?.[partnerID].USER_NAME ?? lanText.unknown
                  const { 
                    lastMessage, 
                    dateList, 
                    messageCnt 
                  } = chatInfoList.chatList[partnerID]
                  const lastDate = dateList[0]

                  return (
                    <View style={styles.chatItem} key={chatItem}>
                      <TouchableOpacity
                        onPress={() => {
                          if(chatUsers?.[partnerID])
                            navigation.navigate('Profile', { profileUser: partnerID })
                        }}
                        style={styles.profile__container}>
                        <ProfileImage
                          source={chatUsers?.[partnerID]?.PROFILE_URL}
                          styles={styles.profile} />
                      </TouchableOpacity>
                      {messageCnt ?
                        <View style={styles.msgCnt}>
                          <CustomText text={messageCnt} textStyle={styles.cnt} />
                        </View> : false
                      }
                      <TouchableOpacity
                        style={styles.detail__container}
                        delayLongPress={500}
                        onLongPress={() => {
                          navigation.navigate('MoreModal', {
                            functions: [() => navigation.push('ConfirmModal', {
                              comment: lanText.longPress.notification,
                              METHOD: () => {
                                removeChatting(partnerID)
                                navigation.pop()
                              },
                            }),
                            async () => {
                              const list = await saveNonDisturbList(partnerID, disturbList?.[partnerID] ? false : true)
                              setDisturbList(list)
                              nonDisturbList.current = { ...list }
                              navigation.goBack()
                            }],
                            items: [
                              lanText.longPress.item[0],
                              lanText.longPress.item[1](disturbList?.[partnerID])
                            ]
                          })
                        }}
                        onPress={() => navigation.navigate('Chatting', {
                          chatUserID: partnerID,
                          chatUserName: USER_NAME,
                        })}>
                        <View>
                          <CustomText numberOfLines={1} text={USER_NAME} textStyle={styles.name} />
                          <CustomText numberOfLines={1} text={lastMessage} textStyle={styles.lastMsg} />
                        </View>
                        <View style={styles.else}>
                          <CustomText text={moment.utc(lastDate).local().format('YY.MM.DD')} textStyle={{ color: 'gray' }} />
                          <View style={{ flexDirection: 'row' }}>
                            {(disturbList?.[partnerID]) &&
                              <Ionicons name="notifications-off" size={20} color="gray" />}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })}
            </SafeAreaView> :
            <SafeAreaView style={styles.emptyContainer}>
              <Image
                resizeMode="contain"
                style={styles.emptyImg}
                source={require('../../assets/tutorial/tutorial3.png')} />
              <Text style={styles.emptyTxt}>{lanText.empty}</Text>
            </SafeAreaView>}
        </ScrollView>

        <ScrollView
          style={styles.group}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}>
          {groupChatList.length > 0 ?
            groupChatList.map((item, index) => {
              const profile = item.PROFILE ? { uri: item.PROFILE } : require('../../assets/pictures/logo2.png')
              const lastMessage = chatInfoList?.groupChatList?.[item.ID]?.lastMessage ?? lanText.emptyMSG
              const messageCnt = chatInfoList?.groupChatList?.[item.ID]?.messageCnt ?? 0
              const date = moment.utc(chatInfoList?.groupChatList?.[item.ID]?.time ?? moment.utc().format()).local().format('YY.MM.DD')

              return (
                <SafeAreaView
                  key={'index' + index}
                  style={styles.chatItem}>
                  <View style={styles.profile__container}>
                    <Image source={profile} style={styles.profile} />
                  </View>
                  {messageCnt > 0 &&
                    <View style={styles.msgCnt}>
                      <CustomText text={messageCnt} textStyle={styles.cnt} />
                    </View>}
                  <TouchableOpacity
                    style={styles.detail__container}
                    delayLongPress={500}
                    onLongPress={() => {
                      navigation.navigate('MoreModal', {
                        functions: [async () => {
                          const list = await saveNonDisturbList(item.ID, disturbList?.[item.ID] ? false : true)
                          setDisturbList(list)
                          nonDisturbList.current = { ...list }
                          navigation.goBack()
                        }],
                        items: [lanText.longPress.item[1](disturbList?.[item.ID])]
                      })
                    }}
                    onPress={() => navigation.navigate('GroupChatting', { PROJECTID: item.ID })}>
                    <View>
                      <CustomText numberOfLines={1} text={item.PROJECT_NAME} textStyle={styles.name} />
                      <CustomText numberOfLines={1} text={lastMessage} textStyle={styles.lastMsg} />
                    </View>
                    <View style={styles.else}>
                      <CustomText text={date} textStyle={{ color: 'gray' }} />
                      <View style={{ flexDirection: 'row' }}>
                        {(disturbList?.[item.ID]) &&
                          <Ionicons name="notifications-off" size={20} color="gray" />}
                      </View>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
              )
            })
            :
            <SafeAreaView style={styles.emptyContainer}>
              <Image
                resizeMode="contain"
                style={styles.emptyImg}
                source={require('../../assets/tutorial/tutorial3.png')} />
              <Text style={styles.emptyTxt}>{lanText.empty}</Text>
            </SafeAreaView>}

        </ScrollView>

      </ScrollView>
      <Navigate nowScreen={'ChattingList'} navigation={navigation} />
    </View>
  )
}
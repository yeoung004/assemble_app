import { useEffect, useState, useContext, useRef } from "react"
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import {
  AntDesign,
  Entypo
} from '@expo/vector-icons'
import { styles } from "./styles/Chatting_style"
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import * as Chat from '../../utils/chatting'
import moment from 'moment'
import { AppContext } from "../../utils/context"
import * as Clipboard from 'expo-clipboard'
import { getDataFromStorage, getProfileBaseUrl } from "../Common/Common"
import { CustomText } from "../Common/Text"
import axios from "axios"
import { IP_ADDRESS } from "../../config/key"
const PROFILE_IMAGE_BASE_URL = getProfileBaseUrl()

export const Chatting = ({ route, navigation }) => {
  const {
    userInfos,
    userID,
    fireDatabase,
    chatInfoList,
    lan
  } = useContext(AppContext)
  const [errorMessages, setErrorMessages] = useState([])
  const [chatUserProfile, setChatUserProfile] = useState(null)
  const [fireBaseMessages, setfireBaseMessages] = useState(null)
  const [messages, setMessages] = useState([])
  const selectedErrorMessageIndex = useRef(null)
  const messageDates = useRef([])
  const user_infos = userInfos.current
  const chatUserID = route.params.chatUserID
  const chatUserName = route.params.chatUserName
  const { Chatting: lanText } = lan.current
  const showInfo = () => {
    navigation.navigate('InfoModal', {
      text: lanText.info,
      state: true
    })
  }
  const removeErrorMessage = async () => {
    const data = await Chat.deleteErrorMSG(chatUserID, selectedErrorMessageIndex.current)
    setErrorMessages(data)
  }
  const resendErrorMessage = () => {
    const message = [{
      _id: GiftedChat.defaultProps.messageIdGenerator(user_infos.USER_NAME),
      createdAt: moment.format(),
      text: errorMessages[selectedErrorMessageIndex.current],
      user: {
        _id: user_infos.ID,
        name: user_infos.USER_NAME,
        avatar: PROFILE_IMAGE_BASE_URL + user_infos.PROFILE_URL
      }
    }]
    onSend(message, true)
  }
  const renderFooter = () => {
    return (
      <View style={styles.errorMessageContainer}>
        {(errorMessages ? true : false) &&
          errorMessages.map((message, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MoreModal', {
                    functions: [
                      () => removeErrorMessage(),
                      () => resendErrorMessage()
                    ],
                    items: [...lanText.more]
                  })
                  selectedErrorMessageIndex.current = index
                }}
                key={index}
                style={styles.errorMessage}>
                <Entypo name="warning" size={24} color="white" />
                <CustomText text={message} textStyle={styles.errorMessageTxt} />
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }
  const renderBubble = (props) => {
    return (<Bubble {...props} wrapperStyle={{ left: styles.bubbleLeft, right: styles.bubbleRight }} />)
  }
  const onSend = async (messages = [], isResent) => {
    messages[0].createdAt = moment.utc().format()
    const newList = await Chat.sendMessageToFirebase(fireDatabase, chatUserID, userID, messages[0].text, user_infos.USER_NAME)
    if (newList) {
      chatInfoList.current = { ...newList }
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
      if (isResent) {
        const data = await Chat.deleteErrorMSG(chatUserID, selectedErrorMessageIndex.current)
        setErrorMessages(data)
      }
    } else {
      if (!isResent) {
        setErrorMessages([...errorMessages, messages[0].text])
        Chat.saveErrorMSG(chatUserID, messages[0].text)
      }
      showInfo()
    }
  }
  const onLoadEarlier = async () => {
    if (messageDates.current.length) {
      const msgs = await addMessage(chatUserProfile)
      setMessages([...messages, ...msgs])
    }
  }
  const onLongPress = (context, currentMessage) => {
    const options = [...lanText.longPress]
    const cancelButtonIndex = options.length - 1
    context.actionSheet().showActionSheetWithOptions({ options, cancelButtonIndex },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(currentMessage.text)
            break
        }
      })
  }

  const addMessage = async (chat_profile) => {
    let messageTemp = []
    let dates = [...messageDates.current]
    let date = dates[0]
    dates = dates.slice(1)
    const oldMessages = await getDataFromStorage(`@chatting_${chatUserID}_${date}`)

    oldMessages.forEach((message) => {
      const name = message.id == user_infos.ID ? user_infos.USER_NAME : chatUserName
      const avatar = message.id == user_infos.ID ? user_infos.PROFILE_URL : chat_profile

      messageTemp.push({
        _id: GiftedChat.defaultProps.messageIdGenerator(name),
        text: message.message,
        createdAt: moment.utc(message.date).local().format(),
        user: {
          _id: message.id,
          name,
          avatar: PROFILE_IMAGE_BASE_URL + avatar,
        }
      })
    })
    messageDates.current = [...dates]
    return messageTemp
  }

  const getChattingUserInfo = async () => {
    try {
      const { data } = await axios.get(IP_ADDRESS + '/users/profile/' + chatUserID)
      setChatUserProfile(data[0]?.PROFILE_URL)
      return data[0]?.PROFILE_URL
    } catch (error) {
      showInfo()
      console.log('getChattingUserInfo', error)
    }
  }

  const init = async () => {
    const chat_profile = await getChattingUserInfo()
    if (chatInfoList.current?.chatList?.[chatUserID]) {
      const { dateList } = chatInfoList.current.chatList[chatUserID]
      const errorList = await Chat.getErrorMessages(chatUserID)
      if (errorList) setErrorMessages(errorList)
      messageDates.current = [...dateList]
      let msgs = []
      while (messageDates.current.length && msgs.length < 10) {
        msgs = [...msgs, ...await addMessage(chat_profile)]
      }
      setMessages([...msgs])
    }
  }

  const messageUpdate = ({ message }) => {
    const avatar = PROFILE_IMAGE_BASE_URL + chatUserProfile
    setMessages([{
      _id: GiftedChat.defaultProps.messageIdGenerator(chatUserName),
      text: message.message,
      createdAt: moment.utc(message.date).local().format(),
      user: {
        _id: chatUserID,
        name: chatUserName,
        avatar,
      }
    }, ...messages])
  }

  useEffect(() => {
    if (chatUserProfile && fireBaseMessages?.[chatUserID])
      fireBaseMessages[chatUserID].forEach(data => messageUpdate(data))
  }, [fireBaseMessages])

  useEffect(() => {
    init()
    navigation.setParams({ setfireBaseMessages })
  }, [])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack({ prescreen: 'Chatting' })}>
          <AntDesign name="swapleft" size={40} color="white" />
        </TouchableOpacity>
        <CustomText text={chatUserName} textStyle={styles.userName} />
      </View>
      <GiftedChat
        renderFooter={renderFooter}
        renderLoadEarlier={() => { }}
        infiniteScroll
        alignTop
        onPressAvatar={() => {
          if (chatUserProfile)
            navigation.push('Profile', { profileUser: chatUserID })
        }}
        renderBubble={renderBubble}
        showUserAvatar
        loadEarlier
        onLongPress={onLongPress}
        messagesContainerStyle={styles.content}
        onLoadEarlier={onLoadEarlier}
        messages={messages}
        onSend={(data) => {
          if (chatUserProfile)
            onSend(data, false)
        }}
        scrollToBottom
        user={{
          _id: user_infos.ID,
          name: user_infos.USER_NAME,
          avatar: PROFILE_IMAGE_BASE_URL + user_infos.PROFILE_URL
        }} />
    </View >
  )
}
import {
  useEffect,
  useState,
  useContext,
  useRef
} from "react"
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
import { styles } from "./styles/GroupChatting_style"
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import * as Chat from '../../utils/groupChatting'
import moment from 'moment'
import { AppContext } from "../../utils/context"
import * as Clipboard from 'expo-clipboard'
import { getDataFromStorage, getProfileBaseUrl } from "../Common/Common"
import { CustomText } from "../Common/Text"
import axios from "axios"
import { IP_ADDRESS } from "../../config/key"
const PROFILE_IMAGE_BASE_URL = getProfileBaseUrl()

export const GroupChatting = ({ route, navigation }) => {
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
  const [projectName, setProjectName] = useState('')
  const selectedErrorMessageIndex = useRef(null)
  const messageDates = useRef([])
  const user_infos = userInfos.current
  const projectID = route.params.PROJECTID
  const { Chatting: lanText } = lan.current
  const showInfo = () => navigation.navigate('InfoModal', {
    text: lanText.info,
    state: true
  })
  const removeErrorMessage = async () => {
    const data = await Chat.deleteErrorMSG(projectID, selectedErrorMessageIndex.current)
    setErrorMessages(data)
  }
  const resendErrorMessage = () => {
    const message = [{
      _id: GiftedChat.defaultProps.messageIdGenerator(user_infos.USER_NAME),
      createdAt: moment().format(),
      text: errorMessages[selectedErrorMessageIndex.current],
      user: {
        _id: user_infos.ID,
        name: user_infos.USER_NAME,
        avatar: PROFILE_IMAGE_BASE_URL + user_infos.PROFILE_URL
      }
    }]
    onSend(message, true)
  }
  const renderFooter = () => (
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

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: styles.bubbleLeft,
        right: styles.bubbleRight
      }} />
  )

  const onSend = async (messages = [], isResent) => {
    messages[0].createdAt = moment().format()
    const newList = await Chat.sendMessageToFirebase(
      fireDatabase,
      projectID,
      userID,
      messages[0].text,
      projectName,
      chatUserProfile
    )
    if (newList) {
      chatInfoList.current = { ...newList }
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
      if (isResent) {
        const data = await Chat.deleteErrorMSG(projectID, selectedErrorMessageIndex.current)
        setErrorMessages(data)
      }
    } else {
      if (!isResent) {
        setErrorMessages([...errorMessages, messages[0].text])
        Chat.saveErrorMSG(projectID, messages[0].text)
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
    const oldMessages = await getDataFromStorage(`@chatting_${projectID}_${date}`)

    oldMessages.forEach((message) => {
      const name = chat_profile[message.id].USER_NAME ?? lanText.unknown
      const avatar = chat_profile[message.id].PROFILE_URL ?? ''

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
      const { data } = await axios.post(IP_ADDRESS + '/project', {
        query: `
          query{
            project(ID:${projectID}) {
              PROJECT_NAME
              MEMBERS {
                MEMBERID
                PROFILE_URL
                USER_NAME
              }
            }
          }`
      })
      setProjectName(data.data.project.PROJECT_NAME)
      let temp = {}
      data.data.project.MEMBERS.forEach((member) => {
        temp[member.MEMBERID] = {
          PROFILE_URL: member.PROFILE_URL,
          USER_NAME: member.USER_NAME
        }
      })
      setChatUserProfile({ ...temp })
      return temp
    } catch (error) {
      showInfo()
      console.log('getChattingUserInfo', error)
    }
  }

  const init = async () => {
    const chat_profile = await getChattingUserInfo()
    if (chatInfoList.current?.groupChatList?.[projectID]) {
      const { dateList } = chatInfoList.current.groupChatList[projectID]
      const errorList = await Chat.getErrorMessages(projectID)
      if (errorList) setErrorMessages(errorList)
      messageDates.current = [...dateList]
      let msgs = []
      while (messageDates.current.length && msgs.length < 10) {
        msgs = [...msgs, ...await addMessage(chat_profile)]
      }
      setMessages([...msgs])
    }
  }

  const messageUpdate = ({ message, sender }) => {
    const avatar = PROFILE_IMAGE_BASE_URL + chatUserProfile[sender].PROFILE_URL
    setMessages([{
      _id: GiftedChat.defaultProps.messageIdGenerator(chatUserProfile[sender].USER_NAME),
      text: message.message,
      createdAt: moment.utc(message.date).local().format(),
      user: {
        _id: sender,
        name: chatUserProfile[sender].USER_NAME,
        avatar,
      }
    }, ...messages])
  }

  useEffect(() => {
    if (chatUserProfile && fireBaseMessages) {
      Object.keys(fireBaseMessages).map((data) => {
        let temp = data.split('///')
        if (temp.length > 1 && temp?.[1] == projectID)
          fireBaseMessages[data].forEach((msg) => {
            console.log('msg', msg)
            messageUpdate(msg)
          })
      })
    }
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
        <CustomText text={projectName} textStyle={styles.userName} />
      </View>
      <GiftedChat
        renderFooter={renderFooter}
        renderLoadEarlier={() => { }}
        infiniteScroll
        alignTop
        onPressAvatar={({ _id }) => {
          if(chat_profile?.[_id])
            navigation.push('Profile', { profileUser: _id })
        }}
        renderBubble={renderBubble}
        showUserAvatar
        loadEarlier
        onLongPress={onLongPress}
        messagesContainerStyle={styles.content}
        onLoadEarlier={onLoadEarlier}
        messages={messages}
        onSend={(data) => onSend(data, false)}
        scrollToBottom
        user={{
          _id: user_infos.ID,
          name: user_infos.USER_NAME,
          avatar: PROFILE_IMAGE_BASE_URL + user_infos.PROFILE_URL
        }} />
    </View >
  )
}
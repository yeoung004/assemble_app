import { IP_ADDRESS } from '../config/key'
import moment from 'moment'
import axios from 'axios'
import chatKey from '../Components/AsyncKeys/ChattingKey'
import { ref, set } from 'firebase/database'
import {
  getDataFromStorage,
  removeDataFromStorage,
  saveDataInStorage,
  removeDatasFromStorage
} from '../Components/Common/Common'
const today = moment.utc().format('YYYYMMDD')

// Handlers
export const reciveHandler = async (user, messages, chatUserID) => {
  let format = []
  const CHATTING_KEY = `@chatting_${user}_${today}`

  Object.keys(messages).map((index) => {
    const payload = messages[index]
    format.push({
      id: user,
      message: payload.message.message,
      date: payload.message.time
    })
  })
  try {
    const list = await saveChattingListInStorage(user, format[0].message, format[0].date, format.length, chatUserID == user)
    const data = await getDataFromStorage(CHATTING_KEY)
    if (data) format.push(...data)
    await saveDataInStorage(CHATTING_KEY, format)
    return list
  } catch (error) {
    console.error('no data', error)
  }
}


export const sendHandler = async (sender, { message }, reciverID) => {
  const CHATTING_KEY = `@chatting_${reciverID}_${today}`
  let format = [{
    id: sender,
    message: message.message,
    date: message.time
  }]
  try {
    const data = await getDataFromStorage(CHATTING_KEY)
    if (data)
      format = [...format, ...data]
    await saveDataInStorage(CHATTING_KEY, format)
    return await saveChattingListInStorage(reciverID, message.message, message.time, 0)
  } catch (error) {
    console.error('no data', error)
  }
}

export const sendMessageToFirebase = async (fireDatabase, reciverID, senderID, message, senderName) => {
  const time = moment.utc().format('YYYY-MM-DD HH:mm:ss.') + moment.utc().millisecond()
  let payload = {
    channel: reciverID,
    method: 'MESSAGE',
    message: { message, time, senderName },
    sender: senderID
  }
  try {
    await set(ref(fireDatabase, `request/${reciverID}/${senderID}/${Date.now()}`), payload)
    console.log('we sent a message')
    return await sendHandler(senderID, payload, reciverID)
  } catch (err) {
    saveErrorMSG(reciverID, message)
    console.log("We couldn't send a message", err)
    return null
  }
}

// Functions for message
export const saveDisturbState = async (state) => {
  await saveDataInStorage(chatKey.DISTURB_KEY, { state })
}

export const saveNonDisturbList = async (chatUserID, state) => {
  let list = {}
  if (state) {
    list = {
      [chatUserID]: state
    }
  }
  const users = await getDataFromStorage(chatKey.DISTURB_LIST_KEY)
  if (users) {
    if (users?.[chatUserID])
      delete users[chatUserID]
    list = {
      ...list,
      ...users
    }
  }
  await saveDataInStorage(chatKey.DISTURB_LIST_KEY, list)
  return list
}

export const saveBlockList = async (chatUserID, state) => {
  let list = {}
  if (state) {
    list = {
      [chatUserID]: state
    }
  }
  const users = await getDataFromStorage(chatKey.BLOCK_LIST_KEY)
  if (users) {
    if (users?.[chatUserID])
      delete users[chatUserID]
    list = {
      ...list,
      ...users
    }
  }
  await saveDataInStorage(chatKey.BLOCK_LIST_KEY, list)
  return list
}

export const saveErrorMSG = async (channel, message) => {
  let temp = []
  const data = await getDataFromStorage(chatKey.CHATTING_ERROR_LIST_KEY + channel)

  if (data)
    temp = [...data]
  temp.push(message)
  await saveDataInStorage(chatKey.CHATTING_ERROR_LIST_KEY + channel, temp)
}

const saveChattingListInStorage = async (user, lastMessage, time, messageCnt, isUserInChattingRoom) => {
  let data = {}
  let chatOrderList = [user]
  let userDateList = [today]
  let groupChatList = {}
  let cnt = isUserInChattingRoom ? 0 : messageCnt

  const chat = await getDataFromStorage(chatKey.CHATTING_LIST_KEY)
  if (chat) {
    data = { ...chat }
    if (data.chatList?.[user]) {
      const lastDate = data.chatList[user].dateList[0]

      if (lastDate != today)
        userDateList.push(...data.chatList[user].dateList)
      else
        userDateList = [...data.chatList[user].dateList]
      chatOrderList.push(...data.chatOrder)
      chatOrderList = [...new Set(chatOrderList)]
      cnt += data.chatList[user].messageCnt
    }
  }
  if(data?.groupChatList)
    groupChatList = {...data.groupChatList}

  data = {
    chatOrder: chatOrderList,
    groupChatList,
    chatList: {
      ...data.chatList,
      [user]: {
        lastMessage,
        time,
        dateList: userDateList,
        messageCnt: cnt
      }
    }
  }
  await saveDataInStorage(chatKey.CHATTING_LIST_KEY, data)
  return data
}

export const getErrorMessages = async (userID) => {
  return await getDataFromStorage(chatKey.CHATTING_ERROR_LIST_KEY + userID)
}

export const getNonDisturbList = async () => {
  return await getDataFromStorage(chatKey.DISTURB_LIST_KEY)
}

export const getBlockList = async (user_id) => {
  try {
    const { data } = await axios.get(IP_ADDRESS + '/users/coworker/block/' + user_id)
    if (data?.length > 0) {
      let temp = {}
      data.forEach(user => {
        temp[user.COWORKERID] = true
      })
      return temp
    } else
      return {}
  } catch (error) {
    console.log('getNonDisturbList', error);
    return {}
  }
}

export const getDisturbState = async () => {
  const data = await getDataFromStorage(chatKey.DISTURB_KEY)
  return data?.state
}

export const getChatListInfo = async () => {
  return await getDataFromStorage(chatKey.CHATTING_LIST_KEY)
}

export const getUsersInfoFromDB = async (userIDs) => {
  try {
    let temp = {}
    const { data } = await axios.get(`${IP_ADDRESS}/users/chat`, { params: userIDs })
    data.forEach((user, index) => {
      temp[userIDs[index]] = user
    })
    return temp
  } catch (error) {
    console.log("We can't get chat user info", error)
    return null
  }

}

export const deleteChattingUser = async (delUserID, chattingList) => {
  let removeChatKeys = []
  let chatOrder = []

  chattingList.chatList[delUserID].dateList.forEach(date => {
    removeChatKeys.push(`@chatting_${delUserID}_${date}`)
  })

  if (chattingList.chatOrder.length == 1) {
    chattingList = null
    await removeDataFromStorage(chatKey.CHATTING_LIST_KEY)
  } else {
    chattingList.chatOrder.forEach(user => {
      if (user !== delUserID)
        chatOrder.push(user)
    })
    chattingList.chatOrder = [...chatOrder]
    delete chattingList.chatList[delUserID]
    await saveDataInStorage(chatKey.CHATTING_LIST_KEY, chattingList)
  }
  await removeDatasFromStorage(removeChatKeys)
  return chattingList
}

export const resetMessageCnt = async (chatUserID) => {
  const data = await getDataFromStorage(chatKey.CHATTING_LIST_KEY)
  if (data?.chatList?.[chatUserID]) {
    data.chatList[chatUserID].messageCnt = 0
    await saveDataInStorage(chatKey.CHATTING_LIST_KEY, data)
    return data
  }
}

export const deleteErrorMSG = async (channel, delIndex) => {
  let data = await getDataFromStorage(chatKey.CHATTING_ERROR_LIST_KEY + channel)
  let temp = []

  data.forEach((message, index) => {
    if (delIndex !== index)
      temp.push(message)
  })

  await saveDataInStorage(chatKey.CHATTING_ERROR_LIST_KEY + channel, temp)
  return temp
}
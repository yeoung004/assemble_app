import AsyncStorage from '@react-native-async-storage/async-storage'
import { ref, set } from 'firebase/database'
import moment from 'moment'
const BASE_URL = 'https://assemble-image.s3.ap-northeast-2.amazonaws.com/'

export const getProfileBaseUrl = () => {
  return BASE_URL + 'profileImage/'
}
export const getImageBasedUrl = () => {
  return BASE_URL + 'postContents/'
}

export const saveDataInStorage = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data))
}

export const getDataFromStorage = async (key) => {
  try {
    return JSON.parse(await AsyncStorage.getItem(key))
  } catch (error) {
    console.log(key, "There is no data", error)
    return null
  }
}

export const removeDataFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log('There is no key', error)
  }
}

export const removeDatasFromStorage = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys)
  } catch (error) {
    console.log('There is no key', error)
  }
}

export const sendRequest = async(fireDatabase, reciverID, senderID, senderName) => {
  const payload = {
    method: 'REQUEST',
    senderName
  }
  await set(ref(fireDatabase, `request/${reciverID}/${senderID}/${moment.utc().format()}`), payload)
}

export const sendInvite = async(fireDatabase, reciverID, senderID, senderName) => {
  const payload = {
    method: 'INVITE',
    senderName
  }
  await set(ref(fireDatabase, `request/${reciverID}/${senderID}/${moment.utc().format()}`), payload)
}

export const getSayHello = () => {
  const time = moment().hour()
  let text = ''
  if(time >= 6 && time <= 11)
    text = 'Good morning'
  else if(time >= 12 && time <= 16)
      text = 'Good afternoon'
  else if(time >= 17 && time <= 20)
    text = 'Good evening'
  else
    text = 'Good night'
  return text
}
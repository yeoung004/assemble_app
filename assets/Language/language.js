import en from "./en"
import kr from "./kr"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LANGUAGE_KEY } from '../../Components/AsyncKeys/userKey'

export const getSelectedLanguage = async () => {
  try {
    const data = await AsyncStorage.getItem(LANGUAGE_KEY)
    const { lan } = JSON.parse(data)
    return lan
  } catch (error) {
    return 'en'
  }
}

export const setLanguage = (lan) => {
  if (lan == 'kr')
    return kr
  else
    return en
}

export const getLanguage = async () => {
  return setLanguage(await getSelectedLanguage())
}
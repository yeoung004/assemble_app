import { useContext, useEffect, useState } from 'react'
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import ToggleSwitch from 'toggle-switch-react-native'
import { Auth } from 'aws-amplify'
import {
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Linking,
  Text,
  Alert,
} from 'react-native'
import { LANGUAGE_KEY, TUTORIAL_KEY } from '../../AsyncKeys/userKey'
import { AppContext } from '../../../utils/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CustomText } from '../../Common/Text'
import { styles } from './styles/Setting_style'
import Modal from 'react-native-modal'
import { saveDisturbState } from '../../../utils/chatting'
import { getSelectedLanguage, setLanguage } from '../../../assets/Language/language'
import axios from 'axios'
import { IP_ADDRESS } from '../../../config/key'

export const Setting = ({ navigation, route }) => {
  const {
    userInfos,
    userID,
    setUserID,
    isNonDisturbMode,
    nonDisturbList,
    blockList,
    chatInfoList,
    lan
  } = useContext(AppContext)
  const [isOn, setIsOn] = useState(isNonDisturbMode.current)
  const [isAllowedEmail, setIsAllowedEmail] = useState(userInfos.current.ALLOW_EMAIL ? true : false)
  const [isAllowedChat, setIsAllowedChat] = useState(userInfos.current.ALLOW_CHAT ? true : false)
  const [selectedLan, setSelectedLan] = useState()
  const [lanModalVisible, setLanModalVisible] = useState(false)
  const { Setting: lanText } = lan.current

  const initStorage = async() => {
    const keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
    await AsyncStorage.setItem(TUTORIAL_KEY, JSON.stringify({ isTutorialPassed: true }))
    await AsyncStorage.setItem(LANGUAGE_KEY, JSON.stringify({ lan: selectedLan }))
    chatInfoList.current = null
    nonDisturbList.current = null
    blockList.current = null
    setUserID(null)
    navigation.replace("SignIn")
    BackHandler.exitApp()
  }
  const signOut = async () => {
    await Auth.signOut() 
    await initStorage()
  }

  const removeAccount = async() => {
    await Auth.deleteUser()
    await axios.delete(IP_ADDRESS + '/users/user', { data: { USERID: userID } })
    await initStorage()
  }
  const init = async () => setSelectedLan(await getSelectedLanguage())
  const handler = async (language) => {
    await AsyncStorage.setItem(LANGUAGE_KEY, JSON.stringify({ lan: language }))
    lan.current = setLanguage(language)
    setSelectedLan(language)
    setLanModalVisible(false)
  }

  const updateAllowed = async (type, allow) => {
    if (type === "email") {
      await axios.patch(IP_ADDRESS + '/users/user/setting/allowing/email', {
        ALLOW_EMAIL: allow,
        USERID: userID
      })
    } else if (type === "chat") {
      await axios.patch(IP_ADDRESS + '/users/user/setting/allowing/chat', {
        ALLOW_CHAT: allow,
        USERID: userID
      })
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <View style={styles.container}>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={-1}
        animationOutTiming={-1}
        onBackButtonPress={() => setLanModalVisible(false)}
        isVisible={lanModalVisible}>
        <View style={styles.lanModalContainer}>
          <TouchableOpacity style={styles.lanContainer} onPress={() => handler('kr')}>
            {selectedLan === 'kr' && <AntDesign name="check" size={24} color="black" />}
            <Text style={styles.lan}> 한국어</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lanContainer} onPress={() => handler('en')}>
            {selectedLan === 'en' && <AntDesign name="check" size={24} color="black" />}
            <Text style={styles.lan}> English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lanContainer} onPress={() => setLanModalVisible(false)}>
            <Text style={[styles.lan, { color: '#2f73b0' }]}>{lanText.cancel}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={() => setLanModalVisible(true)}
            style={styles.botton}>
            <Text style={styles.buttonTxt}>{lanText.language}</Text>
            <Ionicons name="language" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.botton}>
            <CustomText text={lanText.allowEmail} textStyle={styles.buttonTxt} />
            <ToggleSwitch
              isOn={isAllowedEmail}
              onColor="red"
              offColor="gray"
              onToggle={() => {
                updateAllowed('email', !isAllowedEmail ? 1 : 0)
                setIsAllowedEmail(!isAllowedEmail)
                userInfos.current.ALLOW_EMAIL = !isAllowedEmail ? 1 : 0
              }}
              size="medium" />
          </View>
          <View style={styles.botton}>
            <CustomText text={lanText.allowChat} textStyle={styles.buttonTxt} />
            <ToggleSwitch
              isOn={isAllowedChat}
              onColor="red"
              offColor="gray"
              onToggle={() => {
                updateAllowed('chat', !isAllowedChat ? 1 : 0)
                setIsAllowedChat(!isAllowedChat)
                userInfos.current.ALLOW_CHAT = !isAllowedChat ? 1 : 0
              }}
              size="medium" />
          </View>
          <View style={styles.botton}>
            <CustomText text={lanText.disturb} textStyle={styles.buttonTxt} />
            <ToggleSwitch
              isOn={isOn}
              onColor="red"
              offColor="gray"
              onToggle={() => {
                saveDisturbState(!isOn)
                isNonDisturbMode.current = !isOn
                setIsOn(!isOn)
              }}
              size="medium" />
          </View>
          <TouchableOpacity
            style={styles.botton}
            onPress={() => {
              navigation.navigate('ConfirmModal', {
                comment: lanText.out,
                METHOD: () => signOut()
              })
            }}>
            <CustomText text={lanText.logout} textStyle={styles.buttonTxt} />
            <Entypo name="log-out" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botton}
            onPress={() => Linking.openURL(`mailto:yeoung004@gmail.com`)}>
            <CustomText text={lanText.sendEmail} textStyle={styles.buttonTxt} />
            <MaterialIcons name="email" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botton}
            onPress={() => navigation.push('ConfirmModal', {
              comment: '탈퇴시 모든 데이터\n(채팅기록, 포스팅, 프로젝트 등)가 사라지며 복구가 불가능 합니다.\n 정보 삭제에 동의하시겠습니까?',
              METHOD: () => removeAccount()
            })}>
            <Text style={[styles.buttonTxt, { color: 'tomato' }]}>{'Delete account'}</Text>
            <MaterialCommunityIcons name="database-remove" size={24} color="tomato" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
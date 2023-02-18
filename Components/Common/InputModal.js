import {
  Dimensions,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native"
import { useContext, useState } from "react"
import axios from "axios"
import { IP_ADDRESS } from "../../config/key"
import { sendRequest } from "./Common"
import { AppContext } from "../../utils/context"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const InputModal = ({ navigation, route }) => {
  const { lan, userID } = useContext(AppContext)
  const { InputModal: lanText } = lan.current
  const { inputType } = route.params
  const [inputText, setInputText] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const showSuccessModal = () => {
    navigation.goBack()
    navigation.navigate('InfoModal', {
      text: lanText.success,
      state: false
    })
  }
  
  const showErrorModal = () => {
    navigation.navigate('InfoModal', {
      text: lanText.info,
      state: true
    })
  }
  const getConfigForType = (modalType) => {
    if(inputType === 'Report' || inputType === 'Block'){
      if(modalType === 'max')
        return 2000
      else if(modalType === 'multi')
        return true
    } else {
      if(modalType === 'max')
        return 20
      else if(modalType === 'multi')
        return false
    }
  }
  const blockHandler = async () => {
    try {
      const { data } = await axios.post(IP_ADDRESS + '/system/block', {
        USERID: userID,
        REFERENCEID: route.params.reference,
        REASON: inputText,
      })
      showSuccessModal()
    } catch (error) {
      showErrorModal()
      console.log('blockHandler', error)
    }
  }
  const reportHandler = async () => {
    try {
      const { data } = await axios.post(IP_ADDRESS + '/system/report', {
        REPORTER: userID,
        REASON: inputText,
        REFERENCEID: route.params.reference
      })
    } catch (error) {
      showErrorModal()
      console.log('reportHandler', error)
    }
  }
  const requestHandler = async () => {
    try {
      const { data } = await axios.post(IP_ADDRESS + '/project', {
        query: `mutation{
          requestProject(
            MEMBERID:"${userID}"
            PROJECTID:${route.params.PROJECTID}
            ROLE:"${inputText}"
          )
        }`
      })
      sendRequest(
        route.params.fireDatabase,
        data.data.requestProject,
        route.params.USERID,
        route.params.USER_NAME
      )
      showSuccessModal()
    } catch (error) {
      showErrorModal()
      console.log('sendProjectRequest', error)
    }
  }

  return (
    <View style={[{
      alignSelf: 'center',
      width: SCREEN_WIDTH / 1.1,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      shadowColor:'#000',
      shadowRadius:3,
      shadowOpacity: 0.3,
      shadowOffset: { width: 1, height: 3 },
      elevation: 5,
    },
    Platform.OS === 'ios' &&
    isFocus && {
      top: -SCREEN_HEIGHT / 5
    }]}>
      <View style={{
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        padding: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
      }}>
        <TextInput
          value={inputText}
          multiline={getConfigForType('multi')}
          onFocus={() => setIsFocus(true)}
          onChangeText={setInputText}
          style={{ paddingVertical: 5 }}
          maxLength={getConfigForType('max')}
          placeholder={lanText.placeholder[inputType]} />
      </View>
      <TouchableOpacity
        onPress={() => {
          if(inputType === 'Request')
            requestHandler()
          else if(inputType === 'Report'){
            reportHandler()
            blockHandler()
          } else if(inputType === 'Block')
            blockHandler()
        }}
        style={{
          paddingVertical: 10,
          borderRadius: 5,
          borderColor: 'black',
          borderWidth: 2,
        }}>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Aldrich',
          textAlign: 'center'
        }}>{lanText.send}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: 'black',
          paddingVertical: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}>
        <Text style={{
          fontSize: 15,
          fontFamily: 'Aldrich',
          textAlign: 'center',
          color: 'white'
        }}>{lanText.cancel}</Text>
      </TouchableOpacity>
    </View>
  )
}
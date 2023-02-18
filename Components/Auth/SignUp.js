import React, { useContext, useState } from "react"
import {
  ImageBackground,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native"
import { styles } from "./styles/SignUp_style"
import {
  MaterialCommunityIcons,
  Feather,
  EvilIcons,
  Entypo,
  AntDesign
} from "@expo/vector-icons"
import { Auth } from 'aws-amplify'
import Spinner from 'react-native-loading-spinner-overlay'
import { AppContext } from "../../utils/context"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const SignUp = ({ navigation }) => {
  const { lan } = useContext(AppContext)
  const { SignUp: lanText } = lan.current
  const [emailErrorFontColor, setEmailErrorFontColor] = useState('whitesmoke')
  const [email, setEmail] = useState('')
  const [errorText, setErrorText] = useState("")
  const [pwdVisable, setPwdVisable] = useState(false)
  const [confirmPwdVisable, setConfirmPwdVisable] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [spin, setSpin] = useState(false)
  const isPwdAndConfirmPwdSame = () => {
    return password === confirmPwd
  }
  const isAllOfInfoFull = () => {
    return email !== '' && password !== '' && confirmPwd !== ''
  }
  const isValid = () => {
    return isEmailValid() && isAllOfInfoFull() && isPwdAndConfirmPwdSame()
  }
  const isEmailValid = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email)
  }
  const handleError = (text = 'User info is invalid') => {
    setEmailErrorFontColor("red")
    setErrorText(text)
  }
  const handleSingUp = () => {
    setSpin(true)
    if (isValid()) {
      Auth.signUp({
        password,
        username: email
      })
        .then((user) => {
          console.log(user)
          navigation.replace("Confirm", { preScreen: "SignUp", ID: email })
        })
        .catch((error) => {
          console.log('handleSingUp', error)
          handleError(error.toString().split(": ")[1].replace(']'))
        })
    }
    else handleError()
    setSpin(false)
  }

  return (
    <ImageBackground source={require('../../assets/pictures/backgroundM.png')}
      style={styles.back}
      resizeMode="stretch">
      {spin && <Spinner
        visible={spin}
        textContent="Loading..."
        textStyle={{ color: 'whitesmoke' }}
        animation={'fade'}
        size={100}
        color={'whitesmoke'} />}
      <View style={styles.container}>
        <Text style={styles.hello}>Hello World</Text>
        <View style={styles.signUpInfo}>
          <View style={styles.userBox}>
            <EvilIcons style={styles.userBox__middleUer} name="user" size={SCREEN_WIDTH / 5} color="white" />
          </View>
          <View style={styles.emailBox}>
            <MaterialCommunityIcons style={styles.icon} name="email-outline" size={20} color="black" />
            <TextInput
              maxLength={70}
              style={styles.email}
              keyboardType="email-address"
              placeholder={lanText.email}
              onFocus={() => setEmailErrorFontColor("whitesmoke")}
              value={email}
              placeholderTextColor={'black'}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.pwdBox}>
            <View style={{ flexDirection: 'row' }}>
              <Feather style={styles.icon} name="lock" size={20} color="black" />
              <TextInput
                maxLength={30}
                secureTextEntry={!pwdVisable}
                style={styles.password}
                value={password}
                onChangeText={setPassword}
                placeholder={lanText.password}
                placeholderTextColor={'black'} />
            </View>
            <TouchableOpacity
              onPress={() => setPwdVisable(!pwdVisable)}
              style={{ justifyContent: 'center' }}>
              <Entypo name={pwdVisable ? "eye" : "eye-with-line"} size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.confirmPasswordBox}>
            <View style={{ flexDirection: 'row' }}>
              <Feather style={styles.icon} name="lock" size={20} color="black" />
              <TextInput
                maxLength={30}
                secureTextEntry={!confirmPwdVisable}
                style={styles.confirmPassword}
                placeholder={lanText.confirm}
                value={confirmPwd}
                onChangeText={setConfirmPwd}
                placeholderTextColor={'black'}
              />
            </View>
            <TouchableOpacity
              onPress={() => setConfirmPwdVisable(!confirmPwdVisable)}
              style={{ justifyContent: 'center' }}>
              <Entypo name={confirmPwdVisable ? "eye" : "eye-with-line"} size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={{
            alignSelf: 'flex-start',
            marginHorizontal: 40,
            color: emailErrorFontColor,
          }}>{errorText}</Text>
          <View style={styles.btnSignUp}>
            <TouchableOpacity
              onPress={handleSingUp}>
              <Text style={styles.signUpTxt}>{lanText.signup}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Image source={require('../../assets/pictures/logo.png')} style={styles.logo} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.topLeft}
        onPress={() => navigation.goBack()}>
        <AntDesign name="swapleft" size={40} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  )
}

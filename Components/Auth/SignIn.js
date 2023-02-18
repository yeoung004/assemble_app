import { useState, useEffect, useContext } from "react"
import {
  ImageBackground,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert
} from "react-native"
import { styles } from "./styles/SignIn_style"
import {
  Feather,
  AntDesign,
  EvilIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons"
import { Auth, Hub } from 'aws-amplify'
import Spinner from 'react-native-loading-spinner-overlay'
import { IP_ADDRESS } from '../../config/key'
import axios from "axios"
import { AppContext } from "../../utils/context"
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const SignIn = ({ navigation, route }) => {
  const [errorFontColor, setErrorFontColor] = useState('whitesmoke')
  const [pwdVisable, setPwdVisable] = useState(false)
  const [email, setEmail] = useState("")
  const [errorText, setErrorText] = useState("")
  const [password, setPassword] = useState("")
  const [spin, setSpin] = useState(false)
  const [provider, setProvider] = useState('')
  const {
    userInfos,
    setUserID,
    lan
  } = useContext(AppContext)
  const { SignIn: lanText } = lan.current

  const setErrorInfo = (text) => {
    setErrorText(text)
    setErrorFontColor('red')
  }
  const AreNotInfosEmpty = () => {
    return password !== '' && email !== ''
  }
  const isValid = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email) && AreNotInfosEmpty()
  }

  const afterSignIn = async (id) => {
    try {
      await requestTrackingPermissionsAsync()
      const { data } = await axios.get(`${IP_ADDRESS}/users/userInfo/${id}/null`)
      if (provider == 'cognito')
        Auth.rememberDevice()
      setUserID(id)
      userInfos.current = {...data}

      if(data)
        navigation.replace('Community', { preScreen: "SignIn" })
      else
        navigation.navigate('AgreeModal', { preScreen: "SignIn" })
    } catch (error) {
      Alert.alert(lanText.info)
      console.log('singin error', error)
    }
    setSpin(false)
  }

  const handleSignIn = (provider) => {
    setSpin(true)
    setProvider(provider)
    if (provider === 'cognito') {
      if (isValid()) {
        Auth.signIn(email, password)
          .then((data) => {
            afterSignIn(data.username)
            console.log("SignIn is successful from Sign in Screen")
          })
          .catch((error) => {
            const errorText = error.toString().split(": ")[1].replace(']')
            setErrorInfo(errorText)
            if (errorText === "User is not confirmed.")
              navigation.navigate('Confirm', { ID: email })
          })
      } else {
        setSpin(false)
        setErrorInfo("Your info is incorrect.")
      }
    } else {
      Auth.federatedSignIn({ provider })
        .then((data) => {
          console.log("SignIn is successful from Sign in Screen")
        })
        .catch((error) => {
          console.log("SignIn is failed from Sign in Screen", error)
        })
    }
  }

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      if (event === 'signIn')
        afterSignIn(data.signInUserSession.idToken.payload.sub)
    })
    return () => Hub.remove('auth')
  }, [])

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
        <View style={styles.signInInfo}>
          <View style={styles.userBox}>
            <EvilIcons style={styles.userBox__middleUer} name="user" size={SCREEN_WIDTH / 5.5} color="white" />
          </View>
          <View style={styles.infoBox}>
            <View style={styles.signInBox}>
              <FontAwesome5 style={styles.iconSignIn} name="user" size={20} color="black" />
              <TextInput
                maxLength={70}
                style={styles.email}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={setEmail}
                onKeyPress={() => setErrorFontColor("whitesmoke")}
                value={email}
                placeholderTextColor={'gray'}
              />
            </View>
            <View style={styles.pwdBox}>
              <View style={{
                flexDirection: 'row',
                flexGrow: 1
              }}>
                <Feather style={styles.iconPwd} name="lock" size={20} color="black" />
                <TextInput
                  maxLength={30}
                  secureTextEntry={!pwdVisable}
                  style={styles.password}
                  placeholder="Password"
                  placeholderTextColor={'gray'}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <TouchableOpacity
                onPress={() => setPwdVisable(!pwdVisable)}
                style={{ justifyContent: 'center' }}>
                <Entypo name={pwdVisable ? "eye" : "eye-with-line"} size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 40,
              color: errorFontColor,
            }}>{errorText}</Text>
          <View style={styles.btnSignIn}>
            <TouchableOpacity
              onPress={() => handleSignIn('cognito')}>
              <Text style={styles.signInTxt}>{lanText.signIn}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUpBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp', { preScreen: "SignIn" })}>
              <Text style={{ color: 'gray' }}>{lanText.signUp}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forgot', { preScreen: "SignIn" })}>
              <Text style={{ color: 'gray' }}>{lanText.forgot}</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#c8c8c8', alignSelf: 'center' }}>Continue with</Text>
          <View style={[styles.socialSignIn, Platform.OS === 'ios' && {
            flexDirection: 'row',
            justifyContent: 'center'
          }]}>
            {Platform.OS === 'android' &&
              <>
                <TouchableOpacity
                  style={[styles.socialBox, styles.socialBoxA]}
                  onPress={() => handleSignIn('Google')}>
                  <View style={[styles.socialLogo, { width: 20, height: 20 }]}>
                    <Image resizeMethod="resize" resizeMode="contain" style={{ width: '100%', height: '100%' }} source={require('../../assets/googleLogo.png')} />
                  </View>
                  <Text style={styles.socialBox__text}>{lanText.google}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.socialBox, styles.socialBoxA]}
                  onPress={() => handleSignIn('SignInWithApple')}>
                  <View style={styles.socialLogo}>
                    <AntDesign name="apple1" size={24} color="black" />
                  </View>
                  <Text style={styles.socialBox__text}>{lanText.apple}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.socialBox, styles.socialBoxA]}
                  onPress={() => handleSignIn('Github')}>
                  <View style={styles.socialLogo}>
                    <AntDesign name="github" size={24} color="black" />
                  </View>
                  <Text style={styles.socialBox__text}>{lanText.github}</Text>
                </TouchableOpacity>
              </>
            }
            {Platform.OS === 'ios' &&
              <>
                <TouchableOpacity
                  style={[styles.socialBox, styles.socialBoxI]}
                  onPress={() => handleSignIn('SignInWithApple')}>
                  <AntDesign name="apple1" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.socialBox, styles.socialBoxI, {
                    backgroundColor: 'white',
                    borderColor: '#4285F4',
                    borderWidth: 1
                  }]}
                  onPress={() => handleSignIn('Google')}>
                  <View style={{
                    width: 20,
                    height: 20
                  }}>
                    <Image resizeMethod="resize" resizeMode="contain" style={{ width: '100%', height: '100%' }} source={require('../../assets/googleLogo.png')} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.socialBox, styles.socialBoxI]}
                  onPress={() => handleSignIn('Github')}>
                  <AntDesign name="github" size={20} color="white" />
                </TouchableOpacity>
              </>
            }
          </View>
        </View>
        <View style={styles.footer}>
          <Image source={require('../../assets/pictures/logo.png')} style={styles.logo} />
        </View>
      </View>
    </ImageBackground >
  )
}
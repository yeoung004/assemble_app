import { useContext, useState } from "react"
import { 
  ImageBackground, 
  View, 
  Image, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Dimensions
} from "react-native"
import { styles } from "./styles/ForgotPwdConfirm_style"
import { MaterialIcons, Feather, EvilIcons, Entypo } from "@expo/vector-icons"
import { Auth } from 'aws-amplify'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
import Spinner from 'react-native-loading-spinner-overlay'
import { AppContext } from "../../utils/context"

export const ForgotPwdConfirm = ({ route, navigation }) => {
  const { lan } = useContext(AppContext)
  const { ForgotPwdConfirm: lanText } = lan.current
  const [errorColor, setErrorColor] = useState("whitesmoke")
  const [errorText, setErrorText] = useState("")
  const [veritication, setVeritication] = useState("")
  const [pwdVisable, setPwdVisable] = useState(false)
  const [confirmPwdVisable, setConfirmPwdVisable] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState("")
  const [spin, setSpin] = useState(false)
  const { userName } = route.params
  const isValidPwd = () => {
    let result = true
    if (password !== confirmPwd) {
      setErrorText(lanText.error)
      result = false
    }
    return result
  }
  const handleSingUp = () => {
    setSpin(true)
    if (isValidPwd()) {
      Auth.forgotPasswordSubmit(userName, veritication, password)
        .then(navigation.replace("Successful", { preScreen: "ForgotPwdConfirm", userName }))
        .catch(console.log)
    } else
      setErrorColor("red")
    setSpin(false)
  }

  return (
    <ImageBackground 
      source={require('../../assets/pictures/background.png')}
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
        <Text style={styles.hello}>
          Hello World
        </Text>
        <View style={styles.loginInfo}>
          <View style={styles.userBox}>
            <EvilIcons style={styles.userBox__middleUer} name="user" size={SCREEN_WIDTH / 5} color="white" />
          </View>
          <View style={[styles.box, {justifyContent:'space-between'}]}>
            <View style={{flexDirection:'row'}}>
              <Feather style={styles.icon} name="lock" size={20} color="black" />
              <TextInput
                maxLength={100}
                secureTextEntry={!pwdVisable}
                style={styles.password}
                value={password}
                onChangeText={setPassword}
                placeholder={lanText.pwd}
                placeholderTextColor={'gray'}
                onPress={() => setErrorColor("whitesmoke")}/>
            </View>
              <TouchableOpacity
                onPress={() => {
                  setPwdVisable(!pwdVisable)
                }}
                style={{ justifyContent: 'center' }}>
                <Entypo style={styles.icon} name={pwdVisable ? "eye" : "eye-with-line"} size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={[styles.box, {justifyContent:'space-between'}]}>
            <View style={{flexDirection:'row'}}>
              <Feather style={styles.icon} name="lock" size={20} color="black" />
              <TextInput
                maxLength={100}
                secureTextEntry={!confirmPwdVisable}
                style={styles.confirmPassword}
                placeholder={lanText.confirmPwd}
                placeholderTextColor={'gray'}
                onChangeText={setConfirmPwd}
                onPress={() => setErrorColor("whitesmoke")}
                value={confirmPwd}/>
            </View>
            <TouchableOpacity
              onPress={() => {
                setConfirmPwdVisable(!confirmPwdVisable)
              }}
              style={{ justifyContent: 'center' }}>
              <Entypo style={styles.icon} name={confirmPwdVisable ? "eye" : "eye-with-line"} size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <MaterialIcons style={styles.icon} name="verified-user" size={20} color="gray" />
            <TextInput
              maxLength={10}
              style={styles.veritication}
              keyboardType="numeric"
              placeholder={lanText.code}
              onChangeText={setVeritication}
              value={veritication}
              onPress={() => setErrorColor("whitesmoke")}
              placeholderTextColor={'gray'}
            />
          </View>
          <Text style={{
            alignSelf: 'flex-start',
            marginHorizontal: 40,
            color: errorColor,
          }}>{errorText}</Text>
          <View style={styles.btnLogin}>
            <TouchableOpacity
              onPress={handleSingUp}>
              <Text style={styles.loginTxt}>{lanText.confirm}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Image source={require('../../assets/pictures/logo.png')} style={styles.logo} />
        </View>
      </View>
    </ImageBackground>
  )
}

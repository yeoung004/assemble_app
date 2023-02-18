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
import { styles } from "./styles/Forgot_style"
import { 
  EvilIcons, 
  FontAwesome5,
  AntDesign 
} from "@expo/vector-icons"
import { Auth } from 'aws-amplify'
import { AppContext } from "../../utils/context"
import Spinner from 'react-native-loading-spinner-overlay'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const Forgot = ({ navigation, route }) => {
  const [emailErrorFontColor, setEmailErrorFontColor] = useState('whitesmoke')
  const [email, setEmail] = useState("")
  const [spin, setSpin] = useState(false)
  const { lan } = useContext(AppContext)
  const { Forgot: lanText } = lan.current
  const isEmailValid = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email)
  }
  const handleFindPassword = () => {
    setSpin(true)
    if (isEmailValid()) {
      Auth.forgotPassword(email)
        .then((data) => {
          console.log(data)
          navigation.replace("ForgotPwdConfirm", { preScreen: "Forgot", userName: email })
        })
        .catch((error) => console.log(error.toString().split("Exception: ")[1].split("]")[0]))
    } else {
      setEmailErrorFontColor("red")
    }
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
        <View style={styles.loginInfo}>
          <View style={styles.userBox}>
            <EvilIcons
              style={styles.userBox__middleUer}
              name="user"
              size={SCREEN_WIDTH / 5}
              color="white" />
          </View>
          <View style={styles.loginBox}>
            <FontAwesome5 style={styles.iconLogin} name="user" size={20} color="black" />
            <TextInput
              maxLength={100}
              style={styles.email}
              keyboardType="email-address"
              placeholder={lanText.email}
              onPress={() => setEmailErrorFontColor("whitesmoke")}
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={'black'}
            />
          </View>
          <Text style={{
            alignSelf: 'flex-start',
            marginHorizontal: 40,
            color: emailErrorFontColor,
          }}>{lanText.incorrect}</Text>
          <View style={styles.btnLogin}>
            <TouchableOpacity
              onPress={() => handleFindPassword()}>
              <Text style={styles.loginTxt}>{lanText.send}</Text>
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

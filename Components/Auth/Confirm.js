import React, { useContext, useState } from "react"
import { Alert, ImageBackground, View, Image, Text, TextInput, TouchableOpacity, Dimensions } from "react-native"
import { styles } from "./styles/Confirm_style"
import { MaterialIcons, EvilIcons } from "@expo/vector-icons"
import { Auth } from 'aws-amplify'
import Spinner from 'react-native-loading-spinner-overlay'
import { AppContext } from "../../utils/context"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const Confirm = ({ route, navigation }) => {
  const [isError, setIsError] = useState(false)
  const [veritication, setVeritication] = useState("")
  const { userID, lan } = useContext(AppContext)
  const { Confirm: lanText } = lan.current
  const user_id = route.params.ID ?? userID
  const [spin, setSpin] = useState(false)
  const isValid = () => {
    return veritication !== "" || veritication.length > 5
  }
  const resendConfirmationCode = () => {
    Auth.resendSignUp(user_id)
      .then(() => Alert.alert(lanText.alert))
      .catch(() => setIsError(true))
  }
  const handleSingUp = () => {
    setSpin(true)
    if (isValid()) {
      Auth.confirmSignUp(user_id, veritication)
        .then((data) => {
          navigation.replace("Successful", { preScreen: "Confirm", userName: user_id })
        })
        .catch((error) => setIsError(true))
    } else
      setIsError(true)
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
        <Text style={styles.hello}>Hello World</Text>
        <View style={styles.loginInfo}>
          <View style={styles.userBox}>
            <EvilIcons style={styles.userBox__middleUer} name="user" size={SCREEN_WIDTH / 5} color="white" />
          </View>
          <View style={styles.loginBox}>
            <MaterialIcons style={styles.iconLogin} name="verified-user" size={24} color="gray" />
            <TextInput
              style={styles.veritication}
              maxLength={10}
              keyboardType="numeric"
              placeholder="Number"
              onChangeText={(data) => {
                setVeritication(data)
                setIsError("whitesmoke")
              }}
              value={veritication}
              placeholderTextColor={'gray'} />
          </View>

          <View style={styles.infoTxt}>
            {isError &&
              <Text style={{
                alignSelf: 'flex-start',
                color: 'red'
              }}>{lanText.error}</Text>}
            <TouchableOpacity onPress={resendConfirmationCode}>
              <Text style={{ color: 'gray' }}>{lanText.resend}</Text>
            </TouchableOpacity>
          </View>
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

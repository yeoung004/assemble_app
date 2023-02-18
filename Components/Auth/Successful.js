import { useContext } from "react"
import {
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native"
import { styles } from "./styles/Successful_style"
import { EvilIcons } from "@expo/vector-icons"
import { AppContext } from "../../utils/context"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const Successful = ({ navigation }) => {
  const { lan } = useContext(AppContext)
  const { Successful: lanText } = lan.current

  return (
    <ImageBackground source={require('../../assets/pictures/backgroundM.png')}
      style={styles.back}
      resizeMode="stretch">
      <View style={styles.container}>
        <Text style={styles.hello}>
          Hello World
        </Text>
        <View style={styles.info}>
          <View style={styles.userBox}>
            <EvilIcons style={styles.userBox__middleUer} name="user" size={SCREEN_WIDTH / 5} color="white" />
          </View>
          <View style={styles.successContainer}>
            <Text style={styles.success}>{lanText.success}</Text>
          </View>
          <View style={styles.btnSignIn}>
            <TouchableOpacity
              onPress={() => navigation.replace("SignIn", { name: "SignIn" })}>
              <Text style={styles.signInTxt}>{lanText.go}</Text>
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

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native'
import {
  AntDesign,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { AppContext } from '../../utils/context'
import {
  useContext,
  useState
} from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const AgreeModal = ({ navigation, route }) => {
  const [check, setCheck] = useState([false, false])
  const [modal, setModal] = useState(false)
  const { lan } = useContext(AppContext)
  const { AgreeModal: lanText, Privacy } = lan.current

  return (
    <View style={styles.container}>
      <Modal visible={modal}>
        <TouchableOpacity
          onPress={() => setModal(false)}
          style={{ position: 'absolute', padding: 10, zIndex: 99 }}>
          <MaterialCommunityIcons name="close-thick" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView>
          <Text style={{ padding: 20 }}>{Privacy}</Text>
        </ScrollView>
      </Modal>
      <Text style={styles.title}>{lanText.term}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.agree, styles.agreeAll]}
        onPress={() => setCheck([true, true])}>
        <AntDesign name="checkcircle" size={24} color={check[0] && check[1] ? "black" : "lightgray"} />
        <Text style={[styles.agreeTxt, { fontSize: 20 }]}>{lanText.agree}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.agree}
        onPress={() => setCheck([!check[0], check[1]])}>
        <AntDesign name="checkcircle" size={24} color={check[0] ? "black" : "lightgray"} />
        <Text style={styles.agreeTxt}>{lanText.age}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.agree}
        onPress={() => setCheck([check[0], !check[1]])}>
        <AntDesign name="checkcircle" size={24} color={check[1] ? "black" : "lightgray"} />
        <Text style={styles.agreeTxt}>{lanText.accept}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModal(true)}
        style={styles.term}>
        <Text style={styles.termTxt}>Assemble {lanText.privacy}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (check[0] && check[1])
            navigation.replace('UserInfo', { preScreen: "SignIn" })
        }}
        style={[styles.continue, { 
          backgroundColor: check[0] && check[1] ? '#3599f0' : 'gray' 
        }]}>
        <Text style={styles.continueTxt}>{lanText.next}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  title: {
    fontFamily: "Lato",
    fontSize: 30,
  },
  agreeAll: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    margin: 10,
  },
  agree: {
    width: SCREEN_WIDTH / 1.3,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  agreeTxt: {
    fontFamily: "Lato",
    fontSize: 15,
    marginHorizontal: 10
  },
  termTxt: {
    textAlign: 'center',
    color: '#3599f0',
    textDecorationLine: 'underline'
  },
  continue: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  continueTxt: {
    fontSize: 20,
    color: 'white'
  }
})
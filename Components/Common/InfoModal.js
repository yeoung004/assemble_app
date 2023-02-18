import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const InfoModal = ({ navigation, route }) => {
  const { state, text } = route.params
  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.header}>
          {state === 'INFO' ? <AntDesign name="exclamation" size={50} color="black" /> :
            <AntDesign name="check" size={50} color="black" />}
        </View>
        <View style={styles.body}>
          <Text style={styles.notification}>{text}</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.okay}>
            <Text style={{ color: 'white', fontSize: 20 }}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH / 1.1,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    alignItems: 'center',
  },
  header: {
    top: -30,
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: 'black',
    padding: 10
  },
  body: {
    justifyContent: 'center',
    alignSelf: 'center',
    top: -30,
    paddingVertical: 22,
    paddingHorizontal: 35,
    alignItems: 'center',
  },
  notification: {
    fontSize: 20,
  },
  okay: {
    marginTop: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 45,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  }
})
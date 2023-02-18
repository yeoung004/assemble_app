import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { AppContext } from '../../utils/context'
import { useContext } from 'react'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const ConfirmModal = ({ navigation, route }) => {
  const { comment, METHOD } = route.params
  const { lan } = useContext(AppContext)
  const { ConfirmModal: lanText } = lan.current

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="exclamation" size={SCREEN_WIDTH / 9} color="black" />
      </View>
      <View style={styles.body}>
        <Text style={styles.notification}>{comment}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              METHOD()
            }}
            style={[styles.button, { backgroundColor: '#1e88e5' }]}>
            <Text style={{ color: 'white', fontSize: 15 }}>{lanText.okay}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button,{
              borderWidth:2,
              borderColor:'lightgray'
            }]}>
            <Text style={{ color: '#1e88e5', fontSize: 15 }}>{lanText.cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH / 1.2,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  header: {
    top: -40,
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      height: 3,
      width: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: 'black',
    padding: 10
  },
  body: {
    top: -30,
    alignItems: 'center',
  },
  notification: {
    textAlign:'center',
    fontSize: 16,
  },
  buttons: {
    top: 20,
    justifyContent: 'center',
  },
  button: {
    marginVertical:5,
    borderRadius: 100,
    paddingVertical: 8,
    alignItems: 'center',
    width: SCREEN_WIDTH / 1.5,
    backgroundColor: 'white',
  }
})
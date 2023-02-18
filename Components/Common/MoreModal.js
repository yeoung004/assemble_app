import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export const MoreModal = ({ navigation, route }) => {
  const { items, functions } = route.params
  return (
    <View style={styles.container}>
      {Object.keys(items).map((value, index) => {
        let styleArray = []
        if (index == 0)
          styleArray.push(styles.buttonTop)
        return (
          <TouchableOpacity
            key={value}
            style={[styles.button, ...styleArray]}
            onPress={() => {
              functions[index]()
            }}>
            <Text style={styles.buttonTxt}>{items[index]}</Text>
          </TouchableOpacity>
        )
      })}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, {
          backgroundColor: '#2c373d',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }]}
        onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonTxt, { color: 'white' }]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: 'white',
    width: '80%',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 30,
  },
  buttonTop: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    justifyContent: 'center',
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white'
  },
  buttonTxt: {
    fontFamily: 'Lato',
    fontSize: 20,
    color: 'black'
  },
})
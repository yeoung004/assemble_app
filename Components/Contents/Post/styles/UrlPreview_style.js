
import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    width:SCREEN_WIDTH / 1.2,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: 20
  },
  url: {
    paddingHorizontal: 30,
    paddingVertical: 13,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
  buttons: {
    width:SCREEN_WIDTH / 1.3,
    alignItems:'center'
  },
  button: {
    marginTop:10,
    borderRadius:50,
    alignItems:'center',
    width:'100%',
    padding:10,
  },
  buttonTxt: {
    color:'white',
    fontSize: 20,
  }
})

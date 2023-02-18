import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  botton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1.5
  },
  buttonTxt: {
    fontFamily: 'Lato',
    fontSize: 16,
    color: "black"
  },
  lanModalContainer: {
    backgroundColor: 'white',
    borderRadius: 10
  },
  lanContainer:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    padding:20,
  },
  lan:{
    fontSize:15,
    color:'black'
  }
})
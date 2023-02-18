import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  back:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT
  },
  container: {
    padding:30,
    flex: 1,
    justifyContent:'space-between'
  },
  hello: {
    textAlign:'center',
    color: 'white',
    fontSize: 30,
    fontFamily: 'Aldrich',
    zIndex: 9
  },
  userBox: {
    alignSelf:'center',
    position: 'absolute',
    top: -45,
    backgroundColor: "black",
    borderRadius: 100,
    width: SCREEN_WIDTH / 5,
    height: SCREEN_WIDTH / 5,
    justifyContent: "center",
    alignItems: 'center'
  },
  userBox__middleUer: {
    textAlign: "center",
  },
  successContainer:{
    marginVertical:20
  },
  success:{ 
    textAlign:'center',
    fontFamily:'Aldrich',
    fontSize: 30 
  },
  info: {
    padding:20,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  btnSignIn: {
    backgroundColor: "black",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 10,
  },
  signInTxt: {
    fontFamily:'Aldrich',
    textAlign: 'center',
    color: "white",
    fontSize: 18,
  },
  footer: {
    alignSelf:'center'
  },
  logo: {
    resizeMode: 'contain',
    width: 70,
    height: 70
  },
})

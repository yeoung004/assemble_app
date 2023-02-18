import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  back:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT
  },
  container: {
    paddingHorizontal:20,
    justifyContent:'space-between',
    paddingVertical:30,
    flex: 1,
  },
  hello:{
    textAlign:'center',
    color: 'white',
    fontSize: 35,
    fontFamily: 'Aldrich',
    zIndex: 9
  },
  userBox: {
    alignSelf:'center',
    position: 'absolute',
    top: -35,
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
  loginInfo: {
    padding:35,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  box: {
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 2,
    marginBottom: 5,
  },
  icon: {
    alignSelf: "center",
  },
  password: {
    height: 50,
    paddingHorizontal: 15,
  },
  confirmPassword:{
    height: 50,
    paddingHorizontal: 15,
  },
  veritication: {
    height: 50,
    paddingHorizontal: 15,
  },
  btnLogin: {
    backgroundColor: "black",
    color: "white",
    paddingVertical:10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 10,
  },
  loginTxt: {
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

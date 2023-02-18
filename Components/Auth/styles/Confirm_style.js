import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    justifyContent:'space-between',
    padding:30,
    flex: 1,
    alignItems: "center",
  },
  back:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT
  },
  hello:{
    color: 'white',
    fontSize: 35,
    fontFamily: 'Aldrich',
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
    width:SCREEN_WIDTH / 1.3,
    padding:30,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  loginBox: {
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 2,
    marginVertical:10,
  },
  iconLogin: {
    alignSelf: "center",
  },
  veritication: {
    paddingVertical:10,
    paddingHorizontal: 10,
  },
  btnLogin: {
    paddingVertical:8,
    backgroundColor: "black",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 10,
  },
  infoTxt:{
    padding:20,
    paddingHorizontal:10
  },
  loginTxt: {
    fontFamily:'Aldrich',
    textAlign: 'center',
    color: "white",
    fontSize: 18,
  },
  footer: {
  },
  logo: {
    width: 70,
    height: 70
  },
})

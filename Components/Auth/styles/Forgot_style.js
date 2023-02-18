import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  back:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT
  },
  container: {
    paddingVertical:30,
    paddingHorizontal:20,
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent:'space-between',
  },
  hello: {
    textAlign:"center",
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
  loginInfo: {
    paddingVertical: 30,
    paddingHorizontal:30,
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
    marginBottom: 5,
  },
  iconLogin: {
    alignSelf: "center",
  },
  email: {
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
    textAlign: 'center',
    color: "white",
    fontFamily:'Aldrich',
    fontSize: 15,
  },
  footer: {
    alignSelf:'center'
  },
  logo: {
    resizeMode: 'contain',
    width: 70,
    height: 70
  },
  topLeft:{
    position:'absolute',
    left:20,
    top:10
  }
})

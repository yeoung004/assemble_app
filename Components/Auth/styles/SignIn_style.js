import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  back: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  loading: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'space-between'
  },
  hello: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    fontFamily: 'Aldrich',
    zIndex: 9
  },
  logo: {
    borderRadius: 100,
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
  },
  userBox: {
    alignSelf: 'center',
    position: 'absolute',
    width: SCREEN_WIDTH / 5,
    height: SCREEN_WIDTH / 5,
    top: -45,
    backgroundColor: "black",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: 'center'
  },
  signInInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  infoBox: {
    marginVertical: 8,
  },
  signInBox: {
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 2,
    marginBottom: 5,
  },
  iconSignIn: {
    alignSelf: "center",
  },
  email: {
    flexGrow:1,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  pwdBox: {
    justifyContent: 'space-between',
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 2,
  },
  iconPwd: {
    alignSelf: "center",
  },
  password: {
    flexGrow: 1,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  signUpBox: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnSignIn: {
    marginVertical: 10,
    backgroundColor: "black",
    color: "white",
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  signInTxt: {
    textAlign: 'center',
    color: "white",
    fontFamily: 'Aldrich',
    fontSize: 15,
  },
  socialSignIn: {
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    paddingTop:10,
  },
  socialBox: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  socialLogo:{
    position:'absolute',
    left:18
  },
  socialBoxA: {
    backgroundColor:'white',
    marginVertical: 5,
    paddingHorizontal: 18,
    paddingVertical:12,
    width: '100%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  socialBoxI:{
    padding:13,
    marginHorizontal:8,
  },
  socialBox__text: {
    paddingHorizontal: 8,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'gray',
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

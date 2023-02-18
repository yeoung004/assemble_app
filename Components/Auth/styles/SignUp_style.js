import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  back: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  topLeft:{
    position:'absolute',
    left:10,
    top:10
  },
  container: {
    paddingVertical:30,
    flex:1,
    justifyContent: 'space-between',
    alignItems: "center",
  },
  hello: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Aldrich',
  },
  userBox: {
    alignSelf: 'center',
    position: 'absolute',
    top: -40,
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
  signUpInfo: {
    paddingVertical: 30,
    paddingHorizontal: 50,
    width:SCREEN_WIDTH / 1.1,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  emailBox: {
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 2,
    marginBottom: 15,
  },
  icon: {
    alignSelf: "center",
  },
  email: {
    paddingVertical:5,
    paddingHorizontal: 15,
  },
  pwdBox: {
    justifyContent:'space-between',
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 2,
    marginBottom: 15,
  },
  password: {
    paddingVertical:5,
    paddingHorizontal: 15,
  },
  confirmPasswordBox: {
    justifyContent:'space-between',
    flexDirection: "row",
    borderColor: "lightgray",
    borderBottomWidth: 2,
    marginBottom: 15,
  },
  confirmPassword: {
    paddingVertical:5,
    paddingHorizontal: 15,
  },
  nameBox: {
    borderColor: "lightgray",
    borderBottomWidth: 2,
    marginBottom: 15,
  },
  name: {
    paddingVertical:5,
    paddingHorizontal: 15,
  },
  btnSignUp: {
    backgroundColor: "black",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 10,
  },
  signUpTxt: {
    textAlign: 'center',
    color: "white",
    fontFamily:'Aldrich',
    fontSize: 15,
  },
  footer: {
    borderRadius:100,
  },
  logo: {
    borderRadius: 100,
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
  },
})

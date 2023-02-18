import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  notifications: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  notification: {
    marginVertical: 15
  },
  date: {
    marginTop: 5
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10
  },
  emptyImg:{
    width:SCREEN_WIDTH / 1.5,
    height:SCREEN_WIDTH / 1.5
  },
  emptyTxt:{
    fontFamily:'Aldrich',
    fontSize:18,
    textAlign:'center'
  },
  content: {
    flex: 1,
  },
})
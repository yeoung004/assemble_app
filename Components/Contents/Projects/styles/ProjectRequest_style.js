import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  goback: {
    top: 10,
    left: 10,
    position: 'absolute',
    zIndex: 20,
  },
  back: {
    top: -150,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  header: {
    paddingVertical: 10,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#A79BEC',
  },
  headerTxt: {
    color: 'white',
    padding: 20,
    fontFamily: 'Aldrich',
    fontSize: 30,
  },
  bodyTop: {
    backgroundColor: 'transparent',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 7
  },
  body: {
    paddingTop: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { height: 30, width: 10 },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 30,
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Aldrich',
    fontSize: 20,
    marginBottom: 10
  },
  wrap:{
    marginBottom:20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15
  },
  profile:{
    width:50,
    height:50,
    borderRadius:100,
    marginRight:10
  },
  role:{
    fontFamily: 'Aldrich',
    fontSize: 13
  },
  projectName: {
    fontFamily: 'Aldrich',
    fontSize: 18
  },
  name: {
    fontFamily: 'Aldrich',
    color: 'gray'
  }
})
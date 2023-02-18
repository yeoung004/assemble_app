import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A89AFC',
    alignItems: "center",
  },
  header: {
    justifyContent:'center',
    flex: 0.3
  },
  headerTxt: {
    color:'white',
    fontSize:35,
    fontFamily:'Aldrich'
  },
  body: {
    paddingHorizontal:10,
    flex: 0.6
  },
  back:{
    backgroundColor:'white',
    opacity:0.5,
    borderRadius:SCREEN_WIDTH,
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_WIDTH / 1.5,
  },
  image:{
    position:'absolute',
    width: SCREEN_WIDTH / 1,
    height: SCREEN_WIDTH / 1.4,
  },
  textContainer:{
    paddingHorizontal:10
  },
  title: {
    color:'white',
    fontSize:25,
    fontFamily:'Aldrich',
    marginBottom:5,
  },
  content:{
    color:'white',
    fontSize:15,
    fontFamily:'Aldrich'
  },
  page: {
    width: SCREEN_WIDTH,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical:10
  },
  button: {
    justifyContent:'center',
    alignItems:'center',
    right:10,
    paddingHorizontal:50,
    paddingVertical:10,
    backgroundColor:'white',
    borderRadius: 30,
  },
  start: {
    color: '#6653D6',
    fontSize: 20,
    fontFamily:'Aldrich'
  },
  footer: {
    flex: 0.1,
    flexDirection:'row',
    alignItems:'center',
  },
  index:{
    width:15,
    height:15,
    opacity:0.7,
    backgroundColor:'white',
    borderRadius:10,
    marginHorizontal:5
  }
})
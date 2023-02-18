import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
  line: {
    backgroundColor: 'lightgray',
    width: '35%',
    height: 8,
    left: 23,
    bottom: 18
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    marginBottom: 10
  },
  project: {
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 20,
    width: 150,
    height: 200,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 3,
  },
  conetentContainer:{
    marginBottom:20
  },
  subtitles: {
    flexDirection: 'row',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#ADADAD'
  },
  selectedTxt: {
    color: 'black'
  },
  subtitleContainer:{
    marginHorizontal:10
  },
  taskUnderLine:{
    borderBottomColor:'tomato',
    borderBottomWidth:3,
  },
  issueUnderLine: {
    borderBottomColor:'green',
    borderBottomWidth:3,
  },
  issues: {
    maxHeight: SCREEN_HEIGHT / 4,
    marginVertical: 10,
  },
  issue: {
    justifyContent:'space-between',
    width:SCREEN_WIDTH - 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  issueLeft: {
    justifyContent:'flex-start',
    flexDirection: 'row'
  },
  issueBody: {
    marginHorizontal: 8,
  },
  issueTitle: {
    maxWidth: SCREEN_WIDTH / 2,
    fontSize: 20
  },
  issueSubtitle: {
    fontSize: 13,
    color: 'gray'
  },
  issueTime: {
    color: 'gray'
  },
  letter:{
    position:'absolute',
    top:30,
    right:20
  },
  letterNoti:{
    position:'absolute',
    backgroundColor:'#F48E85',
    width:10,
    height:10,
    right:0,
    borderRadius:20,
  }
})
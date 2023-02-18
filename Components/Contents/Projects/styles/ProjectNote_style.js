import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  body: {
    paddingHorizontal:20,
  },
  bodyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topTxt: {
    fontWeight: '100',
    color: 'white',
    fontSize: 25,
    fontFamily: 'Lato-Thin',
    maxWidth:SCREEN_WIDTH / 1.8
  },
  projectImgContainer: {
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 500,
    width: SCREEN_WIDTH / 3.5,
    height: SCREEN_WIDTH / 3.5,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  projectImg: {
    borderRadius: 500,
    width: SCREEN_WIDTH / 3.5,
    height: SCREEN_WIDTH / 3.5,
  },
  textInputContainer:{
    alignSelf:'center',
    borderRadius:10,
    padding:20,
    marginTop:20,
    alignItems:'center'
  },
  textInputBody:{
    padding:5,
    borderRadius:5,
    backgroundColor:'white',
    borderWidth:2,
    borderColor:'lightgray',
    marginBottom:10,
  },
  textInputTitle:{
    fontFamily:'Lato',
    paddingHorizontal:10,
    width:SCREEN_WIDTH / 1.2
  },
  textInputContent:{
    fontFamily:'Lato',
    padding:10,
    height:SCREEN_HEIGHT / 5,
    width:SCREEN_WIDTH / 1.2
  },
  add:{
    marginBottom:10,
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:10,
    paddingHorizontal:3,
    width:SCREEN_WIDTH / 1.3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  addTxt:{
    fontSize:17,
    fontFamily:'Aldrich',
    textAlign:'center',
    color:'black'
  },
  emptyWrap:{
    alignItems:'center',
    width:SCREEN_WIDTH,
    backgroundColor:'white'
  },
  emptyTitle:{
    fontFamily:'Aldrich',
    fontSize:20
  },
  memos:{
    backgroundColor:'whitesmoke',
    width:SCREEN_WIDTH,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:8
  },
  memo:{
    width:SCREEN_WIDTH / 1.1,
    borderRadius:5,
    marginVertical:10,
    padding:20,
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'lightgray'
  },
  memoHeader:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginBottom:10,
  },
  writed_at:{
    alignItems:'center'
  },
  memoTitle:{
    fontSize:18,
    fontWeight:'bold',
  },
  memoDate:{
    fontSize:11,
    color:'black'
  },
  memoTime:{
    fontSize:11,
    fontFamily:'Lato',
    color:'black'
  },
  memoContent:{
    fontSize: 17,
    fontFamily: 'Lato'
  }
})
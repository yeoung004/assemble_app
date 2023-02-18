import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  header: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323DCB',
    height: 130,
  },
  headerTxt: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Aldrich',
    bottom: 5,
    position: 'absolute',
    right: 5
  },
  body: {
    justifyContent:'center',
    width:SCREEN_WIDTH,
    paddingHorizontal: 35,
    top:-80,
  },
  projectImgContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    zIndex: 10,
    borderRadius: 100,
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 20,
    marginBottom:20,
  },
  projectImg: {
    borderRadius: 100,
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3
  },
  name:{
    alignSelf:'center',
    paddingHorizontal:30,
    width:SCREEN_WIDTH / 1.7,
    marginBottom:30
  },
  textInput: {
    paddingHorizontal:20,
    borderRadius:10,
    backgroundColor:'white',
    marginBottom:10,
  },
  textInputTxt:{
    height:45,
    color:'black',
    fontFamily: 'Aldrich',
  },
  add:{
    justifyContent:'center',
    alignItems:'center'
  },
  pickInfos: {
    alignSelf:'center'
  },
  searchContainner: {
    width: SCREEN_WIDTH / 1.2,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    padding: 0,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  searchBox: {
    paddingHorizontal:5,
    height: SCREEN_WIDTH / 8,
    width: SCREEN_WIDTH / 1.2,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  searchList: {
    marginTop:10,
    width: SCREEN_WIDTH / 1.2,
    maxHeight: SCREEN_HEIGHT / 4,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  item: {
    paddingVertical: 10,
    color: 'lightgray',
  },
  tagWrap:{
    flexDirection:'row',
    alignItems:'center',
    margin:5,
    backgroundColor:'whitesmoke',
    borderRadius:10,
    paddingVertical:5,
    paddingHorizontal:8
  },
  tag:{
    fontFamily:'Aldrich',
  },
  contentTitle:{
    fontFamily:'Aldrich',
    fontSize:23,
  },
  titleContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  button:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.3,
    elevation:3,
    borderRadius:20,
    width:35,
    height:35
  },
  contentContainer:{
    alignItems:'center',
    paddingVertical:20,
    marginVertical:20,
    backgroundColor:'white',
    borderRadius:20,
  },
  coworkerImgContainer:{
    backgroundColor:'white',
    width:SCREEN_WIDTH / 6,
    height:SCREEN_WIDTH / 6,
    borderRadius:50,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation:5,
    marginBottom:SCREEN_HEIGHT / 40
  },
  coworkerImg:{
    width:SCREEN_WIDTH / 6,
    height:SCREEN_WIDTH / 6,
    borderRadius:50,
  },
  coworkerInfo:{
    maxWidth:100,
    justifyContent:'center',
    alignItems:'center'
  },
  coworkerName:{
    maxWidth:100,
    fontSize:15,
    fontFamily:'Aldrich',
    textAlign:'center'
  },
  coworkerRole:{
    fontFamily:'Aldrich',
    color:'gray',
    fontSize:12,
    textAlign:'center'
  },
  coworkerContent:{
    borderRadius:20,
    padding:10,
    minWidth:80,
    marginHorizontal:5,
    justifyContent:'center',
    alignItems:'center',
  },
  techContainer:{
    marginBottom:20,
  },
  done:{
    borderRadius:10,
    width:SCREEN_WIDTH / 1.7,
    backgroundColor:'#000000',
    height:40,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
  },
  doneTxt:{
    color:'white',
    fontFamily:'Aldrich'
  }
})
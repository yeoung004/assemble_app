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
    paddingHorizontal:20
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
    borderRadius: 100,
    width: SCREEN_WIDTH / 3.5,
    height: SCREEN_WIDTH / 3.5,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  projectImg: {
    borderRadius: 100,
    width: SCREEN_WIDTH / 3.5,
    height: SCREEN_WIDTH / 3.5,
  },
  textInputContainer:{
    backgroundColor:'white',
    borderWidth:2,
    borderColor:'black',
    alignSelf:'center',
    borderRadius:10,
    padding:20,
    paddingVertical:30,
    marginTop:20,
  },
  textInputBody:{
    padding:10,
    borderRadius:10,
    backgroundColor:'#EAEFF1',
    marginBottom:20,
  },
  textInputTitle:{
    fontFamily:'Lato',
    paddingHorizontal:10,
    width:SCREEN_WIDTH / 1.4
  },
  textInputContent:{
    fontFamily:'Lato',
    padding:10,
    height:SCREEN_HEIGHT / 8,
    width:SCREEN_WIDTH / 1.4
  },
  inputButtons:{
    flexDirection:'row'
  },
  title:{
    fontFamily:'Aldrich',
    marginBottom:5,
  },
  inputButton:{
    marginHorizontal:5,
    marginVertical:5,
    marginBottom:20,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    padding:10,
    height:50,
  },
  buttonTxt:{
    color:'white'
  },
  add:{
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
    fontSize:15,
    fontFamily:'Aldrich',
    textAlign:'center',
    color:'black'
  },
  emptyImg:{
    width:SCREEN_WIDTH / 2.5,
    height:SCREEN_WIDTH / 2.5
  },
  emptyTxt:{
    fontFamily:'Aldrich',
    fontSize:18,
    textAlign:'center'
  },
  issues:{
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    width:SCREEN_WIDTH,
    padding:20,
    alignItems:'center'
  },
  issue:{
    marginBottom:15,
    padding:15,
    paddingHorizontal:20,
    borderRadius:10,
    backgroundColor:'white',
    width:'100%',
  },
  issueTitles:{
    paddingHorizontal:20,
    flexDirection:'row',
    marginTop:50,
  },
  issueTitleContainer:{
    marginLeft:7,
    borderBottomColor:'black'
  },
  issueButtonTitle:{
    color:'lightgray',
    fontSize:15,
  },
  issueTitle:{
    color:'gray',
    fontFamily:'Aldrich',
  },
  issueButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  issueButton:{
    marginHorizontal:5,
    marginTop:20
  },
  issueHeader:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginBottom:10,
  },
  writed_at:{
  },
  issueTitle:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
  },
  issueDate:{
    fontSize:12,
    color:'white'
  },
  issueTime:{
    fontSize:11,
    fontFamily:'Lato',
    color:'white'
  },
  issueContent:{
    color:'white',
    fontSize: 17,
    fontFamily: 'Lato',
  },
  issueInfos:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  issueInfo:{
    flexDirection:'row',
  },
  issueInfoTxt:{
    fontSize:13,
    color:'white',
    fontFamily:'Aldrich'
  },
  issueInfoLeft:{
    marginRight:10,
  }
})
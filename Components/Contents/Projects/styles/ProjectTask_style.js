import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    overflow: 'hidden',
    backgroundColor: '#FF661F',
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
  title:{
    fontFamily:'Aldrich',
    marginBottom:5,
  },
  textInputContainer:{
    padding:10,
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
    padding:5
  },
  addTxt:{
    fontSize:15,
    fontFamily:'Aldrich',
    color:'black'
  },
  dateButtons:{
    flexDirection:'row'
  },
  dateButton:{
    borderRadius:10,
    paddingVertical:10,
    borderWidth:2,
    borderColor:'black',
    flexGrow:1,
    marginHorizontal:5
  },
  dateButtonTxt:{
    textAlign:'center',
    fontFamily:'Aldrich'
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
  workerWrap:{
  },
  workerAll:{
    marginRight:10,
    backgroundColor:'black',
    paddingHorizontal:10,
    paddingVertical:8,
    alignSelf:'flex-end',
    borderRadius:10,
    marginVertical:5,
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 3 },
    elevation: 5,
  },
  workerAllTxt:{
    fontFamily: 'Aldrich',
    fontSize: 15,
    color:'white',
  },
  workers: {
    padding:10,
    marginVertical:10,
    marginHorizontal:10,
    paddingHorizontal:20,
    minWidth:SCREEN_WIDTH / 3,
    alignItems:'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 3 },
    elevation: 5,
  },
  workerName: {
    maxWidth: SCREEN_WIDTH / 4,
    color: 'black',
    fontFamily: 'Aldrich',
    fontSize: 14,
  },
  workerImgContainer: {
    marginTop:10,
    borderRadius: 50,
    marginBottom:10,
    backgroundColor:'white',
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 3 },
    elevation: 5,
  },
  workerImg: {
    borderRadius: 50,
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
  },
  workerRole: {
    fontFamily: 'Aldrich',
    fontSize: 12,
    color: 'gray',
  },
  workerInfo: {
    flexDirection: 'column',
    alignItems:'center',
  },
  issues:{
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    width:SCREEN_WIDTH,
    padding:20,
    alignItems:'center'
  },
  issue:{
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
    marginLeft:10,
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
    fontSize:11,
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
})
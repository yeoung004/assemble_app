import { Dimensions, Platform, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  header: {
    height:SCREEN_HEIGHT / 2.8,
    width:SCREEN_WIDTH,
    position:'absolute',
  },
  headerTop:{
    paddingHorizontal: 30,
    paddingVertical:10,
    marginBottom:10,
    backgroundColor: '#6D9FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40
  },
  headerTopLeft:{
    width:SCREEN_WIDTH / 2
  },
  profile: {
    top:15,
    right:15,
    position:'absolute',
    marginVertical:10,
    borderRadius: 500,
    shadowColor:'#000',
    shadowRadius:10,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    elevation: 25,
  },
  profileImg: {
    height: SCREEN_WIDTH / 2.8,
    width: SCREEN_WIDTH / 2.8,
    borderRadius: 300,
  },
  name: {
    color:'white',
    fontFamily: 'Aldrich',
    fontSize: 25,
  },
  position:{
    color:'white',
    fontFamily: 'Aldrich',
    fontSize: 15,
  },
  headerBottom:{
    padding:20,
  },
  infoContainer:{
    flexDirection:'row',
    marginRight:15,
    alignItems:'flex-start',
  },
  infoTitle:{
    width:100,
    color:'black',
    fontFamily:'Aldrich',
    fontSize:20,
    marginBottom:5
  },
  infoTxt:{
    width:100,
    alignSelf:'center',
    color:'black',
    fontFamily:'Aldrich',
    fontSize:13,
    marginBottom:5
  },
  actions:{
    alignSelf:'flex-end',
    position:'absolute',
  },
  option:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    height:70,
    paddingHorizontal:5,
    borderRadius:3,
    backgroundColor: 'white',
    shadowColor:'#000',
    shadowRadius:5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
  },
  moreContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  action:{
    padding:15,
    justifyContent:'space-between',
    alignItems:'center',
    margin:10,
    borderRadius:10,
    backgroundColor:'white',
    width:SCREEN_WIDTH / 4,
    height:SCREEN_WIDTH / 4,
    shadowColor:'#000',
    shadowRadius:5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
  },
  actionContainer:{ 
  },
  actionImage:{
    width:SCREEN_WIDTH / 10,
    height:SCREEN_WIDTH / 10,
  },
  actionTitle:{
    fontSize: 12,
    fontFamily:'Aldrich',
    textAlign:'center'
  },
  ownerButtons: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    width: '100%'
  },
  user__subInfo: {
    marginBottom: 10,
  },
  user__subInfoTitle: {
    flexDirection: 'row',
  },
  subInfo__item: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: 'Lato',
    fontSize: 13,
  },
  notification: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'tomato',
    borderRadius: 20,
    right:40,
    top: 20
  },
  padding:{
    width:1,
    height:SCREEN_HEIGHT / 2.8,
  },
  body: {
    shadowColor:'#000',
    shadowRadius:10,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    elevation: 25,
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT / 1.2,
    padding:40,
    paddingTop:80,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  bodyHeader:{
    position:'absolute',
    top:15,
    alignSelf:'center',
    borderRadius:20,
    width:SCREEN_WIDTH / 2.5,
    height:5,
    backgroundColor:'black',
  },
  user: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  profile__user: {
    alignSelf: 'flex-start'
  },
  info: {
    marginBottom: 20,
  },
  titleContainer:{
    width:'100%',
    marginBottom: 10,
  },
  info__titile: {
    fontFamily: 'Aldrich',
    fontSize: 25,
    color: 'black',
  },
  info__group: {
    flexDirection: 'row',
    marginVertical:15,
  },
  info_item: {
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: 20,
  },
  info_itemTxt:{
    marginVertical:10,
    fontFamily: 'Aldrich',
    color: 'black',
    fontSize: 17,
  },
  CareerConrainer:{
    alignSelf:'flex-start',
    backgroundColor:'white',
    padding:15,
    margin:10,
    borderColor:'black',
    borderWidth:3,
    borderRadius:20,
    shadowColor:'#000',
    shadowRadius:3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 3 },
    elevation: 5,
  },
  careerTitle:{
    color:'black',
    fontFamily: 'Lato',
    fontSize: 18,
    marginBottom:10,
  },
  careerWrap:{
    flexDirection:'column',
    maxWidth:SCREEN_WIDTH / 1.5,
    justifyContent:'center',
    marginRight:150,
  },
  careerDateWrap:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  careerDateTitle:{
    color:'black',
    fontFamily: 'Lato',
    fontSize: 13,
  },
  careerDate:{
    color:'black',
    fontFamily: 'Lato',
    fontSize: 13,
  },
  careerSubTitle: {
    fontFamily: 'Lato',
    fontSize: 13,
    color:'black',
    marginBottom:30,
  },
  emptyImg:{
    alignSelf:'center',
    width:SCREEN_WIDTH / 2,
    height:SCREEN_WIDTH / 2
  },
  emptyTxt:{
    fontFamily:'Aldrich',
    fontSize:18,
    textAlign:'center'
  },
  goback:{
    left: 10,
    top: 10,
    position:'absolute'
  }
})
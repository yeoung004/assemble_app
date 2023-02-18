import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323DCB',
    height: 130,
  },
  body: {
    top: -SCREEN_WIDTH / 4.8,
    paddingHorizontal: 20,
  },
  bodyTop: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom:15
  },
  topTxt: {
    fontWeight: '100',
    color: 'white',
    fontSize: 25,
    fontFamily: 'Lato-Thin',
  },
  projectImgContainer: {
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
  titleContainer: {
    marginVertical: 20,
    alignSelf: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: 3
  },
  title: {
    fontSize: 20,
    fontFamily: 'Aldrich',
    borderBottomColor: 'black',
  },
  tools: {
    marginBottom: 20,
  },
  toolContainer: {
    width: 80,
    height: 90,
    marginHorizontal: 8,
    marginVertical: 5,
    borderRadius: 23,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 5,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toolTxt: {
    fontFamily: 'Aldrich'
  },
  gole: {
    marginVertical: 20,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    width: SCREEN_WIDTH / 1.2,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  goleTop: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 12
  },
  goleTopTxtContainer: {
    alignSelf: 'flex-start',
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },
  goleTopTxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Aldrich'
  },
  progresses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  progress: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressTxt: {
    fontFamily: 'Lato',
    fontSize: 18
  },
  progressTypeTxt: {
    fontSize: 15,
    fontFamily: 'Lato',
    marginBottom: 10,
  },
  coworkerContainer: {
    marginVertical: 20,
    width: SCREEN_WIDTH / 1.2,
    paddingHorizontal: 10,
  },
  coworkerImg: {
    borderRadius: 50,
    width: SCREEN_WIDTH / 6,
    height: SCREEN_WIDTH / 6,
  },
  info: {
    marginBottom: 20,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 10,
  },
  info__titile: {
    fontFamily: 'Aldrich',
    fontSize: 25,
    color: 'black',
  },
  info__group: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  info_item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  info_itemTxt: {
    marginVertical: 10,
    fontFamily: 'Aldrich',
    color: 'black',
    fontSize: 17,
  },
  handOverButton:{
    color: 'white',
    fontFamily: 'Aldrich',
    marginRight: 5
  },
  handOverButtonContainer:{
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: 5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  handOverContainer: {
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
  handOverName: {
    color: 'black',
    fontFamily: 'Aldrich',
    fontSize: 14,
  },
  handOverImgContainer: {
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
  handOverImg: {
    borderRadius: 50,
    width: SCREEN_WIDTH / 7,
    height: SCREEN_WIDTH / 7,
  },
  handOverRole: {
    fontFamily: 'Aldrich',
    fontSize: 12,
    color: 'gray',
  },
  handOverInfo: {
    flexDirection: 'column',
    alignItems:'center',
  },
  coworkers: {
  },
  coworker: {
    marginTop:50,
    marginBottom:10,
    marginHorizontal:10,
    paddingHorizontal:20,
    width:SCREEN_WIDTH / 1.5,
    alignSelf: 'flex-start',
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
  coworkerName: {
    color: 'black',
    fontFamily: 'Aldrich',
    fontSize: 23,
  },
  coworkerImgContainer: {
    top:-40,
    borderRadius: 50,
    backgroundColor:'white',
    width: SCREEN_WIDTH / 5,
    height: SCREEN_WIDTH / 5,
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 3 },
    elevation: 5,
  },
  coworkerImg: {
    borderRadius: 50,
    width: SCREEN_WIDTH / 5,
    height: SCREEN_WIDTH / 5
  },
  coworkerIcon:{
    paddingHorizontal:5,
  },
  coworkerIcons:{
    padding:5,
    position:'absolute',
    right:0,
    flexDirection:'row'
  },
  coworkerInfo: {
    top:-10,
    flexDirection: 'column',
    maxWidth: SCREEN_WIDTH / 1.5,
    justifyContent: 'center',
    marginBottom:10,
  },
  coworkerRole: {
    fontFamily: 'Aldrich',
    fontSize: 15,
    color: 'gray',
  },
})
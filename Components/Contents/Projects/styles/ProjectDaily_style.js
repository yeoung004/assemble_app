import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topWrap:{
    width:SCREEN_WIDTH,
  },
  header: {
    overflow: 'hidden',
    backgroundColor: '#393939',
  },
  body: {
    paddingHorizontal:20,
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
    right:10,
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
  padding:{
    height:30,
  },
  timeContainer:{
    padding:20,
    minHeight:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    flexDirection:'row',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    backgroundColor:'#676767',
  },
  issues:{
    top:-100,
    flex:1,
    alignSelf:'center'
  },
  emptyImg:{
    width:SCREEN_WIDTH / 2.5,
    height:SCREEN_WIDTH / 2.5
  },
  emptyTxt:{
    fontFamily:'Aldrich',
    fontSize:18,
    color: 'white',
    textAlign:'center'
  },
  times:{
    padding:30,
  },
  time:{
    flexDirection:'row',
    borderLeftColor:'white',
    borderLeftWidth:5,
    maxWidth:SCREEN_WIDTH / 1.5
  },
  timeLeftTop:{
    width:30,
    height:30,
    borderRadius:50,
    backgroundColor:'white',
    left:-18,
    top:-2
  },
  timeCheck:{
    alignSelf: 'flex-start',
    borderRadius: 3,
    marginLeft: 5,
    marginRight: 8,
  },
  timeStart:{
    fontFamily: 'Aldrich',
    color: 'white',
    fontSize: 19,
  },
  timeTitle:{
    fontFamily: 'Aldrich',
    color: 'white',
    fontSize: 19,
    marginBottom:10
  }
})
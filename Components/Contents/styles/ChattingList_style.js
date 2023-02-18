import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topButtons:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
  topButton:{
    padding:10,
    flexGrow:1,
    alignItems:'center'
  },
  topButtonTxt:{
    fontFamily:'Aldrich',
    fontSize:15
  },
  group:{
    width:SCREEN_WIDTH,
  },
  emptyContainer:{
    width:SCREEN_WIDTH,
    alignItems:'center',
    justifyContent:'center'
  },
  emptyImg:{
    width:SCREEN_WIDTH / 1.5,
    height:SCREEN_WIDTH / 1.5
  },
  emptyTxt:{
    fontFamily:'Aldrich',
    fontSize:18,
    textAlign:'center'
  },
  chatItem: {
    borderBottomColor:'#eaebf3',
    borderBottomWidth:2,
    padding:20,
    paddingHorizontal:30,
    flexDirection: 'row',
  },
  profile__container: {
    flex:1,
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  detail__container: {
    paddingLeft:30,
    flex:9,
    justifyContent:'space-between',
    flexDirection: 'row',
  },
  msgCnt: {
    backgroundColor: 'tomato',
    paddingHorizontal: 2,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 60,
    borderRadius: 30
  },
  cnt: {
    color: 'white'
  },
  name: {
    maxWidth:SCREEN_WIDTH / 2,
    fontSize: 20,
    fontFamily:'Lato'
  },
  lastMsg: {
    fontSize: 15,
    color: 'gray'
  },
  else: {
    flexDirection:'column',
    alignItems:'flex-end'
  },
})
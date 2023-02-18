import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    flex: 1,
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: '#8481FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profile: {
    width: SCREEN_WIDTH / 8,
    height: SCREEN_WIDTH / 8,
    borderRadius: 100,
  },
  searchBox: {
    justifyContent: 'center',
    width: '70%',
    paddingVertical: 13,
    marginHorizontal: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    color: 'black',
    borderRadius: 100,
  },
  post: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listEmpty:{
    width:SCREEN_WIDTH / 1.5,
    height:SCREEN_WIDTH / 1.5
  },
  listEmptyTxt:{
    fontFamily:'Helvetica',
    color:'black',
    fontSize:20,
  },
  indicator: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  content: {
    backgroundColor:'white',
    paddingTop: 10,
    borderBottomWidth: 5,
    borderColor: '#EBEAEA',
  },
  content__header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 20,
    paddingTop: 15,
  },
  header__profile: {
    marginHorizontal: 10,
    width: SCREEN_WIDTH / 6,
    height: SCREEN_WIDTH / 6,
    borderRadius: 100,
  },
  texts__name: {
    fontSize: 21,
  },
  texts__projectName: {
    lineHeight: 15,
    color: 'gray',
    fontSize: 15
  },
  texts__postTime: {
    lineHeight: 10,
    fontSize: 10,
    color: 'gray'
  },
  story__txt: {
    margin: 20,
    fontSize: 15,
    fontFamily: 'Lato'
  },
  story__img: {
    width: '100%',
    height: SCREEN_HEIGHT / 2,
  },
  postInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  postInfo: {
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  postInfo__icons: {
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 50
  },
  postInfo__cnt: {
    color: 'black',
    fontSize: 13,
    marginHorizontal: 3,
  },
  func: {
    padding:10,
    paddingVertical:15,
    borderColor: '#FFFFFF',
    borderTopColor: '#EBEAEA',
    borderTopWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  func__content: {
    alignItems: 'center',
  },
  func__text: {
    color: 'gray',
    fontSize: 10
  },
  upContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    bottom: '12%',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { height: 2, width: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  up: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

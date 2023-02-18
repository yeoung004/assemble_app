import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#63a4ff',
    width: SCREEN_WIDTH,
  },
  dialog: {
    top: SCREEN_WIDTH / 2,
    padding: 15,
    width: 300,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  dialogText: {
    fontSize: 20
  },
  dialogButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 15
  },
  dialogButtonText: {
    color: 'white',
    fontSize: 20
  },
  containner: {
    paddingTop:10,
    backgroundColor: '#63a4ff'
  },
  userView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: SCREEN_WIDTH,
  },
  user: {
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 100,
    marginBottom: 10,
  },
  picture: {
    width: SCREEN_WIDTH / 2.8,
    height: SCREEN_WIDTH / 2.8,
    borderRadius: 100,
  },
  input: {
    flex: 7,
    width: SCREEN_WIDTH / 1.3
  },
  infoContiner: {
    height: SCREEN_WIDTH / 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SCREEN_WIDTH / 90,
    borderRadius: 30,
  },
  infoIcon: {
    paddingHorizontal: 8,
    paddingLeft: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  info: {
    textAlign:'center',
    fontSize: 15,
    fontFamily: 'Lato',
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
    width: SCREEN_WIDTH / 1.4,
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    color: 'black',
  },
  next: {
    bottom: 10,
    right: 10,
    position: 'absolute',
    color: 'white',
    fontSize: 30,
  },
  pickInfos: {
    alignItems: 'center',
  },
  searchContainner: {
    width: SCREEN_WIDTH / 1.1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    padding: 0,
    borderRadius: 100,
    backgroundColor: 'lightgray',
  },
  searchBox: {
    height: SCREEN_WIDTH / 8,
    width: SCREEN_WIDTH / 1.1,
    backgroundColor: 'white',
    borderRadius: 100,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  searchList: {
    zIndex: 10,
    top: SCREEN_WIDTH / 7,
    position: 'absolute',
    width: SCREEN_WIDTH / 1.1,
    maxHeight: SCREEN_HEIGHT / 2.5,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  item: {
    paddingVertical: 10,
    width: SCREEN_WIDTH / 1.2,
    color: 'lightgray',
  },
  skillBox: {
    top: 40,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center'
  },
  skillBox__item: {
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'whitesmoke'
  },
  careerView: {
  },
  modal: {
    top: SCREEN_WIDTH / 2,
    padding: 15,
    width: 300,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  userCareers: {
    width: SCREEN_WIDTH,
  },
  userCareer: {
    paddingHorizontal: 10
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  date: {
    justifyContent: 'center',
    flex: 0.45,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  date_txt: {
    textAlign: 'center',
    fontSize: 17,
  },
  careerInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    shadowOffset: { height: 1, width: 1 },
    paddingHorizontal: 15,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10
  },
  button: {
    width: SCREEN_WIDTH / 1.1,
    alignSelf: 'center',
    height: 40,
    backgroundColor: '#647dee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  button__txt: {
    color: 'white',
    fontSize: 20
  },
  careers: {
    flexDirection:'row',
    padding:10,
    flexWrap: 'wrap',
  },
  career: {
    margin:5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  careerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  careerX: {
    color: 'black',
    fontSize: 20,
    marginRight: 10,
  }
})
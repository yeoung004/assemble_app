import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 1.2,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  bodyText: {
    width:'100%',
    paddingHorizontal: 30,
    paddingVertical: 11,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 30,
  },
  tags: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  tagTxt: {
    fontFamily: 'Lato',
    fontSize: 15,
    marginRight: 10,
    maxWidth: 100,
  },
  buttons: {
    width: '100%',
  },
  button: {
    marginTop:10,
    flexGrow: 1,
    borderRadius: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTxt: {
    padding: 15,
    color: 'white',
    fontSize: 15,
  }
})
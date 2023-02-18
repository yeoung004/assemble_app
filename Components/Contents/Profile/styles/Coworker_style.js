import { Dimensions, StyleSheet } from "react-native"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFB",
    padding:10,
  },
  body: {
    minHeight:100,
    borderRadius:20,
    backgroundColor: 'white',
    margin: 10,
    marginVertical:25,
    padding:10,
    paddingVertical:0,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
  },
  contentHeader:{
    top:-20,
    backgroundColor:'#fe6869',
    borderRadius:30,
    paddingVertical:6,
    paddingHorizontal:10,
    alignItems:'center',
  },
  title:{ 
    fontSize: 23,
    fontFamily:'Lato',
    color:'white',
  },
  content: {
    top:-15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 10,
    fontSize: 20,
    color: '#353A64',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 100,
    margin: 10
  },
})
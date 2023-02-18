
import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	dropdown:{
		margin:10,
		backgroundColor:'white',
		paddingVertical:5,
		paddingLeft:20,
		paddingRight:10,
		borderRadius:50,
		borderColor:'#363861',
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowOffset:{height:2,width:2},
		shadowRadius: 4,
		elevation: 5,
	},
	modalHeader: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		alignItems: 'center',
		borderBottomColor: 'black',
		borderBottomWidth: 2
	},
	modalProjectMiddle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	modalProjectSelector: {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 100,
		width: 200,
		paddingHorizontal: 10,
		margin: 10
	},
	modalHeaderTxt: {
		fontSize: 25,
		fontFamily: 'Lato',
	},
	body: {
		flex: 1,
		padding: 10,
		fontSize: 20,
		fontFamily: 'Lato',
	},
	postTextSize: {
		marginLeft: 10,
		color: 'gray',
		fontFamily: 'Lato'
	},

	postImage: {
		width: SCREEN_WIDTH,
		height: 100,
		flexDirection: 'row'
	},
	postImageBody: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	postImageBodyImage: {
		width: 100,
		height: 100
	},
	postImageBodyTxt: {
		width: SCREEN_WIDTH - 180,
		justifyContent: 'center',
		alignItems: 'center'
	},
	postImageRemove: {
		width: 80,
		height: 100,
		backgroundColor: 'tomato',
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
		paddingHorizontal: 50,
		alignItems: 'center',
	},
})

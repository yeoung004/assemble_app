import { Dimensions, Platform, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    commentModalHeader: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        height: 55,
        width: '100%',
        backgroundColor: '#8481FF'
    },
    commentModalHeaderTxt: {
        marginLeft: 40,
        fontSize: 20,
        color: 'white'
    },
    comments: {
        backgroundColor: '#FBFBFB',
        paddingVertical: 20,
        alignItems: 'flex-start',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    addCommentContainer: {
        width:SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal:5,
        shadowOffset:{width:10, height:1},
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        backfaceVisibility:'visible'
    },
    addCommentText: {
        paddingHorizontal:5,
        width: SCREEN_WIDTH / 1.2,
    },
    addCommentBtn: {
        color: '#6B83FF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    comment: {
        flexDirection:'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal:10,
        borderRadius: 20,
        borderBottomColor:'lightgray',
        borderBottomWidth:1
    },
    commentProfile: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    commentName: {
        fontSize: 20,
        marginRight: 10
    },
    commentDate: {
        fontSize: 10
    },
    commentTxt: {
        fontSize:16,
    },
    commentLeft:{
        marginHorizontal:10
    },
    commentBody:{
        flexBasis:SCREEN_WIDTH / 2,
        flexGrow:1,
    },
    editCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'lightgray',
        paddingVertical: 10,
        paddingHorizontal: 10,
        maxWidth: SCREEN_WIDTH / 1.2
    },
    editCommentAddTxt: {
        marginLeft: 25,
        maxWidth: SCREEN_WIDTH / 1.7
    },
    editCommentAddBtn: {
        marginHorizontal: 10
    },
    editCommentAddBtnTxt: {
        color: '#6B83FF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    indicator: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        marginVertical: 10,
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
})

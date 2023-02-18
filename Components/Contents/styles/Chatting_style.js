import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    errorModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorModalContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 30,
        borderRadius: 40,
    },
    errorModalBody: {
        padding: 10,
        width: SCREEN_WIDTH / 1.5,
        justifyContent: 'center',
        paddingHorizontal: 22,
    },
    errorModalButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    errorModalButtonMid: {
        borderBottomColor: 'black',
        borderTopColor: 'black',
        borderBottomWidth: 2,
        borderTopWidth: 2
    },
    errorModalButtonTxt: {
        color: 'black',
        fontSize: 23
    },
    content: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    header: {
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 50,
        width: SCREEN_WIDTH,
        backgroundColor: '#8481FF'
    },
    userName: {
        marginLeft: 20,
        fontSize: 20,
        color: 'white'
    },
    errorMessageContainer: {
        paddingVertical: 5,
        alignItems: 'flex-end',
    },
    errorMessage: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: '#F01818',
        right: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        maxWidth: '80%',
        marginBottom: 5
    },
    errorMessageTxt: {
        color: 'white',
        marginHorizontal: 15
    },
    msg: {
    },
    bubbleLeft: {
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 2,
        borderColor: '#5B66F0'
    },
    bubbleRight: {
        backgroundColor: '#5B66F0',
        padding: 5,
    }
})
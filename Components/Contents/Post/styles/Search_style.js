import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#EBEAEA',
        height: 45,
        paddingHorizontal: 20,
        paddingRight:30,
        color: 'black',
        borderRadius: 100,
    },
    searchModalBody: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    searchModalBodyItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchModalBodyItemFront: {
        flex: 1,
        flexDirection: 'row'
    },
})

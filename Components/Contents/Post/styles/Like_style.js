import { Dimensions, StyleSheet } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    name: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 100,
        margin: 10
    },
})
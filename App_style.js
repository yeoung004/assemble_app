import { StyleSheet, Dimensions } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    logo: {
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 2,
    },
    logoText: {
        fontSize: 40,
        color: "white",
        fontFamily: "Aldrich",
    },
})

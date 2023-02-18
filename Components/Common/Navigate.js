import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native"
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons
} from "@expo/vector-icons"
import { StyleSheet, Dimensions } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const iconSize = SCREEN_WIDTH / 13

export const Navigate = ({ navigation, nowScreen }) => {
  const navigateScreen = (screen) => {
    navigation.navigate(screen)
  }

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        onPress={() => {
          nowScreen !== 'Community' ? navigateScreen('Community') : ''
        }}>
        {nowScreen == 'Community' ?
          <View style={styles.selectedMenu}>
            <Ionicons
              name="ios-home"
              size={iconSize}
              color="black"
              style={{ alignSelf: "center" }} />
          </View>
          :
          <Ionicons
            name="ios-home-outline"
            size={iconSize}
            color="black"
            style={{ alignSelf: "center" }} />
        }
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          nowScreen !== 'Projects' ? navigateScreen('Projects') : ''
        }}>
        {nowScreen === 'Projects' ?
          <View style={styles.selectedMenu}>
            <AntDesign
              name="appstore1"
              size={iconSize}
              color="black"
              style={{ alignSelf: "center" }} /></View> :
          <AntDesign
            name="appstore-o"
            size={iconSize}
            color="black"
            style={{ alignSelf: "center" }} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          nowScreen !== 'ChattingList' ? navigateScreen('ChattingList') : ''
        }}>
        {nowScreen === 'ChattingList' ?
          <View style={styles.selectedMenu}>
            <MaterialCommunityIcons
              name="message"
              style={{ alignSelf: "center" }}
              size={iconSize}
              color="black"
            />
          </View>
          :
          <Feather
            name="message-square"
            style={{ alignSelf: "center" }}
            size={iconSize}
            color="black"
          />
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedMenu: {
    paddingBottom: 3,
    borderBottomColor: 'black',
    borderBottomWidth: 3
  },
  menu: {
    paddingTop: 15,
    paddingBottom: 10,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    elevation: 10,
  },
  navText: {
    color: 'black',
    fontSize: 12
  },
  navTextMain: {
    color: 'black',
    fontSize: 12
  }
})
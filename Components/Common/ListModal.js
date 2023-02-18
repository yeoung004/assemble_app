import { useState } from 'react'
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const ListModal = ({ navigation, route }) => {
  const isLeftImage = route.params?.leftImage ? true : false

  return (
    <View style={styles.container}>
      <FlatList
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        data={route.params.items}
        style={styles.itemWrapper}
        keyExtractor={(_, index) => 'index' + index}
        renderItem={({ item, index }) => {
          let isSelected = route.params?.selected === item

          return (
            <View
              key={'index' + index}
              style={[styles.item, {
                backgroundColor: isSelected ? 'whitesmoke' : 'white',
              }]}>
              <TouchableOpacity
                onPress={() => {
                  route.params.itemSelecter(item)
                  navigation.goBack()
                }}
                style={styles.itemButton}>
                {isLeftImage &&
                  <View style={styles.leftImage}>
                    <Image
                      resizeMode='center'
                      style={{ width: '100%', height: '100%' }}
                      resizeMethod='auto'
                      source={{ uri: route.params?.leftImage[index] }} />
                  </View>
                }
                <Text 
                  style={[styles.itemTxt, {
                  color: isSelected ? 'gray' : 'black',
                }]}>{item}</Text>
              </TouchableOpacity>
            </View>
          )
        }}>
      </FlatList>
      <TouchableOpacity
        onPress={() => { navigation.goBack() }}
        style={styles.close}>
        <Text style={styles.closeTxt}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH / 1.1,
    maxHeight: SCREEN_HEIGHT / 1.3,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  itemWrapper: {
    width: SCREEN_WIDTH / 1.3,
    marginVertical: 10,
  },
  item: {
    justifyContent: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    padding: 10,
  },
  itemButton: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  leftImage: {
    width: 20,
    height: 20,
    flexGrow: 1
  },
  itemTxt: {
    flexGrow: 9,
    flexShrink: 1,
    textAlign: 'center',
    fontSize: 17,
  },
  close: {
    paddingVertical: 5,
    width: SCREEN_WIDTH / 1.5,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  closeTxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Lato'
  }
})
import { useContext, useState } from "react"
import { styles } from './styles/Tutorial_style'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LANGUAGE_KEY, TUTORIAL_KEY } from "../AsyncKeys/userKey"
import { Picker } from '@react-native-picker/picker';
import { AppContext } from "../../utils/context"
import { setLanguage } from "../../assets/Language/language"
const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const Tutorial = ({ navigation }) => {
  const { lan } = useContext(AppContext)
  const [index, setIndex] = useState(0)
  const [isSetLan, setIsSetLan] = useState(false)
  const [selectedLan, setSelectedLan] = useState('en')
  const passedTutorial = async () => {
    await AsyncStorage.setItem(TUTORIAL_KEY, JSON.stringify({ isTutorialPassed: true }))
    navigation.replace('SignIn', { preScreen: 'Tutorial' })
  }

  const getScrollIndex = (e) => {
    const index = Math.ceil(e.nativeEvent.contentOffset.x / SCREEN_WIDTH)
    if (index > 3)
      setIndex(3)
    else
      setIndex(index)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Hello, world!</Text>
      </View>
      <ScrollView
        onScroll={getScrollIndex}
        scrollEnabled={isSetLan}
        showsHorizontalScrollIndicator={false}
        style={styles.body}
        pagingEnabled
        horizontal>
        {!isSetLan &&
          <View style={[styles.page, {
            justifyContent: 'flex-start',
          }]}>
            <View style={{ flex: 1, justifyContent: 'space-evenly', left: -5 }}>
              <View>
                <Text style={styles.title}>Language</Text>
                <Picker
                  style={{
                    backgroundColor: 'white',
                    width: SCREEN_WIDTH / 1.3,
                    borderRadius: 20,
                    marginVertical: 20
                  }}
                  selectedValue={selectedLan}
                  onValueChange={(value) => setSelectedLan(value)}>
                  <Picker.Item label="English" value={'en'} />
                  <Picker.Item label="한국어" value={'kr'} />
                </Picker>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  lan.current = setLanguage(selectedLan)
                  await AsyncStorage.setItem(LANGUAGE_KEY, JSON.stringify({ lan: selectedLan }))
                  setIsSetLan(true)
                }}
                style={[styles.button, { left: 5 }]}>
                <Text style={styles.start}>Choose</Text>
              </TouchableOpacity>
            </View>
          </View>}
        <View style={styles.page}>
          <View style={styles.back}></View>
          <Image resizeMode="contain" style={styles.image} source={require('../../assets/tutorial/tutorial1.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{lan.current.TUTORIAL.tutorial1.title}</Text>
            <Text style={styles.content}>{lan.current.TUTORIAL.tutorial1.content}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.back}></View>
          <Image resizeMode="contain" style={styles.image} source={require('../../assets/tutorial/tutorial2.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{lan.current.TUTORIAL.tutorial2.title}</Text>
            <Text style={styles.content}>{lan.current.TUTORIAL.tutorial2.content}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.back}></View>
          <Image resizeMode="contain" style={styles.image} source={require('../../assets/tutorial/tutorial3.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{lan.current.TUTORIAL.tutorial3.title}</Text>
            <Text style={styles.content}>{lan.current.TUTORIAL.tutorial3.content}</Text>
          </View>
        </View>
        <View style={styles.page}>
          <View style={styles.back}></View>
          <Image resizeMode="contain" style={styles.image} source={require('../../assets/tutorial/tutorial4.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{lan.current.TUTORIAL.tutorial3.title}</Text>
            <Text style={styles.content}>{lan.current.TUTORIAL.tutorial3.content}</Text>
          </View>
          <TouchableOpacity onPress={() => passedTutorial()} style={styles.button}>
            <Text style={styles.start}>Assemble</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isSetLan &&
        <View style={styles.footer}>
          <View style={[styles.index, { opacity: index === 0 ? 1 : 0.7 }]} />
          <View style={[styles.index, { opacity: index === 1 ? 1 : 0.7 }]} />
          <View style={[styles.index, { opacity: index === 2 ? 1 : 0.7 }]} />
          <View style={[styles.index, { opacity: index === 3 ? 1 : 0.7 }]} />
        </View>}
    </View>
  )
}
import { useContext, useState } from "react"
import { AppContext } from '../../../utils/context'
import {
  TextInput,
  TouchableOpacity,
  View,
  Text
} from "react-native"
import { CustomText } from "../../Common/Text"
import { styles } from './styles/UrlPreview_style'

export const UrlPreview = ({ navigation, route }) => {
  const [url, setUrl] = useState('')
  const { lan } = useContext(AppContext)
  const { UrlPreview: lanText } = lan.current

  return (
    <View style={styles.container}>
      <CustomText text={'URL'} textStyle={styles.title} />
      <TextInput
        maxLength={500}
        keyboardType={'url'}
        placeholder={lanText.egURL}
        style={styles.url}
        value={url}
        onChangeText={(text) => {
          const result = text.split(' ').join('')
          setUrl(result)
        }} />
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            if (url.length > 0) {
              const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
              if (expression.test(url)) {
                route.params.setLinkState('link')
                route.params.setPreviewURL(url)
                navigation.goBack()
              } else {
                navigation.navigate('InfoModal', {
                  text: lanText.wrong,
                  state: false
                })
              }
            }
          }}
          style={[styles.button, { backgroundColor: '#e94c61' }]}>
          <Text style={[styles.buttonTxt, { color: (url.length > 0 ? 'white' : '#ff847c') }]}>
            {lanText.add}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2c373d' }]}
          onPress={() => {
            navigation.setParams({ linkState: 'link' })
            navigation.goBack()
          }}>
          <CustomText text={lanText.cancel} textStyle={styles.buttonTxt} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
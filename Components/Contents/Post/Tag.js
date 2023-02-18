import { useContext, useEffect, useState } from "react"
import { AppContext } from '../../../utils/context'
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from './styles/Tag_style'
import { AntDesign } from "@expo/vector-icons"

export const Tag = ({ navigation, route }) => {
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  const { lan } = useContext(AppContext)
  const { Tag : lanText} = lan.current

  const removePostTag = (delIndex) => {
    let temp = []
    tags.forEach((value, index) => {
      if (index != delIndex)
        temp.push(value)
    })
    setTags([...temp])
  }
  const showInfoModal = (text, isError = false) => {
    if (isError)
      text = lanText.info(text)
    navigation.navigate('InfoModal', { text, state: isError })
  }
  const addTag = () => {
    if (tag?.length > 0) {
      if (tags?.length < 5) {
        const temp = [...tags, tag]
        setTags(temp)
        setTag('')
      } else
        showInfoModal(lanText.max)
    }
  }
  useEffect(() => {
    if (route.params?.postTags)
      setTags([...route.params.postTags])
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          returnKeyType="done"
          maxLength={100}
          onChangeText={(text) => {
            const result = text.split(' ').join('')
            setTag(result)
          }}
          value={tag}
          onSubmitEditing={() => addTag()}
          style={styles.bodyText}
          placeholder={lanText.addTag}/>
        <View style={styles.tags}>
          {tags.map((tag, index) => {
            return (
              <TouchableOpacity
                onPress={() => removePostTag(index)}
                style={styles.tag}
                key={index}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={styles.tagTxt}>{tag}</Text>
                <AntDesign name="close" size={15} color="white" />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => addTag()}
          style={[styles.button, { backgroundColor: '#e94c61' }]}>
          <Text style={[styles.buttonTxt, { color: (tag?.length > 0 ? 'white' : '#ff847c') }]}>
            {lanText.add}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2c373d' }]}
          onPress={() => {
            route.params.setPostTags([...tags])
            navigation.goBack()
          }}>
          <Text style={styles.buttonTxt}>{lanText.close}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
import { useContext, useEffect, useRef, useState } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native"
import { Dropdown } from 'react-native-element-dropdown'
import {
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons"
import Modal from 'react-native-modal'
import * as ImagePicker from 'expo-image-picker'
import { getImageBasedUrl } from "../../Common/Common"
import { CustomText } from "../../Common/Text"
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import FormData from "form-data"
import { styles } from './styles/Posting_style'
import { useBackHandler } from "@react-native-community/hooks"
import { IP_ADDRESS } from "../../../config/key"
import { AppContext } from "../../../utils/context"
import axios from "axios"
import moment from "moment"
const CONTENT_IMAGE_BASE_URL = getImageBasedUrl()
const baseURL = IP_ADDRESS + '/post/'

export const Posting = ({ navigation, route }) => {
  const [postTxt, setPostTxt] = useState('')
  const [linkState, setLinkState] = useState(null)
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [postTags, setPostTags] = useState([])
  const [projects, setProjects] = useState([])
  const [isFocus, setIsFocus] = useState(false)
  const [project, setProject] = useState(null)
  const [permission, setPermission] = ImagePicker.useMediaLibraryPermissions()
  const [previewURL, setPreviewURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const { userID, lan } = useContext(AppContext)
  const { Posting: lanText} = lan.current
  const textCount = useRef()
  const isEditing = useRef(false)
  const isIOS = Platform.OS === 'ios'
  useBackHandler(() => backHandler())
  const backHandler = () => {
    if (postTxt.length > 0) {
      navigation.navigate('ConfirmModal', {
        comment: lanText.quit,
        METHOD: () => navigation.goBack()
      })
      return true
    }
  }
  const backButton = () => {
    if (textCount.current > 0) {
      navigation.navigate('ConfirmModal', {
        comment: lanText.quit,
        METHOD: () => navigation.goBack()
      })
    } else
      navigation.goBack()
  }
  const isValidPost = () => {
    if (postTxt.length === 0) {
      showInfoModal(lanText.noContent)
      return false
    }
    if (postTags.length === 0) {
      showInfoModal(lanText.noTag)
      return false
    }
    return true
  }
  const postHandler = async (type, params = {}) => {
    let body = {}
    let temp = []
    let link = null

    switch (type) {
      case 'INSERT':
          if (linkState === 'picture') {
            try {
              link = await imageUpload()
            } catch (error) {
              console.log('postHandler', error)
              showInfoModal(lanText.infos.upload, true)
            }
          } else if (linkState === 'link')
            link = previewURL

          body = {
            WRITER: userID,
            TEXT: postTxt,
            TAGS: [...postTags],
            PROJECT_ID: project.ID,
            CONTENT_LINK: link,
            CONTENT_TYPE: linkState
          }
          try {
            await axios.post(baseURL + 'post', body)
            showInfoModal(lanText.infos.sucess)
            navigation.goBack()
          } catch (error) {
            showInfoModal(lanText.infos.upload, true)
            console.log('uploadPost', error)
          }
        break
      case 'UPDATE':
          const { params } = route
          let post = {...params.posts[params.post]}
          const lastImageURL = CONTENT_IMAGE_BASE_URL + post.CONTENT_LINK
          if (lastImageURL == imageURL?.uri)
            link = imageURL
          else if (linkState === 'picture') {
            try {
              link = await imageUpload()
            } catch (error) {
              console.log('postHandler', error)
              showInfoModal(lanText.infos.upload, true)
            }
          } else if (linkState === 'link')
            link = previewURL

          body = {
            POSTID: post.ID,
            WRITER: userID,
            TEXT: postTxt,
            TAGS: [...postTags],
            PROJECT_ID: project.ID,
            CONTENT_LINK: link,
            CONTENT_TYPE: linkState
          }
          if (post.CONTENT_TYPE == 'picture' && post.CONTENT_LINK != imageURL)
            body.key = `postContents/${post.CONTENT_LINK}`
          try {
            await axios.put(baseURL + 'post', body)
            showInfoModal(lanText.infos.sucess)
            let posts = [...params.posts]
            Object.keys(body).map((key, index) => {
              posts[params.post][key] = body[key]
            })
            params.setPosts([...posts])
            navigation.goBack()
          } catch (error) {
            showInfoModal(lanText.infos.upload, true)
            console.log('uploadPost', error)
          }
        break
    }
  }
  const showInfoModal = (text, isError = false) => {
    if (isError)
      text = lanText.info(text)
    navigation.push('InfoModal', { text, state: isError })
  }
  
  const setPostforEditting = async (post) => {
    try {
      const { data } = await axios.get(baseURL + 'tag/' + post.ID)
      let tags = []
      data.forEach((value) => {
        tags.push(value.TAG)
      })
      setPostTags([...tags])
      if (post.CONTENT_TYPE === 'picture')
        setImageURL({ uri: CONTENT_IMAGE_BASE_URL + post.CONTENT_LINK })
      else if (post.CONTENT_TYPE === 'link')
        setPreviewURL(post.CONTENT_LINK)
      setPostTxt(post.TEXT)
      setLinkState(post.CONTENT_TYPE)
      setProject({ ID: post.PROJECT_ID, PROJECT_NAME: post.PROJECT_NAME })
    } catch (error) {
      console.log('updatePost', error)
      showInfoModal(lanText.infos.tag, true)
    }
  }
  const imageUpload = () => {
    const formData = new FormData()
    const now = moment.utc().format('YYYYMMDDHHmmss')
    const filename = imageURL.uri.split('/').pop()
    const match = /\.(\w+)$/.exec(filename ?? '')
    const type = match ? `image/${match[1]}` : `image`
    const fileExtension = filename.split('.').pop()
    const imageName = `${userID}_${now}_${project.ID}.${fileExtension}`
    const xhr = new XMLHttpRequest()

    formData.append('image', { uri: imageURL.uri, name: filename, type })
    return new Promise((res, rej) => {
      xhr.open('post', `${baseURL}picture`, true)
      xhr.onload = () => {
        const response = JSON.parse(xhr.response)
        if (response?.isUploaded) {
          res(imageName)
        } else {
          showInfoModal(lanText.infos.upload, true)
        }
      }
      xhr.setRequestHeader('uri', 'postContents/' + imageName)
      xhr.onerror = e => {
        showInfoModal(lanText.infos.upload, true)
        rej('imageUpload', e)
      }
      xhr.send(formData)
    })
  }
  const getPostImage = async () => {
    if (!permission?.granted) {
      const permission_status = await setPermission()
      if (!permission_status.granted) {
        showInfoModal(lanText.openGallery)
      }
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1]
      })

      if (!result.cancelled) {
        setImageURL({ uri: result.uri })
        setLinkState('picture')
      }
    }
  }

  useEffect(() => {
    const { params } = route
    if(params?.post != null){
      setPostforEditting(params.posts[params.post])
      isEditing.current = true
    }
    if (params?.projects){
      setProjects(params.projects)
      setProject({...params.projects[0]})
    }
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      style={styles.container}>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        onBackButtonPress={() => setImageModalVisible(false)}
        isVisible={imageModalVisible}>
        <TouchableWithoutFeedback
          onPress={() => setImageModalVisible(false)}>
          <ImageBackground
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
            source={{ uri: imageURL?.uri }} />
        </TouchableWithoutFeedback>
      </Modal>
      <View style={{
        backgroundColor:'#34495e',
        paddingVertical:11,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:15,
      }}>
        <TouchableOpacity onPress={() => backButton()}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{fontFamily:'Lato', color:'white', fontSize:23}}>Post</Text>
        {isIOS&&isFocus?<TouchableOpacity onPress={()=> {
          setIsFocus(false);
          Keyboard.dismiss()
        }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Done</Text>
        </TouchableOpacity>:
        <TouchableOpacity
          onPress={()=>{
            if(isValidPost())
                postHandler(isEditing.current ? 'UPDATE' : 'INSERT')
          }}>
          <MaterialIcons name="file-upload" size={30} color="white" />
        </TouchableOpacity>}
      </View>
      <View>
        <Dropdown
          maxHeight={(55 * projects.length) > 291 ? 291 : 55 * projects.length}
          style={styles.dropdown}
          containerStyle={{
            marginTop: 8,
            width: '80%',
            marginRight: 30,
            alignSelf: 'flex-end',
          }}
          labelField="PROJECT_NAME"
          valueField="ID"
          value={projects[0]?.ID}
          autoScroll
          onChange={(item) => setProject(item)}
          data={projects} />
        <CustomText
          text={postTxt.length != 0 && `${postTxt.length}/2000`}
          textStyle={styles.postTextSize} />
      </View>
      <TextInput
        onFocus={() => {
          if(isIOS) 
            setIsFocus(true)
        }}
        keyboardType={"default"}
        style={styles.body}
        maxLength={2000}
        onChangeText={(text) => {
          setPostTxt(text)
          textCount.current = text.length
        }}
        value={postTxt}
        textAlignVertical='top'
        multiline
        placeholder={lanText.postPlace} />
      {previewURL?.length > 0 &&
        <LinkPreview
          text={previewURL}
          onError={() => showInfoModal(lanText.urlError)} />}
      {imageURL &&
        <View style={styles.postImage}>
          <TouchableOpacity
            style={styles.postImageBody}
            onPress={() => setImageModalVisible(true)}>
            <Image
              source={{ uri: imageURL.uri }}
              style={styles.postImageBodyImage} />
            <View style={styles.postImageBodyTxt}>
              <CustomText text={'Image'} textStyle={{ fontSize: 20 }} />
              <CustomText text={lanText.click}
                textStyle={{ fontSize: 15 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setImageURL(null)
              setLinkState(null)
            }}
            style={styles.postImageRemove}>
            <Feather name="trash-2" size={30} color="white" />
          </TouchableOpacity>
        </View>
      }
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if (!linkState || linkState === 'picture')
              getPostImage()
          }}>
          <AntDesign name="picture" size={30}
            color={!linkState || linkState === 'picture' ? "black" : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!linkState || linkState === 'link')
              navigation.navigate('UrlPreview', {
                setLinkState,
                setPreviewURL
              })
          }}>
          <MaterialCommunityIcons name="link-plus" size={30}
            color={!linkState || linkState === 'link' ? "black" : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tag', { postTags, setPostTags })}>
          <AntDesign name="tags" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
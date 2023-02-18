import { useContext, useEffect, useRef, useState } from "react"
import {
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons"
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native"
import { ProfileImage } from "../../Common/ProfileImage"
import { CustomText } from "../../Common/Text"
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import { IP_ADDRESS } from "../../../config/key"
import { getImageBasedUrl } from "../../Common/Common"
import { AppContext } from "../../../utils/context"
import { styles } from "./styles/Comment_style"
import { useKeyboard } from '@react-native-community/hooks'
import moment from "moment"
import axios from "axios"
const CONTENT_IMAGE_BASE_URL = getImageBasedUrl()
const baseURL = IP_ADDRESS + '/post/comment'

export const Comment = ({ navigation, route }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [commentRefreshing, setCommentRefreshing] = useState(false)
  const [selectedCommentID, setSelectedCommentID] = useState(null)
  const { userID, lan } = useContext(AppContext)
  const keyboard = useKeyboard()
  const scroll = useRef()
  const post = route.params
  const { ID: POSTID } = post
  const { Comment: lanText } = lan.current
  const showInfoModal = (text, isError = false) => {
    if (isError)
      text = lanText.info(text)
    navigation.navigate('InfoModal', { text, state: isError })
  }

  const commentHandler = async (type, params = {}) => {
    let body = {}
    let temp = []

    switch (type) {
      case 'INSERT':
        body = {
          WRITER: userID,
          POSTID: POSTID,
          COMMENT: comment
        }
        try {
          const { data } = await axios.post(baseURL, body)
          setComments([...data])
        } catch (error) {
          console.log('updateComment', error)
          showInfoModal(lanText.infos.update, true)
        }
        break
      case 'SELECT':
        try {
          const { data } = await axios.get(baseURL + '/' + POSTID)
          setComments([...data])
        } catch (error) {
          console.log('getComment', error)
          showInfoModal(lanText.infos.get, true)
        }
        break
      case 'UPDATE':
        body = {
          COMMENTID: params.COMMENTID,
          POSTID,
          COMMENT: comment
        }
        try {
          const { data } = await axios.put(baseURL, body)
          temp = [...comments]
          temp[params.COMMENTINDEX].COMMENT = comment
          setComments(temp)
        } catch (error) {
          console.log('updateComment', error)
          showInfoModal(lanText.infos.update, true)
        }
        break
      case 'DELETE':
        body = {
          data: {
            COMMENTID: params.COMMENTID,
            POSTID
          }
        }
        try {
          const { data } = await axios.delete(baseURL, body)
          comments.forEach((value, index) => {
            if (index !== params.COMMENTINDEX)
              temp.push(value)
          })
          setComments(temp)
        } catch (error) {
          console.log('deleteComment', error)
          showInfoModal(lanText.infos.del, true)
        }
        break
    }
    setComment('');
    setSelectedCommentID(null)
    setCommentRefreshing(false)
  }

  useEffect(() => {
    commentHandler('SELECT')
  }, [])

  return (
    <>
      <FlatList
        ref={scroll}
        indicatorStyle="black"
        style={styles.container}
        onRefresh={() => commentHandler('SELECT')}
        refreshing={commentRefreshing}
        data={comments}
        ListHeaderComponent={() => {
          return (
            <View style={[styles.content, { backgroundColor: 'white' }]}>
              <View style={styles.content__header}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => navigation.replace('Profile', { profileUser: WRITER })}>
                    <ProfileImage
                      styles={styles.header__profile}
                      source={post.PROFILE_URL} />
                  </TouchableOpacity>
                  <View style={styles.header__texts}>
                    <CustomText text={post.USER_NAME} textStyle={styles.texts__name} />
                    <CustomText text={post.PROJECT_NAME} textStyle={styles.texts__projectName} />
                    <CustomText text={moment.utc(post.UPLOAD_TIME).local().format('YYYY.MM.DD')} textStyle={styles.texts__postTime} />
                  </View>
                </View>
              </View>
              <View style={styles.story}>
                <CustomText text={post.TEXT} textStyle={styles.story__txt} />
                {post.CONTENT_TYPE === 'picture' && <Image style={styles.story__img} source={{ uri: CONTENT_IMAGE_BASE_URL + post.CONTENT_LINK }} />}
                {post.CONTENT_TYPE === 'link' && <LinkPreview text={post.CONTENT_LINK}/>}
              </View>
            </View>
          )
        }}
        keyExtractor={(item, index) => item.ID}
        keyboardDismissMode={"interactive"}
        renderItem={({ item, index, separators }) => {
          const date = moment.utc(item.WRITED_AT).local().format('YYYY.MM.DD')
          return (
            <View style={styles.comment} key={index}>
              <TouchableOpacity
                style={styles.commentLeft}
                onPress={() => navigation.replace('Profile', { profileUser: item.WRITER })}>
                <ProfileImage source={item.PROFILE_URL} styles={styles.commentProfile} />
              </TouchableOpacity>
              <View style={styles.commentBody}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <View style={{ flexDirection: 'column' }}>
                    <CustomText text={item.USER_NAME} textStyle={styles.commentName} />
                    <CustomText text={date} textStyle={styles.commentDate} />
                  </View>
                  {item.WRITER === userID &&
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ConfirmModal', {
                            comment: lanText.del,
                            METHOD: () => {
                              commentHandler('DELETE', { COMMENTID: item.ID, COMMENTINDEX: index })
                              navigation.navigate('Comment', { ...route.params })
                            }
                          })
                        }}>
                        <EvilIcons name="trash" size={30} color="black" />
                      </TouchableOpacity>
                      {selectedCommentID === item.ID ?
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedCommentID(null)
                            setComment('')
                          }}>
                          <MaterialIcons name="edit-off" size={25} color="black" />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => {
                          setSelectedCommentID({ COMMENTID: item.ID, COMMENTINDEX: index })
                          setComment(item.COMMENT)
                        }}>
                          <EvilIcons name="pencil" size={30} color="black" />
                        </TouchableOpacity>}
                    </View>}
                </View>
                <CustomText selectable={true} text={item.COMMENT} textStyle={styles.commentTxt} />
              </View>
            </View>
          )
        }}>
      </FlatList>
      <View style={[styles.addCommentContainer,
      Platform.OS === 'ios'
      && keyboard.keyboardShown
      && { marginBottom: keyboard.keyboardHeight }]}>
        <TextInput
          value={comment}
          style={styles.addCommentText}
          maxLength={2000}
          multiline
          placeholder={lanText.new}
          onChangeText={setComment} />
        {comment.length > 0 &&
          <TouchableOpacity
            onPress={() => {
              if (selectedCommentID)
                commentHandler('UPDATE', selectedCommentID)
              else
                commentHandler('INSERT')
            }}>
            <CustomText
              text={selectedCommentID ? lanText.select[0] : lanText.select[1]}
              textStyle={styles.addCommentBtn} />
          </TouchableOpacity>}
      </View>
    </>
  )
}
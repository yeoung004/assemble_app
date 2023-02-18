import { useContext, useEffect, useRef, useState } from "react"
import {
  View,
  Image,
  TouchableOpacity,
  Share,
  FlatList,
  Animated,
  Dimensions,
  Platform,
  Text,
} from "react-native"
import {
  AntDesign,
  Feather,
  Foundation,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons"
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import ReadMore from '@fawazahmed/react-native-read-more'
import Spinner from 'react-native-loading-spinner-overlay'
import moment from "moment"
import axios from "axios"

import { AppContext } from "../../../utils/context"
import { IP_ADDRESS } from '../../../config/key'
import { styles } from "./styles/Community_style"
import { Navigate } from "../../Common/Navigate"
import { getImageBasedUrl } from "../../Common/Common"
import { ProfileImage } from '../../Common/ProfileImage'
import { CustomText } from "../../Common/Text"
const { width: SCREEN_WIDTH } = Dimensions.get("window")

const CONTENT_IMAGE_BASE_URL = getImageBasedUrl()
const isIOS = Platform.OS === 'ios'
const iconSize = SCREEN_WIDTH / 15

export const Community = ({ navigation, route }) => {
  const scrollRef = useRef()
  const [searchTxt, setSearchTxt] = useState('')
  const [posts, setPosts] = useState([])
  const [projects, setProjects] = useState([])
  const [postRefreshing, setPostRefreshing] = useState(false)
  const [spin, setSpin] = useState(false)
  const {
    lan,
    userInfos,
    userID,
    fireDatabase
  } = useContext(AppContext)
  const slide = useRef(new Animated.Value(SCREEN_WIDTH + 50)).current
  const user_infos = userInfos.current
  const baseURL = IP_ADDRESS + '/post/'
  const { Community: lanText } = lan.current

  const showInfoModal = (text, isError = false) => {
    if (isError)
      text = lanText.info(text)
    navigation.navigate('InfoModal', { text, state: isError })
  }
  const slideIn = () => {
    Animated.spring(slide, {
      toValue: SCREEN_WIDTH - 50,
      speed: isIOS ? 500 : 10,
      useNativeDriver: true
    }).start()
  }
  const slideOut = () => {
    Animated.spring(slide, {
      toValue: SCREEN_WIDTH + 50,
      speed: 10,
      useNativeDriver: true
    }).start()
  }
  const setLiked = async (POSTID, postIndex) => {
    const body = { LIKER: userID, POSTID }
    let temp = [...posts]

    try {
      await axios.post(baseURL + 'liked', body)
      temp[postIndex].ISLIKED = 1
      temp[postIndex].LIKEDS += 1
      if (temp.length > 0)
        setPosts([...temp])
    } catch (error) {
      console.log('setLiked', error)
      showInfoModal(lanText.infos.liked, true)
    }
  }
  const setUnLiked = async (POSTID, postIndex) => {
    let body = { data: { LIKER: userID, POSTID } }
    let temp = [...posts]

    try {
      await axios.delete(baseURL + 'unliked', body)
      temp[postIndex].ISLIKED = 0
      temp[postIndex].LIKEDS += -1
      setPosts([...temp])
    } catch (error) {
      console.log('setUnLiked', error)
      showInfoModal(lanText.infos.unliked, true)
    }
  }
  const onPostRefresh = () => {
    postHandler('SELECT')
    setPostRefreshing(false)
  }
  const getProjects = async () => {
    try {
      const { data } = await axios.get(baseURL + 'project/' + userID)
      setProjects(data)
      return data
    } catch (error) {
      console.log('getProjects', error)
      showInfoModal(lanText.infos.get, true)
      return null
    }
  }
  const postHandler = async (type, params = {}) => {
    let body = {}
    let temp = []

    switch (type) {
      case 'SELECT':
        body = { params: { ID: userID } }
        if (params?.POSTID)
          body.params.POSTID = params.POSTID
        else if (params?.PREPOSTID)
          body.params.PREPOSTID = params.PREPOSTID
        try {
          const { data } = await axios.get(baseURL + 'posts', body)
          if (data?.length > 0) {
            let temp = [...data]
            if (params?.POSTID)
              temp.push(...posts)
            if (params?.PREPOSTID)
              temp.unshift(...posts)
            setPosts([...temp])
          }
        } catch (error) {
          console.log('getPosts', error)
          showInfoModal(lanText.infos.get, true)
        }
        break
      case 'DELETE':
        try {
          const { POSTINDEX, POSTID } = params
          body = { data: { POSTID, WRITER: userID } }

          if (posts[POSTINDEX].CONTENT_TYPE == 'picture')
            body.data.key = `postContents/${posts[POSTINDEX].CONTENT_LINK}`

          const { data } = await axios.delete(baseURL + 'post', body)
          if (data) {
            posts.forEach((value, index) => {
              if (index !== POSTINDEX)
                temp.push(value)
            })
            if (temp.length > 0)
              setPosts([...temp])
            navigation.navigate('InfoModal', {
              text: lanText.success,
              state: false
            })
          }
        } catch (error) {
          console.log('deletePost', error)
          showInfoModal(lanText.infos.del, true)
        }
        break
    }
    setSpin(false)
  }
  const sharePost = (post) => {
    let link = ''
    if (post.CONTENT_TYPE === 'picture' || 'link')
      link = `\n\n<FILE>\n${post.CONTENT_LINK}`
    const writed_at = moment.utc(post.UPLOAD_TIME).local().format('YYYY.MM.DD')

    try {
      Share.share({
        message: `<PROJECT>\n${post.PROJECT_NAME}\n\n<WRITER>\n${post.USER_NAME}\n\n<UPLOADED>\n${writed_at}\n\n<CONTENT>\n${post.TEXT}${link}`
      })
    } catch (error) {
      console.log('sharePost', error)
      showInfoModal('share', true)
    }
  }

  useEffect(() => {
    postHandler('SELECT')
    getProjects()
  }, [])

  return (
    <View style={styles.container}>
      {spin && <Spinner
        cancelable={true}
        overlayColor={'white'}
        visible={spin}
        textContent="Loading..."
        textStyle={{ color: 'whitesmoke' }}
        animation={'fade'}
        size={100}
        color={'whitesmoke'} />}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', { profileUser: userID })}>
          <ProfileImage
            source={user_infos.PROFILE_URL}
            styles={styles.profile} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchBox}
          onPressIn={() => navigation.navigate('Search', {
            searchTxt,
            setSearchTxt,
            setPosts
          })}>
          <CustomText text={searchTxt.length > 0 ? searchTxt : lanText.search} textStyle={{ color: 'gray' }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async() => {
            const projectTemp = await getProjects()
            if (projectTemp)
              navigation.navigate('Posting', { projects: projectTemp })
            else
              showInfoModal(lanText.infos.noProject)
          }}
          style={styles.post}>
          <MaterialIcons name="post-add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y)
            slideIn()
          else
            slideOut()
        }}
        ref={scrollRef}
        ListEmptyComponent={() => {
          return (
            <View style={styles.indicator}>
              <Image resizeMode="contain" style={styles.listEmpty} source={require('../../../assets/pictures/undefine.png')} />
              <Text style={styles.listEmptyTxt}>{lanText.noProject}</Text>
            </View>
          )
        }}
        ListHeaderComponent={() => {
          return (
            searchTxt.length > 0 &&
            <View style={{ padding: 10, backgroundColor: '#F2F2F2', paddingLeft: 20 }}>
              <CustomText text={lanText.result + posts.length} textStyle={{ fontSize: 15, color: '#898181' }} />
            </View>
          )
        }}
        showsVerticalScrollIndicator
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => {
          if (searchTxt.length == 0 && distanceFromEnd > 0)
            postHandler('SELECT', { PREPOSTID: posts[posts.length - 1].ID })
        }}
        keyExtractor={(item) => item.ID}
        indicatorStyle={'black'}
        onRefresh={() => {
          if (searchTxt.length == 0)
            onPostRefresh()
        }}
        refreshing={postRefreshing}
        data={posts}
        renderItem={({ item, index }) => (
          <View style={styles.content} key={item}>
            <View style={styles.content__header}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', { profileUser: item.WRITER })}>
                  <ProfileImage
                    source={item.PROFILE_URL}
                    styles={styles.header__profile} />
                </TouchableOpacity>
                <View style={styles.header__texts}>
                  <CustomText text={item.USER_NAME} textStyle={styles.texts__name} />
                  <CustomText text={item.PROJECT_NAME} textStyle={styles.texts__projectName} />
                  <CustomText
                    text={moment.utc(item.UPLOAD_TIME).local().format('YYYY.MM.DD')}
                    textStyle={styles.texts__postTime} />
                </View>
              </View>
              {item.WRITER === userID ?
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MoreModal', {
                      functions: [() =>
                        navigation.navigate('Posting', {
                          posts,
                          setPosts,
                          post: index,
                          projects
                        }),
                      () => navigation.navigate('ConfirmModal', {
                        comment: lanText.confirm,
                        METHOD: () => {
                          postHandler('DELETE', { POSTID: item.ID, POSTINDEX: index })
                          navigation.navigate('Community', { ...route.params })
                        }
                      })],
                      items: lanText.more,
                    })
                  }}>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MoreModal', {
                      functions: [
                        () => {
                          navigation.goBack()
                          navigation.navigate('InputModal', { 
                          reference : item.WRITER,
                          inputType: 'Block'
                        })
                      },
                        () => {
                          navigation.goBack()
                          navigation.navigate('InputModal', { 
                          reference: item.WRITER,
                          inputType: 'Report'
                        })
                      }],
                      items: lanText.more2
                    })}}>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>}
            </View>
            <View style={styles.story}>
              <ReadMore
                seeMoreContainerStyleSecondary={{ paddingLeft: 0, marginLeft: 0 }}
                seeMoreStyle={{ color: 'black', position: 'absolute', left: -30 }}
                seeLessStyle={{ color: 'black' }}
                expandOnly
                allowFontScaling={false}
                ellipsis={''}
                seeMoreText="...more"
                seeLessText="...less"
                selectable
                style={styles.story__txt}>{item.TEXT}</ReadMore>
              {item.CONTENT_TYPE === 'picture' && <Image style={styles.story__img} source={{ uri: CONTENT_IMAGE_BASE_URL + item.CONTENT_LINK }} />}
              {item.CONTENT_TYPE === 'link' && <LinkPreview text={item.CONTENT_LINK} />}
            </View>
            <View style={styles.postInfo}>
              {(item.LIKEDS ? true : false) &&
                <TouchableOpacity
                  onPress={() => navigation.navigate('Like', item)}
                  style={styles.postInfoContainer} >
                  <View style={[styles.postInfo__icons, { backgroundColor: 'blue' }]}>
                    <Foundation name="like" size={15} color="white" />
                  </View>
                  <CustomText text={item.LIKEDS} textStyle={styles.postInfo__cnt} />
                </TouchableOpacity>}
              {(item.COMMENTS ? true : false) &&
                <View
                  style={styles.postInfoContainer} >
                  <View style={[styles.postInfo__icons, { backgroundColor: 'tomato' }]}>
                    <FontAwesome5 name="comments" size={10} color="white" />
                  </View>
                  <CustomText text={item.COMMENTS} textStyle={styles.postInfo__cnt} />
                </View>}
            </View>
            <View style={styles.func}>
              <TouchableOpacity
                onPress={() => {
                  if (item.ISLIKED > 0)
                    setUnLiked(item.ID, index)
                  else
                    setLiked(item.ID, index)
                }}
                style={styles.func__content}>
                {item.ISLIKED > 0 ?
                  <AntDesign name="like1" size={iconSize} color="black" /> :
                  <AntDesign name="like2" size={iconSize} color="black" />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Comment', { ...item })}
                style={styles.func__content}>
                <MaterialCommunityIcons name="comment-multiple-outline" size={iconSize} color="black" />
              </TouchableOpacity>
              {item.ISMEMBEROFPROJECT == 0 &&
                <TouchableOpacity
                  onPress={() => navigation.navigate('InputModal', { 
                    inputType: 'Request',
                    fireDatabase,
                    USERID: userID,
                    PROJECTID: item.PROJECT_ID,
                    USER_NAME: user_infos.USER_NAME
                  })}
                  style={styles.func__content}>
                  <MaterialCommunityIcons name="email-edit-outline" size={iconSize} color="black" />
                </TouchableOpacity>
              }
              <TouchableOpacity
                onPress={() => sharePost(item)}
                style={styles.func__content}>
                <AntDesign name="sharealt" size={iconSize} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}>
      </FlatList>
      <Animated.View
        style={[styles.upContainer, { transform: [{ translateX: slide }] }]}>
        <TouchableOpacity
          onPress={() => scrollRef.current.scrollToOffset({ animated: true, offset: 0 })}
          style={styles.up}>
          <Ionicons name="chevron-up" size={30} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <Navigate nowScreen={'Community'} navigation={navigation} />
    </View>
  )
}

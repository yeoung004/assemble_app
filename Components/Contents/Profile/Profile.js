import {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  Text,
  Animated,
  ImageBackground,
  Dimensions,
  Image
} from 'react-native'
import {
  Ionicons,
  Entypo,
  AntDesign,
  FontAwesome5,
  SimpleLineIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { styles } from "./styles/Profile_style"
import { IP_ADDRESS } from '../../../config/key'
import { AppContext } from '../../../utils/context'
import { ProfileImage } from '../../Common/ProfileImage'
import axios from 'axios'
import { CustomText } from '../../Common/Text'
import { getNotifications } from '../../../utils/notification'
import { assembleUser } from '../../../utils/assembling'
import moment from 'moment'
import { skillImg } from '../../../assets/items/skillImg'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/users/'

export const Profile = ({ navigation, route }) => {
  const {
    userInfos,
    userID,
    fireDatabase,
    lan
  } = useContext(AppContext)
  const [notifications, setNotifications] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [careers, setCareers] = useState([])
  const [interests, setInterests] = useState([])
  const [skills, setSkills] = useState([])
  const [isMore, setIsMore] = useState(false)
  const slide = useRef(new Animated.Value(0)).current
  const { Profile: lanText } = lan.current
  const user_infos = userInfos.current
  const profileUser = route.params.profileUser
  const isOwner = profileUser === userID
  const transFormer = () => {
    Animated.spring(slide, {
      toValue: 1000,
      speed: 10,
      useNativeDriver: true
    }).start()
    setTimeout(() => {
      setIsMore(!isMore)
      Animated.spring(slide, {
        toValue: 0,
        speed: 10,
        useNativeDriver: true
      }).start()
    }, 100);
  }

  const showInfoModal = () => {
    navigation.navigate('InfoModal', {
      text: lanText.info,
      state: true
    })
  }
  const setInfos = (info) => {
    if (info?.CAREERS)
      setCareers([...info.CAREERS])
    if (info?.INTERESTS)
      setInterests([...info.INTERESTS])
    if (info?.SKILLS)
      setSkills([...info.SKILLS])
  }
  const initUserInfo = async () => {
    try {
      const url = `userInfo/${profileUser}/${isOwner ? null : userID}` 
      const { data } = await axios.get(baseURL + url)
      setUserInfo({ ...data })
      setInfos({ ...data })
    } catch (error) {
      showInfoModal()
      console.log("User info error", error)
    }
  }
  const Interesting = () => {
    if (interests.length > 0)
      return (
        <View style={styles.info}>
          <View style={styles.titleContainer}>
            <CustomText text={'Interest'} textStyle={styles.info__titile} />
          </View>
          <View style={styles.info__group}>
            <ScrollView
              overScrollMode='never'
              showsHorizontalScrollIndicator={false}
              horizontal>
              {Object.keys(interests).map((index) => {
                return (
                  <View style={styles.info_item} key={index}>
                    {skillImg[interests[index]](40)}
                    <Text style={styles.info_itemTxt}>{interests[index]}</Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      )
    return null
  }
  const Career = () => {
    if (careers.length > 0)
      return (
        <View style={styles.info}>
          <View style={styles.titleContainer}>
            <CustomText text={'Career'} textStyle={styles.info__titile} />
          </View>
          <View>
            <ScrollView
              overScrollMode='never'
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}>
              {Object.keys(careers).map((career) => {
                const start = moment(careers[career].START_DATE).format('MM.DD.YY')
                let end = 'NOW'
                if (careers[career].END_DATE?.length > 0)
                  end = moment(careers[career].END_DATE).format('MM.DD.YY')
                let company = careers[career].COMPANY
                company = company[0].toUpperCase() + company.slice(1, company.length)
                let work = careers[career].WORK
                work = work[0].toUpperCase() + work.slice(1, work.length)
                return (
                  <View style={styles.CareerConrainer} key={career}>
                    <View style={styles.careerWrap}>
                      <Text style={styles.careerTitle}>{company}</Text>
                      <Text
                        textBreakStrategy='highQuality'
                        style={styles.careerSubTitle}>{work}</Text>
                    </View>
                    <View>
                      <View style={styles.careerDateWrap}>
                        <Text style={styles.careerDateTitle}>FROM</Text>
                        <Text style={styles.careerDate}>{start}</Text>
                      </View>
                      <View style={styles.careerDateWrap}>
                        <Text style={styles.careerDateTitle}>TO</Text>
                        <Text style={styles.careerDate}>{end}</Text>
                      </View>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      )
    return null
  }
  const Skill = () => {
    if (skills.length > 0)
      return (
        <View style={styles.info}>
          <View style={styles.titleContainer}>
            <CustomText text={'Skill'} textStyle={styles.info__titile} />
          </View>
          <View style={styles.info__group}>
            <ScrollView
              overScrollMode='never'
              showsHorizontalScrollIndicator={false}
              horizontal>
              {Object.keys(skills).map((index) => {
                return (
                  <View style={styles.info_item} key={index}>
                    {skillImg[skills[index]](40)}
                    <Text style={styles.info_itemTxt}>{skills[index]}</Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      )
    return null
  }
  const MoreButton = () => {
    if (isMore) {
      if (isOwner) {
        return (
          <View style={styles.moreContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.option}
              onPress={() => transFormer()}>
              <AntDesign name="right" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.actionContainer}>
              <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.action}
                  onPress={() => navigation.navigate('UserInfo', { preScreen: 'Profile' })}>
                  <Entypo size={styles.actionImage.height} name="pencil" color="black" />
                  <Text style={styles.actionTitle}>{lanText.edit}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.action}
                  onPress={() => navigation.navigate('Notification', {
                    notifications,
                    setNotifications
                  })}>
                  <Ionicons name="notifications" size={styles.actionImage.height} color="black" />
                  <Text style={styles.actionTitle}>{lanText.notification}</Text>
                  {Object.keys(notifications).length > 0 &&
                    <View style={styles.notification} />}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Coworker')}
                  style={styles.action}>
                  <FontAwesome5 name="user-friends" size={styles.actionImage.height} color="black" />
                  <Text style={styles.actionTitle}>{lanText.coworker}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Setting')}
                  style={[styles.action, { marginBottom: 30 }]}>
                  <Ionicons name="settings" size={styles.actionImage.height} color="black" />
                  <Text style={styles.actionTitle}>{lanText.setting}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        )
      }
      else {
        return (
          <View style={styles.moreContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.option}
              onPress={() => transFormer()}>
              <AntDesign name="right" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.actionContainer}>
              <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}>
                {userInfo.EMAIL?.length > 0 && userInfo?.ALLOW_EMAIL > 0 &&
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`mailto:${userInfo.EMAIL}`)}
                    activeOpacity={0.9}
                    style={styles.action}>
                    <ImageBackground
                      style={styles.actionImage}
                      resizeMode='center'
                      source={{ uri: 'https://pic.onlinewebfonts.com/svg/img_203728.png' }} />
                    <Text style={styles.actionTitle}>{lanText.email}</Text>
                  </TouchableOpacity>
                }
                {userInfo.GITHUB?.length > 0 &&
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => Linking.openURL(`https://github.com/${userInfo.GITHUB}`)}
                    style={styles.action}>
                    <ImageBackground
                      style={styles.actionImage}
                      resizeMode='center'
                      source={{ uri: 'https://pic.onlinewebfonts.com/svg/img_415633.png' }} />
                    <Text style={styles.actionTitle}>{lanText.github}</Text>
                  </TouchableOpacity>
                }
                {userInfo?.ALLOW_CHAT > 0 && <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Chatting', {
                    chatUserID: profileUser,
                    chatUserName: userInfo.USER_NAME
                  })}
                  style={styles.action}>
                  <ImageBackground
                    style={styles.actionImage}
                    resizeMode='center'
                    source={{ uri: 'https://pic.onlinewebfonts.com/svg/img_1280.png' }} />
                  <Text style={styles.actionTitle}>{lanText.chat}</Text>
                </TouchableOpacity>}
                {userInfo.WEBPAGE?.length > 0 &&
                  <TouchableOpacity
                    onPress={() => Linking.openURL(userInfo.WEBPAGE)}
                    activeOpacity={0.9}
                    style={styles.action}>
                    <ImageBackground
                      style={styles.actionImage}
                      resizeMode='center'
                      source={{ uri: 'https://pic.onlinewebfonts.com/svg/img_460479.png' }} />
                    <Text style={styles.actionTitle}>{lanText.website}</Text>
                  </TouchableOpacity>
                }
                {!userInfo.ISCOWORKER &&
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ConfirmModal', {
                        comment: lanText.addCoworker(userInfo.USER_NAME),
                        METHOD: () => {
                          let temp = userInfo
                          temp.ISASSEMBLING = 1
                          setUserInfo({ ...temp })
                          assembleUser(fireDatabase, profileUser, userID, user_infos.USER_NAME)
                        }
                      })
                    }}
                    activeOpacity={0.9}
                    style={styles.action}>
                    <SimpleLineIcons name="user-follow" size={styles.actionImage.height} color="black" />
                    <Text style={styles.actionTitle}>{lanText.addcoworker}</Text>
                  </TouchableOpacity>
                }
                <TouchableOpacity
                  onPress={() => navigation.navigate('InputModal', {
                    reference: profileUser,
                    inputType: 'Report'
                  })}
                  activeOpacity={0.9}
                  style={[styles.action, { marginBottom: 30 }]}>
                  <MaterialCommunityIcons name="alarm-light" size={styles.actionImage.height} color="tomato" />
                  <Text style={[styles.actionTitle, { color: 'tomato' }]}>{lanText.report}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        )
      }
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.option, {
            bottom: -SCREEN_HEIGHT / 1.3
          }]}
          onPress={() => transFormer()}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
      )
    }
  }
  const initNotification = async () => {
    const data = await getNotifications()
    setNotifications({ ...data })
  }

  useEffect(() => {
    initUserInfo()
    initNotification()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTopLeft}>
            <View style={{ marginTop: 50 }}>
              <Text 
                numberOfLines={1}
                lineBreakMode='tail'
                style={styles.name}>{userInfo.USER_NAME}</Text>
              <Text style={styles.position}>{userInfo.DEV_POSITION}</Text>
            </View>
          </View>
          <View style={styles.profile}>
            <ProfileImage source={userInfo.PROFILE_URL} styles={styles.profileImg} />
          </View>
        </View>
        <View style={styles.headerBottom}>
          <View style={styles.infoContainer}>
            {userInfo.COUNTRY?.length > 0 &&
              <>
                <Text style={styles.infoTitle}>Country</Text>
                <Text style={styles.infoTxt}>{userInfo.COUNTRY}</Text>
              </>}
          </View>
          <View style={styles.infoContainer}>
            {userInfo.JOB?.length > 0 && <>
              <Text style={styles.infoTitle}>Job</Text>
              <Text style={styles.infoTxt}>{userInfo.JOB}</Text>
            </>}
          </View>
        </View>
      </View>
      <ScrollView
        bounces={false}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}>
        <View style={styles.padding} />
        <View style={styles.body}>
          <View style={styles.bodyHeader} />
          {(interests.length == 0 &&
            skills.length == 0 &&
            careers.length == 0) ?
            <>
              <Image
                resizeMode="contain"
                style={styles.emptyImg}
                source={require('../../../assets/pictures/notification.png')} />
              <Text style={styles.emptyTxt}>{lanText.empty}</Text>
            </>
            :
            <>
              <Interesting />
              <Skill />
              <Career />
            </>
          }
        </View>
      </ScrollView>
      <Animated.View style={[styles.actions, { transform: [{ translateX: slide }] }]}>
        <MoreButton />
      </Animated.View>
      <TouchableOpacity
        style={styles.goback}
        onPress={() => navigation.goBack()}>
        <AntDesign name="swapleft" size={40} color="white" />
      </TouchableOpacity>
    </View>
  )
}
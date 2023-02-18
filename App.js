import * as Device from 'expo-device'
import { useEffect, useRef, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Notifications from 'expo-notifications'
import {
  getDatabase,
  onValue,
  ref,
  remove
} from 'firebase/database'
import { firebaseConfig } from './config/firebase'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { LogBox, Linking } from 'react-native'
import { useNetInfo } from "@react-native-community/netinfo"
import { getLanguage, setLanguage } from './assets/Language/language'
import * as WebBrowser from 'expo-web-browser';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

//App loading
import { View, Image, Text, Platform, StatusBar, BackHandler, Alert } from "react-native"
import * as Font from 'expo-font'
import { Auth } from 'aws-amplify'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP_ADDRESS } from './config/key'
import { TUTORIAL_KEY } from './Components/AsyncKeys/userKey'
import { notificationHandler } from "./utils/notification"
import {
  getBlockList,
  getChatListInfo,
  getDisturbState,
  getNonDisturbList,
  reciveHandler,
  resetMessageCnt
} from './utils/chatting'
import { groupReciveHandler, resetGroupMessageCnt } from './utils/groupChatting'
import { styles } from './App_style'
import { AppContext } from './utils/context'
import { HEADERCOLOR } from "./config/designCode"

// Tutorial
import { Tutorial } from './Components/Tutorial/Tutorial'
import { UserInfo } from "./Components/Tutorial/UserInfo"

// Auth components
import { SignIn } from './Components/Auth/SignIn'
import { SignUp } from './Components/Auth/SignUp'
import { Successful } from './Components/Auth/Successful'
import { Forgot } from './Components/Auth/Forgot'
import { Confirm } from './Components/Auth/Confirm'
import { ForgotPwdConfirm } from './Components/Auth/ForgotPwdConfirm'
import { FederSignIn } from './Components/Auth/FederSignIn'

// Community components
import { Community } from "./Components/Contents/Post/Community"
import { Comment } from "./Components/Contents/Post/Comment"
import { Like } from "./Components/Contents/Post/Like"

// Posting components
import { Search } from "./Components/Contents/Post/Search"
import { UrlPreview } from "./Components/Contents/Post/UrlPreview"
import { Posting } from "./Components/Contents/Post/Posting"
import { Tag } from "./Components/Contents/Post/Tag"

// Profile components
import { Profile } from './Components/Contents/Profile/Profile'
import { Coworker } from './Components/Contents/Profile/Coworker'
import { Notification } from './Components/Contents/Profile/Notification'
import { Setting } from './Components/Contents/Profile/Setting'

// Chat components
import { Chatting } from './Components/Contents/Chatting'
import { GroupChatting } from './Components/Contents/GroupChatting'
import { ChattingList } from './Components/Contents/ChattingList'

// Project components
import { ProjectRequest } from './Components/Contents/Projects/ProjectRequest'
import { Projects } from './Components/Contents/Projects/Projects'
import { NewProject } from './Components/Contents/Projects/NewProject'
import { ProjectIssue } from './Components/Contents/Projects/ProjectIssue'
import { ProjectTask } from './Components/Contents/Projects/ProjectTask'
import { ProjectNote } from './Components/Contents/Projects/ProjectNote'
import { ProjectDaily } from './Components/Contents/Projects/ProjectDaily'
import { Project } from "./Components/Contents/Projects/Project"

import { Amplify } from 'aws-amplify'
import awsConfig from './src/aws-exports'
import axios from "axios"

// Modals
import { MoreModal } from "./Components/Common/MoreModal"
import { ConfirmModal } from "./Components/Common/ComfirmModal"
import { InfoModal } from "./Components/Common/InfoModal"
import { ListModal } from "./Components/Common/ListModal"
import { InputModal } from "./Components/Common/InputModal"
import { AgreeModal } from './Components/Common/AgreeModal'

const Stack = createNativeStackNavigator()
const firebaseApp = initializeApp(firebaseConfig)
const fireDatabase = getDatabase(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)

LogBox.ignoreLogs([
  'Setting a timer',
  'VirtualizedLists should never be nested inside plain ScrollViews',
  'Non-serializable values were found in the navigation state',
  `Can't perform a React state update on an unmounted`,
  `android: block-permission`,
  `EventEmitter.removeListener('url', ...)`
])
const urlOpener = async (url, redirectUrl) => {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl)
  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser()
    return Linking.openURL(newUrl)
  }
}

Amplify.configure({
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    urlOpener
  }
})

Notifications.setNotificationHandler({
  handleNotification: () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

const customFonts = {
  'Montserrat': require('./assets/fonts/Montserrat-Light.ttf'),
  'bMontserrat': require('./assets/fonts/Montserrat-Bold.ttf'),
  'Aldrich': require('./assets/fonts/Aldrich.ttf'),
  'Helvetica': require('./assets/fonts/Lato.ttf'),
  'Lato': require('./assets/fonts/Lato.ttf'),
  'Roboto': require('./assets/fonts/Roboto-Medium.ttf'),
  'Lato-Thin': require('./assets/fonts/Lato-Light.ttf'),
}
const BACKGROUND_FETCH_TASK = 'background-fetch';

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFontLoading, setIsFontLoading] = useState(true)
  const [userID, setUserID] = useState(null)
  const netInfo = useNetInfo()
  const fireBaseMessages = useRef(null)
  const chatInfoList = useRef(null)
  const setChatInfoList = useRef(null)
  const userInfos = useRef(null)
  const navigator = useRef(null)
  const nonDisturbList = useRef(null)
  const blockList = useRef(null)
  const chattingRoomInfo = useRef(null)
  const isNonDisturbMode = useRef(false)
  const nameOfScreen = useRef('SignIn')
  const responseListener = useRef(null)
  const unsubscribeFireBase = useRef(null)
  const lan = useRef(null)

  //Common function
  const getTutorialState = async () => {
    try {
      const { isTutorialPassed } = JSON.parse(await AsyncStorage.getItem(TUTORIAL_KEY))
      return isTutorialPassed
    } catch (error) {
      console.log("No tutorial pass", error)
      return false
    }
  }

  const getUserAuth = async () => {
    try {
      const token = await Auth.currentAuthenticatedUser()
      const { payload } = token.signInUserSession.idToken
      return payload
    } catch (error) {
      console.log("We can't get user's signed in info", error)
      return null
    }
  }

  const getUserInfoFromDB = async (user) => {
    try {
      const { data } = await axios.get(`${IP_ADDRESS}/users/user/${user}`)
      return data
    } catch (error) {
      console.log("We can't get data from DB", error)
      return error.response.status
    }
  }

  const sendLoginInfoToDB = async (EXPO_PUSH_TOKEN) => {
    try {
      let body = {
        ID: userID,
        EXPO_PUSH_TOKEN,
        DEVICE: Device.modelName,
        OS: Device.osName,
        OS_VERSION: Device.osVersion
      }
      await axios.patch(`${IP_ADDRESS}/users/loginInfo`, body)
    } catch (error) {
      console.log("We can't set login time in DB", error)
    }
  }

  const pushNotificatoin = (title, pushBody, view, senderID, params = {}) => {
    Notifications.scheduleNotificationAsync({
      content: {
        data: {
          view,
          senderID,
          params
        },
        badge: require('./assets/icon.png'),
        title: title,
        body: pushBody
      },
      trigger: null,
    })
  }

  const invalidPush = (senderID) => {
    return !isNonDisturbMode.current &&
      nonDisturbList.current?.[senderID] !== true &&
      chattingRoomInfo.current?.chatUserID != senderID
  }

  const firebaseHandler = (user) => {
    unsubscribeFireBase.current = onValue(ref(fireDatabase, `request/${user}`),
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          let messages = {}
          let groupMessages = {}
          let notifications = {}
          let msgCnt = 0
          let gmsgCnt = 0

          Object.keys(data).map((senderID) => {
            if (!blockList.current?.[senderID]) {

              Object.keys(data[senderID]).map((sendTime) => {
                let { method } = data[senderID][sendTime]
                let senderName = ''
                let pushBody = ''
                let view = ''
                let params = {}

                if (method == "GROUPCHAT") {
                  let payload = data[senderID][sendTime]
                  senderName = payload.message.senderName
                  if (!payload.isSystem) {
                    pushBody = payload.message.message
                    gmsgCnt += 1
                    try {
                      groupMessages[payload.sender + '///' + senderID].push(payload)
                    } catch (error) {
                      groupMessages[payload.sender + '///' + senderID] = []
                      groupMessages[payload.sender + '///' + senderID].push(payload)
                    }
                    params = { PROJECTID: senderID }
                    view = 'GroupChatting'
                  } else {
                    let lanTemp = payload.message.message.split('.')
                    'ProjectRequest.uploadRequest'
                    if (lanTemp[0] === 'ProjectRequest')
                      pushBody = lan.current[lanTemp[0]][lanTemp[1]](lanTemp[2])
                    else
                      pushBody = lan.current[lanTemp[0]][lanTemp[1]]
                    view = 'Projects'
                  }
                } else if (method == "MESSAGE") {
                  msgCnt += 1
                  let payload = data[senderID][sendTime]
                  senderName = payload.message.senderName
                  pushBody = payload.message.message
                  try {
                    messages[senderID].push(payload)
                  } catch (error) {
                    messages[senderID] = []
                    messages[senderID].push(payload)
                  }
                  params = {
                    chatUserID: senderID,
                    chatUserName: senderName
                  }
                  view = 'Chatting'
                } else if (method == "ASSEMBLE") {
                  view = 'Profile'
                  params = {
                    isNotify: true,
                    profileUser: userID
                  }
                  senderName = data[senderID][sendTime].senderName
                  pushBody = lan.current.APP.assemble(userInfos.current.USER_NAME, senderName)
                } else if (method == "REQUEST" || "INVITE") {
                  view = 'Projects'
                  senderName = data[senderID][sendTime].senderName
                  pushBody = lan.current.APP.assemble(userInfos.current.USER_NAME, senderName)
                }
                if (invalidPush(senderID)) {
                  if (method != "MESSAGE" && method != "GROUPCHAT")
                    notifications[sendTime] = { senderName, method }
                  pushNotificatoin(
                    senderName,
                    pushBody,
                    view,
                    senderID,
                    params
                  )
                }
              })
            }
          })
          // Message
          if (msgCnt) {
            if (fireBaseMessages.current)
              fireBaseMessages.current({ ...messages })
            Object.keys(messages).map(async (user) => {
              const data = await reciveHandler(user, messages[user].reverse(), chattingRoomInfo.current?.chatUserID)
              chatInfoList.current = { ...data }
              if (setChatInfoList.current)
                setChatInfoList.current({ ...data })
            })
          }
          if (gmsgCnt) {
            if (fireBaseMessages.current)
              fireBaseMessages.current({ ...groupMessages })
            Object.keys(groupMessages).map(async (user) => {
              const [sender_id, project_id] = user.split('///')
              const data = await groupReciveHandler(sender_id, groupMessages[user].reverse(), chattingRoomInfo.current?.PROJECTID, project_id)
              chatInfoList.current = { ...data }
              if (setChatInfoList.current)
                setChatInfoList.current({ ...data })
            })
          }
          if (Object.keys(notifications).length > 0)
            notificationHandler(notifications)
          remove(ref(fireDatabase, `request/${user}`))
        }
      }, (error) => console.log('getRequestsFromFireBase', error))
  }
  const setPushListener = () => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { view } = response.notification.request.content.data
      const { params } = response.notification.request.content.data
      navigator.current.navigate(view, params)
    })
    registerForPushNotificationsAsync().then(token => sendLoginInfoToDB(token))
  }

  // Functions for init app
  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts)
    setIsFontLoading(false)
  }
  const loading = async () => {
    if (await getTutorialState()) {
      const payload = await getUserAuth()
      isNonDisturbMode.current = await getDisturbState()
      nonDisturbList.current = await getNonDisturbList()
      lan.current = await getLanguage()
      const data = await getChatListInfo()
      chatInfoList.current = { ...data }
      if (payload) {
        const user = payload.sub
        setUserID(user)
        let blocks = await getBlockList(user)
        blockList.current = { ...blocks }
        nameOfScreen.current = 'Community'
        const userInfo = await getUserInfoFromDB(user)
        userInfos.current = userInfo
        if (userInfo == '429')
          nameOfScreen.current = 'Error'
        else if (userInfo == null)
          nameOfScreen.current = 'UserInfo'
      }
    } else {
      lan.current = setLanguage('en')
      nameOfScreen.current = 'Tutorial'
    }
    setIsLoading(false)
  }

  const registerForPushNotificationsAsync = async () => {
    let token
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        showBadge: true,
        enableVibrate: true,
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return token
  }
  const registerBackground = async (id) => {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      firebaseHandler(id)
      return BackgroundFetch.BackgroundFetchResult.NewData
    })
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      stopOnTerminate: false,
      startOnBoot: true
    })
  }
  useEffect(() => {
    if (userID)
      firebaseHandler(userID)
    else if (!userID && unsubscribeFireBase.current != null)
      unsubscribeFireBase.current()
    // registerBackground(userID)
  }, [userID])

  useEffect(() => {
    loadFontsAsync()
    loading()
    setPushListener()
    // return () => {
    //   if (unsubscribeFireBase.current != null) unsubscribeFireBase.current()
    //   Notifications.removeNotificationSubscription(responseListener.current)
    // }
  }, [])

  if (isFontLoading)
    return <AppLoading autoHideSplash={true} />
  else if (isLoading || (!netInfo.isConnected && netInfo.isConnected != null) || nameOfScreen.current === 'Error') {
    if ((!netInfo.isConnected && netInfo.isConnected != null) || nameOfScreen.current === 'Error') {
      Alert.alert(lan.current.APP.alert.title, lan.current.APP.alert.content, [{
        text: lan.current.APP.alert.okay,
        onPress: () => { BackHandler.exitApp() }
      }])
    }
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={require('./assets/pictures/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>Assemble</Text>
      </View>
    )
  }
  const ProjectStack = ({ navigation, route }) => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
      initialRouteName="ProjectFront">
      <Stack.Screen name="ProjectFront" component={Projects} />
      <Stack.Screen name="ProjectDetail" component={Project} />
      <Stack.Screen name="NewProject" component={NewProject} />
      <Stack.Screen name="ProjectNote" component={ProjectNote} />
      <Stack.Screen name="ProjectIssue" component={ProjectIssue} />
      <Stack.Screen name="ProjectTask" component={ProjectTask} />
      <Stack.Screen name="ProjectDaily" component={ProjectDaily} />
      <Stack.Screen name="ProjectRequest" component={ProjectRequest} />
    </Stack.Navigator>
  )
  const ProfileStack = ({ navigation, route }) => (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileMain">
      <Stack.Screen
        name="ProfileMain"
        initialParams={{ ...route.params }}
        component={Profile} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}>
        <Stack.Screen name="Coworker" component={Coworker} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Group>
    </Stack.Navigator>
  )
  const PostingStack = ({ route }) => (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Post">
      <Stack.Screen
        initialParams={{ ...route.params }}
        name="Post"
        component={Posting} />
      <Stack.Group
        screenOptions={{
          headerShown: false,
          contentStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backfaceVisibility: 'hidden',
          },
          animationTypeForReplace: 'pop',
          presentation: 'containedTransparentModal',
          animation: 'slide_from_bottom'
        }}>
        <Stack.Screen name="UrlPreview" component={UrlPreview} />
        <Stack.Screen name="Tag" component={Tag} />
      </Stack.Group>
    </Stack.Navigator>
  )
  const CommunityStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'fade_from_bottom',
        headerTintColor: 'white',
        headerBackTitleVisible: false,
        headerStyle: {
          headerTitleStyle: {
            fontFamily: 'Lato',
            color: 'white',
            fontSize: 23
          },
          backgroundColor: HEADERCOLOR
        }
      }}
      initialRouteName="Post">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Post" component={Community} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          contentStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backfaceVisibility: 'hidden',
          },
          animationTypeForReplace: 'pop',
          presentation: 'containedTransparentModal',
          animation: 'slide_from_bottom'
        }}>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Posting"
          component={PostingStack} />
        <Stack.Screen name="Like" component={Like} />
        <Stack.Screen name="Comment" component={Comment} />
      </Stack.Group>
    </Stack.Navigator>
  )

  return (
    <AppContext.Provider
      value={{
        userInfos,
        userID,
        setUserID,
        isNonDisturbMode,
        nonDisturbList,
        blockList,
        fireDatabase,
        firebaseStorage,
        chatInfoList,
        lan
      }}>
      <NavigationContainer>
        <View style={{
          height: Platform.OS == 'ios' ? 20 : 0,
          backgroundColor: "whitesmoke"
        }}>
          <StatusBar barStyle="dark-content" backgroundColor={'whitesmoke'} />
        </View>
        <Stack.Navigator
          screenListeners={({ navigation, route }) => ({
            state: (e) => {
              navigator.current = navigation
              if (route.name === 'Chatting') {
                fireBaseMessages.current = route.params.setfireBaseMessages
                const { chatUserID } = route.params
                chattingRoomInfo.current = { chatUserID }
                resetMessageCnt(chatUserID).then(data => chatInfoList.current = { ...data })
              } else if (route.name === 'GroupChatting') {
                fireBaseMessages.current = route.params.setfireBaseMessages
                const { PROJECTID } = route.params
                chattingRoomInfo.current = { PROJECTID }
                resetGroupMessageCnt(PROJECTID).then(data => chatInfoList.current = { ...data })
              } else if (route.name === 'ChattingList') {
                if (chatInfoList.current && route.params?.setChatInfoList) {
                  setChatInfoList.current = route.params.setChatInfoList
                  route.params.setChatInfoList({ ...chatInfoList.current })
                }
              } else {
                setChatInfoList.current = null
                chattingRoomInfo.current = null
                fireBaseMessages.current = null
              }
            }
          })}
          initialRouteName={nameOfScreen.current}
          screenOptions={{
            animation: 'none',
            headerShown: false
          }}>
          <Stack.Group
            screenOptions={{
              headerShown: true,
              headerBackButtonMenuEnabled: false,
              headerBackVisible: false,
              headerTitleStyle: {
                fontFamily: 'Lato',
                color: 'white',
                fontSize: 20
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: HEADERCOLOR
              }
            }}>
            <Stack.Screen options={{ headerShown: false }} name="Community" component={CommunityStack} />
            <Stack.Screen options={{ headerShown: false }} name='Projects' component={ProjectStack} />
            <Stack.Screen name='ChattingList' component={ChattingList} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              contentStyle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backfaceVisibility: 'hidden',
              },
              animationTypeForReplace: 'pop',
              presentation: 'containedTransparentModal',
              animation: 'slide_from_bottom'
            }}>
            <Stack.Screen name="MoreModal" component={MoreModal} />
            <Stack.Screen name="InfoModal" component={InfoModal} />
            <Stack.Screen name="InputModal" component={InputModal} />
            <Stack.Screen name="AgreeModal" component={AgreeModal} />
            <Stack.Screen name="ConfirmModal" component={ConfirmModal} />
            <Stack.Screen name="ListModal" component={ListModal} />
            <Stack.Screen name="FederSignIn" component={FederSignIn} />
          </Stack.Group>
          <Stack.Screen name='Chatting' component={Chatting} />
          <Stack.Screen name='GroupChatting' component={GroupChatting} />
          <Stack.Screen name="Tutorial" component={Tutorial} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Successful" component={Successful} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Confirm" component={Confirm} />
          <Stack.Screen name="ForgotPwdConfirm" component={ForgotPwdConfirm} />
          <Stack.Screen name="Profile" component={ProfileStack} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}
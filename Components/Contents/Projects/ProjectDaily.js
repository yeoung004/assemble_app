import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'
import {
  useContext,
  useState,
  useEffect
} from 'react'
import { styles } from './styles/ProjectDaily_style'
import {
  AntDesign,
} from '@expo/vector-icons';
import moment from 'moment';
import { AppContext } from '../../../utils/context';
import { getSayHello } from '../../Common/Common';
import { IP_ADDRESS } from '../../../config/key';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/project'
import axios from 'axios';

export const ProjectDaily = ({ navigation, route }) => {
  const {
    userInfos,
    lan,
    userID
  } = useContext(AppContext)
  const [tasks, setTasks] = useState([])
  const user_Infos = userInfos.current
  const project_id = route.params.PROJECTID
  const { ProjectDaily: lanText} = lan.current

  const getDayTasks = async () => {
    try {
      const { data } = await axios.post(baseURL, {
        query: `
          query{
            dayTask(
              PROJECTID:${project_id}
              WORKERID:"${userID}"
            ) {
              TITLE
              START
              ISDONE
            }
          }`
      })
      setTasks([...data.data.dayTask])
    } catch (error) {
      showInfoModal('', true)
      console.log('getDayTasks', error)
    }
  }
  const showInfoModal = (text, isError = false) => {
    if (isError)
      text = lanText.info
    navigation.navigate('InfoModal', { text, state: isError })
  }
  useEffect(() => {
    getDayTasks()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topWrap}>
        <View style={styles.header}>
          <View style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 80,
          }}>
            <View>
            <Text numberOfLines={1} lineBreakMode='tail' style={[styles.topTxt, {maxWidth:SCREEN_WIDTH / 1.5}]}>Hi, {user_Infos.USER_NAME.split(' ')[0]}</Text>
            </View>
          </View>
          <View style={{
            zIndex: 10,
            position: 'absolute',
            opacity: 0.7,
            left: -70,
            bottom: 50,
            width: SCREEN_WIDTH / 1.5,
            height: SCREEN_WIDTH / 1.5,
            borderRadius: 500,
            borderWidth: 10,
            borderColor: 'white'
          }} />
          <View style={{
            zIndex: 10,
            position: 'absolute',
            opacity: 0.3,
            left: -30,
            bottom: -50,
            width: SCREEN_WIDTH / 2,
            height: SCREEN_WIDTH / 2,
            borderRadius: 500,
            borderWidth: 20,
            borderColor: 'white'
          }} />
          <View style={{
            right: -SCREEN_WIDTH / 6,
            bottom: SCREEN_WIDTH / 10,
            position: 'absolute',
            width: SCREEN_WIDTH / 2,
            height: SCREEN_WIDTH / 2,
            borderRadius: 300,
            borderWidth: 20,
            borderColor: 'white'
          }} />
          <View style={{
            opacity: 0.5,
            right: 10,
            top: 50,
            position: 'absolute',
            width: SCREEN_WIDTH / 2,
            height: SCREEN_WIDTH / 2,
            borderRadius: 300,
            borderWidth: 10,
            borderColor: 'white'
          }} />
        </View>
        <View style={styles.body}>
          <View>
            <Text style={[styles.topTxt, { color: 'black' }]}>
              {getSayHello()}
            </Text>
          </View>
          <View style={styles.projectImgContainer}>
          <Image
              resizeMode='center'
              source={route.params.PROFILE ? {uri: route.params.PROFILE} : require('../../../assets/pictures/logo2.png')}
              style={styles.projectImg} />
          </View>
        </View>
      </View>
      <ScrollView
        overScrollMode='never'
        showsVerticalScrollIndicator={false}>
        <View style={styles.padding} />
        <View style={styles.timeContainer}>
          {tasks.length > 0 ?
            <View style={styles.times}>
              {tasks.map((task, i) => (
                <View
                  key={'index' + i}
                  style={[styles.time, { borderLeftColor: i === tasks.length -1 ? '#676767': task.ISDONE ? 'white' : '#9E9EA0' }]}>
                  <View style={[styles.timeLeftTop, { backgroundColor: task.ISDONE ? 'white' : '#9E9EA0' }]} />
                  <View style={[styles.timeCheck, { backgroundColor: task.ISDONE ? '#FFAAAA' : 'white' }]}>
                    <AntDesign name="check" size={20} color="white" />
                  </View>
                  <View>
                    <Text style={styles.timeStart}>{moment.utc(task.START).local().format('hh:mm A')}</Text>
                    <Text style={styles.timeTitle}>
                      {task.TITLE}
                    </Text>
                  </View>
                </View>))}
            </View> :
            <View style={styles.issues}>
              <View style={{ alignSelf: 'center' }}>
                <Image
                  resizeMode="contain"
                  style={styles.emptyImg}
                  source={require('../../../assets/pictures/notification.png')} />
              </View>
              <Text style={styles.emptyTxt}>{lanText.empty}</Text>
            </View>}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 10,
          top: 10
        }}
        onPress={() => navigation.goBack()}>
        <AntDesign name="swapleft" size={40} color="white" />
      </TouchableOpacity>
    </View>
  )
}
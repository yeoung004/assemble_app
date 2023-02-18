import { 
  useContext, 
  useEffect, 
  useState,
} from 'react'
import {
  AntDesign,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons'
import {
  getNotifications,
  removeANotification,
  resetNotification
} from '../../../utils/notification'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import moment from 'moment'
import { CustomText } from '../../Common/Text'
import { styles } from './styles/Notification_style'
import { AppContext } from '../../../utils/context'
import { useQuery } from 'react-query'

export const Notification = ({ navigation, route }) => {
  const { notifications, setNotifications } = route.params
  const { lan } = useContext(AppContext)
  const [notifies, setNotifies] = useState({ ...notifications })
  const { Notification: lanText } = lan.current

  const onPress = (index) => {
    const temp = { ...notifies }
    delete temp[index]
    removeANotification(temp)
    setNotifies({ ...temp })
    setNotifications({ ...temp })
  }
  const Notification = ({ type, userName, time, text = '', index }) => {
    if (type === 'ASSEMBLE')
      return (
        <TouchableOpacity
          onPress={() => {
            onPress(index)
            navigation.replace('Coworker')
          }}
          style={styles.notification}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.badge, { backgroundColor: 'tomato' }]}>
              <AntDesign name="adduser" size={25} color="white" />
            </View>
            <View style={styles.content}>
              <CustomText text={userName + lanText.notify.assemble} textStyle={{ fontSize: 18 }} />
              <Text style={styles.date}>
                {moment.utc(time).local().fromNow()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    else if (type === 'INVITE')
      return (
        <TouchableOpacity
          onPress={() => {
            onPress(index)
          }}
          style={styles.notification}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.badge, { backgroundColor: '#8481FF' }]}>
              <AntDesign name="USB" size={25} color="white" />
            </View>
            <View style={styles.content}>
              <CustomText text={userName + lanText.notify.invite} textStyle={{ fontSize: 18 }} />
              <CustomText text={moment.utc(time).local().fromNow()} textStyle={styles.date} />
            </View>
          </View>
        </TouchableOpacity>
      )
    else if (type === 'REQUEST')
      return (
        <TouchableOpacity
          onPress={() => {
            onPress(index)
          }}
          style={styles.notification}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.badge, { backgroundColor: '#E07777' }]}>
              <MaterialIcons name="computer" size={25} color="white" />
            </View>
            <View style={styles.content}>
              <CustomText text={userName + lanText.notify.request} textStyle={{ fontSize: 18 }} />
              <CustomText text={moment.utc(time).local().fromNow()} textStyle={styles.date} />
            </View>
          </View>
        </TouchableOpacity>
      )
    else
      return (
        <TouchableOpacity
          onPress={() => onPress(index)}
          style={styles.notification}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.badge, { backgroundColor: 'black' }]}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 50 }}
                source={require('../../../assets/pictures/logo.png')} />
            </View>
            <View style={styles.content}>
              <CustomText text={text} textStyle={{ fontSize: 18 }} />
              <CustomText text={moment.utc(time).local().fromNow()} textStyle={styles.date} />
            </View>
          </View>
        </TouchableOpacity>
      )
  }
  const initNotification = async () => {
    const data = await getNotifications()
    setNotifications({ ...data })
  }

  useEffect(() => {
    if (Object.keys(notifies).length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              setNotifies({})
              setNotifications({})
              resetNotification()
            }}>
            <Feather name="trash-2" size={25} color="black" />
          </TouchableOpacity>
        )
      })
    }
  }, [notifies])


  useEffect(() => {
    initNotification()
  }, [])

  return (
    <View style={styles.container}>
      {Object.keys(notifies).length > 0 ?
        <ScrollView
          overScrollMode='never'
          showsVerticalScrollIndicator={false}>
          <View style={styles.notifications}>
            {/* <Notification
            time={'2022-04-02 21:14:35'}
            userName='또미'
            type={'ASSEMBLE'} />
          <Notification
            time={'2022-03-02 21:14:35'}
            text='How was your day?' />
          <Notification
            time={'2022-04-05 21:14:35'}
            userName='Mav'
            type={'REQUEST'} />
          <Notification
            time={'2022-04-15 04:14:35'}
            userName='삼색이'
            type={'INVITE'} /> */}
            {
              Object.keys(notifies).map((key, index) => {
                return (
                  <Notification
                    key={index}
                    time={key}
                    index={key}
                    userName={notifies[key].senderName}
                    type={notifies[key].method} />
                )
              })
            }
          </View>
        </ScrollView> :
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image
            resizeMode="contain"
            style={styles.emptyImg}
            source={require('../../../assets/pictures/notification.png')} />
          <Text style={styles.emptyTxt}>{lanText.empty}</Text>
        </View>}
    </View>
  )
}
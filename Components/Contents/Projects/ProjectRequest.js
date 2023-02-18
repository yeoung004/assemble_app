import { AntDesign } from '@expo/vector-icons'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  ImageBackground,
  SafeAreaView,
  Image
} from 'react-native'
import { AppContext } from '../../../utils/context'
import { styles } from './styles/ProjectRequest_style'
import { IP_ADDRESS } from '../../../config/key'
import { ProfileImage } from '../../Common/ProfileImage'
import { sendMessageToFirebase } from '../../../utils/groupChatting';
const baseURL = IP_ADDRESS + '/project'

export const ProjectRequest = ({ navigation, route }) => {
  const [requests, setRequests] = useState([])
  const [invites, setInvites] = useState([])
  const { 
    userID,
    lan,
    fireDatabase
  } = useContext(AppContext)
  const { ProjectRequest: lanText } = lan.current

  const showInfoModal = () => {
    navigation.navigate('InfoModal', {
      text: lanText.info,
      state: true
    })
  }

  const reject = async (index, id, type) => {
    try {
      await axios.post(baseURL, {
        query: `mutation{ removeMemeber(ID:${id}) }`
      })
      if (type === 'INVITE') {
        let temp = []
        invites.forEach((invite, tempIndex) => {
          if (index != tempIndex)
            temp.push(invite)
        })
        setInvites([...temp])
      } else if (type === 'REQUEST') {
        let temp = []
        requests.forEach((request, tempIndex) => {
          if (index != tempIndex)
            temp.push(request)
        })
        setRequests([...temp])
      }
      route.params.setRequestCnt(route.params.requestCnt - 1)
    } catch (error) {
      console.log('reject', error)
      showInfoModal('', true)
    }
  }

  const accept = async (index, projectID, memberID, userName, type) => {
    console.log(projectID, memberID)
    try {
      const { data } = await axios.post(baseURL, {
        query: `
        mutation{
          updateMember(
            ID:${projectID}
            MEMBERID:"${memberID}"
            ) {
            ID
            PROJECT_NAME
            MEMBERS {
              MEMBERID
            }
          }
        }
        `
      })
      if (type === 'INVITE') {
        let temp = []
        invites.forEach((invite, tempIndex) => {
          if (index != tempIndex)
            temp.push(invite)
        })
        setInvites([...temp])
      } else if (type === 'REQUEST') {
        let temp = []
        requests.forEach((request, tempIndex) => {
          if (index != tempIndex)
            temp.push(request)
        })
        setRequests([...temp])
      }
      let memberTemp = {}
      data.data.updateMember.MEMBERS.forEach((member) => {
        memberTemp[member.MEMBERID] = member.MEMBERID
      })
      await sendMessageToFirebase(
        fireDatabase,
        projectID,
        userID,
        `ProjectRequest.uploadRequest.${userName}`,
        data.data.updateMember.PROJECT_NAME,
        memberTemp,
        true
      )
    } catch (error) {
      console.log('accept', error)
      showInfoModal('', true)
    }
  }

  const getList = async () => {
    try {
      const { data } = await axios.post(baseURL, {
        query: `query { 
          memberRequest(ID:"${userID}") {
            ID
            USER_NAME
            MEMBERID
            PROJECTID
            PROJECT_NAME
            SIGNEDUP_AT
            ROLE
            PROFILE_URL
            STATE
          }
          memberInvite(ID:"${userID}") {
            ID
            USER_NAME
            MEMBERID
            PROJECTID
            PROJECT_NAME
            SIGNEDUP_AT
            ROLE
            PROFILE_URL
            STATE
          }
        }`
      })
      if (data) {
        setRequests([...data.data.memberRequest])
        setInvites([...data.data.memberInvite])
      }
    } catch (error) {
      console.log('getList', error)
      showInfoModal('', true)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.back}
          source={require('../../../assets/pictures/project_back.png')} />
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.headerTxt}>Hello world!</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.goback}
        onPress={() => navigation.goBack()}>
        <AntDesign name="swapleft" size={40} color="white" />
      </TouchableOpacity>
      <ScrollView
        bounces={false}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}>
        <View style={styles.bodyTop} />
        <View style={styles.body}>
          {requests.length == 0 &&
            invites.length == 0 &&
            <View style={{ alignSelf: 'center' }}>
              <Image style={{
                width: 200,
                height: 200,
              }} source={require('../../../assets/pictures/undefine.png')} />
              <Text style={[styles.title, { alignSelf: 'center' }]}>{lanText.empty}</Text>
            </View>}

          {requests.length > 0 &&
            <>
              <Text style={styles.title}>Request</Text>
              <View style={styles.wrap}>
                {requests.map((request, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MoreModal', {
                        functions: [
                          () => {
                            reject(index, request.ID, 'REQUEST')
                            navigation.navigate('ProjectRequest', { ...route.params })
                          },
                          () => {
                            accept(index, request.PROJECTID, request.MEMBERID, request.USER_NAME, 'REQUEST')
                            navigation.navigate('ProjectRequest', { ...route.params })
                          }
                        ],
                        items: lanText.item
                      })
                    }}
                    key={'index:' + index}
                    style={styles.item}>
                    <ProfileImage
                      styles={styles.profile}
                      source={request.PROFILE_URL} />
                    <View>
                      <Text style={styles.role}>{request.ROLE}</Text>
                      <Text style={styles.projectName}>{request.PROJECT_NAME}</Text>
                      <Text style={styles.name}>{request.USER_NAME}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>}
          {invites.length > 0 &&
            <>
              <Text style={styles.title}>Invite</Text>
              <View style={styles.wrap}>
                {invites.map((invite, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MoreModal', {
                        functions: [
                          () => {
                            reject(index, invite.ID, 'INVITE')
                            navigation.navigate('ProjectRequest', { ...route.params })
                          },
                          () => {
                            accept(index, invite.ID, invite.PROJECTID, invite.MEMBERID, invite.USER_NAME, 'INVITE')
                            navigation.navigate('ProjectRequest', { ...route.params })
                          }
                        ],
                        items: lanText.item
                      })
                    }}
                    key={'index:' + index}
                    style={styles.item}>
                    <ProfileImage
                      styles={styles.profile}
                      source={invite.PROFILE_URL} />
                    <View>
                      <Text style={styles.role}>{invite.ROLE}</Text>
                      <Text style={styles.projectName}>{invite.PROJECT_NAME}</Text>
                      <Text style={styles.name}>{invite.USER_NAME}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
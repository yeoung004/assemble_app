import { Feather } from '@expo/vector-icons'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { View, TouchableOpacity, ScrollView, Text } from 'react-native'
import { AppContext } from '../../../utils/context'
import { CustomText } from '../../Common/Text'
import { styles } from './styles/Coworker_style'
import { IP_ADDRESS } from '../../../config/key'
import { ProfileImage } from '../../Common/ProfileImage'
const coworkerURL = IP_ADDRESS + '/users/coworker'
const requestURL = IP_ADDRESS + '/users/request/assemble'

export const Coworker = ({ navigation, route }) => {
  const [coworkers, setCoworkers] = useState([])
  const [assembleCoworkers, setAssembleCoworkers] = useState([])
  const { userID, blockList, lan } = useContext(AppContext)
  const { Coworker: lanText } = lan.current

  const showInfoModal = () => {
    navigation.navigate('InfoModal', {
      text: lanText.info,
      state: true
    })
  }

  const CoworkerItem = ({ coworker, state, index }) => {
    return (
      <View style={styles.content}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.push('Profile', {
              profileUser: coworker.COWORKERID
            })}>
            <ProfileImage
              source={coworker.PROFILE_URL}
              styles={styles.profile} />
          </TouchableOpacity>
          <CustomText text={coworker.USER_NAME} textStyle={styles.name} />
        </View>
        <TouchableOpacity
          onPress={() => {
            let items = []
            let functions = []
            if (state === 'ASSEMBLE') {
              items = [...lanText.assembleMore]
              functions = [
                () => assembleHandler('REJECTASSEMBLE', coworker, index),
                () => assembleHandler('ACCEPTASSEMBLE', coworker, index)
              ]
            } else {
              items = [coworker.ISBLOCKED ? lanText.more[0] : lanText.more[1]]
              functions = [() => coworkerHandler('UPDATEBLOCK', coworker, index)]
            }
            navigation.push('MoreModal', { items, functions, isBack: true })
          }}>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    )
  }
  const removeAssemble = (index) => {
    let temp = []
    assembleCoworkers.forEach((assemble, assembleIndex) => {
      if (assembleIndex != index)
        temp.push({ ...assemble })
    })
    setAssembleCoworkers([...temp])
  }
  const assembleHandler = async (type, coworker, index) => {
    try {
      if (type === 'SELECT') {
        const { data } = await axios.get(requestURL + '/' + userID)
        setAssembleCoworkers([...data])
      } else {
        await axios.delete(requestURL, { data: { REQUESTID: coworker.ID } })
        removeAssemble(index)
        if (type === 'ACCEPTASSEMBLE') {
          await axios.post(coworkerURL, { USERID: userID, COWORKERID: coworker.USERID })
          setCoworkers([...coworkers, { ...coworker }])
        }
      }
    } catch (error) {
      showInfoModal()
      console.log('assembleHandler', error)
    }
  }
  const coworkerHandler = async (type, coworker, index) => {
    const coworkerID = coworker?.COWORKERID

    try {
      if (type === "SELECT") {
        const { data } = await axios.get(coworkerURL + '/' + userID)
        setCoworkers([...data])
      } else if (type === 'UPDATEBLOCK') {
        const body = {
          USERID: userID,
          COWORKERID: coworkerID
        }
        await axios.patch(coworkerURL, body)
        let temp = [...coworkers]
        if (coworker.ISBLOCKED) {
          temp[index].ISBLOCKED = 0
          delete blockList.current[coworkerID]
        } else {
          temp[index].ISBLOCKED = 1
          blockList.current[coworkerID] = true
        }
        setCoworkers([...temp])
      }
    } catch (error) {
      showInfoModal()
      console.log('coworkerHandler', error)
    }
  }
  useEffect(() => {
    coworkerHandler('SELECT')
    assembleHandler('SELECT')
  }, [])

  return (
    <View style={styles.container}>
      {coworkers.length || assembleCoworkers.length ?
        <ScrollView>
          {assembleCoworkers.length > 0 &&
            <View style={styles.body}>
              <View style={styles.contentHeader}>
                <Text style={styles.title}>{lanText.assemblage}</Text>
              </View>
              {Object.keys(assembleCoworkers).map((coworker, index) => {
                return (
                  <CoworkerItem
                    key={index}
                    coworker={assembleCoworkers[coworker]}
                    index={index}
                    state={'ASSEMBLE'} />
                )
              })}
            </View>}
          <View style={styles.body}>
            <View style={styles.contentHeader}>
              <Text style={styles.title}>{lanText.coworker}</Text>
            </View>
            {Object.keys(coworkers).map((coworker) => {
              if (!coworkers[coworker].ISBLOCKED)
                return (
                  <CoworkerItem
                    key={coworker}
                    coworker={coworkers[coworker]}
                    index={coworker}
                    state={'COWORKER'} />
                )
            })}
          </View>
          <View style={styles.body}>
            <View style={styles.contentHeader}>
              <Text style={styles.title}>{lanText.block}</Text>
            </View>
            {Object.keys(coworkers).map((coworker) => {
              if (coworkers[coworker].ISBLOCKED)
                return (
                  <CoworkerItem
                    key={coworker}
                    coworker={coworkers[coworker]}
                    index={coworker}
                    state={'COWORKER'} />
                )
            })}
          </View>
        </ScrollView> :
        <CustomText text={lanText.empty} textStyle={{ margin: 20, fontSize: 25 }} />}
    </View>
  )
}
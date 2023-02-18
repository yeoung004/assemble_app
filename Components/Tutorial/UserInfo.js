import { useState, useEffect, useContext, useRef } from "react"
import { styles } from './styles/UserInfo_style'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  Image
} from "react-native"
import {
  Ionicons,
  Feather,
  FontAwesome5,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import InputScrollView from 'react-native-input-scroll-view';
import { SearchBar } from "react-native-elements"
import { skills } from "../../assets/items/skill"
import * as ImagePicker from 'expo-image-picker'
import { Auth } from 'aws-amplify'
import FormData from "form-data"
import DateTimePicker from "@react-native-community/datetimepicker"
import { IP_ADDRESS } from '../../config/key'
import moment from "moment"
import axios from "axios"
import { AppContext } from '../../utils/context'
import { ProfileImage } from '../Common/ProfileImage'
import { countryFlag, countryName } from "../../assets/items/country";
import { positions } from "../../assets/items/dev";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/users/'

export const UserInfo = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState(moment().year())
  const [country, setCountry] = useState('')
  const [github, setGithub] = useState('')
  const [job, setJob] = useState('')
  const [experience, setExperience] = useState(0)
  const [gender, setGender] = useState(0)
  const [position, setPosition] = useState('')
  const [searchSkill, setSearchSkill] = useState('')
  const [searchInterest, setSearchInterest] = useState('')
  const [skill, setSkill] = useState([])
  const [interest, setInterest] = useState([])
  const [skillData, setSkillData] = useState([])
  const [interstData, setInterestData] = useState([])
  const [imageURL, setImageURL] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [careers, setCareers] = useState({})
  const [company, setCompany] = useState('')
  const [work, setWork] = useState('')
  const [start, setStart] = useState('')
  const [email, setEmail] = useState('')
  const [webpage, setWebpage] = useState('')
  const [end, setEnd] = useState('')
  const [dialogText, setDialogText] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [isSelectedStart, setIsSelectedStart] = useState(true)
  const [isProfileUploded, setIsProfileUploded] = useState(false)
  const [permission, setPermission] = ImagePicker.useMediaLibraryPermissions()
  const { 
    userInfos, 
    userID,
    lan
  } = useContext(AppContext)
  const { UserInfo: lanText } = lan.current
  const user_infos = userInfos.current
  const [next, setNext] = useState(0)
  const index = useRef()
  const isFromProfile = route.params?.preScreen == "Profile"

  const imageUpload = () => {
    const filename = imageURL.split('/').pop()
    const match = /\.(\w+)$/.exec(filename ?? '')
    const type = match ? `image/${match[1]}` : `image`
    const formData = new FormData()
    const fileExtension = filename.split('.').pop()
    const xhr = new XMLHttpRequest()
    const uri = `${userID}_profile.${fileExtension}`
    formData.append('image', { uri: imageURL, name: filename, type })

    xhr.open('post', baseURL + 'profile', true)
    xhr.setRequestHeader('uri', 'profileImage/' + `${uri}`)
    xhr.send(formData)
    xhr.onload = () => {
      const response = JSON.parse(xhr.response)
      const { isUploaded } = response
      if (isUploaded) {
        console.log("A profile picture is uploaded")
        userInfoHanlder(uri)
      } else
        showDialogBox(lanText.save)
    }
    xhr.onerror = error => {
      showDialogBox(lanText.save)
      console.log("picture error", error)
    }
  }
  const saveInfoHandler = () => {
    if (isProfileUploded)
      imageUpload()
    else
      userInfoHanlder()
  }
  const getToday = (time) => {
    return time == '' ? moment().format('YYYY-MM-DD') : time
  }
  const userInfoHanlder = async (uploadedProfileUri = null) => {
    let profile = uploadedProfileUri
    if (user_infos?.PROFILE_URL && !profile) {
      const list = user_infos.PROFILE_URL.split('.')
      profile = `${userID}_profile.${list[list.length - 1]}`
    }
    const user = {
      ID: userID,
      EMAIL: email,
      WEBPAGE: webpage,
      USER_NAME: name,
      COUNTRY: country,
      GITHUB: github,
      JOB: job,
      DEV_POSITION: position,
      PROFILE_URL: profile,
      SKILLS: skill,
      INTERESTS: interest,
      CAREERS: careers,
      BIRTH: birthYear,
      GENDER: gender,
      EXPERIENCE: experience
    }
    const method = isFromProfile ? 'PUT' : 'POST'
    try {
      await axios(baseURL + 'info', { method, data: user })
      userInfos.current = { ...user }
      navigation.reset({ index:0, actions:[ navigation.navigate('Community') ] })
      console.log("User info is saved")
    } catch (error) {
      showDialogBox(lanText.save)
      console.log("User info error", error)
    }
  }

  const Box = ({ isSkill }) => {
    let boxes = []
    const listBox = isSkill ? skill : interest
    for (let i = 0; i < listBox.length; i++) {
      boxes.push(
        <TouchableOpacity
          onPress={() => popItem(i, isSkill)}
          key={i}
          style={styles.skillBox__item}>
          <Text>
            {listBox[i]}
            <Feather name="x" size={15} color="black" />
          </Text>
        </TouchableOpacity>
      )
    }
    return boxes
  }
  const popItem = (index, isSkill) => {
    let temp = []
    const listBox = isSkill ? skill : interest
    for (let i = 0; i < listBox.length; i++) {
      if (i != index)
        temp.push(listBox[i])
    }
    if (isSkill)
      setSkill(temp)
    else
      setInterest(temp)

  }
  const addItem = (text, isSkill) => {
    const listBox = isSkill ? skill : interest
    if (listBox?.length >= 5) {
      showDialogBox(lanText.max)
    } else {
      let temp = listBox
      temp.push(text)
      if (isSkill)
        setSkill(temp)
      else
        setInterest(temp)
    }
    setSearchSkill("")
    setSearchInterest("")
    setSkillData([])
    setInterestData([])
  }
  const searchFunction = (text, isSkill) => {
    const updatedData = skills.filter((item) => {
      const item_data = `${item.toUpperCase()})`
      const text_data = text.toUpperCase()
      return item_data.indexOf(text_data) > -1
    })
    if (isSkill) {
      setSearchSkill(text)
      setSkillData(text == '' ? [] : updatedData.slice(0, 10))
    } else {
      setSearchInterest(text)
      setInterestData(text == '' ? [] : updatedData.slice(0, 10))
    }
  }
  const getProfileImage = async () => {
    if (!permission?.granted) {
      const permission_status = await setPermission()
      if (!permission_status.granted) {
        showDialogBox(lanText.allow)
      }
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1]
      })

      if (!result.cancelled) {
        setImageURL(result.uri)
        setIsProfileUploded(true)
      }
    }
  }
  const getErrorMessageForCareer = () => {
    if (Object.keys(careers).length > 5)
      return lanText.max
    if (end > start && end != '')
      return lanText.careerStartError
    if (company === "")
      return lanText.require.company
    if (work === "")
      return lanText.require.work
    if (start === "")
      return lanText.require.start
    return ""
  }
  const addCareer = () => {
    const message = getErrorMessageForCareer()
    if (message == '') {
      let temp = {
        ...careers,
        [Date.now()]: {
          COMPANY: company,
          WORK: work,
          START_DATE: start,
          END_DATE: end
        }
      }
      setCareers(temp)
      resetCareer()
    } else
      showDialogBox(message)
  }
  const resetCareer = () => {
    setCompany('')
    setWork('')
    setStart('')
    setEnd('')
  }
  const showDialogBox = (text) => {
    setDialogText(text)
    setDialogVisible(true)
  }
  const setDates = (date) => {
    if (isSelectedStart)
      setStart(date)
    else
      setEnd(date)
    setModalVisible(false)
  }
  const removeCareer = (career) => {
    let temp = { ...careers }
    delete temp[career]
    setCareers(temp)
  }
  const setExistInfo = () => {
    const infos = userInfos.current
    setImageURL(infos.PROFILE_URL)
    setCountry(infos.COUNTRY)
    setName(infos.USER_NAME)
    setGithub(infos.GITHUB)
    setJob(infos.JOB)
    setGender(infos.GENDER)
    setBirthYear(infos.BIRTH)
    setPosition(infos.DEV_POSITION)
    if(infos.SKILLS)
      setSkill([...infos.SKILLS])
    if(infos.INTERESTS)
      setInterest([...infos.INTERESTS])
    if(infos.CAREERS)
      setCareers([...infos.CAREERS])
    setWebpage(infos.WEBPAGE)
    setExperience(infos.EXPERIENCE)
  }
  const getEmailFromAuth = async () => {
    const { idToken } = await Auth.currentSession()
    if (idToken){
      setEmail(idToken.payload.email)
      setName(idToken.payload.name ?? '')
    }
  }
  useEffect(() => {
    if (isFromProfile) {
      setExistInfo()
    } else {
      getEmailFromAuth()
      setImageURL('')
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isFromProfile &&
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', left: 10 }}>
            <AntDesign name="swapleft" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: 'white' }}>USERINFO</Text>
        </View>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogVisible}>
        <View
          style={styles.dialog}>
          <Text style={styles.dialogText}>{dialogText}</Text>
          <TouchableOpacity
            style={styles.dialogButton}
            onPress={() => setDialogVisible(false)}>
            <Text style={styles.dialogButtonText}>{lanText.close}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView
        scrollEnabled={false}
        ref={index}
        style={styles.containner}
        pagingEnabled
        horizontal>
        <InputScrollView
          showsVerticalScrollIndicator={false}
          keyboardOffset={200}>
          <View style={[styles.userView, Platform.OS === 'ios'
            && { height: SCREEN_HEIGHT - 50 }]}>
            <View>
              {imageURL != null&&imageURL?.length > 0&&<>
                <TouchableOpacity
                  onPress={() => {
                    setImageURL(null)
                    setIsProfileUploded(false)
                  }}    
                  activeOpacity={0.8}
                  style={{
                    position:'absolute',
                    backgroundColor:'tomato',
                    width:30,
                    height:30,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:50,
                    top:10,
                    zIndex:9,
                    right:0
                  }}>
                  <Text style={{
                    color:'white',
                    fontSize:15,
                    fontWeight:'bold',
                  }}>X</Text>
                </TouchableOpacity>
              </>}
              <TouchableOpacity
                onPress={() => getProfileImage()}
                style={styles.user}>
                {isProfileUploded ?
                  <Image source={{ uri: imageURL }} style={styles.picture} /> :
                  <ProfileImage
                    source={imageURL}
                    styles={styles.picture} />}
              </TouchableOpacity>
            </View>
            <View style={styles.input}>
              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <FontAwesome5 name="user-alt" size={25} color="white" />
                </View>
                <TextInput
                  maxLength={20}
                  autoCorrect
                  value={name}
                  style={styles.info}
                  placeholder={lanText.placeholder.name}
                  onChangeText={setName}
                  placeholderTextColor={'#715F5F'}
                  returnKeyType="done" />
              </View>

              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <Ionicons name="earth" size={25} color="white" />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ListModal', {
                      items: countryName,
                      itemSelecter: setCountry,
                      selected: country,
                      leftImage: countryFlag
                    })
                  }}
                  style={styles.info}>
                  <Text style={{ 
                    textAlign: 'center', 
                    color: country == '' ? 'gray' : 'black' 
                  }}>{country == '' ? lanText.placeholder.country : country }</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <FontAwesome name="birthday-cake" size={25} color="white" />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    let years = []
                    for (let year = moment().year(); year >= 1960; year--) {
                      years.push(year)
                    }
                    navigation.navigate('ListModal', {
                      items: years,
                      itemSelecter: setBirthYear,
                      selected: birthYear
                    })}}
                  style={styles.info}>
                  <Text style={{ textAlign: 'center' }}>{birthYear}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoContiner}>
                <TouchableOpacity
                  onPress={() => setGender(0)}
                  style={[styles.infoIcon, {
                    flexGrow: 1,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundColor: gender == 0 ? 'tomato' : 'white'
                  }]}>
                  <Text style={{
                    color:gender == 0 ? 'white' : 'tomato'
                  }}>{lanText.pass}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender(1)}
                  style={[styles.infoIcon, {
                    flexGrow: 2,
                    backgroundColor: gender == 1 ? 'tomato' : 'white',
                    borderTopRightRadius:0,
                    borderTopLeftRadius:0,
                    borderBottomLeftRadius:0,
                    borderBottomRightRadius:0
                  }]}>
                  <MaterialCommunityIcons name="gender-male" size={23} color={gender == 1 ? 'white' : 'tomato'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender(2)}
                  style={[styles.infoIcon, {
                    backgroundColor: gender == 2 ? 'tomato' : 'white',
                    flexGrow: 2,
                    borderRadius:0,
                    borderTopLeftRadius:0,
                    borderBottomLeftRadius:0,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                  }]}>
                  <MaterialCommunityIcons name="gender-female" size={23} color={gender == 2 ? 'white' : 'tomato'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </InputScrollView>

        <InputScrollView
          showsVerticalScrollIndicator={false}
          keyboardOffset={200}>
          <View style={[styles.userView, Platform.OS === 'ios'
            && { height: SCREEN_HEIGHT - 50 }]}>
            <View style={styles.input}>
              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <AntDesign name="github" size={25} color="white" />
                </View>
                <TextInput
                  returnKeyType="done"
                  maxLength={50}
                  value={github == '' ? '' : 'github.com/' + github}
                  style={styles.info}
                  placeholder={"GITHUB URL"}
                  onChangeText={(text) => {
                    setGithub(text.split('github.com/').pop())
                  }}
                  placeholderTextColor={'#715F5F'} />
              </View>
              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <MaterialIcons name="web-asset" size={25} color="white" />
                </View>
                <TextInput
                  maxLength={500}
                  value={webpage}
                  style={styles.info}
                  placeholder={lanText.placeholder.web}
                  onChangeText={setWebpage}
                  placeholderTextColor={'#715F5F'}
                  returnKeyType="done" />
              </View>
              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <MaterialIcons name="work" size={25} color="white" />
                </View>
                <TextInput
                  maxLength={30}
                  value={job}
                  style={styles.info}
                  placeholder={lanText.placeholder.job}
                  onChangeText={setJob}
                  placeholderTextColor={'#715F5F'}
                  returnKeyType="done" />
              </View>

              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <MaterialIcons name="computer" size={25} color="white" />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ListModal', {
                      items: positions,
                      itemSelecter: setPosition,
                      selected: position
                    })
                  }}
                  style={styles.info}>
                  <Text style={{ 
                    textAlign: 'center',
                    color: position == '' ? 'gray' : 'black'
                  }}>{position == '' ? lanText.placeholder.dev : position}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoContiner}>
                <View style={styles.infoIcon}>
                  <FontAwesome5 name="business-time" size={21} color="white" />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    let years = []
                    for (let year = 0; year <= 15; year++) {
                      years.push(year)
                    }
                    navigation.navigate('ListModal', {
                      items: years,
                      itemSelecter: setExperience,
                      selected: experience
                  })}}
                  style={styles.info}>
                  <Text style={{ textAlign: 'center' }}>
                    {experience < 4 ? 'Junior'
                        : experience == 15 ? experience + '+' : 'Senior'}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </InputScrollView>

        <View style={styles.pickInfos}>
          <SearchBar
            value={searchSkill}
            onChangeText={(text) => searchFunction(text, true)}
            placeholder={lanText.placeholder.skill}
            placeholderTextColor={'#715F5F'}
            containerStyle={styles.searchContainner}
            inputContainerStyle={styles.searchBox} />
          <View style={styles.searchList}>
            <FlatList
              overScrollMode='never'
              showsVerticalScrollIndicator={false}
              data={skillData}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item}
                  onPress={() => addItem(item, true)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item} />
          </View>
          <View style={styles.skillBox}>
            <Box isSkill={true} />
          </View>
        </View>
        <View style={styles.pickInfos}>
          <SearchBar
            value={searchInterest}
            onChangeText={(text) => searchFunction(text, false)}
            placeholder={lanText.placeholder.interest}
            placeholderTextColor={'#715F5F'}
            containerStyle={styles.searchContainner}
            inputContainerStyle={styles.searchBox}
          />
          <View style={styles.searchList}>
            <FlatList
              overScrollMode='never'
              showsVerticalScrollIndicator={false}
              data={interstData}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item}
                  onPress={() => addItem(item, false)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item} />
          </View>
          <View style={styles.skillBox}>
            <Box isSkill={false} />
          </View>
        </View>
        <View style={styles.careerView}>
          {Platform.OS === 'android' && modalVisible &&
            <DateTimePicker
              value={new Date(isSelectedStart ? getToday(start) : getToday(end))}
              mode={'date'}
              display={'default'}
              onChange={(date) => {
                if (date.type === 'set')
                  setDates(moment(date.nativeEvent.timestamp).format('YYYY-MM-DD'))
                else
                  setModalVisible(false)
              }} />}
          <View style={styles.userCareers}>
            <View style={styles.userCareer}>
              <TextInput
                maxLength={50}
                value={company}
                onChangeText={setCompany}
                style={styles.careerInput}
                placeholder={lanText.placeholder.careerCompany} />
              <TextInput
                value={work}
                numberOfLines={1}
                maxLength={200}
                onChangeText={setWork}
                style={styles.careerInput}
                placeholder={lanText.placeholder.careerWork} />
              {Platform.OS === 'ios' &&
                <View style={styles.dates}>
                  <Text>From</Text>
                  <DateTimePicker
                    style={[styles.date, {
                      backgroundColor: 'transparent'
                    }]}
                    value={new Date(getToday(start))}
                    mode={'date'}
                    display={'calendar'}
                    onChange={(date) => {
                      setStart(moment(date.nativeEvent.timestamp).format('YYYY-MM-DD'))
                    }} />
                  <Text>To</Text>
                  <DateTimePicker
                    style={[styles.date, { backgroundColor: 'transparent' }]}
                    value={new Date(getToday(end))}
                    mode={'date'}
                    placeholderText={end === '' ? 'To' : end}
                    display={'calendar'}
                    onChange={(date) => {
                      setEnd(moment(date.nativeEvent.timestamp).format('YYYY-MM-DD'))
                    }} />
                </View>
              }
              {Platform.OS === 'android' &&
                <View style={styles.dates}>
                  <TouchableOpacity
                    style={styles.date}
                    onPress={() => {
                      setIsSelectedStart(true)
                      setModalVisible(true)
                    }}>
                    <Text style={styles.date_txt}>
                      {start === '' ? 'From' : start}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.date}
                    onPress={() => {
                      setIsSelectedStart(false)
                      setModalVisible(true)
                    }}>
                    <Text style={styles.date_txt}>
                      {end === '' ? 'To' : end}
                    </Text>
                  </TouchableOpacity>
                </View>}
              <TouchableOpacity
                onPress={() => addCareer()}
                style={styles.button}>
                <Text style={styles.button__txt}>Add Career</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.careers}>
              {Object.keys(careers).map((career, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => removeCareer(career)}
                    key={career}
                    style={styles.career}>
                    <View
                      style={styles.careerText}>
                      <Text style={styles.careerX}>{careers[career].COMPANY}</Text>
                      <Feather name="x" size={15} color="black" />
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 8,
        flexDirection: 'row',
      }}>
        {next > 0 &&
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'tomato',
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 30,
            }}
            onPress={() => {
              if (next > 0) {
                index.current.scrollTo({ x: next - SCREEN_WIDTH })
                setNext(next - SCREEN_WIDTH)
              }
            }}>
            <Ionicons name="caret-back-outline" size={20} color="white" />
            <Text style={{
              fontSize: 18,
              color: 'white'
            }}>Back</Text>
          </TouchableOpacity>}
        <TouchableOpacity
          activeOpacity={name == '' ? 1 : 0.8}
          style={{
            backgroundColor: name == '' ? 'gray' : next >= (SCREEN_WIDTH * 4) ? '#009CB8' : 'tomato',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            paddingRight: 30,
          }}
          onPress={() => {
            if(name != ''){
              if (next < SCREEN_WIDTH * 4) {
                index.current.scrollTo({ x: next + SCREEN_WIDTH })
                setNext(next + SCREEN_WIDTH)
              } else
                saveInfoHandler()
            }
          }}>
          <Text style={{ fontSize: 18, color: 'white' }}>
            {next < SCREEN_WIDTH * 4 ? lanText.next : lanText.done}
          </Text>
          {next < SCREEN_WIDTH * 4 ?
            <Ionicons name="caret-forward-outline" size={20} color="white" /> :
            <MaterialIcons name="file-download-done" size={20} color="white" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
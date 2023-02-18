import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import { styles } from './styles/ProjectNote_style'
import {
  Feather,
  AntDesign,
} from '@expo/vector-icons';
import { AppContext } from '../../../utils/context'
import ReadMore from '@fawazahmed/react-native-read-more'
import { getSayHello } from '../../Common/Common';
import axios from 'axios';
import { IP_ADDRESS } from '../../../config/key';
import moment from 'moment';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/project'

export const ProjectNote = ({ navigation, route }) => {
  const {
    userInfos,
    userID,
    lan
  } = useContext(AppContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [memos, setMemos] = useState([])
  const [editMemoIndex, setEditMemoIndex] = useState(null)
  const { ProjectNote: lanText } = lan.current
  const user_Infos = userInfos.current
  const projectID = route.params.PROJECTID

  const showInfoModal = (text, isError = false) => {
    if (isError)
      text = lanText.info
    navigation.navigate('InfoModal', { text, state: isError })
  }
  const checkInvaild = () => {
    let validation = true
    if (title.length == 0) {
      showInfoModal(lanText.infos.title)
      validation = false
    } else if (content.length == 0) {
      showInfoModal(lanText.infos.content)
      validation = false
    }
    return validation
  }
  const memoHandler = async (type, index) => {
    try {
      if (type === 'INSERT') {
        if (checkInvaild()) {
          const query = `
          mutation{
            addProjectMemo(
              PROJECTID:${projectID}
              TITLE:"${title}"
              WRITER:"${userID}"
              CONTENT:"""${content}"""
            ){
              ID
              TITLE
              WRITER
              CONTENT
              UPDATED_AT
              PROJECTID
            }
          }`
          const { data } = await axios.post(baseURL, { query })
          let temp = [...memos, { ...data.data.addProjectMemo }]
          setMemos([...temp])
          setTitle('')
          setContent('')
        }
      } else if (type === 'SELECT') {
        const query = `
        query {
            memos(PROJECTID:${projectID}) {
              ID
              TITLE
              WRITER
              CONTENT
              UPDATED_AT
            }
          }
        `
        const { data } = await axios.post(baseURL, { query })
        if (data)
          setMemos([...data.data.memos])
      } else if (type === 'UPDATE') {
        const query = `
          mutation{
            editProjectMemo(
              MEMOID:${memos[index].ID}
              WRITER:"${memos[index].WRITER}"
              TITLE:"${title}"
              CONTENT:"""${content}"""
            ){
              ID
              TITLE
              WRITER
              CONTENT
              UPDATED_AT
            }
          }`
        const { data } = await axios.post(baseURL, { query })
        let temp = [...memos]
        temp[index] = { ...data.data.editProjectMemo }
        setMemos([...temp])
        setTitle('')
        setContent('')
        setEditMemoIndex(null)
      } else if (type === 'DELETE') {
        const query = `
          mutation{
            removeProjectMemo(MEMOID:${memos[index].ID})
          }`
        await axios.post(baseURL, { query })
        let temp = []
        memos.forEach((data, memoIndex) => {
          if (index !== memoIndex)
            temp.push({ ...data })
        })
        setMemos([...temp])
      }
    } catch (error) {
      showInfoModal('', true)
      console.log('memoHandler', error)
    }
  }
  useEffect(() => {
    memoHandler('SELECT')
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        overScrollMode='never'
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 10,
              zIndex: 999,
            }}>
              <TouchableOpacity
                style={{ marginBottom: 30 }}
                onPress={() => navigation.goBack()}>
                <AntDesign name="swapleft" size={40} color="white" />
              </TouchableOpacity>
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
            <View style={styles.bodyTop}>
              <View>
                <Text style={[styles.topTxt, { color: 'black' }]}>{getSayHello()}</Text>
              </View>
              <View style={styles.projectImgContainer}>
              <Image
                resizeMode='center'
                source={route.params.PROFILE ? {uri: route.params.PROFILE} : require('../../../assets/pictures/logo2.png')}
                style={styles.projectImg} />
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.textInputBody}>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder={lanText.title}
                  maxLength={30}
                  style={styles.textInputTitle} />
              </View>
              <View style={styles.textInputBody}>
                <TextInput
                  value={content}
                  maxLength={1000}
                  onChangeText={setContent}
                  multiline
                  placeholder={lanText.content}
                  style={styles.textInputContent} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (editMemoIndex != null)
                    memoHandler('UPDATE', editMemoIndex)
                  else
                    memoHandler('INSERT')
                }}
                activeOpacity={0.8}
                style={styles.add}>
                <Text style={styles.addTxt}>{editMemoIndex != null ? lanText.edit : lanText.add}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTitle('')
                  setContent('')
                  setEditMemoIndex(null)
                }}
                activeOpacity={0.8}
                style={[styles.add, { backgroundColor: 'black' }]}>
                <Text style={[styles.addTxt, { color: 'white' }]}>{lanText.reset}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.memos}>
            {memos.length > 0 ?
              memos.map((memo, index) => {
                return (
                  <View
                    key={'index' + index}
                    activeOpacity={0.7}
                    style={styles.memo}>
                    <View style={styles.memoHeader}>
                      <Text style={styles.memoTitle}>{memo.TITLE}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('MoreModal', {
                            functions: [() =>
                              navigation.navigate('ConfirmModal', {
                                comment: lanText.comment,
                                METHOD: () => {
                                  memoHandler('DELETE', index)
                                  navigation.navigate('ProjectNote', { ...route.params })
                                },
                              }),
                            () => {
                              setTitle(memo.TITLE)
                              setContent(memo.CONTENT)
                              setEditMemoIndex(index)
                              navigation.navigate('ProjectNote', { ...route.params })
                            }],
                            items: lanText.item,
                          })
                        }}>
                        <Feather name="more-vertical" size={24} color="gray" />
                      </TouchableOpacity>
                    </View>
                    <ReadMore
                      seeMoreStyle={{ color: '#5B89FF' }}
                      seeLessStyle={{ color: '#5B89FF' }}
                      seeLessText={lanText.close}
                      seeMoreText={lanText.more}
                      textBreakStrategy='simple'
                      selectable
                      numberOfLines={2}
                      style={styles.memoContent}>
                      {memo.CONTENT}
                      <Text style={styles.memoDate}>
                        {'\n\n'+lanText.writed+'\n' + moment.utc(memo.UPDATED_AT).local().format('YY.MM.DD hh:mm A') + '\n'}
                      </Text>
                    </ReadMore>
                  </View>
                )
              }
              ) :
              <View style={styles.emptyWrap}>
                <Image style={{ width: 200, height: 200 }} source={require('../../../assets/pictures/undefine.png')} />
                <Text style={styles.emptyTitle}>{lanText.empty}</Text>
              </View>}
          </View>

        </View>
      </ScrollView>
    </View>
  )
}
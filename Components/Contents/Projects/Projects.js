import { 
  useContext, 
  useEffect, 
  useState 
} from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native'
import { styles } from './styles/Projects_style'
import { IP_ADDRESS } from '../../../config/key'
import { AppContext } from '../../../utils/context'
import { Navigate } from '../../Common/Navigate'
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import axios from 'axios'
import { ProfileImage } from '../../Common/ProfileImage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { skillImg } from '../../../assets/items/skillImg'
import moment from 'moment';
const baseURL = IP_ADDRESS + '/project'

export const Projects = ({ navigation, route }) => {
  const { 
    lan, 
    userID 
  } = useContext(AppContext)
  const [projects, setProjects] = useState([])
  const [issues, setIssues] = useState([])
  const [tasks, setTasks] = useState([])
  const [requestCnt, setRequestCnt] = useState(0)
  const [issueIndex, setIssueIndex] = useState(0)
  const [taskIndex, setTaskIndex] = useState(0)
  const { Projects: lanText } = lan.current
  const getSelectedTaskType = () => {
    let result = []
    if(tasks.length > 0) {
      let isVaild = false
      tasks.forEach(task => {
        if(taskIndex == 0 && moment.utc(task.UPLOAD_AT).local().format('D') == moment().format('D'))
          isVaild = true
        else if(taskIndex == 1 && moment.utc(task.UPLOAD_AT).local().weeks() == moment().weeks())
          isVaild = true
        else if(taskIndex == 2 && moment.utc(task.UPLOAD_AT).local().format('M') == moment().format('M'))
          isVaild = true
        if(isVaild)
          result.push({...task})
      })
    }
    return result
  }
  const getIssueIcon = () => {
    if(issueIndex == 0)
      return(<Feather name="info" size={27} color="#5A3FFF" />)
    else if(issueIndex == 1)
      return(<AntDesign name="warning" size={27} color="#eead00" />)
    else
      return(<MaterialIcons name="cancel" size={24} color="tomato" />)
  }
  const getSelectedIssueType = () => {
    let result = []
    if(issues.length > 0) {
      issues.forEach(issue => {
        if(issueIndex == 0 && issue.TYPE == 1)
          result.push({...issue})
        else if(issueIndex == 1 && issue.TYPE == 2)
          result.push({...issue})
        else if(issueIndex == 2 && issue.TYPE == 3)
          result.push({...issue})
      })
    }
    return result
  }
  const getProjectInfos = async () => {
    try {
      const { data } = await axios.post(baseURL, {
        query: `
              query { 
                projects(USERID:"${userID}") {
                  ID
                  PROJECT_NAME
                  MEMBERS {
                    PROFILE_URL
                  }
                  TECHS
                }
                requestCnt(ID:"${userID}")
                simpleTasks(
                  USERID:"${userID}"
                  MONTH:${moment.utc().format('M')}
                ) {
                  TITLE
                  PROJECT_NAME
                  UPLOAD_AT
                }
                simpleIssues( USERID:"${userID}") {
                  TITLE
                  PROJECT_NAME
                  TYPE
                  UPLOAD_AT
                }
            }`
      })
      setRequestCnt(data.data.requestCnt)
      setProjects([...data.data.projects])
      setIssues([...data.data.simpleIssues])
      setTasks([...data.data.simpleTasks])
    } catch (error) {
      console.log('getProjectInfos', error)
    }
  }
  const ProjectBack = ({ color }) => {
    const randome = Number(Math.random() * 10)
    if (randome > 5)
      return (
        <>
          <View style={{
            bottom: -25,
            right: -45,
            position: 'absolute',
            borderWidth: 20,
            borderColor: color,
            borderWidth: 30,
            width: 150,
            height: 150,
            borderRadius: 150
          }} />
          <View style={{
            bottom: -20,
            left: -20,
            position: 'absolute',
            opacity: 0.3,
            borderWidth: 20,
            borderColor: '#FFFFFF',
            width: 100,
            height: 100,
            borderRadius: 50
          }} />
          <View style={{
            top: -30,
            left: -30,
            position: 'absolute',
            opacity: 0.3,
            borderWidth: 20,
            borderColor: '#FFFFFF',
            width: 100,
            height: 100,
            borderRadius: 50
          }} />
        </>
      )
    else
      return (
        <>
          <View style={{
            position: 'absolute',
            top: -80,
            transform: [{ rotate: '135deg' }],
            opacity: 0.3,
            backgroundColor: color,
            width: 100,
            height: 500
          }} />
          <View style={{
            position: 'absolute',
            top: -250,
            transform: [{ rotate: '135deg' }],
            opacity: 0.3,
            backgroundColor: color,
            width: 50,
            height: 500
          }} />
          <View style={{
            position: 'absolute',
            top: -200,
            transform: [{ rotate: '45deg' }],
            opacity: 0.3,
            backgroundColor: color,
            width: 50,
            height: 500
          }} />
          <View style={{
            position: 'absolute',
            top: -100,
            transform: [{ rotate: '45deg' }],
            opacity: 0.3,
            backgroundColor: color,
            width: 50,
            height: 500
          }} />
          <View style={{
            position: 'absolute',
            top: 0,
            transform: [{ rotate: '45deg' }],
            opacity: 0.3,
            backgroundColor: color,
            width: 50,
            height: 500
          }} />
        </>
      )
  }
  const EmptyItem = () => {
    return (
      <View style={styles.issue}>
        <Text style={{
          color: 'gray',
          fontSize: 20,
          fontFamily:'Aldrich'
        }}>{lanText.empty}</Text>
      </View>
    )
  }
  useEffect(() => {
    getProjectInfos()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.back}
          source={require('../../../assets/pictures/project_back.png')} />
        <Text style={styles.headerTxt}>Hello world!</Text>
        <View style={styles.line} />
      </View>
      <ScrollView
        bounces={false}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}>
        <View style={styles.bodyTop} />
        <View style={styles.body}>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.title}>{lanText.project}</Text>
            <ScrollView
              nestedScrollEnabled
              bounces={false}
              overScrollMode='never'
              showsHorizontalScrollIndicator={false}
              horizontal>

              {projects.map((project, index) => {
                const randome = Number(Math.random() * 10)

                return (
                  <TouchableOpacity
                    key={'index:' + index}
                    onPress={() => navigation.navigate('ProjectDetail', { PROJECTID: project.ID })}
                    activeOpacity={0.7}
                    style={[styles.project, { backgroundColor: randome > 5 ? 'rgb(244,142,133)' : 'rgb(74,146,254)' }]}>
                    <View style={{
                      borderRadius: 20,
                      width: 150,
                      height: 200,
                      overflow: 'hidden',
                      justifyContent: 'space-between',
                      padding: 10
                    }}>
                      <ProjectBack color={randome > 5 ? 'rgb(234,79,65)' : 'rgb(9,68,157)'} />
                      <View style={{
                        opacity: 0.3,
                        flexDirection: 'row'
                      }}>
                        {project?.TECHS && project.TECHS.map((tech, index) => (
                          <View key={"index" + index}>{skillImg[tech](24)}</View>
                        ))}
                      </View>
                      <View>
                        <Text
                          numberOfLines={1}
                          lineBreakMode='tail'
                          style={{
                            fontFamily: 'Lato',
                            color: 'white',
                            fontSize: 18,
                            top: -10
                          }}>{project.PROJECT_NAME}</Text>
                        <View style={{
                          width: '100%',
                          flexDirection: 'row'
                        }}>
                          {Object.keys(project.MEMBERS).map((member, index) => {
                            const img = project.MEMBERS[member].PROFILE_URL
                            if (index < 3)
                              return (
                                <ProfileImage
                                  key={'index' + index}
                                  styles={{
                                    borderRadius: 50,
                                    width: 40,
                                    height: 40,
                                  }}
                                  source={img} />
                              )
                          })}
                          {Object.keys(project.MEMBERS).length > 3 &&
                            <View
                              style={{
                                borderRadius: 50,
                                width: 40,
                                height: 40,
                                left: -30,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>
                              <Text style={{
                                fontSize: 18,
                                color: 'gray'
                              }}>{Object.keys(project.MEMBERS).length}+</Text>
                            </View>}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('NewProject')}
                style={[styles.project, {
                  marginLeft: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }]}>
                <Text style={{ fontSize: 40, color: 'gray' }}>+</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.conetentContainer}>
            <Text style={styles.title}>{lanText.issue}</Text>
            <View style={styles.subtitles}>
              <TouchableOpacity
                style={[
                  styles.subtitleContainer, 
                  issueIndex === 0 && styles.issueUnderLine
                ]}
                onPress={() => setIssueIndex(0)}>
                <Text style={[
                  styles.subtitle, 
                  issueIndex === 0 
                  && styles.selectedTxt
                ]}>{lanText.info}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.subtitleContainer, issueIndex === 1 && styles.issueUnderLine]}
                onPress={() => setIssueIndex(1)}>
                <Text style={[styles.subtitle, issueIndex === 1 && styles.selectedTxt]}>{lanText.warning}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.subtitleContainer, issueIndex === 2 && styles.issueUnderLine]}
                onPress={() => setIssueIndex(2)}>
                <Text style={[styles.subtitle, issueIndex === 2 && styles.selectedTxt]}>{lanText.error}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              scrollEnabled={false}
              pagingEnabled
              overScrollMode='never'
              showsHorizontalScrollIndicator={false}
              horizontal>
              <View style={styles.issues}>
                <FlatList
                  ListEmptyComponent={() => (<EmptyItem />)}
                  bounces={false}
                  nestedScrollEnabled
                  keyExtractor={(item, index) => 'index' + index}
                  data={getSelectedIssueType()}
                  renderItem={({ item, index }) => (
                        <View style={styles.issue}>
                          <View style={styles.issueLeft}>
                            {getIssueIcon()}
                            <View style={styles.issueBody}>
                              <Text
                                lineBreakMode='tail'
                                numberOfLines={1}
                                style={styles.issueTitle}>{item.TITLE}</Text>
                              <Text style={styles.issueSubtitle}>{item.PROJECT_NAME}</Text>
                            </View>
                          </View>
                          <Text style={styles.issueTime}>
                            {moment.utc(item.UPLOAD_AT).local().format('MM.DD HH:mm')}
                          </Text>
                        </View>
                  )}
                  overScrollMode='never'
                  showsVerticalScrollIndicator={false}>
                </FlatList>
              </View>
            </ScrollView>
          </View>
          <View style={styles.conetentContainer}>
            <Text style={styles.title}>{lanText.task}</Text>
            <View style={styles.subtitles}>
              <TouchableOpacity
                style={[styles.subtitleContainer, taskIndex === 0 && styles.taskUnderLine]}
                onPress={() => setTaskIndex(0)}>
                <Text style={[styles.subtitle, taskIndex === 0 && styles.selectedTxt]}>{lanText.today}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.subtitleContainer, taskIndex === 1 && styles.taskUnderLine]}
                onPress={() => setTaskIndex(1)}>
                <Text style={[styles.subtitle, taskIndex === 1 && styles.selectedTxt]}>{lanText.week}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.subtitleContainer, taskIndex === 2 && styles.taskUnderLine]}
                onPress={() => setTaskIndex(2)}>
                <Text style={[styles.subtitle, taskIndex === 2 && styles.selectedTxt]}>{lanText.month}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              scrollEnabled={false}
              pagingEnabled
              overScrollMode='never'
              showsHorizontalScrollIndicator={false}
              horizontal>
              <View style={styles.issues}>
                <FlatList
                  ListEmptyComponent={() => (<EmptyItem />)}
                  bounces={false}
                  nestedScrollEnabled
                  keyExtractor={(item, index) => 'index' + index}
                  data={getSelectedTaskType()}
                  renderItem={({ item, index }) => (
                    <View style={styles.issue}>
                      <View style={styles.issueLeft}>
                        <AntDesign name="checkcircleo" size={27} color="#5A3FFF" />
                        <View style={styles.issueBody}>
                          <Text
                            lineBreakMode='tail'
                            numberOfLines={1}
                            style={styles.issueTitle}>{item.TITLE}</Text>
                          <Text style={styles.issueSubtitle}>{item.PROJECT_NAME}</Text>
                        </View>
                      </View>
                      <Text style={styles.issueTime}>
                        {moment.utc(item.UPLOAD_AT).local().format('MM.DD HH:mm')}
                      </Text>
                    </View>
                  )}
                  overScrollMode='never'
                  showsVerticalScrollIndicator={false}>
                </FlatList>
              </View>
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectRequest', { requestCnt, setRequestCnt })}
          style={styles.letter}>
          <MaterialCommunityIcons name="email-newsletter" size={30} color="white" />
          {requestCnt > 0 && <View style={styles.letterNoti} />}
        </TouchableOpacity>
      </ScrollView>
      <Navigate nowScreen={'Projects'} navigation={navigation} />
    </SafeAreaView>
  )
}
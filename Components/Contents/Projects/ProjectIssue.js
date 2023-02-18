import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	TextInput,
	Dimensions
} from 'react-native'
import {
	useContext,
	useEffect,
	useState
} from 'react'
import { styles } from './styles/ProjectIssue_style'
import {
	AntDesign,
	Feather
} from '@expo/vector-icons';
import { AppContext } from '../../../utils/context';
import ReadMore from '@fawazahmed/react-native-read-more';
import { getSayHello } from '../../Common/Common';
import moment from 'moment';
import axios from 'axios';
import { IP_ADDRESS } from '../../../config/key';
import { sendMessageToFirebase } from '../../../utils/groupChatting';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/project'

export const ProjectIssue = ({ navigation, route }) => {
	const {
		userInfos,
		lan,
		userID,
		fireDatabase
	} = useContext(AppContext)
	const [issues, setIssues] = useState([])
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [type, setType] = useState(1)
	const [issueType, setIssueType] = useState(0)
	const [editIssueIndex, setEditIssueIndex] = useState(null)
	const user_Infos = userInfos.current
	const project_id = route.params.PROJECTID
	const { ProjectIssue: lanText } = lan.current

	const showInfoModal = (text, isError = false) => {
		if (isError)
			text = lanText.info(text)
		navigation.navigate('InfoModal', { text, state: isError })
	}
	const removeIssue = async (issueID, index) => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `mutation{ removeIssue( ISSUEID:${issueID} ) }`
			})
			if (data) {
				let temp = []
				issues.forEach((issue, tempIndex) => {
					if (index != tempIndex)
						temp.push(issue)
				})
				setIssues([...temp])
			}
		} catch (error) {
			showInfoModal(lanText.remove, true)
			console.log('removeIssue', error)
		}
	}
	const addIssue = async () => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `mutation{
					addProjectIssue(
						TITLE:"${title}"
						CONTENT:"""${content}"""
						UPLOADER:"${userID}"
						REFERENCE:null
						PROJECTID:${project_id}
						TYPE:${type}
					) {
						ID
						TITLE
						CONTENT
						UPLOADER
						UPLOAD_AT
						REFERENCE
						PROJECTID
						TYPE
					}
				}`
			})
			if (data) {
				setIssues([{ ...data.data.addProjectIssue }, ...issues])
				setType(1)
				setTitle('')
				setContent('')
				let memberTemp = {}
				route.params.MEMBERS.forEach((member) => {
					memberTemp[member.MEMBERID] = member.MEMBERID
				})
				await sendMessageToFirebase(
					fireDatabase,
					project_id,
					userID,
					'ProjectIssue.uploadIssue',
					route.params.PROJECT_NAME,
					memberTemp,
					true
				)
			}
		} catch (error) {
			showInfoModal(lanText.add, true)
			console.log('addIssue', error)
		}
	}
	const doneIssue = async (issueId, index) => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `mutation{
					editIssue(
						ID:${issueId}
						TITLE:"${issues[index].TITLE}"
						CONTENT:"""${issues[index].CONTENT}"""
						UPLOADER:"${userID}"
						REFERENCE:null
						TYPE:4
					) 
				}`
			})
			if (data) {
				let temp = [...issues]
				temp[index].TYPE = 4
				setIssues([...temp])
				resetContent()
			}
		} catch (error) {
			showInfoModal(lanText.edit, true)
			console.log('doneIssue', error)
		}
	}
	const editIssue = async (issueId, index) => {
		try {
			await axios.post(baseURL, {
				query: `mutation{
					editIssue(
						ID:${issueId}
						TITLE:"${title}"
						CONTENT:"${content}"
						UPLOADER:"${userID}"
						REFERENCE:null
						TYPE:${type}
					) 
				}`
			})
			let temp = [...issues]
			temp[index] = {
				ID: issueId,
				TITLE: title,
				CONTENT: content,
				UPLOADER: userID,
				REFERENCE: null,
				PROJECTID: project_id,
				TYPE: type
			}
			setIssues([...temp])
			resetContent()
		} catch (error) {
			showInfoModal(lanText.edit, true)
			console.log('editIssue', error)
		}
	}
	const resetContent = () => {
		setType(1)
		setTitle('')
		setContent('')
		setEditIssueIndex(null)
	}
	const getIssues = async () => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `query{
					issues(PROJECTID:${project_id}) {
						ID
						TITLE
						CONTENT
						UPLOADER
						UPLOAD_AT
						PROJECTID
						TYPE
					}
				}`
			})
			if (data)
				setIssues([...data.data.issues])
		} catch (error) {
			showInfoModal(lanText.get, true)
			console.log('getIssues', error)
		}
	}
	const checkVaild = () => {
		let result = true
		let text = ''
		if (title.length == 0) {
			result = false
			text = lanText.require.title
		} else if (content.length == 0) {
			result = false
			text = lanText.require.content
		}
		if (!result)
			showInfoModal(text)

		return result
	}
	const getIssueColor = (type) => {
		let color = ''
		if (type === 1)
			color = '#5B89FF'
		else if (type === 2)
			color = '#E7A600'
		else if (type === 3)
			color = '#FF5151'
		else
			color = '#7C7C7C'
		return color
	}

	useEffect(() => {
		getIssues()
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
							<Text style={styles.title}>{lanText.title}</Text>
							<View style={styles.textInputBody}>
								<TextInput
									value={title}
									onChangeText={setTitle}
									placeholderTextColor={'gray'}
									placeholder={lanText.title}
									style={styles.textInputTitle} />
							</View>
							<Text style={styles.title}>{lanText.content}</Text>
							<View style={styles.textInputBody}>
								<TextInput
									value={content}
									onChangeText={setContent}
									multiline
									placeholderTextColor={'gray'}
									placeholder={lanText.content}
									style={styles.textInputContent} />
							</View>
							<Text style={styles.title}>{lanText.type}</Text>
							<View style={styles.inputButtons}>
								<TouchableOpacity
									onPress={() => setType(1)}
									style={[styles.inputButton, {
										backgroundColor: '#5B89FF',
										borderColor: 'lightgray',
										borderWidth: type == 1 ? 3 : 0
									}]}>
									<Text style={[styles.buttonTxt, {
										color: type == 1 ? 'lightgray' : 'white'
									}]}>{lanText.types.info}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => setType(2)}
									style={[styles.inputButton, {
										backgroundColor: '#FFB800',
										borderColor: 'lightgray',
										borderWidth: type == 2 ? 3 : 0
									}]}>
									<Text style={[styles.buttonTxt, {
										color: type == 2 ? 'lightgray' : 'white'
									}]}>{lanText.types.warning}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => setType(3)}
									style={[styles.inputButton, {
										backgroundColor: '#FF5151',
										borderColor: 'lightgray',
										borderWidth: type == 3 ? 3 : 0
									}]}>
									<Text style={[styles.buttonTxt, {
										color: type == 3 ? 'lightgray' : 'white'
									}]}>{lanText.types.error}</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								onPress={() => {
									if (checkVaild()) {
										if (editIssueIndex != null)
											editIssue(issues[editIssueIndex].ID, editIssueIndex)
										else
											addIssue()
									}
								}}
								style={styles.add}>
								<Text style={styles.addTxt}>{editIssueIndex != null ? lanText.edit : lanText.add}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => resetContent()}
								style={[styles.add, { backgroundColor: 'black', marginTop: 5 }]}>
								<Text style={[styles.addTxt, { color: 'white' }]}>{lanText.reset}</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.issueTitles}>
						<TouchableOpacity
							onPress={() => setIssueType(0)}
							style={[styles.issueTitleContainer,
							issueType == 0 && {
								borderBottomWidth: 3
							}]}>
							<Text style={[styles.issueButtonTitle,
							issueType == 0 && {
								color: 'black',
								fontWeight: 'bold'
							}]}>{lanText.all}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setIssueType(1)}
							style={[styles.issueTitleContainer,
							issueType == 1 && {
								borderBottomWidth: 3
							}]}>
							<Text style={[styles.issueButtonTitle,
							issueType == 1 && {
								color: 'black',
								fontWeight: 'bold'
							}]}>{lanText.types.info}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setIssueType(2)}
							style={[styles.issueTitleContainer,
							issueType == 2 && {
								borderBottomWidth: 3
							}]}>
							<Text style={[styles.issueButtonTitle,
							issueType == 2 && {
								color: 'black',
								fontWeight: 'bold'
							}]}>{lanText.types.warning}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setIssueType(3)}
							style={[styles.issueTitleContainer,
							issueType == 3 && {
								borderBottomWidth: 3
							}]}>
							<Text style={[styles.issueButtonTitle,
							issueType == 3 && {
								color: 'black',
								fontWeight: 'bold'
							}]}>{lanText.types.error}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setIssueType(4)}
							style={[styles.issueTitleContainer,
							issueType == 4 && {
								borderBottomWidth: 3
							}]}>
							<Text style={[styles.issueButtonTitle,
							issueType == 4 && {
								color: 'black',
								fontWeight: 'bold'
							}]}>{lanText.done}</Text>
						</TouchableOpacity>
					</View>
					{issues.length > 0 ?
						<ScrollView>
							<View style={styles.issues}>
								{issues.map((issue, index) => {
									if (issueType === issue.TYPE || issueType == 0)
										return (
											<View
												key={'index' + index}
												activeOpacity={0.9}
												style={[styles.issue, { backgroundColor: getIssueColor(issue.TYPE) }]}>
												<View style={styles.issueHeader}>
													<Text style={styles.issueTitle}>{issue.TITLE}</Text>
													<TouchableOpacity
														onPress={() => {
															let items = [lanText.item[0], lanText.item[1]]
															let functions = [
																() => navigation.navigate('ConfirmModal', {
																	comment: lanText.comment,
																	METHOD: () => {
																		removeIssue(issue.ID, index)
																		navigation.navigate('ProjectIssue', { ...route.params })
																	},
																}),
																() => {
																	setTitle(issue.TITLE)
																	setContent(issue.CONTENT)
																	setType(issue.TYPE)
																	setEditIssueIndex(index)
																	navigation.navigate('ProjectIssue', { ...route.params })
																}]
															if (issue.TYPE != 4) {
																items.push(lanText.item[2])
																functions.push(() => {
																	doneIssue(issue.ID, index)
																	navigation.navigate('ProjectIssue', { ...route.params })
																})
															}
															navigation.navigate('MoreModal', { functions, items })
														}}>
														<Feather name="more-vertical" size={24} color="white" />
													</TouchableOpacity>
												</View>
												<ReadMore
													lineBreakMode='tail'
													seeMoreStyle={{ color: 'black' }}
													seeLessStyle={{ color: 'black' }}
													seeLessText={lanText.close}
													seeMoreText={lanText.more}
													allowFontScaling={false}
													selectable
													style={styles.issueContent}>{issue.CONTENT}
													<Text style={styles.issueDate}>
														{'\n\n' + lanText.writed + '\n' + moment.utc(issue.UPLOAD_AT).local().format('YY.MM.DD hh:mm A') + '\n'}
													</Text>
												</ReadMore>
											</View>
										)
								})
								}
							</View>
						</ScrollView> :
						<View style={styles.issues}>
							<Image
								resizeMode="contain"
								style={styles.emptyImg}
								source={require('../../../assets/pictures/notification.png')} />
							<Text style={styles.emptyTxt}>{lanText.empty}</Text>
						</View>}
				</View>
			</ScrollView>
		</View>
	)
}
import { 
	View, 
	Text, 
	ScrollView, 
	TouchableOpacity, 
	Image, 
	TextInput, 
	Dimensions, 
	ActivityIndicator 
} from 'react-native'
import { useContext, useEffect, useRef, useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { styles } from './styles/NewProject_style'
import { skillImg } from '../../../assets/items/skillImg'
import * as ImagePicker from 'expo-image-picker'
import { AppContext } from '../../../utils/context';
import axios from "axios"
import { IP_ADDRESS } from '../../../config/key';
import { ProfileImage } from '../../Common/ProfileImage';
import { SearchBar } from "react-native-elements"
import { skills } from '../../../assets/items/skill';
import { imageUpload } from '../../Common/uploadImage';
import { sendInvite } from '../../Common/Common'
import { isIOS } from 'react-native-elements/dist/helpers';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/project'

export const NewProject = ({ navigation, route }) => {
	const {
		userInfos,
		userID,
		lan,
		firebaseStorage,
		fireDatabase
	} = useContext(AppContext)
	const projectID = route.params?.PROJECTID
	const [permission, setPermission] = ImagePicker.useMediaLibraryPermissions()
	const [tag, setTag] = useState('')
	const [role, setRole] = useState('')
	const [selectedMember, setSelectedMember] = useState(null)
	const [members, setMembers] = useState([])
	const [delMembers, setDelMembers] = useState([])
	const [searchTech, setSearchTech] = useState('')
	const [tech, setTech] = useState([])
	const profileImageExtension = useRef(null)
	const [isLoading, setIsLoading] = useState(false)
	const editState = useRef({
		isImageEdited: false,
		isMemberEdited: false,
		isTechEdited: false,
		isTagEdited: false
	})
	const [projectInfo, setProjectInfo] = useState({
		LEADER_ID: userID,
		PROJECT_NAME: null,
		GITHUB: null,
		FIGMA: null,
		WEB: null,
		PROFILE: 'https://s3-us-west-1.amazonaws.com/files.delesign/assets/ideas.png',
		MEMBER: {},
		TECH: [],
		TAG: []
	})
	const { NewProject: lanText } = lan.current
	const searchFunction = (text) => {
		const updatedData = skills.filter((item) => {
			const item_data = `${item.toUpperCase()})`
			const text_data = text.toUpperCase()
			return item_data.indexOf(text_data) > -1
		})
		setSearchTech(text)
		setTech(text == '' ? [] : updatedData.slice(0, 10))
	}
	const showInfoModal = (text, isError = false) => {
		if (isError)
			text = lanText.info
		navigation.navigate('InfoModal', { text, state: isError })
	}
	const getProfileImage = async () => {
		if (!permission?.granted) {
			const permission_status = await setPermission()
			if (!permission_status.granted) {
				showInfoModal(lanText.allow)
			}
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1,
				aspect: [1, 1]
			})

			if (!result.cancelled) {
				editstate('IMG')
				addProjectInfo('IMG', result.uri)
				profileImageExtension.current = String(result.uri).split('.').pop()
			}
		}
	}
	const editstate = (type) => {
		if (type === 'IMG')
			editState.current.isImageEdited = true
		else if (type === 'MEMBER')
			editState.current.isMemberEdited = true
		else if (type === 'TECH')
			editState.current.isTechEdited = true
		else if (type === 'TAG')
			editState.current.isTagEdited = true
	}
	const makeUpper = (text = '') => {
		let temp = text.split(' ')
		let textTemp = ''

		temp.forEach((textArray, index) => {
			if (textArray.length > 0)
				textTemp += String(textArray[0]).toUpperCase() + textArray.slice(1, textArray.length) + ' '
		})
		textTemp = textTemp.slice(0, textTemp.length - 1)
		return textTemp
	}
	const tagHandler = (type, tagIndex) => {
		editstate('TAG')
		if (type === 'ADD') {
			if (tag.length > 0) {
				setTag('')
				addProjectInfo('TAG', tag)
			}
		}
		else if (type === 'REMOVE') {
			let projectTemp = { ...projectInfo }
			let resultTemp = []
			projectTemp.TAG.forEach((value, index) => {
				if (index !== tagIndex)
					resultTemp.push(value)
			})
			projectTemp.TAG = [...resultTemp]
			setProjectInfo({ ...projectTemp })
		}
	}
	const techHandler = (type, tech) => {
		editstate('TECH')
		if (type === 'ADD') {
			setSearchTech('')
			setTech([])
			addProjectInfo('TECH', tech)
		} else if (type === 'REMOVE') {
			let projectTemp = { ...projectInfo }
			let resultTemp = []
			projectTemp.TECH.forEach((value, index) => {
				if (index !== tech)
					resultTemp.push(value)
			})
			projectTemp.TECH = [...resultTemp]
			setProjectInfo({ ...projectTemp })
		}
	}
	const memberHandler = (type, member) => {
		editstate('MEMBER')
		if (type === 'ADD') {
			if (role.length > 0) {
				addProjectInfo('MEMBER', {
					MEMBERID: selectedMember.COWORKERID,
					ROLE: makeUpper(role),
					PROFILE_URL: selectedMember.PROFILE_URL,
					USER_NAME: selectedMember.USER_NAME,
				})
				setRole('')
				setSelectedMember(null)
			}
		} else if (type === 'REMOVE') {
			let projectTemp = { ...projectInfo }
			delete projectTemp.MEMBER[member]
			setProjectInfo({ ...projectTemp })
		} else if (type === 'EDIT') {
			let projectTemp = { ...projectInfo }
			projectTemp.MEMBER[selectedMember.INDEX].ROLE = makeUpper(role)
			setProjectInfo({ ...projectTemp })
			setRole('')
			setSelectedMember(null)
		} else if (type === 'BANISH') {
			let delTemp = [...delMembers]
			let projectTemp = { ...projectInfo }

			delTemp.push(selectedMember.COWORKERID)
			delete projectTemp.MEMBER[selectedMember.INDEX]

			setProjectInfo({ ...projectTemp })
			setDelMembers([...delTemp])
			setRole('')
			setSelectedMember(null)
		}
	}
	const addProjectInfo = (type, data) => {
		let temp = { ...projectInfo }

		if (type === 'NAME')
			temp.PROJECT_NAME = data
		else if (type === 'IMG')
			temp.PROFILE = data
		else if (type === 'GITHUB')
			temp.GITHUB = data
		else if (type === 'FIGMA')
			temp.FIGMA = data
		else if (type === 'WEB')
			temp.WEB = data
		else if (type === 'TAG')
			temp.TAG.push(makeUpper(data))
		else if (type === 'TECH')
			temp.TECH.push(data)
		else if (type === 'MEMBER') {
			let memberTemp = { ...temp.MEMBER }
			memberTemp[data.MEMBERID] = { ...data }
			temp.MEMBER = { ...memberTemp }
		}

		setProjectInfo({ ...temp })
	}
	const getCoworkerList = async () => {
		try {
			const { data } = await axios.get(IP_ADDRESS + '/users/coworker/' + userID)
			setMembers([...data])
		} catch (error) {
			showInfoModal('', true)
			console.log('getCoworkerList', error)
		}
	}
	const invalidProjectInfo = () => {
		let text = ''
		let isValid = true
		const githubExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
		const figmaExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
		const webExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

		if (!projectInfo.PROJECT_NAME?.length) {
			isValid = false
			text += lanText.required.name
		} else if (!projectInfo.TAG.length) {
			isValid = false
			text += lanText.required.tag
		} else if (!projectInfo.TECH.length) {
			isValid = false
			text += lanText.required.tech
		} else if (!webExp.test(projectInfo.WEB) && projectInfo.WEB?.length > 0) {
			isValid = false
			text += lanText.required.web
		} else if (!figmaExp.test(projectInfo.FIGMA) && projectInfo.FIGMA?.length > 0) {
			isValid = false
			text += lanText.required.figma
		} else if (!githubExp.test(projectInfo.GITHUB) && projectInfo.GITHUB?.length > 0) {
			isValid = false
			text += lanText.required.github
		}

		if (!isValid)
			showInfoModal(text)
		return isValid
	}
	const editProject = async () => {
		try {
			if (invalidProjectInfo()) {
				let imageURL = projectInfo.PROFILE

				if (editState.current.isImageEdited) {
					imageURL = await imageUpload(
						firebaseStorage,
						projectInfo.PROFILE,
						'project/profile',
						result?.data?.createProject + '.' + profileImageExtension.current
					)
				}

				let query = `mutation {
						editProject(
							ID:${projectID},
							PROJECT_NAME:"${makeUpper(projectInfo.PROJECT_NAME)}",
							PROFILE:"${imageURL}",
							FIGMA:${projectInfo.FIGMA ? '"' + projectInfo.FIGMA + '"' : null},
							WEB:${projectInfo.WEB ? '"' + projectInfo.WEB + '"' : null},
							GITHUB:${projectInfo.GITHUB ? '"' + projectInfo.GITHUB + '"' : null}
						)
					`

				if (editState.current.isMemberEdited) {
					delMembers.forEach((member) => {
						query += `removeProjectMemeber(
							MEMBERID:"${member}",
							PROJECTID:${projectID}
						)
					`})

					Object.keys(projectInfo.MEMBER).map(member => {
						if(projectInfo.MEMBER[member].COWORKERID != userID)
							query += `editProjectMember(
									PROJECTID: ${projectID},
									MEMBERID: "${projectInfo.MEMBER[member].COWORKERID}",
									ROLE: "${projectInfo.MEMBER[member].ROLE}"
								)
							`
					})
				}
				if(editState.current.isTagEdited){
					query += `editProjectTag(
						PROJECTID:${projectID},
						TAG:${JSON.stringify(projectInfo.TAG)}
					)
				`
				}

				if(editState.current.isTechEdited){
					query += `editProjectTech(
						PROJECTID:${projectID},
						TECH:${JSON.stringify(projectInfo.TECH)}
					)
				`
				}
				query += '}'
				await axios.post(baseURL, { query })
				navigation.navigate('ProjectFront', { ...route.params })
			}
		} catch (error) {
			showInfoModal('', true)
			console.log('editProject', error)
		}
		setIsLoading(false)
	}
	const addProject = async () => {
		try {
			if (invalidProjectInfo()) {
				let memberTemp = `[{ MEMBERID: "${userID}", ROLE: "Leader"},`
				Object.keys(projectInfo.MEMBER).map(member => {
					memberTemp += `{
						MEMBERID: "${projectInfo.MEMBER[member].MEMBERID}",
						ROLE: "${projectInfo.MEMBER[member].ROLE}"
					},`
				})
				memberTemp += ']'
				let query = `mutation {
						createProject(
							LEADER_ID:"${projectInfo.LEADER_ID}",
							PROJECT_NAME:"${makeUpper(projectInfo.PROJECT_NAME)}",
							PROFILE:null,
							FIGMA:${projectInfo.FIGMA ? '"' + projectInfo.FIGMA + '"' : null},
							WEB:${projectInfo.WEB ? '"' + projectInfo.WEB + '"' : null},
							GITHUB:${projectInfo.GITHUB ? '"' + projectInfo.GITHUB + '"' : null},
							TAG:${JSON.stringify(projectInfo.TAG)},
							MEMBER:${memberTemp},
							TECH:${JSON.stringify(projectInfo.TECH)}
					)}`
				let { data: result } = await axios.post(baseURL, { query })
				if(result.data.createProject != null){
					if (profileImageExtension.current) {
						imageUpload(
							firebaseStorage,
							projectInfo.PROFILE,
							'project/profile',
							result.data.createProject + '.' + profileImageExtension.current
						).then((imageURL) => {
							query = `mutation {
								updateProfile(
									PROJECTID:${result.data.createProject},
									PROFILE:"${imageURL}"
							)}`
							axios.post(baseURL, { query })
						})
					}
					Object.keys(projectInfo.MEMBER).map(member => {
						sendInvite(
							fireDatabase,
							projectInfo.MEMBER[member].MEMBERID,
							userID,
							userInfos.current.USER_NAME)
					})
					navigation.goBack()
				}else{
					showInfoModal('', true)
				}
			}
		} catch (error) {
			showInfoModal('', true)
			console.log('addProject', error)
		}
		setIsLoading(false)
	}
	const getProject = async () => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `
					query { 
						project(ID:${projectID}) {
							ID
							LEADER_ID
							CREATE_AT
							PROJECT_NAME
							FIGMA
							WEB
							PROFILE
							GITHUB
							TAGS
							TECHS
							MEMBERS {
								ID
								PROFILE_URL
								MEMBERID
								SIGNEDUP_AT
								ROLE
								TECHS
								USER_NAME
							}
						}
				}`
			})
			return data.data.project
		} catch (error) {
			console.log('getProject', error)
			showInfoModal('', true)
		}
	}
	const setEditProject = async () => {
		const pastInfo = await getProject()
		let temp = { ...projectInfo }
		temp.FIGMA = pastInfo.FIGMA
		temp.GITHUB = pastInfo.GITHUB
		temp.WEB = pastInfo.WEB
		temp.PROJECT_NAME = pastInfo.PROJECT_NAME
		temp.PROFILE = pastInfo.PROFILE
		temp.TECH = [...pastInfo.TECHS]
		temp.TAG = [...pastInfo.TAGS]
		temp.TAG = [...pastInfo.TAGS]
		let memberTemp = []
		pastInfo.MEMBERS.forEach((member) => {
			memberTemp.push({
				COWORKERID: member.MEMBERID,
				USER_NAME: member.USER_NAME,
				PROFILE_URL: member.PROFILE_URL,
				ROLE: member.ROLE
			})
		})
		temp.MEMBER = [...memberTemp]
		setProjectInfo({ ...temp })
	}

	useEffect(() => {
		getCoworkerList()
		if (projectID)
			setEditProject()
	}, [])

	return (
		<View style={styles.container}>
			{isLoading &&
				<View style={{
					opacity: 0.3,
					zIndex: 100,
					width: SCREEN_WIDTH,
					height: SCREEN_HEIGHT,
					position: 'absolute',
					backgroundColor: 'white',
				}}>
					<ActivityIndicator
						style={{
							zIndex: 99,
							top: SCREEN_HEIGHT / 2,
							alignSelf: 'center',
							position: 'absolute'
						}}
						color={'#6D9FFF'}
						size={isIOS ? 'large' : 80}
						animating />
				</View>}
			<ScrollView
				overScrollMode='never'
				showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity
							style={{
								left: 10,
								top: 10,
								position: 'absolute',
								zIndex: 20,
							}}
							onPress={() => navigation.goBack()}>
							<AntDesign name="swapleft" size={40} color="white" />
						</TouchableOpacity>
						<View style={{
							zIndex: 10,
							position: 'absolute',
							left: -50,
							bottom: 20,
							width: 300,
							height: 300,
							borderRadius: 300,
							backgroundColor: '#5460FE'
						}} />
						<View style={{
							right: 20,
							bottom: -10,
							position: 'absolute',
							width: 200,
							height: 200,
							borderRadius: 100,
							opacity: 0.6,
							backgroundColor: '#424DE4'
						}} />
						<Text style={styles.headerTxt}>Project</Text>
					</View>
					<View style={styles.body}>
						<TouchableOpacity
							onPress={() => getProfileImage()}
							activeOpacity={0.75}
							style={styles.projectImgContainer}>
							<Image style={styles.projectImg} source={{ uri: projectInfo.PROFILE }} />
						</TouchableOpacity>
						<View style={[styles.textInput, styles.name]}>
							<TextInput
								value={projectInfo.PROJECT_NAME}
								onChangeText={(text) => addProjectInfo('NAME', text)}
								returnKeyType='done'
								maxLength={15}
								style={styles.textInputTxt}
								placeholder={lanText.name}/>
						</View>
						<Text style={styles.contentTitle}>Link</Text>
						<View style={{ padding: 10, marginBottom: 10 }}>
							<View style={styles.textInput}>
								<TextInput
									keyboardType='url'
									value={projectInfo.GITHUB}
									onChangeText={(text) => addProjectInfo('GITHUB', text)}
									returnKeyType='done'
									style={styles.textInputTxt}
									placeholder='Gitub' />
							</View>
							<View style={styles.textInput}>
								<TextInput
									keyboardType='url'
									value={projectInfo.FIGMA}
									onChangeText={(text) => addProjectInfo('FIGMA', text)}
									returnKeyType='done'
									style={styles.textInputTxt}
									placeholder='Figma' />
							</View>
							<View style={styles.textInput}>
								<TextInput
									keyboardType='url'
									value={projectInfo.WEB}
									onChangeText={(text) => addProjectInfo('WEB', text)}
									returnKeyType='done'
									style={styles.textInputTxt}
									placeholder='Web' />
							</View>
						</View>

						{!projectID ?
							<>
								<View style={styles.titleContainer}>
									<Text style={styles.contentTitle}>Coworker</Text>
								</View>
								<View style={styles.contentContainer}>
									<ScrollView
										horizontal
										showsHorizontalScrollIndicator={false}
										nestedScrollEnabled>
										{members.map((member, index) => (
											!projectInfo.MEMBER?.[member.COWORKERID] &&
											<TouchableOpacity
												onPress={() => setSelectedMember({ ...member })}
												activeOpacity={0.8}
												style={[
													styles.coworkerContent,
													{ backgroundColor: selectedMember?.COWORKERID === member.COWORKERID ? 'whitesmoke' : 'white' }
												]}
												key={index}>
												<View style={styles.coworkerImgContainer}>
													<ProfileImage source={member.PROFILE_URL} styles={styles.coworkerImg} />
												</View>
												<View style={styles.coworkerInfo}>
													<Text style={styles.coworkerName}>{member.USER_NAME}</Text>
												</View>
											</TouchableOpacity>
										))}
									</ScrollView>
								</View>

								<View style={[styles.textInput, {
									backgroundColor: selectedMember ? 'white' : 'lightgray',
									flexDirection: 'row',
									marginVertical: 10,
									justifyContent: 'space-between',
									marginBottom: 30
								}]}>
									<TextInput
										editable={selectedMember ? true : false}
										value={role}
										onChangeText={setRole}
										style={[styles.textInputTxt, {
											flexGrow: 1,
											maxWidth: SCREEN_WIDTH / 1.6
										}]}
										onSubmitEditing={() => memberHandler('ADD')}
										returnKeyType='done'
										maxLength={20}
										placeholder='Role' />
									<TouchableOpacity
										onPress={() => memberHandler('ADD')}
										style={styles.add}>
										<Text style={{ color: role.length > 0 ? 'black' : 'gray', fontWeight: 'bold' }}>Add</Text>
									</TouchableOpacity>
								</View>

								<View style={styles.titleContainer}>
									<Text style={styles.contentTitle}>Member</Text>
								</View>
								<View style={styles.contentContainer}>
									<ScrollView
										style={styles.contentScroll}
										horizontal
										overScrollMode='never'
										showsHorizontalScrollIndicator={false}>
										{Object.keys(projectInfo.MEMBER).length > 0 ?
											Object.keys(projectInfo.MEMBER).map((member, index) => (
												<TouchableOpacity
													onPress={() => memberHandler('REMOVE', member)}
													style={styles.coworkerContent} key={index}>
													<View style={styles.coworkerImgContainer}>
														<ProfileImage source={projectInfo.MEMBER[member].PROFILE_URL} styles={styles.coworkerImg} />
													</View>
													<View style={styles.coworkerInfo}>
														<Text style={styles.coworkerName}>{projectInfo.MEMBER[member].USER_NAME}</Text>
														<Text style={styles.coworkerRole}>{projectInfo.MEMBER[member].ROLE}</Text>
													</View>
												</TouchableOpacity>))
											:
											<Text style={[styles.tag, { color: 'gray' }]}>{lanText.member}</Text>
										}
									</ScrollView>
								</View>
							</> :
							<>
								<View style={styles.titleContainer}>
									<Text style={styles.contentTitle}>Member</Text>
								</View>
								<View style={styles.contentContainer}>
									<ScrollView
										style={styles.contentScroll}
										horizontal
										overScrollMode='never'
										showsHorizontalScrollIndicator={false}>
										{Object.keys(projectInfo.MEMBER).length > 0 ?
											Object.keys(projectInfo.MEMBER).map((member, index) => (
												projectInfo.MEMBER[member].COWORKERID != userID &&
												<TouchableOpacity
													onPress={() => {
														setSelectedMember({
															...projectInfo.MEMBER[member],
															INDEX: member
														})
														setRole(projectInfo.MEMBER[member].ROLE)
													}}
													style={[
														styles.coworkerContent,
														{ backgroundColor: selectedMember?.COWORKERID === projectInfo.MEMBER[member].COWORKERID ? 'whitesmoke' : 'white' }
													]} key={index}>
													<View style={styles.coworkerImgContainer}>
														<ProfileImage source={projectInfo.MEMBER[member].PROFILE_URL} styles={styles.coworkerImg} />
													</View>
													<View style={styles.coworkerInfo}>
														<Text style={styles.coworkerName}>{projectInfo.MEMBER[member].USER_NAME}</Text>
														<Text style={styles.coworkerRole}>{projectInfo.MEMBER[member].ROLE}</Text>
													</View>
												</TouchableOpacity>))
											:
											<Text style={[styles.tag, { color: 'gray' }]}>{lanText.choose}</Text>
										}
									</ScrollView>
								</View>
								<View style={[styles.textInput, {
									backgroundColor: selectedMember ? 'white' : 'lightgray',
									flexDirection: 'row',
									marginVertical: 10,
									justifyContent: 'space-between',
									marginBottom: 30
								}]}>
									<TextInput
										editable={selectedMember ? true : false}
										value={role}
										onChangeText={setRole}
										style={[styles.textInputTxt, {
											flexGrow: 1,
											maxWidth: SCREEN_WIDTH / 1.6
										}]}
										onSubmitEditing={() => memberHandler('EDIT')}
										returnKeyType='done'
										maxLength={20}
										placeholder='Role' />
									<TouchableOpacity
										onPress={() => memberHandler('EDIT')}
										style={styles.add}>
										<Text style={{ color: role.length > 0 ? 'black' : 'gray', fontWeight: 'bold' }}>Edit</Text>
									</TouchableOpacity>
								</View>
								{selectedMember != null &&
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('ConfirmModal', {
												comment: lanText.banish,
												METHOD: () => {
													memberHandler('BANISH')
													navigation.navigate('NewProject', { ...route.params })
												}
											})
										}}
										style={[styles.done, { backgroundColor: 'tomato' }]}>
										<Text style={styles.doneTxt}>Banish</Text>
									</TouchableOpacity>}
							</>}

						<View style={styles.titleContainer}>
							<Text style={styles.contentTitle}>{lanText.tech}</Text>
						</View>
						<View style={[styles.pickInfos, { marginTop: 10 }]}>
							<SearchBar
								value={searchTech}
								onChangeText={(text) => searchFunction(text)}
								placeholder={lanText.skill}
								placeholderTextColor={'#715F5F'}
								containerStyle={styles.searchContainner}
								inputStyle={{ fontFamily: 'Aldrich', fontSize: 15 }}
								inputContainerStyle={styles.searchBox} />
							<View style={styles.searchList}>
								<ScrollView
									overScrollMode='never'
									showsVerticalScrollIndicator={false}
									nestedScrollEnabled>
									{tech.map((item, index) => (
										<TouchableOpacity
											key={'index ' + index}
											style={styles.item}
											onPress={() => techHandler('ADD', item)}>
											<Text>{item}</Text>
										</TouchableOpacity>
									))
									}
								</ScrollView>
							</View>
						</View>
						<View style={styles.contentContainer}>
							<ScrollView
								style={styles.contentScroll}
								horizontal
								overScrollMode='never'
								showsHorizontalScrollIndicator={false}>
								{projectInfo.TECH.length > 0 ?
									projectInfo.TECH.map((tech, index) => (
										<TouchableOpacity
											onPress={() => techHandler('REMOVE', index)}
											style={styles.coworkerContent}
											key={index}>
											<View style={styles.techContainer}>{skillImg[tech](SCREEN_WIDTH / 10)}</View>
											<Text style={styles.coworkerName}>{tech}</Text>
										</TouchableOpacity>
									))
									:
									<Text style={[styles.tag, { color: 'gray' }]}>{lanText.addTech}</Text>}
							</ScrollView>
						</View>
						<Text style={styles.contentTitle}>{lanText.tag}</Text>
						<View style={[styles.textInput, {
							flexDirection: 'row',
							marginVertical: 10,
							justifyContent: 'space-between'
						}]}>
							<TextInput
								value={tag}
								onChangeText={setTag}
								style={[styles.textInputTxt, {
									flexGrow: 1,
									maxWidth: SCREEN_WIDTH / 1.6
								}]}
								onSubmitEditing={() => tagHandler('ADD', tag)}
								returnKeyType='done'
								maxLength={15}
								placeholder={lanText.tag} />
							<TouchableOpacity
								onPress={() => tagHandler('ADD', tag)}
								style={styles.add}>
								<Text style={{ color: tag.length > 0 ? 'black' : 'gray', fontWeight: 'bold' }}>{lanText.add}</Text>
							</TouchableOpacity>
						</View>
						<View style={[styles.contentContainer, {
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'flex-start',
							padding: 20,
							minHeight: SCREEN_HEIGHT / 5
						}]}>
							{projectInfo.TAG.length > 0 ?
								<>
									{projectInfo.TAG.map((value, index) => (
										<TouchableOpacity
											onPress={() => tagHandler('REMOVE', index)}
											key={index}
											style={styles.tagWrap}>
											<Text style={styles.tag}>{value}</Text>
											<Feather name="x" size={13} color="black" />
										</TouchableOpacity>
									))}
								</> :
								<Text style={[styles.tag, { color: 'gray' }]}>{lanText.addTag}</Text>}
						</View>
						<TouchableOpacity
							onPress={() => {
								setIsLoading(true)
								if (projectID)
									editProject()
								else
									addProject()
							}}
							style={styles.done}>
							<Text style={styles.doneTxt}>{lanText.done}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
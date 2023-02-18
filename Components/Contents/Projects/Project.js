import { 
	View, 
	Text, 
	ScrollView, 
	TouchableOpacity, 
	Image, 
	Dimensions, 
	Linking 
} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { styles } from './styles/Project_style'
import {
	Ionicons,
	AntDesign,
	Feather,
	FontAwesome,
	Entypo,
	FontAwesome5,
	MaterialCommunityIcons,
	MaterialIcons
} from '@expo/vector-icons';
import { skillImg } from '../../../assets/items/skillImg'
import { ProfileImage } from '../../Common/ProfileImage'
import { AppContext } from '../../../utils/context'
import ProgressCircle from 'react-native-progress-circle'
import axios from 'axios';
import { IP_ADDRESS } from '../../../config/key'
import { getSayHello } from '../../Common/Common'
import moment from 'moment';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const baseURL = IP_ADDRESS + '/project'

export const Project = ({ navigation, route }) => {
	const {
		userInfos,
		lan,
		userID
	} = useContext(AppContext)
	const [gole, setGole] = useState({
		TEAM_MONTHTOTAL: 0,
		TEAM_MONTHDONE: 0,
		TEAM_DAYTOTAL: 0,
		TEAM_DAYDONE: 0,
		TEAM_WEEKTOTAL: 0,
		TEAM_WEEKDONE: 0,
		ME_MONTHTOTAL: 0,
		ME_MONTHDONE: 0,
		ME_DAYTOTAL: 0,
		ME_DAYDONE: 0,
		ME_WEEKTOTAL: 0,
		ME_WEEKDONE: 0
	})
	const [projectInfo, setProjectInfo] = useState({
		PROFILE: null,
		FIGMA: null,
		GITHUB: null,
		WEB: null,
		LEADER_ID: null,
		PROJECT_NAME: null,
	})
	const [handOverMode, setHandOverMode] = useState(null)
	const projectID = route.params.PROJECTID
	const user_Infos = userInfos.current
	const { Project: lanText } = lan.current
	const removeProject = async () => {
		try {
			await axios.post(baseURL, {
				query: `mutation{ 
					removeProject( PROJECTID:${projectID}) 
				}`
			})
		} catch (error) {
			console.log('removeProject', error)
			showInfoModal('', true)
		}
	}
	const leaveProject = async () => {
		try {
			const index = projectInfo.MEMBERS.findIndex((member) => {
				return member.MEMBERID === userID
			})
			await axios.post(baseURL, {
				query: `
					mutation{
						leaveProject(
							WORKERID:"${userID}"
							PROJECTID:${projectID}
							MEMBERINDEX:${projectInfo.MEMBERS[index].ID}
						)
			}`
			})
			navigation.replace('Community', { ...route.params })
		} catch (error) {
			console.log('getGole', error)
			showInfoModal('', true)
		}
	}
	const calcPercentage = (partialValue, totalValue) => {
		if (totalValue == 0)
			return 100
		return Math.ceil((100 * partialValue) / totalValue)
	}
	const showInfoModal = (text, isError = false) => {
		if (isError)
			text = lanText.info
		navigation.navigate('InfoModal', { text, state: isError })
	}
	const handover = async (leaderID) => {
		const { data } = await axios.post(baseURL, {
			query: `
				mutation{
					chageLeader(
						ID:${projectID}
						LEADER_ID:"${leaderID}"
					)
				}`
		})
		if (data) {
			let temp = { ...projectInfo }
			temp.LEADER_ID = leaderID
			setProjectInfo({ ...temp })
			setHandOverMode(null)
		}
	}
	const getGole = async () => {
		try {
			const startOfWeek = moment.utc().startOf('W').format('YYYY-MM-DD')
			const endOfWeek = moment().utc().endOf('W').format('YYYY-MM-DD')
			const { data } = await axios.post(baseURL, {
				query: `
					query{
						projectGole(
							PROJECTID:${projectID}
							TODAY:"${moment.utc().format('YYYY-MM-DD')}"
							FIRSTDAYOFWEEK:"${startOfWeek}"
							LASTDAYOFWEEK:"${endOfWeek}"
							WORKERID:"${userID}"
						) {
							TEAM_MONTHTOTAL
							TEAM_MONTHDONE
							TEAM_DAYTOTAL
							TEAM_DAYDONE
							TEAM_WEEKTOTAL
							TEAM_WEEKDONE
							ME_MONTHTOTAL
							ME_MONTHDONE
							ME_DAYTOTAL
							ME_DAYDONE
							ME_WEEKTOTAL
							ME_WEEKDONE
						}
					}
				`
			})
			setGole({ ...data.data.projectGole })
		} catch (error) {
			console.log('getGole', error)
			showInfoModal('', true)
		}
	}
	const getProject = async () => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `
					query { 
						project(ID:${route.params.PROJECTID}) {
							ID
							LEADER_ID
							CREATE_AT
							PROJECT_NAME
							FIGMA
							WEB
							PROFILE
							GITHUB
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
			setProjectInfo({ ...data.data.project })
		} catch (error) {
			console.log('getProject', error)
			showInfoModal('', true)
		}
	}

	useEffect(() => {
		getProject()
		getGole()
	}, [])

	return (
		<View style={styles.container}>
			<ScrollView
				overScrollMode='never'
				showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.header}>
						<View style={{
							zIndex: 10,
							position: 'absolute',
							opacity: 0.7,
							left: -50,
							bottom: 20,
							width: SCREEN_WIDTH / 1.5,
							height: SCREEN_WIDTH / 1.5,
							borderRadius: 500,
							backgroundColor: '#5460FE'
						}} />
						<View style={{
							right: -SCREEN_WIDTH / 6,
							bottom: SCREEN_WIDTH / 10,
							position: 'absolute',
							width: SCREEN_WIDTH / 2,
							height: SCREEN_WIDTH / 2,
							borderRadius: 300,
							opacity: 0.5,
							backgroundColor: '#424DE4'
						}} />
						<View style={{
							right: 10,
							top: 50,
							position: 'absolute',
							width: SCREEN_WIDTH / 2,
							height: SCREEN_WIDTH / 2,
							borderRadius: 300,
							opacity: 0.8,
							backgroundColor: '#424DfF'
						}} />
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
					</View>
					<View style={styles.body}>
						<View style={styles.bodyTop}>
							<View>
								<Text numberOfLines={1} lineBreakMode='tail' style={[styles.topTxt, {maxWidth:SCREEN_WIDTH / 1.5}]}>Hi, {user_Infos.USER_NAME.split(' ')[0]}</Text>
								<Text style={[styles.topTxt, { color: 'black' }]}>{getSayHello()}</Text>
							</View>
							<View style={styles.projectImgContainer}>
							<Image
								resizeMode='center'
								source={projectInfo.PROFILE ? {uri: projectInfo.PROFILE} : require('../../../assets/pictures/logo2.png')}
								style={styles.projectImg} />
							</View>
						</View>

						<View style={styles.titleContainer}>
							<Text style={styles.title}>{lanText.tool}</Text>
						</View>
						<View style={styles.tools}>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								overScrollMode='never'>
								<TouchableOpacity
									onPress={() => navigation.navigate('ProjectNote', {
										PROJECTID: projectID,
										PROFILE: projectInfo.PROFILE
									})}
									activeOpacity={0.4}
									style={styles.toolContainer}>
									<FontAwesome name="sticky-note-o" size={35} color="#D04D4D" />
									<Text style={[styles.toolTxt, { color: '#D04D4D' }]}>{lanText.note}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => navigation.navigate('ProjectIssue', {
										PROJECTID: projectID,
										PROFILE: projectInfo.PROFILE,
										PROJECT_NAME: projectInfo.PROJECT_NAME,
										MEMBERS: projectInfo.MEMBERS,
									})}
									activeOpacity={0.4}
									style={styles.toolContainer}>
									<Entypo name="news" size={35} color="#43B82F" />
									<Text style={[styles.toolTxt, { color: '#43B82F' }]}>{lanText.issue}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => navigation.navigate('ProjectTask', {
										PROJECTID: projectID,
										MEMBERS: projectInfo.MEMBERS,
										PROJECT_NAME: projectInfo.PROJECT_NAME,
										PROFILE: projectInfo.PROFILE
									})}
									activeOpacity={0.4}
									style={styles.toolContainer}>
									<FontAwesome5 name="tasks" size={35} color="#D69255" />
									<Text style={[styles.toolTxt, { color: '#D69255' }]}>{lanText.task}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									activeOpacity={0.4}
									onPress={() => navigation.navigate('ProjectDaily', {
										PROJECTID: projectID,
										PROFILE: projectInfo.PROFILE
									})}
									style={styles.toolContainer}>
									<MaterialCommunityIcons name="chart-timeline" size={35} color="#707070" />
									<Text style={[styles.toolTxt, { color: '#707070' }]}>{lanText.daily}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => navigation.navigate('ChattingList')}
									activeOpacity={0.4}
									style={styles.toolContainer}>
									<MaterialIcons name="chat-bubble-outline" size={35} color="#A430FF" />
									<Text style={[styles.toolTxt, { color: '#A430FF' }]}>{lanText.chat}</Text>
								</TouchableOpacity>
								{projectInfo.FIGMA &&
									<TouchableOpacity
										onPress={() => Linking.openURL(projectInfo.FIGMA)}
										activeOpacity={0.4}
										style={styles.toolContainer}>
										<MaterialIcons name="web" size={35} color="black" />
										<Text style={styles.toolTxt}>Web</Text>
									</TouchableOpacity>}
								{projectInfo.FIGMA &&
									<TouchableOpacity
										onPress={() => Linking.openURL(projectInfo.FIGMA)}
										activeOpacity={0.4}
										style={styles.toolContainer}>
										<Feather name="figma" size={35} color="black" />
										<Text style={styles.toolTxt}>Figma</Text>
									</TouchableOpacity>}
								{projectInfo.GITHUB &&
									<TouchableOpacity
										onPress={() => Linking.openURL(projectInfo.GITHUB)}
										activeOpacity={0.4}
										style={styles.toolContainer}>
										<AntDesign name="github" size={35} color="black" />
										<Text style={styles.toolTxt}>Github</Text>
									</TouchableOpacity>}
								{projectInfo.LEADER_ID === userID &&
									<>
										<TouchableOpacity
											onPress={() => navigation.navigate('NewProject', {
												PROJECTID: projectID,
												projectInfo,
												setProjectInfo
											})}
											activeOpacity={0.4}
											style={styles.toolContainer}>
											<Ionicons name="settings" size={35} color="black" />
											<Text style={styles.toolTxt}>{lanText.edit}</Text>
										</TouchableOpacity>
										{projectInfo.MEMBERS?.length > 1 &&
										<TouchableOpacity
											activeOpacity={0.4}
											onPress={() => {
												if (handOverMode === null)
													setHandOverMode(projectInfo.MEMBERS[0].MEMBERID != userID ? 0 : 1)
												else
													setHandOverMode(null)
											}}
											style={styles.toolContainer}>
											<AntDesign name="team" size={35} color="#5460FE" />
											<Text style={[styles.toolTxt, { color: '#5460FE', fontSize: 13 }]}>{lanText.handover}</Text>
										</TouchableOpacity>}
										<TouchableOpacity
											onPress={() => {
												navigation.navigate('ConfirmModal', {
													comment: lanText.removeProject,
													METHOD: () => {
														removeProject()
														navigation.navigate('Community', { ...route.params })
													}
												})
											}}
											activeOpacity={0.4}
											style={styles.toolContainer}>
											<MaterialIcons name="delete-forever" size={35} color="red" />
											<Text style={[styles.toolTxt, { color: 'red' }]}>{lanText.disband}</Text>
										</TouchableOpacity>
									</>}
								{projectInfo.LEADER_ID !== userID &&
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('ConfirmModal', {
												comment: lanText.leaveProject,
												METHOD: () => leaveProject()
											})
										}}
										activeOpacity={0.4}
										style={styles.toolContainer}>
										<Ionicons name="exit-outline" size={35} color="red" />
										<Text style={[styles.toolTxt, { color: 'red' }]}>{lanText.leave}</Text>
									</TouchableOpacity>}
							</ScrollView>
						</View>

						{handOverMode !== null &&
							<View style={styles.coworkers}>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate('ConfirmModal', {
											comment: lanText.handoverLeader,
											METHOD: () => {
												handover(projectInfo.MEMBERS[handOverMode].MEMBERID)
												navigation.navigate('ProjectDetail', { ...route.params })
											},
										})
									}}
									style={styles.handOverButtonContainer}>
									<Text style={styles.handOverButton}>Done</Text>
									<MaterialIcons name="done" size={13} color="white" />
								</TouchableOpacity>
								<ScrollView
									overScrollMode='never'
									horizontal
									nestedScrollEnabled
									showsHorizontalScrollIndicator={false}>
									{projectInfo?.MEMBERS != null &&
										projectInfo.MEMBERS.map((member, index) => {
											if (member.MEMBERID !== userID)
												return (
													<TouchableOpacity
														onPress={() => setHandOverMode(index)}
														style={styles.handOverContainer}
														key={'index' + index}>
														{handOverMode == index ?
															<FontAwesome name="check-square" size={24} color="skyblue" /> :
															<FontAwesome name="square-o" size={24} color="black" />}
														<View style={styles.handOverImgContainer}>
															<ProfileImage
																styles={styles.handOverImg}
																source={member.PROFILE_URL} />
														</View>
														<View style={styles.handOverInfo}>
															<Text style={styles.handOverName}>{member.USER_NAME}</Text>
															<Text style={styles.handOverRole}>{member.ROLE}</Text>
														</View>
													</TouchableOpacity>
												)
										})}
								</ScrollView>
							</View>}

						<View style={[styles.gole, { borderColor: '#5460FE' }]}>
							<View style={[styles.goleTop, { borderColor: '#5460FE', backgroundColor: '#5460FE' }]}>
								<View style={styles.goleTopTxtContainer}>
									<Text style={styles.goleTopTxt}>{lanText.team}</Text>
								</View>
							</View>
							<View style={styles.progresses}>
								<View style={styles.progress}>
									<Text style={[styles.progressTypeTxt, { color: '#6D9FFF' }]}>{lanText.today}</Text>
									<ProgressCircle
										percent={calcPercentage(gole.TEAM_DAYDONE, gole.TEAM_DAYTOTAL)}
										radius={SCREEN_WIDTH / 10}
										borderWidth={5}
										color="#6D9FFF"
										shadowColor="#C8DBFF"
										bgColor="white">
										<Text style={[styles.progressTxt, { color: '#6D9FFF' }]}>
											{calcPercentage(gole.TEAM_DAYDONE, gole.TEAM_DAYTOTAL) + '%'}
										</Text>
									</ProgressCircle>
								</View>
								<View style={styles.progress}>
									<Text style={[styles.progressTypeTxt, { color: '#6D9FFF' }]}>{lanText.week}</Text>
									<ProgressCircle
										percent={calcPercentage(gole.TEAM_WEEKDONE, gole.TEAM_WEEKTOTAL)}
										radius={SCREEN_WIDTH / 10}
										borderWidth={5}
										color="#6D9FFF"
										shadowColor="#C8DBFF"
										bgColor="white">
										<Text style={[styles.progressTxt, { color: '#6D9FFF' }]}>
											{calcPercentage(gole.TEAM_WEEKDONE, gole.TEAM_WEEKTOTAL) + '%'}
										</Text>
									</ProgressCircle>
								</View>
								<View style={styles.progress}>
									<Text style={[styles.progressTypeTxt, { color: '#6D9FFF' }]}>{lanText.month}</Text>
									<ProgressCircle
										percent={calcPercentage(gole.TEAM_MONTHDONE, gole.TEAM_MONTHTOTAL)}
										radius={SCREEN_WIDTH / 10}
										borderWidth={5}
										color="#6D9FFF"
										shadowColor="#C8DBFF"
										bgColor="white">
										<Text style={[styles.progressTxt, { color: '#6D9FFF' }]}>{calcPercentage(gole.TEAM_MONTHDONE, gole.TEAM_MONTHTOTAL) + '%'}</Text>
									</ProgressCircle>
								</View>
							</View>
						</View>

						<View style={[styles.gole, { borderColor: '#FF804A' }]}>
							<View style={[styles.goleTop, { borderColor: '#FF804A', backgroundColor: '#FF804A' }]}>
								<View style={styles.goleTopTxtContainer}>
									<Text style={styles.goleTopTxt}>{lanText.me}</Text>
								</View>
							</View>
							<View style={styles.progresses}>
								<View style={styles.progress}>
									<Text style={[styles.progressTypeTxt, { color: '#FF804A' }]}>{lanText.today}</Text>
									<ProgressCircle
										percent={calcPercentage(gole.ME_DAYDONE, gole.ME_DAYTOTAL)}
										radius={SCREEN_WIDTH / 10}
										borderWidth={5}
										color="#FF804A"
										shadowColor="#FFD1BD"
										bgColor="white">
										<Text style={[styles.progressTxt, { color: '#FF804A' }]}>
											{calcPercentage(gole.ME_DAYDONE, gole.ME_DAYTOTAL) + '%'}
										</Text>
									</ProgressCircle>
								</View>
								<View style={styles.progress}>
									<Text style={[styles.progressTypeTxt, { color: '#FF804A' }]}>{lanText.week}</Text>
									<ProgressCircle
										percent={calcPercentage(gole.ME_WEEKDONE, gole.ME_WEEKTOTAL)}
										radius={SCREEN_WIDTH / 10}
										borderWidth={5}
										color="#FF804A"
										shadowColor="#FFD1BD"
										bgColor="white">
										<Text style={[styles.progressTxt, { color: '#FF804A' }]}>{calcPercentage(gole.ME_WEEKDONE, gole.ME_WEEKTOTAL) + '%'}</Text>
									</ProgressCircle>
								</View>
								<View style={styles.progress}>
									<Text style={[styles.progressTypeTxt, { color: '#FF804A' }]}>{lanText.month}</Text>
									<ProgressCircle
										percent={calcPercentage(gole.ME_MONTHDONE, gole.ME_MONTHTOTAL)}
										radius={SCREEN_WIDTH / 10}
										borderWidth={5}
										color="#FF804A"
										shadowColor="#FFD1BD"
										bgColor="white">
										<Text style={[styles.progressTxt, { color: '#FF804A' }]}>{calcPercentage(gole.ME_MONTHDONE, gole.ME_MONTHTOTAL) + '%'}</Text>
									</ProgressCircle>
								</View>
							</View>
						</View>

						<View style={styles.coworkers}>
							<ScrollView
								overScrollMode='never'
								horizontal
								nestedScrollEnabled
								showsHorizontalScrollIndicator={false}>
								{projectInfo?.MEMBERS != null &&
									projectInfo.MEMBERS.map((member, index) => (
										<View style={styles.coworker} key={'index' + index}>
											<View style={styles.coworkerImgContainer}>
												<ProfileImage
													styles={styles.coworkerImg}
													source={member.PROFILE_URL} />
											</View>
											<View style={styles.coworkerIcons}>
												{member.TECHS.map((tech, index) => (
													<View key={index} style={styles.coworkerIcon}>{skillImg[tech](13)}</View>
												))}
											</View>
											<View style={styles.coworkerInfo}>
												<Text style={styles.coworkerName}>{member.USER_NAME}</Text>
												<Text style={styles.coworkerRole}>{member.ROLE}</Text>
											</View>
										</View>
									))}
							</ScrollView>
						</View>

					</View>
				</View>
			</ScrollView>
		</View>
	)
}
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	TextInput,
	Dimensions,
	Platform
} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { styles } from './styles/ProjectTask_style'
import {
	AntDesign,
	FontAwesome,
} from '@expo/vector-icons';
import { AppContext } from '../../../utils/context';
import { Calendar } from 'react-native-calendars'
import ReadMore from '@fawazahmed/react-native-read-more';
import moment from 'moment';
import { getSayHello } from '../../Common/Common';
import DateTimePicker from "@react-native-community/datetimepicker"
import { ProfileImage } from '../../Common/ProfileImage';
import { IP_ADDRESS } from '../../../config/key';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
import axios from 'axios'
import { sendMessageToFirebase } from '../../../utils/groupChatting';
const baseURL = IP_ADDRESS + '/project'
const today = moment().format('YYYY-MM-DD')

export const ProjectTask = ({ navigation, route }) => {
	const {
		userInfos,
		lan,
		userID,
		fireDatabase
	} = useContext(AppContext)
	const [title, setTitle] = useState('')
	const [editTaskIndex, setEditTaskIndex] = useState(null)
	const [content, setContent] = useState('')
	const [edtingMode, setEdtingMode] = useState(false)
	const [selectedDay, setSelectedDay] = useState(today)
	const [members, setMembers] = useState([...route.params.MEMBERS])
	const [dayTask, setDayTask] = useState([])
	const [timePicker, setTimepicker] = useState(null)
	const [selectedWorker, setSelectedWorker] = useState([])
	const [from, setFrom] = useState(null)
	const [to, setTo] = useState(null)
	const [marks, setMarks] = useState([])
	const user_Infos = userInfos.current
	const projectID = route.params.PROJECTID
	const { ProjectTask: lanText } = lan.current

	const showInfoModal = (text, isError = false) => {
		if (isError)
			text = lanText.info(text)
		navigation.navigate('InfoModal', { text, state: isError })
	}
	const vaild = () => {
		let text = ''
		let result = true

		if (title.length === 0) {
			text = lanText.vaildTxt.title
			result = false
		} else if (content.length === 0) {
			text = lanText.vaildTxt.content
			result = false
		} else if (!from) {
			text = lanText.vaildTxt.start
			result = false
		} else if (!to) {
			text = lanText.vaildTxt.end
			result = false
		} else if (selectedWorker.length == 0) {
			text = lanText.vaildTxt.worker
			result = false
		}

		if (!result)
			showInfoModal(lanText.vaild(text))
		return result
	}
	const removeTask = async (taskID, index) => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `mutation{ removeTask(TASKID:${taskID}) }`
			})
			if (dayTask.length > 1) {
				let temp = []
				dayTask.forEach((task, tempIndex) => {
					if (index != tempIndex)
						temp.push(task)
				})
				setDayTask([...temp])
			} else {
				let temp = []
				marks.forEach(mark => {
					if (selectedDay !== mark)
						temp.push(mark)
				})
				setMarks([...temp])
				setDayTask([])
			}
		} catch (error) {
			showInfoModal(lanText.infos.remove, true)
			console.log('removeTask', error)
		}
	}
	const addTask = async () => {
		if (vaild()) {
			try {
				const { data } = await axios.post(baseURL, {
					query: `
						mutation{
							addTask(
								UPLOADER:"${userID}"
								TITLE:"${title}"
								CONTENT:"""${content}"""
								START:"${from}"
								END:"${to}"
								PROJECTID:${projectID}
								WORKERS:${JSON.stringify(selectedWorker)}
							) {
								ID
								UPLOADER
								TITLE
								CONTENT
								UPLOAD_AT
								START
								END
								UPLOADERNAME
								PROJECTID
								ISDONE
								WORKERS {
									ID
									WORKERID
									TASKID
									USER_NAME
								}
							}
						}
					`
				})
				let temp = [{ ...data.data.addTask }, ...dayTask]
				setDayTask([...temp])
				setTitle('')
				setContent('')
				setEdtingMode(false)
				setSelectedWorker([])
				setFrom(null)
				setTo(null)
				let memberTemp = {}
				route.params.MEMBERS.forEach((member) => {
					memberTemp[member.MEMBERID] = member.MEMBERID
				})
				await sendMessageToFirebase(
					fireDatabase,
					projectID,
					userID,
					'ProjectTask.uploadTask',
					route.params.PROJECT_NAME,
					memberTemp,
					true
				)
			} catch (error) {
				showInfoModal(lanText.infos.add, true)
				console.log('addTask', error)
			}
		}
	}

	const doneTask = async (id, isDone, index) => {
		try {
			await axios.post(baseURL, {
				query: `mutation{
					doneTask(
						ID:${id}
						ISDONE:${isDone}
					)
				}`
			})
			let temp = [...dayTask]
			temp[index].ISDONE = isDone
			setDayTask([...temp])
		} catch (error) {
			showInfoModal(lanText.infos.get, true)
			console.log('doneTask', error)
		}
	}
	const editTask = async () => {
		try {
			await axios.post(baseURL, {
				query: `
				mutation{
					editTask(
						ID:${dayTask[editTaskIndex].ID}
						TITLE:"${title}"
						CONTENT:"""${content}"""
						START:"${from}"
						END:"${to}"
						WORKERS:${JSON.stringify(selectedWorker)}
					)
				}`
			})
			let temp = [...dayTask]
			temp[editTaskIndex].TITLE = title
			temp[editTaskIndex].CONTENT = content
			temp[editTaskIndex].START = from
			temp[editTaskIndex].END = to
			setDayTask([...temp])
			setTitle('')
			setContent('')
			setEdtingMode(false)
			setEditTaskIndex(null)
			setSelectedWorker([])
			setFrom(null)
			setTo(null)
		} catch (error) {
			showInfoModal(lanText.infos.get, true)
			console.log('editTask', error)
		}
	}
	const getDayTasks = async (month, day) => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `query{
					tasks(
						PROJECTID:${projectID}
						MONTH:${month}
						DAY:${day}
					) {
						ID
						UPLOADER
						TITLE
						CONTENT
						UPLOAD_AT
						START
						END
						ISDONE
						UPLOADERNAME
						WORKERS {
							ID
							WORKERID
							TASKID
							USER_NAME
						}
					}
				}`})
			setDayTask([...data.data.tasks])
		} catch (error) {
			showInfoModal(lanText.infos.get, true)
			console.log('getDayTasks', error)
		}
	}
	const getMonthMarkDate = async (month = moment.utc().format('M')) => {
		try {
			const { data } = await axios.post(baseURL, {
				query: `
				query{
					monthTask(
						PROJECTID:${projectID}
						MONTH:${month}
					)}`
			})
			setMarks([...data.data.monthTask])
		} catch (error) {
			showInfoModal(lanText.infos.get, true)
			console.log('getMonthMarkDate', error)
		}
	}
	const getMark = (date) => {
		return marks.find((mark) => moment.utc(mark).local().format('YYYY-MM-DD') == date )
	}
	const init = () => {
		getMonthMarkDate()
		getDayTasks(moment.utc().format('M'), moment.utc().format('D'))
	}
	const getNow = (time) => {
		return time ? moment.utc(time).local() : moment()
	}

	useEffect(() => {
		init()
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
								style={{
									marginBottom: 30,
								}}
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
						<View style={{ marginTop: 30 }}>
							<Calendar
								onMonthChange={(date) => getMonthMarkDate(date.month)}
								dayComponent={({ date, state }) => {
									let isSelected = date.dateString === selectedDay
									let fontColor = isSelected ? 'white' : date.dateString == today ? 'skyblue' : 'black'
									let isMarked = getMark(date.dateString)
									return (
										<TouchableOpacity
											onPress={() => {
												getDayTasks(date.month, date.day)
												setSelectedDay(date.dateString)
											}}
											style={{
												justifyContent: 'center',
												alignItems: 'center',
												width: 40,
												height: 40,
												borderRadius: 20,
												backgroundColor: isSelected ? '#FF925F' : 'transparent'
											}}>
											<Text style={{
												fontFamily: 'Aldrich',
												color: fontColor
											}}>{date.day}</Text>
											{isMarked &&
												<View style={{
													borderRadius: 50,
													width: 5,
													height: 5,
													backgroundColor: isSelected ? 'white' : '#FF925F'
												}} />}
										</TouchableOpacity>
									)
								}}
								markingType='multi-dot'
								hideExtraDays={true}
								theme={{
									textMonthFontFamily: 'Aldrich',
									arrowColor: "#FF925F",
								}}
								initialDate={today}
								monthFormat={'yyyy MM'} />
						</View>
					</View>
					{!edtingMode && <TouchableOpacity
						onPress={() => setEdtingMode(true)}
						style={styles.workerAll}>
						<Text style={styles.workerAllTxt}>Add</Text>
					</TouchableOpacity>}
					{edtingMode &&
						<View style={styles.textInputContainer}>
							<View style={{
								flexDirection: 'row',
								alignSelf: 'stretch',
								justifyContent: 'space-between'
							}}>
								<TouchableOpacity
									onPress={() => {
										setTitle('')
										setContent('')
										setEdtingMode(false)
										setSelectedWorker([])
										const start = moment(`${selectedDay} 00:00:00`)
										const end = moment(`${selectedDay} 23:59:59`)
										setFrom(moment.utc(start).format('YYYY-MM-DD HH:mm:ss'))
										setTo(moment.utc(end).format('YYYY-MM-DD HH:mm:ss'))
									}}
									style={styles.add}>
									<Text style={styles.addTxt}>{lanText.cancel}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										if (editTaskIndex != null)
											editTask()
										else
											addTask()
									}}
									style={styles.add}>
									<Text style={styles.addTxt}>{editTaskIndex != null ? lanText.edit : lanText.add}</Text>
								</TouchableOpacity>
							</View>
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
							{Platform.OS === 'ios' &&
								<View style={styles.dateButtons}>
									<Text>{lanText.from}</Text>
									<DateTimePicker
										style={[styles.dateButton, {
											height: 30
										}]}
										display='clock'
										value={new Date(getNow(from))}
										mode='time'
										onChange={(date) => {
											let time = moment.utc(date.nativeEvent.timestamp).format('HH:mm:ss')
											time = moment.utc(`${selectedDay} ${time}`).format('YYYY-MM-DD HH:mm:ss')
											setFrom(time)
										}} />
									<Text>{lanText.to}</Text>
									<DateTimePicker
										display='clock'
										style={[styles.dateButton, {
											height: 30
										}]}
										value={new Date(getNow(to))}
										mode='time'
										onChange={(date) => {
											let time = moment.utc(date.nativeEvent.timestamp).format('HH:mm:ss')
											time = moment.utc(`${selectedDay} ${time}`).format('YYYY-MM-DD HH:mm:ss')
											setTo(time)
										}} />
								</View>}

							{Platform.OS === 'android' &&
								<View style={styles.dateButtons}>
									<TouchableOpacity
										onPress={() => setTimepicker('from')}
										style={styles.dateButton}>
										<Text style={styles.dateButtonTxt}>{from ? moment.utc(from).local().format('hh:mm A') : lanText.from}</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => setTimepicker('to')}
										style={styles.dateButton}>
										<Text style={styles.dateButtonTxt}>{to ? moment.utc(to).local().format('hh:mm A') : lanText.to}</Text>
									</TouchableOpacity>
								</View>}

							{Platform.OS === 'android' && timePicker != null &&
								<DateTimePicker
									display='clock'
									value={new Date(timePicker === 'from' ? getNow(from) : getNow(to))}
									mode='time'
									onChange={(date) => {
										if (date.type === 'set') {
											let time = moment.utc(date.nativeEvent.timestamp).format('HH:mm:ss')
											time = moment.utc(`${selectedDay} ${time}`).format('YYYY-MM-DD HH:mm:ss')
											if (timePicker === 'from')
												setFrom(time)
											else
												setTo(time)
										}
										setTimepicker(null)
									}} />}
							<View>
								<TouchableOpacity
									onPress={() => {
										let temp = []
										members.forEach((member) => temp.push(member.MEMBERID))
										setSelectedWorker([...temp])
									}}
									style={styles.workerAll}>
									<Text style={styles.workerAllTxt}>{lanText.all}</Text>
								</TouchableOpacity>
								<ScrollView
									overScrollMode='never'
									horizontal
									nestedScrollEnabled
									showsHorizontalScrollIndicator={false}>
									{members?.map((member, index) => {
										let isSelected = false
										if (selectedWorker.find((MEMBERID) => { return member.MEMBERID === MEMBERID }))
											isSelected = true
										return (
											<TouchableOpacity
												onPress={() => {
													let temp = []
													if (isSelected) {
														selectedWorker.forEach((worker, index) => {
															if (member.MEMBERID !== worker)
																temp.push(worker)
														})
														setSelectedWorker([...temp])
													} else {
														temp = [...selectedWorker]
														temp.push(member.MEMBERID)
														setSelectedWorker([...temp])
													}
												}}
												style={styles.workers}
												key={'index' + index}>
												{isSelected ?
													<FontAwesome name="check-square" size={24} color="skyblue" /> :
													<FontAwesome name="square-o" size={24} color="black" />}
												<View style={styles.workerImgContainer}>
													<ProfileImage
														styles={styles.workerImg}
														source={member.PROFILE_URL} />
												</View>
												<View style={styles.workerInfo}>
													<Text 
														lineBreakMode='tail'
														numberOfLines={1}
														style={styles.workerName}>{member.USER_NAME}</Text>
													<Text style={styles.workerRole}>{member.ROLE}</Text>
												</View>
											</TouchableOpacity>
										)
									})}
								</ScrollView>
							</View>
						</View>}
					<ScrollView>

						{dayTask.length > 0 ?
							<View style={styles.issues}>
								{dayTask.map((task, index) => {
									return (
										<TouchableOpacity
											onPress={() => {
												let items = lanText.unDoneItem
												let functions = [() =>
													navigation.navigate('ConfirmModal', {
														comment: lanText.unDoneComment,
														METHOD: () => {
															removeTask(task.ID, index)
															navigation.navigate('ProjectTask', { ...route.params })
														},
													}),
												() => {
													setEdtingMode(true)
													setEditTaskIndex(index)
													setTitle(task.TITLE)
													setContent(task.CONTENT)
													setFrom(task.START)
													setTo(task.END)
													let tempWorker = []
													task.WORKERS.forEach((worker) => {
														tempWorker.push(worker.WORKERID)
													})
													setSelectedWorker([...tempWorker])
													navigation.navigate('ProjectTask', { ...route.params })
												},
												() => {
													doneTask(task.ID, !task.ISDONE, index)
													navigation.navigate('ProjectTask', { ...route.params })
												}]

												if (task.ISDONE) {
													items = lanText.doneItem
													functions = [() =>
														navigation.navigate('ConfirmModal', {
															comment: lanText.doneComment,
															METHOD: () => {
																removeTask(task.ID, index)
																navigation.navigate('ProjectTask', { ...route.params })
															},
														}),
													() => {
														doneTask(task.ID, !task.ISDONE, index)
														navigation.navigate('ProjectTask', { ...route.params })
													}]
												}
												navigation.navigate('MoreModal', { functions, items })
											}}
											key={'index' + index}
											activeOpacity={0.9}
											style={[styles.issue, {
												marginBottom: 10,
												backgroundColor: task.ISDONE ? '#7C7C7C' : '#A0B5FF'
											}]}>
											<View style={styles.issueHeader}>
												<Text style={styles.issueTitle}>{task.TITLE}</Text>
												<View style={styles.writed_at}>
													<Text style={styles.issueDate}>
														{moment.utc(task.UPLOAD_AT).local().format('YY.MM.DD')}
													</Text>
													<Text style={styles.issueTime}>
														{moment.utc(task.UPLOAD_AT).local().format('hh:mm A')}
													</Text>
												</View>
											</View>
											<ReadMore
												lineBreakMode='tail'
												seeMoreStyle={{ color: 'black' }}
												seeLessStyle={{ color: 'black' }}
												seeLessText={lanText.close}
												seeMoreText={lanText.more}
												allowFontScaling={false}
												selectable
												style={styles.issueContent}>{task.CONTENT}</ReadMore>
											<View style={styles.issueInfos}>
												<View style={styles.issueInfo}>
													<View style={styles.issueInfoLeft}>
														<Text style={styles.issueInfoTxt}>Writer</Text>
														<Text style={styles.issueInfoTxt}>Worker</Text>
													</View>
													<View>
														<Text 
															lineBreakMode='tail'
															numberOfLines={1}
															style={[styles.issueInfoTxt, {maxWidth:SCREEN_WIDTH / 5}]}>
																{task.UPLOADERNAME}
															</Text>
														{members?.length == task?.WORKERS?.length ?
															<Text style={styles.issueInfoTxt}>everyone</Text> :
															<View style={{
																flexDirection: 'row',
																flexWrap: 'wrap',
																maxWidth: 30
															}}>
																{task.WORKERS.map((worker, index) => (
																	<Text
																		lineBreakMode='tail'
																		numberOfLines={1}
																		key={'index' + index}
																		style={[styles.issueInfoTxt, {
																			marginRight: 5,
																		}]}>{worker.USER_NAME}</Text>
																))}
															</View>}
													</View>
												</View>
												<View style={styles.issueInfo}>
													<View style={styles.issueInfoLeft}>
														<Text style={styles.issueInfoTxt}>From</Text>
														<Text style={styles.issueInfoTxt}>To</Text>
													</View>
													<View>
														<Text style={styles.issueInfoTxt}>
															{moment.utc(task.START).local().format('hh:mm A')}
														</Text>
														<Text style={styles.issueInfoTxt}>
															{moment.utc(task.END).local().format('hh:mm A')}
														</Text>
													</View>
												</View>
											</View>
										</TouchableOpacity>
									)
								})}
							</View> :
							<View style={styles.issues}>
								<Image
									resizeMode="contain"
									style={styles.emptyImg}
									source={require('../../../assets/pictures/notification.png')} />
								<Text style={styles.emptyTxt}>{lanText.empty}</Text>
							</View>}
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	)
}
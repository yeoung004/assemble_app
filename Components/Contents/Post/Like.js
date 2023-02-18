import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { IP_ADDRESS } from "../../../config/key"
import {
	KeyboardAvoidingView,
	RefreshControl,
	ScrollView,
	TouchableOpacity,
	View
} from "react-native"
import { CustomText } from "../../Common/Text"
import { ProfileImage } from "../../Common/ProfileImage"
import { AppContext } from "../../../utils/context"
import { styles } from "./styles/Like_style"

export const Like = ({ navigation, route }) => {
	const [likes, setLikes] = useState([])
	const { lan } = useContext(AppContext)
	const { Like: lanText } = lan.current
	const [likeRefreshing, setLikeRefreshing] = useState(false)
	const POSTID = route.params.ID

	const showInfoModal = (text, isError = false) => {
		if (isError)
			text = lanText.info(text)
		navigation.navigate('InfoModal', { text, state: isError })
	}

	const getLiked = async () => {
		setLikeRefreshing(true)
		try {
			const { data } = await axios.get(IP_ADDRESS + '/post/liked/' + POSTID)
			setLikes([...data])
		} catch (error) {
			console.log('likedHandler', error)
			showInfoModal(lanText.fail, true)
		}
		setLikeRefreshing(false)
	}
	useEffect(() => getLiked(), [])

	return (
		<KeyboardAvoidingView style={styles.container}>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={likeRefreshing}
						onRefresh={() => getLiked()} />
				}>
				<View style={styles.header}>
					<CustomText text={lanText.title} textStyle={{ fontWeight: 'bold', fontSize: 25 }} />
					{likes.map((item, index) => {
						return (
							<View key={index} style={styles.body}>
								<TouchableOpacity
									onPress={() => navigation.navigate ('Profile', { profileUser: item.USER_ID })}>
									<ProfileImage
										source={item.PROFILE_URL}
										styles={styles.profile} />
								</TouchableOpacity>
								<CustomText text={item.USER_NAME} textStyle={styles.name} />
							</View>
						)
					})}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

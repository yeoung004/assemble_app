import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { getProfileBaseUrl } from './Common'
const default_profile = require('../../assets/pictures/default_user.jpg')
const PROFILE_IMAGE_BASE_URL = getProfileBaseUrl()

export const ProfileImage = ({ styles, source }) => {
  const [profile, setProfile] = useState({ uri: PROFILE_IMAGE_BASE_URL + source })

  useEffect(() => {
    setProfile({ uri: PROFILE_IMAGE_BASE_URL + source })
  }, [source])

  return (
    <Image
      onError={() => setProfile(default_profile)}
      source={profile}
      style={[styles, { backgroundColor: 'white' }]} />
  )
}
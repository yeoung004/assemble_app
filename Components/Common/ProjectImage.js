import { useEffect, useState } from 'react'
import { Image } from 'react-native'
const defaultProjectImage = require('../../assets/pictures/defaultProject.png');


export const ProjectImage = ({ styles, source }) => {
  const [image, setImage] = useState({ uri: source })

  return (
    <Image
      onError={() => setImage(defaultProjectImage)}
      source={image}
      style={[styles, { backgroundColor: 'white' }]} />
  )
}
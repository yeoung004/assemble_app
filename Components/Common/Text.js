import { Text } from "react-native"

export const CustomText = ({
  numberOfLines = 0,
  textStyle,
  text,
  selectable = false
}) => {
  return (
    <Text
      selectable={selectable}
      numberOfLines={numberOfLines}
      style={[{ fontFamily: 'Lato' }, textStyle]}>
      {text}
    </Text>
  )
}
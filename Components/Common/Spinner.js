import { ActivityIndicator, Text, View } from 'react-native'

export const Spinner = ({ spinnerVisible }) => {
  return (
    spinnerVisible && <View style={{
      position: 'absolute',
      zIndex: 999,
      width: '100%',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator
        animating
        size={80}
        color={'gray'} />
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Loading...</Text>
    </View>
  )
}
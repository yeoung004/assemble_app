import { Dimensions, TouchableOpacity, View } from "react-native"
import { WebView } from "react-native-webview"
import { AntDesign } from "@expo/vector-icons"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const FederSignIn = ({ navigation, route }) => {
  return (
    <View style={{
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      width: SCREEN_WIDTH / 1.3,
      height: SCREEN_HEIGHT / 1.5,
    }}>
      <View style={{
        padding:10,
        width: SCREEN_WIDTH / 1.3,
        backgroundColor:'white',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        alignItems:"flex-end"
      }}>
        <TouchableOpacity 
          onPress={()=>navigation.goBack()}>
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <WebView 
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{
          width: SCREEN_WIDTH / 1.3,
          height: SCREEN_HEIGHT,
        }}
        containerStyle={{ 
          borderBottomLeftRadius:10,
          borderBottomRightRadius:10
        }}
        source={{ uri: route.params.uri }} />
    </View>
  )
}
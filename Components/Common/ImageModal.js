export const ImageModal = () => {
  return (
    <Modal
      //image modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={() => setImageModalVisible(false)}
      isVisible={imageModalVisible}>
      <TouchableWithoutFeedback
        onPress={() => setImageModalVisible(false)}>
        <ImageBackground
          resizeMode="contain"
          style={{ width: '100%', height: '100%' }}
          source={{ uri: imageURL?.uri }} />
      </TouchableWithoutFeedback>
    </Modal>
  )
}
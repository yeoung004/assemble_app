import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const getPictureBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = (e) => {
      reject(new TypeError("Network request failed"));
    }
    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send(null)
  })
}

export const imageUpload = async (fireBaseStorage, fileURL, storageUrl, fileName) => {
  const blob = await getPictureBlob(fileURL)
  const profileRef = ref(fireBaseStorage, `${storageUrl}/${fileName}`)
  const snapshot = await uploadBytes(profileRef, blob)
  console.log('Project profile image uploaded')
  return await getDownloadURL(profileRef)
}
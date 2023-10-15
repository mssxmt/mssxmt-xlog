import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
export const uploadImage = async (file: File, postId: string) => {
  // let uploadResult = '';
  const path = `images/${postId}/${file.name}`;
  const storageRef = ref(storage, path);
  // await uploadBytes(storageRef, file)
  //   .then(async (snapshot) => {
  //     console.log('アップロードに成功しました', snapshot);
  //     await getDownloadURL(storageRef).then(function (url) {
  //       uploadResult = url;
  //     });
  //   })
  //   .catch((error) => {
  //     console.log('アップロードに失敗しました');
  //   });
  // return uploadResult;
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log('アップロードに失敗しました', error);
    return '';
  }
};

import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { uid } from 'uid';

export default function useImage() {
  const storage = useFirebaseStorage();
  const storageRefPath = storageRef(storage, `/images/${uid()}`);

  const { url, upload } = useStorageFile(storageRefPath);

  const uploadImage = (e) => {
    console.log(e.target.files[0]);
  };

  return {
    uploadImage,
  };
}

import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { uid } from 'uid';
import { computed } from 'vue';

export default function useImage() {
  const storage = useFirebaseStorage();
  const storageRefPath = storageRef(storage, `/images/${uid()}.jpg`);

  const { url, upload } = useStorageFile(storageRefPath);

  const uploadImage = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      upload(file);
    }
  };

  const image = computed(() => {
    if (url.value) {
      return url.value;
    } else {
      return null;
    }
  });

  return {
    url,
    uploadImage,
    image,
  };
}

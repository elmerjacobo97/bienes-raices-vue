import { computed, ref } from 'vue';
import { collection, doc , deleteDoc} from 'firebase/firestore';
import {ref as storageRef, deleteObject} from 'firebase/storage';
import { useCollection, useFirestore , useFirebaseStorage } from 'vuefire';

export default function useProperties() {

  const swimmingPool = ref(false);
  const db = useFirestore();
  const storage = useFirebaseStorage();
  const propertiesCollection = useCollection(collection(db, 'properties'));


  async function deleteItem (id, urlImage) {
    if (confirm('¿Desea eliminar este elemento?')) {
    const docRef = doc(db, 'properties', id);
    const imageRef = storageRef(storage, urlImage);

    await Promise.all([
      deleteDoc(docRef),
      deleteObject(imageRef),
    ])
    // await deleteObject(imageRef);
    // await deleteDoc(docRef);
    }
  }

  const filteredItems = computed(() => {
    if (swimmingPool.value) {
      return propertiesCollection.value.filter((property) => {
        return property.swimmingPool;
      });
    } else {
      return propertiesCollection.value;
    }
  })

  // Format price, pasando price como parámetro.
  // const formatPrice = computed(() => {
  //   return (price) =>
  //     Number(price).toLocaleString('es-PE', {
  //       style: 'currency',
  //       currency: 'PEN',
  //     });
  // });

  return {
    swimmingPool,
    propertiesCollection,
    filteredItems,
    deleteItem,
  };
}

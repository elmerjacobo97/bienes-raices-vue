import { computed } from 'vue';
import { collection } from 'firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';

export default function useProperties() {
  const db = useFirestore();
  const propertiesCollection = useCollection(collection(db, 'properties'));

  // Format price, pasando price como parámetro.
  const formatPrice = computed(() => {
    return (price) =>
      Number(price).toLocaleString('es-PE', {
        style: 'currency',
        currency: 'PEN',
      });
  });

  return {
    propertiesCollection,
    formatPrice,
  };
}

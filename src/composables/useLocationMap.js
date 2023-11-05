import { ref } from 'vue';

export default function useLocationMap() {
  const zoom = ref(13);
  const center = ref([-8.11599, -79.02998]);

  function pin(e) {
    const marker = e.target.getLatLng();
    center.value = [marker.lat, marker.lng];
  }

  return {
    zoom,
    center,
    pin,
  };
}

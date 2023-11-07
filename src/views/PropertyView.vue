<script setup>
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import { formatPrice } from '@/helpers';
import useLocationMap from '@/composables/useLocationMap';
import { LMap, LMarker, LTileLayer, LPopup } from '@vue-leaflet/vue-leaflet';
import { watch } from 'vue';

const { zoom, center } = useLocationMap();
const route = useRoute();
const db = useFirestore();
const docRef = doc(db, 'properties', route.params.id);
const property = useDocument(docRef);

watch(property, (property) => {
  center.value = property?.location
})

</script>

<template>
  <v-card flat>
    <v-card-title class="text-h4 text-center font-weight-bold"> {{ property?.title }} </v-card-title>
    <v-img :src="property?.image" height="500" cover alt="Imagen propiedad" />
    <div class="bg-blue-grey-lighten-5 d-flex flex-column align-center flex-md-row justify-md-between">
      <v-card-text class="text-h5 font-weight-bold">{{ formatPrice(property?.price) }}</v-card-text>
      <v-card-text> Baños: <span class="font-weight-bold"> {{ property?.bathrooms }}</span> </v-card-text>
      <v-card-text> Estacionamiento: <span class="font-weight-bold">{{ property?.parking }}</span> </v-card-text>
      <v-card-text> Habitaciones: <span class="font-weight-bold">{{ property?.bedrooms }}</span> </v-card-text>
    </div>
    <v-row>
      <v-col cols="12" md="8">
        <v-card-text class="text-pre-wrap my-5">{{ property?.description }} </v-card-text>
      </v-col>
      <v-col cols="12" md="4">
       <div style="height: 600px;">
         <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
           <LMarker :lat-lng="center" >
             <LPopup> {{ property?.title }} </LPopup>
           </LMarker>
           <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap">
           </LTileLayer>
         </LMap>
       </div>
      </v-col>
    </v-row>
  </v-card>
</template>


<style scoped>
.text-pre-wrap {
  white-space: pre-wrap;
  word-break: break-word;
  text-align: justify;
  text-justify: inter-word;
}
</style>

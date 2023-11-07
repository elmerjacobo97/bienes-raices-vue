<script setup>
import { doc, updateDoc } from "firebase/firestore";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDocument, useFirestore } from "vuefire";
import useImage from "../../composables/useImage";
import useLocationMap from "../../composables/useLocationMap";
import { useField, useForm } from "vee-validate";
import { validationSchema } from "@/validations/propertiesSchema";
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";

const route = useRoute();
const router = useRouter();

const items = [1, 2, 3, 4, 5];

const { url, uploadImage, image: imageValue } = useImage();
const { zoom, center, pin } = useLocationMap();

const { handleSubmit } = useForm({ validationSchema });

const title = useField("title");
const image = useField("image");
const price = useField("price");
const bedrooms = useField("bedrooms");
const bathrooms = useField("bathrooms");
const parking = useField("parking");
const description = useField("description");
const swimmingPool = useField("swimmingPool");

// Obtener la propiedad a editar.
const db = useFirestore();
const docRef = doc(db, "properties", route.params.id);
const property = useDocument(docRef);

watch(property, (property) => {
  title.value.value = property.title;
  price.value.value = property.price;
  bedrooms.value.value = property.bedrooms;
  bathrooms.value.value = property.bathrooms;
  parking.value.value = property.parking;
  description.value.value = property.description;
  swimmingPool.value.value = property.swimmingPool;
  center.value = property.location
});

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values;

  // Crear el objeto base de 'data' con todo excepto 'image'.
  let data = {
    ...property,
    location: center.value
  };

  if (imageValue.value) {
    data.image = url.value;
  }

  await updateDoc(docRef, data);

  // Redireccionar al usuario.
  router.push({ name: "admin-properties" });
});

</script>

<template>
  <v-card max-width="800" class="mx-auto" color="grey-lighten-3" flat>
    <v-card-title class="text-h4 text-center font-weight-bold">
      Editar propiedad
    </v-card-title>
    <v-card-subtitle class="text-center">
      Edita una propiedad modificando el siguiente formulario.
    </v-card-subtitle>
    <v-form class="mt-5">
      <v-text-field class="mb-3" label="Título de la propiedad" prepend-icon="mdi-home" type="text" variant="outlined"
        v-model="title.value.value" :error-messages="title.errorMessage.value" />
      <v-file-input class="mb-3" label="Imagen" accept="image/jpeg, image/png, image/jpg, image/webp, image/gif"
        prepend-icon="mdi-camera" variant="outlined" v-model="image.value.value"
        :error-messages="image.errorMessage.value" @change="uploadImage" />
      <div class="my-5">
        <p class="font-weight-bold">Imagen Actual:</p>
        <img v-if="imageValue" :src="imageValue" class="w-50" alt="Imagen propiedad">
        <img v-else :src="property?.image" class="w-50" alt="Imagen propiedad">

      </div>
      <v-text-field class="mb-3" label="Precio" prepend-icon="mdi-currency-usd" type="text" variant="outlined"
        v-model="price.value.value" :error-messages="price.errorMessage.value" />
      <v-row class="mb-3">
        <v-col cols="12" md="6">
          <v-select label="Habitaciones" :items="items" prepend-icon="mdi-bed" variant="outlined"
            v-model="bedrooms.value.value" :error-messages="bedrooms.errorMessage.value" />
        </v-col>
        <v-col cols="12" md="6">
          <v-select label="Baños" :items="items" prepend-icon="mdi-shower" variant="outlined"
            v-model="bathrooms.value.value" :error-messages="bathrooms.errorMessage.value" />
        </v-col>
      </v-row>
      <v-select class="mb-3" label="Estacionamiento" :items="items" prepend-icon="mdi-car" variant="outlined"
        v-model="parking.value.value" :error-messages="parking.errorMessage.value" />
      <v-textarea label="Descripción" prepend-icon="mdi-text" variant="outlined" v-model="description.value.value"
        :error-messages="description.errorMessage.value" />
      <v-checkbox label="Alberca" prepend-icon="mdi-pool" variant="outlined" v-model="swimmingPool.value.value" />
      <h2 class="text-center my-5 font-weight-bold">Ubicación</h2>
      <div class="mb-5">
        <div style="height: 600px">
          <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" :draggable="true" @moveend="pin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap">
            </LTileLayer>
          </LMap>
        </div>
      </div>
      <v-btn color="pink-darken-1" block prepend-icon="mdi-content-save" @click="submit">Editar propiedad</v-btn>
    </v-form>
  </v-card>
</template>

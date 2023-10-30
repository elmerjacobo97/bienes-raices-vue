<script setup>
import { useForm, useField } from 'vee-validate';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useRouter } from 'vue-router';
import { validationSchema, imageSchema } from '@/validations/propertiesSchema';
import useImage from '../../composables/useImage';

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  }
});

const db = useFirestore();
const router = useRouter();
const { uploadImage } = useImage();

const title = useField('title');
const image = useField('image');
const price = useField('price');
const bedrooms = useField('bedrooms');
const bathrooms = useField('bathrooms');
const parking = useField('parking');
const description = useField('description');
const swimmingPool = useField('swimmingPool', null, { initialValue: false });

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values;
  const dicRef = await addDoc(collection(db, 'properties'), {
    ...property,
  });

  if (dicRef.id) {
    router.push({
      name: 'admin-properties',
    })
  }
});


const items = [1, 2, 3, 4, 5];

</script>

<template>
  <v-card max-width="800" class="mx-auto" color="grey-lighten-3" flat>
    <v-card-title class="text-h4 text-center font-weight-bold">
      Nueva propiedad
    </v-card-title>
    <v-card-subtitle class="text-center">
      Crea una nueva propiedad llenando el siguiente formulario.
    </v-card-subtitle>
    <v-form class="mt-5">
      <v-text-field class="mb-3" label="Título de la propiedad" prepend-icon="mdi-home" type="text" variant="outlined"
        v-model="title.value.value" :error-messages="title.errorMessage.value" />
      <v-file-input class="mb-3" label="Imagen" accept="image/jpeg, image/png, image/jpg, image/webp, image/gif"
        prepend-icon="mdi-camera" variant="outlined" v-model="image.value.value"
        :error-messages="image.errorMessage.value" @change="uploadImage" />
      <v-text-field class="mb-3" label="Precio" prepend-icon="mdi-currency-usd" type="text" variant="outlined"
        v-model="price.value.value" :error-messages="price.errorMessage.value" />
      <v-row>
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
      <v-btn color="pink-darken-1" block prepend-icon="mdi-content-save" @click="submit">Agregar
        propiedad</v-btn>
    </v-form>
  </v-card>
</template>



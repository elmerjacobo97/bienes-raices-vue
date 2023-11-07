<script setup>
import useProperties from '../composables/useProperties';
import Property from '../components/Property.vue';
import { formatPrice } from '@/helpers';

const { filteredItems, swimmingPool } = useProperties();


</script>

<template>
  <h1 class="text-h3 text-center font-weight-bold my-5">Nuestras Propiedades</h1>
  <v-card flat class="my-5" color="grey-lighten-3">
    <v-card-title>
      Filtrar por alberca
      <v-checkbox v-model="swimmingPool" label="Alberca" />
    </v-card-title>
    <v-row class="py-5 px-5">
      <Property v-for="property in filteredItems" :key="property.id" :property="property"
        :format-price="formatPrice" />
    </v-row>
  </v-card>
</template>

<script setup>
import useProperties from '../../composables/useProperties';

const { propertiesCollection, formatPrice } = useProperties();

</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>
  <v-btn color="green-darken-1" variant="outlined" :to="{ name: 'admin-new-property' }">Nueva propiedad</v-btn>

  <v-card class="mx-auto mt-5" flat color="grey-lighten-3">
    <v-list>
      <v-list-item v-for="property in propertiesCollection" :key="property.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img width="180" :src="property.image" :alt="property.title">
          </v-list-item-media>
        </template>
        <v-list-item-title>{{ property.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ formatPrice(property.price) }}</v-list-item-subtitle>
        <template v-slot:append>
          <v-btn color="green-darken-1" prepend-icon="mdi-pencil" variant="text"
            :to="{ name: 'admin-edit-property', params: { id: property.id } }">
            Editar
          </v-btn>
          <v-btn color="red-darken-1" prepend-icon="mdi-delete" variant="text">
            Eliminar
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>



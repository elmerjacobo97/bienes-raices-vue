<script setup>
const props = defineProps({
  property: {
    type: Object,
  },
  formatPrice: {
    type: Function,
  },
});
</script>

<template>
  <v-col cols="12" md="4">
    <v-card color="grey-lighten-3">
      <v-img :src="property.image" height="250" alt="Imagen propiedad" cover />
      <v-card-title>{{ property.title }}</v-card-title>
      <v-card-text class="text-truncate"> {{ property.description }} </v-card-text>
      <v-card-text class="text-h5 font-weight-bold">
        {{ formatPrice(property.price) }}</v-card-text>
      <template v-slot:actions>
        <v-btn color="green-darken-1" variant="outlined" block prepend-icon="mdi"
          :to="{ name: 'property', params: { id: property.id } }">Ver más</v-btn>
      </template>
    </v-card>
  </v-col>
</template>

<style lang="scss" scoped></style>

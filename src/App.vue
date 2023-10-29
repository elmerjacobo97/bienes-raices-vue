<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar color="indigo-darken-4">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">
            Bienes Raíces
          </v-btn>
        </template>
        <v-spacer></v-spacer>
        <v-btn prepend-icon="mdi-home" :to="{ name: 'home' }">
          Inicio
        </v-btn>
        <v-btn prepend-icon="mdi-login" :to="{ name: 'login' }">
          Iniciar Sesión
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

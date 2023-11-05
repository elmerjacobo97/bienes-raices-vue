<script setup>
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();
const { isAuth } = storeToRefs(auth);

</script>

<template>
  <v-card max-width="1280" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar color="indigo-darken-4">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">
            Bienes Raíces
          </v-btn>
        </template>
        <v-spacer></v-spacer>
        <div v-if="isAuth">
          <v-btn prepend-icon="mdi-account" :to="{ name: 'admin-properties' }">
            Admin
          </v-btn>
          <v-btn prepend-icon="mdi-logout" @click="auth.logout">
            Cerrar Sesión
          </v-btn>
        </div>
        <div v-else>
          <v-btn prepend-icon="mdi-home" :to="{ name: 'home' }">
            Inicio
          </v-btn>
          <v-btn prepend-icon="mdi-login" :to="{ name: 'login' }">
            Iniciar Sesión
          </v-btn>
        </div>
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

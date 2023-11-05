<script setup>
import { useForm, useField } from 'vee-validate';
import { useAuthStore } from '../stores/auth';

import { loginSchema as validationSchema } from '../validations/loginSchema';

const auth = useAuthStore();

const { handleSubmit, handleReset } = useForm({
  validationSchema,
});
const email = useField('email');
const password = useField('password');

const onSubmit = handleSubmit(values => {
  auth.login(values);
});

</script>

<template>
  <v-card max-width="448" class="mx-auto" color="grey-lighten-3" flat>
    <v-card-title class="text-h4 text-center font-weight-bold">
      Iniciar Sesión
    </v-card-title>
    <v-card-subtitle class="text-center">
      Inicia sesión con tu email y contraseña
    </v-card-subtitle>
    <v-alert v-if="auth.hasError" type="error" :title="auth.errorMessage" class="mt-5"></v-alert>
    <v-form class="mt-5" @click="onSubmit">
      <v-text-field class="mb-3" label="Usuario o correo electrónico" name="login" prepend-icon="mdi-account" type="text"
        v-model="email.value.value" :error-messages="email.errorMessage.value" />
      <v-text-field class="mb-3" label="Contraseña" name="password" prepend-icon="mdi-lock" type="password"
        v-model="password.value.value" :error-messages="password.errorMessage.value" />
      <v-btn color="success" block prepend-icon="mdi-login">Ingresar</v-btn>
    </v-form>
  </v-card>
</template>

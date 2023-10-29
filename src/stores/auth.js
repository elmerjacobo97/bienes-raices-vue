import { defineStore } from 'pinia';
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth();

  const errorMessage = ref('');
  const userAuth = ref({});
  const errorCodes = {
    'auth/invalid-login-credentials': 'Credenciales inválidas',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
  };

  const login = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      userAuth.value = user;
      errorMessage.value = '';

      console.log('Bienvenido', userAuth.value);
    } catch (error) {
      console.log('Error al iniciar sesión', error);
      errorMessage.value = errorCodes[error.code];
    }
  };

  const hasError = computed(() => {
    return !!errorMessage.value; // devuelve true o false
  });

  return {
    login,
    errorMessage,
    hasError,
  };
});

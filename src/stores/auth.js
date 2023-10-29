import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { useFirebaseAuth } from 'vuefire';

import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth(); // getAuth() de firebase
  const router = useRouter();

  const errorMessage = ref('');
  const userAuth = ref(null);
  const errorCodes = {
    'auth/invalid-login-credentials': 'Credenciales inválidas',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
  };

  onMounted(() => {
    // Verificar si el usuario está autenticado
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userAuth.value = user;
      }
    });
  });

  const login = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      userAuth.value = user;
      errorMessage.value = '';
      router.push({ name: 'admin-properties' });
    } catch (error) {
      console.log('Error al iniciar sesión', error);
      errorMessage.value = errorCodes[error.code];
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      userAuth.value = null;
      router.push({ name: 'login' });
    } catch (error) {
      console.log('Error al cerrar sesión', error);
    }
  };

  const hasError = computed(() => {
    return !!errorMessage.value; // devuelve true o false
  });

  const isAuth = computed(() => {
    return !!userAuth.value; // devuelve true o false
  });

  return {
    login,
    logout,
    errorMessage,
    hasError,
    isAuth,
    userAuth,
  };
});

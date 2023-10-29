import { createRouter, createWebHistory } from 'vue-router';
import { useFirebaseAuth } from 'vuefire';
import { onAuthStateChanged } from 'firebase/auth';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayoutView.vue'),
      // Proteger rutas.
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: '/admin/new-property',
          name: 'admin-new-property',
          component: () => import('../views/admin/NewPropertyView.vue'),
        },
        {
          path: '/admin/edit-property/:id',
          name: 'admin-edit-property',
          component: () => import('../views/admin/EditPropertyView.vue'),
        },
      ],
    },
  ],
});

// Guard de navegación.
// to, from, next <--- to = ruta a la que se va, from = ruta anterior, next = siguiente ruta
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // Comprobar si hay un usuario autenticado.
    try {
      await authenticateUser();
      next();
    } catch (error) {
      console.log('Error al autenticar', error);
      next({ name: 'login' });
    }
    return;
  }

  // NO está protegido. mostramos la vista.
  next();
});

const authenticateUser = () => {
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

export default router;

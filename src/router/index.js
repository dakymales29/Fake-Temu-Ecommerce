import { createRouter, createWebHistory } from "vue-router";
//importamos componentes
import mostrar from "../components/mostrar.vue";
import crear from "../components/crear.vue";
import actualizar from "../components/actualizar.vue";
import eliminar from "../components/eliminar.vue";
import login from "../components/login.vue";
import mostrarAdmin from "../components/mostrarAdmin.vue";
import carrito from "../components/carrito.vue";

//rutas
const routes = [
  { path: "/", redirect: "/mostrar" },
  { path: "/mostrar", component: mostrar },
  { path: "/crear", component: crear },
  { path: "/actualizar", component: actualizar },
  { path: "/eliminar", component: eliminar },
  { path: "/login", component: login },
  { path: "/admin", component: mostrarAdmin },
  { path: "/carrito", component: carrito },

];

//creamos el router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//** Protegemos rutas **
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path === "/admin" && !token) {
    // Si intenta entrar a admin sin token, redirige a login
    next("/login");
  } else if (to.path === "/login" && token) {
    // Si ya está logueado, redirige al admin
    next("/admin");
  } else {
    // Si no aplica ninguna condición, deja pasar
    next();
  }
});

export default router;

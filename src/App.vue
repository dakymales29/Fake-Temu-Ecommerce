<template>
  <div class="relative min-h-screen bg-white font-sans text-gray-900">
    <!-- Botón y título, que desaparecen en login -->
    <!-- Usamos route.path para comparar el nombre de la ruta que tenemos en index.js -->

    <!-- Solo mostrar botón y título si NO estamos en login -->
    <div v-if="$route.path !== '/login' && $route.path !== '/admin'">
      <!-- Botón -->
      <div class="absolute top-4 right-4">
        <router-link 
          to="/login" 
          class="px-4 py-2 text-gray-900 border border-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Iniciar Sesión
        </router-link>
      </div>
    </div>

    <!-- Título centrado -->
    <h1 v-if="$route.path !== '/login' && $route.path !== '/admin'" class="text-4xl font-light text-center pt-12 pb-6 tracking-wide">
      FAKE TEMU
    </h1>

    <!-- Contenido principal -->
    <router-view />
  </div>
</template>

<script>

</script>

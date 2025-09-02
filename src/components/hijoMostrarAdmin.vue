<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <div
      v-for="producto in productos"
      :key="producto.id"
      class="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
    >
      <img
        :src="producto.image"
        alt="producto.title"
        class="w-full h-48 object-contain mb-4 rounded-md"
      />
      <div class="flex-1">
        <h2 class="font-light text-lg mb-1 text-gray-900 truncate">{{ producto.title }}</h2>
        <p class="text-gray-700 mb-1 font-medium">${{ producto.price }}</p>
        <p class="text-sm text-gray-400 uppercase tracking-wide">{{ producto.category }}</p>
      </div>

      <!-- Botones para admin -->
      <div class="mt-4 flex gap-2">
        <button
          @click="$emit('editar', producto)"
          class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Editar
        </button>
        <button
          @click="$emit('eliminar', producto)"
          class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productos: {
      type: Array,
      required: true
    }
  }
};
</script>

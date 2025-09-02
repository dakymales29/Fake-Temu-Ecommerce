<template>
  <!-- Filtros y barra de búsqueda -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <!-- Parte izquierda: Selects -->
    <div class="flex flex-col sm:flex-row gap-3">
      <!-- CATEGORIA -->
      <select v-model="categoria" class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-gray-400 transition text-gray-800 bg-white">
        <option value="">Todo</option>
        <option value="men's clothing">Hombre</option>
        <option value="women's clothing">Mujer</option>
        <option value="jewelery">Joyas</option>
        <option value="electronics">Electronica</option>
      </select>

      <!-- ORDENAR -->
      <select v-model="orden" class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-gray-400 transition text-gray-800 bg-white">
        <option value="">Sin orden</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>

    <!-- Parte derecha: Barra de búsqueda -->
    <input
      v-model="titulo"
      type="text"
      placeholder="Buscar por nombre"
      class="p-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 w-full sm:w-1/3 text-gray-800 bg-white transition"
    />
  </div>

  <!-- Botón de carrito con contador -->
  <div class="flex justify-end items-center gap-2 mb-4 px-4 sm:px-0">
    <router-link to="/carrito" class="relative bg-gray-900 text-white px-4 py-2 rounded-md">
      🛒 Carrito
      <span 
        v-if="carrito.length > 0" 
        class="absolute -top-2  bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
      >
        {{ totalCantidad }}
      </span>
    </router-link>
  </div>

  <!-- Mensaje cuando no hay resultados -->
  <hijoMostrar 
    :productos="filtrarProductos" 
    @agregar="agregarAlCarrito" 
  />
  <p v-if="!loading && filtrarProductos.length === 0 && !error" class="text-red-500 font-semibold text-center my-4 bg-red-50 p-2 rounded">
    PRODUCTO NO EXISTE
  </p>
  <p v-if="loading" class="text-gray-500 font-medium text-center my-4 bg-gray-50 p-2 rounded animate-pulse">
    CARGANDO....
  </p>
  <p v-if="error" class="text-red-600 font-medium text-center my-4 bg-red-50 p-2 rounded">
    ERROR AL MOSTRAR DATOS
  </p>
</template>

<script>
import hijoMostrar from "./hijoMostrar.vue";

export default {
  data() {
    return {
      productos: [],
      loading: false,
      error: "",
      //filtrar
      categoria: "", //boton
      titulo: "", //barra de busqueda
      orden: "", //ascendente descendente
      carrito: [] // arreglo para guardar productos agregados al carrito
    };
  },
  async mounted() {
    // Cargando
    this.loading = true;
    //conexion a la api
    try {
      const conexion = await fetch("https://fakestoreapi.com/products");
      if (!conexion.ok) throw new Error("Error al conectar a la api");
      const datos = await conexion.json();
      this.productos = datos;

      // Cargar carrito desde localStorage al montar la página
      const carritoGuardado = localStorage.getItem("carrito");
      if(carritoGuardado) this.carrito = JSON.parse(carritoGuardado);

    } catch (error) {
      this.error = `ERROR AL MOSTRAR DATOS ${error.message}`;
    } finally {
      this.loading = false;
    }
  },
  computed: {
    filtrarProductos() {
      let lista = this.productos;

      // Filtrar por categoria
      if (this.categoria) {
        lista = lista.filter(
          (pCategoria) => pCategoria.category === this.categoria
        );
      }
      // Filtrar por nombre
      if (this.titulo) {
        lista = lista.filter((pBarra) =>
          pBarra.title.toLowerCase().includes(this.titulo.toLowerCase())
        );
      }
      // Ordenar A-Z
      if (this.orden === "asc") {
        lista = lista.slice().sort((a, b) => a.title.localeCompare(b.title));
      }
      // Ordenar Z-A
      if (this.orden === "desc") {
        lista = lista.slice().sort((a, b) => b.title.localeCompare(a.title));
      }
      return lista;
    },

    // Calcular la cantidad total de productos en el carrito
    totalCantidad() {
      return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }
  },
  methods: {
    // Función para añadir productos al carrito
    agregarAlCarrito(producto) {
      const productoExistente = this.carrito.find(p => p.id === producto.id);
      if(productoExistente){
        productoExistente.cantidad++;
      } else {
        this.carrito.push({...producto, cantidad: 1});
      }

      // Guardar carrito en localStorage
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }
  },
  components: {
    hijoMostrar,
  },
};
</script>

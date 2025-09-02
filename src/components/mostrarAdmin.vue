<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Header -->
    <header class="flex justify-end p-4 bg-white shadow">
      <button 
        @click="logout" 
        class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition"
      >
        Logout
      </button>
    </header>

    <!-- Mensaje general -->
    <p v-if="mensaje" class="text-center text-green-600 font-semibold mt-4">{{ mensaje }}</p>

    <!-- Main content -->
    <main class="flex-1 p-4 sm:p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">Gestión de Productos</h1>

      <!-- Filtros y búsqueda + Crear -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 w-full">
        <!-- Selects + Crear -->
        <div class="flex flex-col sm:flex-row gap-3 items-center">
          <select v-model="categoria" class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-gray-400 transition bg-white w-full sm:w-auto">
            <option value="">Todo</option>
            <option value="men's clothing">Hombre</option>
            <option value="women's clothing">Mujer</option>
            <option value="jewelery">Joyas</option>
            <option value="electronics">Electrónica</option>
          </select>

          <select v-model="orden" class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-gray-400 transition bg-white w-full sm:w-auto">
            <option value="">Sin orden</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <button 
            @click="abrirCrear"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Crear
          </button>
        </div>

        <!-- Barra de búsqueda -->
        <input
          v-model="titulo"
          type="text"
          placeholder="Buscar por nombre"
          class="p-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 w-full sm:w-64 text-gray-800 bg-white transition"
        />
      </div>

      <!-- Productos -->
      <hijoMostrarAdmin 
        :productos="filtrarProductos" 
        @editar="editarProducto" 
        @eliminar="eliminarProducto"
      />

      <!-- Mensajes -->
      <p v-if="!loading && filtrarProductos.length === 0 && !error" class="text-red-500 font-semibold text-center my-4 bg-red-50 p-2 rounded">
        NO HAY PRODUCTOS
      </p>
      <p v-if="loading" class="text-gray-500 font-medium text-center my-4 bg-gray-50 p-2 rounded animate-pulse">
        CARGANDO....
      </p>
      <p v-if="error" class="text-red-600 font-medium text-center my-4 bg-red-50 p-2 rounded">
        ERROR AL MOSTRAR DATOS
      </p>

      <!-- Modal de actualización -->
      <div v-if="modalActualizar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
          <h2 class="text-xl font-bold mb-4">Actualizar Producto</h2>

          <input v-model="productoEditar.title" placeholder="Título" class="mb-2 p-2 border rounded w-full" />
          <input v-model="productoEditar.price" type="number" placeholder="Precio" class="mb-2 p-2 border rounded w-full" />
          <input v-model="productoEditar.category" placeholder="Categoría" class="mb-2 p-2 border rounded w-full" />
          <input v-model="productoEditar.image" placeholder="URL de imagen" class="mb-4 p-2 border rounded w-full" />

          <div class="flex justify-end gap-2">
            <button @click="cerrarModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button @click="guardarCambios" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar</button>
          </div>
        </div>
      </div>

      <!-- Modal de creación -->
      <div v-if="modalCrear" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
          <h2 class="text-xl font-bold mb-4">Crear Producto</h2>

          <input v-model="productoCrear.title" placeholder="Título" class="mb-2 p-2 border rounded w-full" />
          <input v-model="productoCrear.price" type="number" placeholder="Precio" class="mb-2 p-2 border rounded w-full" />
          <input v-model="productoCrear.category" placeholder="Categoría" class="mb-2 p-2 border rounded w-full" />
          <input v-model="productoCrear.image" placeholder="URL de imagen" class="mb-4 p-2 border rounded w-full" />

          <div class="flex justify-end gap-2">
            <button @click="cerrarModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button @click="guardarCrear" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Crear</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import hijoMostrarAdmin from "./hijoMostrarAdmin.vue";

export default {
  components: { hijoMostrarAdmin },
  data() {
    return {
      productos: [],
      loading: false,
      error: "",
      mensaje: "",
      categoria: "",
      titulo: "",
      orden: "",
      modalActualizar: false,
      productoEditar: null,
      modalCrear: false,
      productoCrear: { title: "", price: 0, category: "", image: "" }
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Error al conectar la API");
      this.productos = await res.json();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  computed: {
    filtrarProductos() {
      let lista = this.productos;
      if (this.categoria) lista = lista.filter(p => p.category === this.categoria);
      if (this.titulo) lista = lista.filter(p => p.title.toLowerCase().includes(this.titulo.toLowerCase()));
      if (this.orden === "asc") lista = lista.slice().sort((a, b) => a.title.localeCompare(b.title));
      if (this.orden === "desc") lista = lista.slice().sort((a, b) => b.title.localeCompare(a.title));
      return lista;
    }
  },
  methods: {
    editarProducto(producto) {
      this.productoEditar = { ...producto };
      this.modalActualizar = true;
    },
    abrirCrear() {
      this.productoCrear = { title: "", price: 0, category: "", image: "" };
      this.modalCrear = true;
    },
    cerrarModal() {
      this.modalActualizar = false;
      this.modalCrear = false;
      this.productoEditar = null;
      this.productoCrear = { title: "", price: 0, category: "", image: "" };
    },
    async guardarCambios() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${this.productoEditar.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.productoEditar)
        });
        if (!res.ok) throw new Error("Error al actualizar la API");
        const updated = await res.json();
        const index = this.productos.findIndex(p => p.id === updated.id);
        if (index !== -1) this.productos[index] = updated;
        this.mensaje = `Producto "${updated.title}" actualizado!`;
        setTimeout(() => this.mensaje = "", 3000);
        this.cerrarModal();
      } catch (err) {
        this.mensaje = `Error al actualizar: ${err.message}`;
      }
    },
    async guardarCrear() {
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.productoCrear)
        });
        if (!res.ok) throw new Error("Error al crear producto");
        const created = await res.json();
        this.productos.push(created);
        this.mensaje = `Producto "${created.title}" creado!`;
        setTimeout(() => this.mensaje = "", 3000);
        this.cerrarModal();
      } catch (err) {
        this.mensaje = `Error al crear: ${err.message}`;
      }
    },
    async eliminarProducto(producto) {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${producto.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar en la API");
        this.productos = this.productos.filter(p => p.id !== producto.id);
        this.mensaje = "Producto eliminado con éxito!";
        setTimeout(() => this.mensaje = "", 3000);
      } catch (err) {
        this.mensaje = `ERROR AL ELIMINAR: ${err.message}`;
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/mostrar");
    }
  }
};
</script>

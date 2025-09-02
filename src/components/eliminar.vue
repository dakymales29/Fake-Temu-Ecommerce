<template>
  <h1 class="text-3xl font-extralight text-center p-10">ELIMINAR</h1>
  <eliminarProducto @eliminar-producto="eliminarProductos" :cargando="cargando"/>
  <p v-if="mensaje">{{ mensaje }}</p>

</template>

<script>
import eliminarProducto from "../components/hijoEliminar.vue";
export default {
  data() {
    return {
      cargando: false,
      mensaje: "",
    };
  },
  methods: {
    async eliminarProductos(datos) {
      this.cargando = true;
      try {
        const conexion = await fetch(
          `https://fakestoreapi.com/products/${datos.id}`,
          {
            method: "DELETE",
          }
        );
        if (!conexion.ok) throw new Error("ERROR AL CONECTAR A AL API");
        this.mensaje = "Usuario eliminado con éxito!";
        setTimeout(()=>this.mensaje="",3000);
      } catch (error) {
        this.mensaje = `ERROR AL ELIMINAR: ${error.message}`;
      } finally {
        this.cargando = false;
      }
    },
  },
  components: {
    eliminarProducto,
  },
};
</script>

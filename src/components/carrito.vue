<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Carrito de Compras</h1>

    <!-- Lista de productos en el carrito -->
    <div v-if="carrito.length > 0" class="space-y-4">
      <div 
        v-for="(item, index) in carrito" 
        :key="index" 
        class="flex justify-between items-center p-4 bg-gray-50 rounded shadow"
      >
        <div>
          <h2 class="font-medium">{{ item.title }}</h2>
          <p>${{ item.price }}</p>
        </div>

        <!-- Contador para ajustar cantidad -->
        <div class="flex items-center gap-2">
          <button @click="disminuir(index)" class="px-2 py-1 bg-gray-300 rounded">-</button>
          <span>{{ item.cantidad }}</span>
          <button @click="aumentar(index)" class="px-2 py-1 bg-gray-300 rounded">+</button>
        </div>
      </div>

      <!-- Total -->
      <p class="mt-4 font-semibold text-lg">Total: ${{ total }}</p>

      <!-- Botón de Pagar -->
      <button @click="abrirModal" class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
        Pagar
      </button>
    </div>

    <p v-else class="text-gray-500">El carrito está vacío</p>

    <!-- Modal de Pago Simulado -->
    <div v-if="mostrarModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Simulación de Pago</h2>
        <p>Ingresa los datos de tu tarjeta (simulado)</p>
        <input type="text" placeholder="Número de tarjeta" class="border p-2 w-full rounded mb-2" />
        <input type="text" placeholder="Nombre en tarjeta" class="border p-2 w-full rounded mb-2" />
        <input type="text" placeholder="Fecha / CVV" class="border p-2 w-full rounded mb-4" />

        <div class="flex justify-end gap-2">
          <button @click="cerrarModal" class="px-4 py-2 border rounded hover:bg-gray-100">Cancelar</button>
          <button @click="procesarPago" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Pagar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importamos jsPDF
import jsPDF from "jspdf";

export default {
  data() {
    return {
      carrito: [],
      mostrarModal: false, // controla visibilidad del modal
    };
  },
  mounted() {
    // Cargamos carrito desde localStorage si existe
    const carritoLS = localStorage.getItem('carrito');
    if (carritoLS) {
      this.carrito = JSON.parse(carritoLS);
    }
  },
  methods: {
    aumentar(index) {
      this.carrito[index].cantidad++;
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
    disminuir(index) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad--;
      } else {
        this.carrito.splice(index, 1);
      }
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
    abrirModal() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    procesarPago() {
      // Simula un pago
      alert("Pago realizado (simulado)");

      // Generamos PDF de la factura
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Factura de Compra", 14, 22);
      doc.setFontSize(12);
      let y = 40;
      this.carrito.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.title} - $${item.price} x ${item.cantidad}`, 14, y);
        y += 10;
      });
      doc.text(`Total: $${this.total}`, 14, y + 10);
      doc.save("factura.pdf");

      // Limpiamos carrito
      this.carrito = [];
      localStorage.removeItem('carrito');
      this.cerrarModal();
    }
  },
  computed: {
    total() {
      return this.carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0).toFixed(2);
    }
  }
};
</script>

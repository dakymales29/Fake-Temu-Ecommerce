<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
    <!-- Fondo decorativo -->
    <div class="absolute inset-0">
      <img src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80" 
           alt="fondo" 
           class="w-full h-full object-cover opacity-30"/>
    </div>

    <!-- Formulario -->
    <div class="relative z-10 max-w-sm w-full bg-white rounded-2xl shadow-xl p-8">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h1>

      <input type="email" v-model="email" placeholder="Correo electrónico" 
             class="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>

      <input type="password" v-model="password" placeholder="Contraseña" 
             class="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>

      <button @click="login" :disabled="cargando" 
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 mb-3">
        {{ cargando ? "INICIANDO..." : "LOGIN" }}
      </button>

      <p v-if="mensaje" class="text-red-500 text-center font-medium mt-2">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script>
export default{
    data(){
        return{
            // ingreso de credenciales
            email:"",
            password:"",
            //mensaje
            mensaje:"",
            //cargando para boton
            cargando:false
        }
    },
    methods:{
        async login(){
            //validamos campos vacios
            if(!this.email || !this.password){
                return alert("NO SE PERMITEN CAMPOS VACIOS");
            }
            //cargando y mensaje
            this.cargando = true
            try {
                //conexion a la api
                const conexion = await fetch("https://fakestoreapi.com/users")
                //validamos la conexion
                if(!conexion.ok) throw new Error("ERROR DE CONEXION A LA API")
                //transformamos los datos en formato json
                const datos = await conexion.json()

                //buscar usuario con username y password
                const user = datos.find(u => u.email === this.email && u.password === this.password)
                if(!user) throw new Error("Credenciales incorrectas")

                //GUARDAR TOKEN FALSO (sirve para proteger las rutas)
                localStorage.setItem("token","faketoken123")
                localStorage.setItem("user",JSON.stringify(user))
                //redirigimos
                this.$router.push("/admin");
            } catch (error) {
                this.mensaje = `ERROR : ${error.message}`;
            } finally{
                this.cargando = false;
            }
        }
    }
}
</script>

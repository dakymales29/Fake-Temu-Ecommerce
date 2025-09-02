<template>
          <h1 class="text-3xl font-extralight text-center p-10">CREAR</h1>
          <plantillaCrear @crear-producto="crearProducto" :cargando="cargando"/>
          <p v-if="mensaje">{{ mensaje }}</p>
</template>
<script>
import plantillaCrear from './hijoCrear.vue';
export default {
    
    data(){
        return{
            //bloquear boton al enviar 
            cargando:false,
            //mensaje
            mensaje:""
        }
    },
    methods:{
        async crearProducto(datos){
            this.cargando = true
            try {
                //conexion a la api
                const conexion = await fetch("https://fakestoreapi.com/products",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                        title: datos.title,
                        price:datos.price,
                        category:datos.category
                    })
                })
                //validamos la conexion
                if(!conexion.ok) throw new Error("ERROR AL CONECTAR A LA API")
                //mensaje
            this.mensaje = "PRODUCTO CREADO" 
            //limpamos mensaje despues de 3 segundos
            setTimeout(() => this.mensaje = "", 3000);              
                
            } catch (error) {
                this.mensaje = `ERROR ${error.message}`;
                
            }finally{
                this.cargando = false;
            }

        }
    },
    components:{
        plantillaCrear
    }
}
</script>
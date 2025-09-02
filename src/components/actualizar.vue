<template>
      <h1 class="text-3xl font-extralight text-center p-10">ACTUALIZAR</h1>
      <actualizarProductos @actualizar-producto = "actualizarTienda" :cargando="cargando"/>
      <p v-if="mensaje">{{ mensaje }}</p>
</template>

<script>
import actualizarProductos from './hijoActualizar.vue';
export default{
    data(){
        return{
            //aniamcion de boton 
            cargando: false,
            //mensaje
            mensaje:""

        }
    },
    methods:{
        async actualizarTienda(datos){
            this.cargando = true
            try {
                //conexion a la api
                const conexion = await fetch(`https://fakestoreapi.com/products/${datos.id}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                        title: datos.title,
                        price:datos.price,
                        category: datos.category
                    })
                })
                //valimos conexion
                if(!conexion.ok) throw new Error("ERROR AL CONECTAR A LA API")
                //mensaje
            this.mensaje= "PRODUCTO ACTUALIZADO"
            //limpiamos mensaje leuego de 3 segundos
            setTimeout(()=>this.mensaje = "",3000);
                


                
            } catch (error) {
                this.mensaje =`ERROR ${error.message}`;
                
            }finally{
                this.cargando = false
            }

        }
    } ,
    components:{
        actualizarProductos
    }
}
</script>
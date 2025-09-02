<template>
    <div>
    <input v-model="titulo" type="text" placeholder="titulo">
    <input v-model="precio" type="text" placeholder="precio">
    <input v-model="categoria" type="text" placeholder="categoria">
    <button @click="enviarDatos" :disabled="cargando">{{cargando? "CREANDO..." : "CREAR"}}</button>
</div>


</template>

<script>
export default{
    //para animaciond de boton creo un prop
    props:{
        cargando:{
            type:Boolean,
            default: false
        }
    },
    data(){
        return{
            titulo:"",
            precio:"",
            categoria:""
        }
    },
    methods:{
        enviarDatos(){
            //validamos campos vacios
            if(!this.titulo || !this.precio || !this.categoria){
                return alert("NO SE PERMITEN CAMPOS VACIOS");
            }
            //$emit
            this.$emit("crear-producto",{
                title: this.titulo,
                price: parseInt(this.precio),
                category: this.categoria
            })
            //limpiamos los inputs
            this.titulo ="";
            this.precio ="";
            this.categoria="";
        }
    }
}

</script>

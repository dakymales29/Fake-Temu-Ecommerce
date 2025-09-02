<template>
    <div>
        <input type="text" v-model="id" placeholder="id">
        <input type="text" v-model="titulo" placeholder="titulo">
        <input type="text" v-model="precio" placeholder="precio">
        <input type="text" v-model="categoria" placeholder="categoria">
        <button @click="actualizarProducto" :disabled="cargando">{{cargando ? "ACTUALIZANDO.." : "ACTUALIZAR"}}</button>
    </div>

</template>

<script>
import { boolean } from 'mathjs';

export default{
    //animacion de carga en el boton
    props:{
        cargando:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            id:"",
            titulo:"",
            precio:"",
            categoria:""
        }
    },
    methods:{
        actualizarProducto(){
            //campos vacios
            if(!this.id||!this.titulo||!this.precio||!this.categoria){
                return alert("No se permiten campos vacios");
            }
            this.$emit('actualizar-producto',{
                id:parseInt(this.id),
                title:this.titulo,
                price:parseInt(this.precio),
                category: this.categoria
            })
            //limpiamos inputs
            this.id = "";
            this.titulo="";
            this.precio="";
            this.categoria="";
        }
    }

    }

</script>
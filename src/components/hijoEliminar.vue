<template>
    <input type="text" v-model="id" placeholder="id"/>
    <button @click="eliminarProducto" :disabled="cargando">{{ cargando ? "ELIMINANDO...":"ELIMINAR" }}</button>
</template>
<script>
export default{
    props:{
        cargando:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            id:""
        }
    },
    methods:{
        eliminarProducto(){
            //validamos campos vacios
            if(!this.id){
                return alert("NO SE PERMITEN CAMPOS VACIOS");
            }

            this.$emit('eliminar-producto',{
                id:parseInt(this.id)
            })

            //limpiamos inputs
            this.id="";
        }
    }
}
</script>
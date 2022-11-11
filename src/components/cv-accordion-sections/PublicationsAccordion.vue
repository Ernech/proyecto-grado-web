<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Publicaciones</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="content" v-if="isOpen">
            <table v-if="jobCallStore.getPublications.length>0">
            <thead>
                <tr>
                    <th>Título del libro o publicación</th>
                    <th>Lugar de publicación</th>
                    <th>Tipo</th>
                    <th class="data_date">Fecha</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.getPublications" :key="index">
                    <td>{{item.title}}</td>
                    <td>{{item.location}}</td>
                    <td>{{item.dataClass}}</td>
                    <td>{{item.dataDate}}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>No existe información</p>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import { useJobCallStore } from '../../store/job-call';
const isOpen=ref(false)
const jobCallStore = useJobCallStore()
const changeAccordeonStatus=()=>{
    if(isOpen.value){
        isOpen.value=false
        return
    }
    isOpen.value=true
}
</script>
<style lang="scss" scoped>
@import '../../styles/accordion.scss';
</style>
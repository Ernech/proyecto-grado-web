<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Formación Académica</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="content" v-if="isOpen">
            <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Universidad/centro/instituto</th>
                    <th>Grado</th>
                    <th>Titulo 1</th>
                    <th>Titulo 2</th>
                    <th class="data_date">Fecha de titulación</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.getAcademicTrainings" :key="index">

                    <td>{{item.title}}</td>
                    <td>{{item.institution}}</td>
                    <td>{{item.degree}}</td>
                    <td>{{item.professionalTitleFile}}</td>
                    <td>{{item.professionalNTitleFile}}</td>
                    <td>{{item.degreeDate}}</td>
                </tr>


            </tbody>
        </table>    
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
@import '../../styles/tables.scss';
</style>
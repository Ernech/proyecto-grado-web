<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Experiencia profesional</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="professional-info-content" v-if="isOpen">
            <DataInfo :dataType="'Año en que empezó a ejercer su profesión'" :dataInfo="`${jobCallStore.applyPersonalData.professionalStartYear}`"/>
            <table v-if="jobCallStore.getJobExperiences.length>0">
            <thead>
                <tr>
                    <th>Lugar de trabajo</th>
                    <th>Cargo</th>
                    <th class="start-date-column">Desde</th>
                    <th class="finish-date-column">Hasta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.getJobExperiences" :key="index">
                    <td>{{item.institution}}</td>
                    <td>{{item.position}}</td>
                    <td>{{item.startDate}}</td>
                    <td>{{item.finishDate}}</td>
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
import DataInfo from './data-info/DataInfo.vue';
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
<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Experiencia docente</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="teaching-experience-content" v-if="isOpen">
            <div class="teaching-container" v-if="jobCallStore.getTeachingExperiences.length>0">
                <DataInfoVue :dataType="'Diplomado den educación superior (Universidad)'" :dataInfo="`${jobCallStore.applyPersonalData.teachingTitleFileInstitution}`"/>
                <DownloadFile v-if="(jobCallStore.applyPersonalData.teachingTitleFile && jobCallStore.applyPersonalData.teachingTitleFileName!='--')" 
                :dataType="'Dipomado en educación superior'" :dataInfo="jobCallStore.applyPersonalData.teachingTitleFileName"/>
                <DataInfoVue v-else :dataType="'Diplomado den educación superior'" :dataInfo="'No exite archivo adjunto'"/>
                <DataInfoVue :dataType="'Año en que empezó a dar clases (en general)'" :dataInfo="`${jobCallStore.applyPersonalData.teachingStartYear}`"/>
                <DataInfoVue :dataType="'Año en que empezó a dar clases en la UCB'" :dataInfo="`${jobCallStore.applyPersonalData.teachingUCBStartYear}`"/>
            </div>
            <table v-if="jobCallStore.getTeachingExperiences.length>0">
            <thead>
                <tr>
                    <th>Materia</th>
                    <th>Universidad</th>
                    <th class="start-date-column">Desde</th>
                    <th class="finish-date-column">Hasta</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.getTeachingExperiences" :key="index">
                    <td>{{item.title}}</td>
                    <td>{{item.institution}}</td>
                    <td>{{item.startDate}}</td>
                    <td>{{item.finishDate}}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>No exixte información</p>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import { useJobCallStore } from '../../store/job-call';
import DataInfoVue from './data-info/DataInfo.vue';
import DownloadFile from './data-info/DownloadFile.vue';
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
.teaching-container{
    display: grid;
    grid-template-columns:  repeat(2,50%);
    grid-template-rows: 2fr;
    gap: 25px;
    margin: 10px;
}
</style>
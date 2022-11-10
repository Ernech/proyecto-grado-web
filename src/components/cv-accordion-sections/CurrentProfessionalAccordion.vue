<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Datos profesionales actuales</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="personal-data-content" v-if="isOpen">
            <div class="grid-container-1">
                <DataInfo :dataType="'Nombre de la entidad donde trabaja'" :dataInfo="'AssureSoft'"/>
                <DataInfo :dataType="'Ocupación/cargo'" :dataInfo="'Desarrolador'"/>
                <DataInfo :dataType="'Fecha de incorporación'" :dataInfo="'10-12-2021'"/>
            </div>
            <div class="grid-container-2">
                <DataInfo :dataType="'Teléfono oficina'" :dataInfo="'2785641'"/>
                <DataInfo :dataType="'Dirección del trabajo'" :dataInfo="'Calle 13 calacoto av. Ballivian'"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import { useJobCallStore } from '../../store/job-call';
import DataInfo from './data-info/DataInfo.vue'
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
.grid-container-1{
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns:  45% 20% 20%;
    row-gap: 5px;
}
.grid-container-2{
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 20% 60%;
    row-gap: 5px;
}
</style>
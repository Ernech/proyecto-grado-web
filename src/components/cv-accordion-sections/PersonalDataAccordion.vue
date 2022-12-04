<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Datos Personales</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="personal-data-content" v-if="isOpen">
            <div class="grid-container">
                <DataInfo :dataType="'Nombre Completo'" :dataInfo="`${jobCallStore.applyPersonalData.name} ${jobCallStore.applyPersonalData.firstLastName} ${jobCallStore.applyPersonalData.secondLastName}`"/>
                <DataInfo :dataType="'Documento de identidad'" :dataInfo="`${jobCallStore.applyPersonalData.idType} ${jobCallStore.applyPersonalData.personalIdNumber} ${jobCallStore.applyPersonalData.issued}`"/>
                <DataInfo :dataType="'Estado civil'" :dataInfo="`${jobCallStore.applyPersonalData.civilStatus}`"/>
                <DataInfo :dataType="'Género'" :dataInfo="`${jobCallStore.applyPersonalData.gender}`"/>
                <DataInfo :dataType="'Apellido de casada'" :dataInfo="`${jobCallStore.applyPersonalData.marriedLastName}`"/>
                <DataInfo :dataType="'Fecha de nacimiento'" :dataInfo="`${jobCallStore.applyPersonalData.birthDate}`"/>
                <DataInfo :dataType="'Lugar de nacimmiento'" :dataInfo="`${jobCallStore.applyPersonalData.placeOfBirth}`"/>
                <DataInfo :dataType="'Nacionalidad'" :dataInfo="`${jobCallStore.applyPersonalData.nationality}`"/>
                <DownloadFile v-if="(jobCallStore.applyPersonalData.personalIdFile && jobCallStore.applyPersonalData.personalIdFileName!='--')" 
                :dataType="'Fotocopia de carnet'" :dataInfo="jobCallStore.applyPersonalData.personalIdFileName"/>
                <DataInfo v-else :dataType="'Fotocopia de carnet'" :dataInfo="'No hay archivo adjunto'"/>
            </div>
            <div class="grid-container-2">
                <DataInfo :dataType="'Dirección domicilio'" :dataInfo="`${jobCallStore.applyPersonalData.address}`"/>
                <DataInfo :dataType="'Zona'" :dataInfo="`${jobCallStore.applyPersonalData.zone}`"/>
                <DataInfo :dataType="'AFP'" :dataInfo="`${jobCallStore.applyPersonalData.afp}`"/>
                <DataInfo :dataType="'Número de registro CUA'" :dataInfo="`${jobCallStore.applyPersonalData.cuaNumber}`"/>
            </div>
            <div class="grid-container-3">
                <DataInfo :dataType="'Teléfono domicilio'" :dataInfo="`${jobCallStore.applyPersonalData.homePhone}`"/>
                <DataInfo :dataType="'Teléfono celular'" :dataInfo="`${jobCallStore.applyPersonalData.cellPhone}`"/>
                <DataInfo :dataType="'Correo electrónico'" :dataInfo="`${jobCallStore.applyPersonalData.email}`"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import { useJobCallStore } from '../../store/job-call';
import DataInfo from './data-info/DataInfo.vue';
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
.grid-container{
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2,1fr);
    grid-template-columns: repeat(5,20%);
    row-gap: 15px;
    margin-bottom: 10px;
}
.grid-container-2{
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2,1fr);
    grid-template-columns: 50% 20%;
    row-gap: 5px;
    margin-bottom: 10px;
}
.grid-container-3{
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3,30%);
    row-gap: 5px;

}
</style>
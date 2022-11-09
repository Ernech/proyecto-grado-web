<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Datos Personales</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="personal-data-content" v-if="isOpen">
            <div class="grid-container">
                <DataInfo :dataType="'Nombre Completo'" :dataInfo="'Ernesto Vilela Montero'"/>
                <DataInfo :dataType="'Documento de identidad'" :dataInfo="'C.I. 6156547 LP'"/>
                <DataInfo :dataType="'Estado civil'" :dataInfo="'Soltero'"/>
                <DataInfo :dataType="'Género'" :dataInfo="'Masculino'"/>
                <DataInfo :dataType="'Apellido de casada'" :dataInfo="'--'"/>
                <DataInfo :dataType="'Fecha de nacimiento'" :dataInfo="'05-09-1997'"/>
                <DataInfo :dataType="'Lugar de nacimmiento'" :dataInfo="'La Paz - Bolivia'"/>
                <DataInfo :dataType="'Nacionalidad'" :dataInfo="'Boliviano'"/>
                <DataInfo :dataType="'Fotocopia de carnet'" :dataInfo="'CI.pdf'"/>
            </div>
            <div class="grid-container-2">
                <DataInfo :dataType="'Dirección domicilio'" :dataInfo="'Calle 5 obrajes av. 14 de spetiembre #580'"/>
                <DataInfo :dataType="'Zona'" :dataInfo="'Obrajes'"/>
                <DataInfo :dataType="'AFP'" :dataInfo="'AFP Revición'"/>
                <DataInfo :dataType="'Número de registro CUA'" :dataInfo="'12547'"/>
            </div>
            <div class="grid-container-3">
                <DataInfo :dataType="'Teléfono domicilio'" :dataInfo="'2782348'"/>
                <DataInfo :dataType="'Teléfono celular'" :dataInfo="'77254698'"/>
                <DataInfo :dataType="'Correo electrónico'" :dataInfo="'ernech@gmail.com'"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import DataInfo from './data-info/DataInfo.vue'
const isOpen=ref(false)

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
    row-gap: 5px;
}
.grid-container-2{
    width: 100%;
    display: grid;
    grid-template-rows: repeat(2,1fr);
    grid-template-columns: 50% 20%;
    row-gap: 5px;
}
.grid-container-3{
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3,30%);
    row-gap: 5px;
}
</style>
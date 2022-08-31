<template>
    <div class="main">
        <h3 class="title">Convocatorias guardadas</h3>
        <JobCallCard jobCallName="ASISTENTE TÉCNICO DE MARKETING Y COMUNICACIÓN" jobCallNumber="06/2022" openingDate="24 de marzo de 2022"/>
        <JobCallCard jobCallName="ASISTENTE DE LABORATORIO" jobCallNumber="07/2022" openingDate="24 de abril de 2022"/>
        <JobCallCard jobCallName="AUXILIAR DE LABORATORIO" jobCallNumber="08/2022" openingDate="15 de mayo de 2022"/>
        <JobCallCard jobCallName="SECRETARIO PARA BILIOTECA" jobCallNumber="10/2022" openingDate="24 de junio de 2022"/>
    </div>
</template>
<script setup>
import JobCallCard from '../../components/job-call/JobCallCard.vue';

</script>
<style>
.main {
    padding: 10px 50px;
}

.title {
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-size: 40px;
    color: #064D90;
    margin: 0px;
}
</style>
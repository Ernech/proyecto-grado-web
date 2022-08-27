<template>
    <div class="general-info-section">
        <div class="form-input-container">
                <label for="name" class="form-label">Nombre del puesto</label>
                <input class="form-input" type="text" id="name" v-model="jobCallStore.jobCallName">
            </div>
        <div class="grid-container">
            <div class="form-input-container">
                <label for="manual" class="form-label">Manual de puesto</label>
                <input class="form-input" type="text" id="manual" v-model="jobCallStore.jobManualFile">
            </div>
            <div class="form-input-container">
                <label for="number-job-call" class="form-label">Número de convocatoria</label>
                <input class="form-input" type="text" id="number-job-call" v-model="jobCallStore.jobCallNumber">
            </div>
            <div class="form-input-container">
                <label for="opening-date" class="form-label">Fecha de apertura</label>
                <input class="form-input" type="datetime-local" id="opening-date" v-model="jobCallStore.openingDate">
            </div>
            <div class="form-input-container">
                <label for="closing-date" class="form-label">Fecha de cierre</label>
                <input class="form-input" type="datetime-local" id="closing-date" v-model="jobCallStore.closingDate">
            </div>
        </div>
        <div class="form-input-container">
            <label for="objective" class="form-label">Objetivo del cargo</label>
            <textarea class="form-input" type="text" id="objective" v-model="jobCallStore.jobCallObj"></textarea>
        </div>
    </div>
</template>
<script setup>
import {useJobCallStore} from '../../store/job-call'

const jobCallStore = useJobCallStore();

</script>
<style scoped>
.general-info-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 15px;
    margin-top: 25px;
}

.form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;

}

.form-input-container label {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
}

.form-input {
    width: 100%;
    height: 25px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 1fr);
    gap: 1%;
    row-gap: 15px;
}
.grid-container .form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 98%;

}

.form-input-container textarea {
    width: 98.5%;
    height: 50px;
    border-radius: 10px;
    padding: 10px 15px;
    font-size: 15px;

}
</style>
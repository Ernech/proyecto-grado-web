<template>
    <div class="general-info-section">
        <div class="form-input-container">
            <label for="name" class="form-label">Nombre del puesto</label>
            <input class="form-input" type="text" id="name" v-model.trim="jobCallStore.jobCallName" maxlength="300">
        </div>
        <div class="grid-container">

        <ChangeFile v-if="(jobCallStore.jobManualFile && jobCallStore.jobManualFileName!='--' && !changeJobManualFIle)" 
                :dataType="'Manual de puesto'" :dataInfo="jobCallStore.jobManualFileName" @edit="(changeJobManualFIle=true)"/>
                
            <div v-else class="form-input-container">
                <label for="manual" class="form-label">Manual de puesto (.docx)</label>
                <input type="file" class="upload-input" id="manual" ref="file" @change="selectFile" accept=".doc,.docx">
            </div>
            
            
            <div class="form-input-container">
                <label for="number-job-call" class="form-label">Número de convocatoria</label>
                <input class="form-input" type="text" id="number-job-call" v-model.trim="jobCallStore.jobCallNumber"
                    maxlength="100">
            </div>
            <div class="form-input-container">
                <label for="opening-date" class="form-label">Fecha de apertura</label>
                <input class="form-input" type="datetime-local" id="opening-date" v-model="jobCallStore.openingDate"/>
            </div>
            <div class="form-input-container">
                <label for="closing-date" class="form-label">Fecha de cierre</label>
                <input class="form-input" type="datetime-local" id="closing-date"
                    v-model.trim="jobCallStore.closingDate"/>
            </div>
        </div>
        <div class="form-input-container">
            <label for="objective" class="form-label">Objetivo del cargo</label>
            <textarea class="form-input" type="text" id="objective" v-model.trim="jobCallStore.jobCallObj"
                maxlength="400"></textarea>
        </div>
    </div>
</template>
<script setup>
import { ref,computed } from 'vue'
import { useJobCallStore } from '../../store/job-call'
import ChangeFile from '../cv-accordion-sections/data-info/ChangeFile.vue';
const file = ref(null)
const changeJobManualFIle = ref(false)
const jobCallStore = useJobCallStore();
const selectFile = () => {
    jobCallStore.jobManualFile= file.value.files[0];
    jobCallStore.jobManualFileName= file.value.files[0].name;
}

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

#name{
    text-transform: uppercase;
}
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 10px;
    row-gap: 15px;
}

.grid-container .form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 98%;

}

.upload-input {
    font-size: 15px;
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
    border: 2px solid #000;
    height: 31px;
    padding: 0px;
}
::-webkit-file-upload-button{
    height: 100%;
    border-radius: 5px ;
    background: #53C61D;
    color: #fff;
    border: none;
}
::-webkit-file-upload-button:hover{
    
    background: #53d71D;

}
.form-input-container textarea {
    width: 98.5%;
    height: 50px;
    border-radius: 10px;
    padding: 10px 15px;
    font-size: 15px;

}
</style>
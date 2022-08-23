<template>
    <div class="job-experience-section">
        <p>Experiencia laboral</p>
        <div class="form-input-container">
            <label for="function" class="form-label">Descripción</label>
            <input class="form-input" type="text" id="function" v-model.trim="description">
        </div>
        <div class="grid-input-section">
            <div class="form-input-container">
                <label for="function" class="form-label">Cantidad (Años)</label>
                <input class="form-input" type="number" id="function" v-model="years">
            </div>
            <div class="form-input-container">
                <label class="form-label">Requisito</label>
                <select class="form-input" v-model="requirement">
                    <option>Indispensable</option>
                    <option>Deseable</option>
                </select>
            </div>
            <div class="form-input-container">
                <label class="form-label">Tipo</label>
                <select class="form-input" v-model="type">
                    <option>General</option>
                    <option>Específica</option>
                </select>
            </div>
        </div>
        <button class="job-call-form__add_button" @click="addJobExperience">Agregar experiencia laboral</button>
        <table>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Requisito</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="item in jobCallStore.experiences" :key="item.description">
                    <td>{{item.description}}</td>
                    <td>Mayor igual a {{item.yearsOfExperience}} años</td>
                    <td>{{item.requirement}}</td>
                    <td>{{item.type}}</td>
                    <td>
                        <fa icon="fa-solid fa-pen" />
                        <fa icon="fa-solid fa-trash" />
                    </td>
                </tr>
              


            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useJobCallStore } from '../../store/job-call'
const description = ref('');
const years = ref(0);
const requirement = ref('Seleccione requisito')
const type = ref('Seleccione el tipo')
const jobCallStore = useJobCallStore()
const addJobExperience = () => {
    jobCallStore.experience = { description:description.value,yearsOfExperience: years.value, requirement: requirement.value, type: type.value }
    jobCallStore.experiences.push(jobCallStore.experience)
    description.value = ''
    years.value = 0
    jobCallStore.experience = { description:'', yearsOfExperience: 0, requirement: '', type: '' }
}



</script>
<style scoped>
.job-experience-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 20px;
}

.job-experience-section p {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
    margin-top: 15px;
    margin-bottom: 0px;
}

.form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;

}

.form-input {
    width: 100%;
    height: 25px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}

.grid-input-section {
    display: grid;
    grid-template-columns: repeat(3, 33%);
    grid-template-rows: 1fr;
    gap: 2%;
}

.grid-input-section .form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 90%;

}

.form-input-container label {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;

}

.job-call-form__add_button {
    background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #0094FF;
    width: 25%;
    font-family: 'Nunito', sans-serif;
}
</style>
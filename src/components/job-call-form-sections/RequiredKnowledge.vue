<template>
    <div class="required-kwowledge-section">
        <p>Conocimientos requeridos</p>
        <div class="form-input-container">
            <label for="description" class="form-label">Descripción</label>
            <input class="form-input" type="text" id="description" v-model="description">
        </div>
        <div class="grid-input-section">
            <div class="form-input-container">
                <label class="form-label">Requisito</label>
                <select class="form-input" v-model="required">
                    <option>Indispensable</option>
                    <option>Deseable</option>
                </select>
            </div>
            <div class="form-input-container">
                <label class="form-label">Nivel requerido</label>
                <select class="form-input" v-model="requiredLevel">
                    <option>Básico</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                </select>
            </div>
        </div>
        <button class="job-call-form__add_button" @click="addRequiredKnowledge">Agregar conocimiento requerido</button>
        <table>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Nivel requerido</th>
                    <th>Requisito</th>
                    <th>Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="item in jobCallStore.requiredKnowledgeArray" :key="item.description">
                    <td>{{item.description}}</td>
                    <td>{{item.requiredLevel}}</td>
                    <td>{{item.required}}</td>
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
const required = ref('');
const requiredLevel = ref('');
const jobCallStore = useJobCallStore()
const addRequiredKnowledge = () => {

    jobCallStore.requiredKnowledge = { description: description.value, requiredLevel: requiredLevel.value, required: required.value }
    jobCallStore.requiredKnowledgeArray.push(jobCallStore.requiredKnowledge);
    description.value = '';
    required.value = '';
    requiredLevel.value = '';
    jobCallStore.requiredKnowledge = { description: '', requiredLevel: '', required: '' }
} 
</script>
<style scoped>
.required-kwowledge-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 20px;
}

.required-kwowledge-section p {
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
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 1fr;
    gap: 1.5%;
}

.grid-input-section .form-input-container {
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
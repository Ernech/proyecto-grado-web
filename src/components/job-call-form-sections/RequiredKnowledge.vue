<template>
    <div class="required-kwowledge-section">
        <SectionTitle title="Conocimientos requeridos" />
        <div class="form-input-container">
            <label for="description" class="form-label">Descripción</label>
            <input class="form-input" type="text" id="description" v-model.trim="description" maxlength="300">
        </div>
        <div class="grid-input-section">
            <div class="form-input-container">
                <label class="form-label">Requisito</label>
                <select class="form-input" v-model.trim="required">
                    <option disabled>Elija una opción...</option>
                    <option>Indispensable</option>
                    <option>Deseable</option>
                </select>
            </div>
            <div class="form-input-container">
                <label class="form-label">Nivel requerido</label>
                <select class="form-input" v-model.trim="requiredLevel">
                    <option disabled>Elija una opción...</option>
                    <option>Básico</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                </select>
            </div>
        </div>
        <button v-if="!editRequiredKnowledge" class="job-call-form__add_button" @click="addRequiredKnowledge"
            :disabled="isDisabled" :class="{ disabled: isDisabled }">Agregar conocimiento requerido</button>
        <button v-else class="job-call-form__add_button" @click="editKnowledge" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Modificar conocimiento requerido</button>
        <table>
            <thead>
                <tr>
                    <th class="description-column">Descripción</th>
                    <th>Nivel requerido</th>
                    <th>Requisito</th>
                    <th class="actions-column">Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.requiredKnowledgeArray">
                    <td>{{  item.description  }}</td>
                    <td>{{  item.requiredLevel  }}</td>
                    <td>{{  item.required  }}</td>
                    <td class="actions-cell">
                        <fa class="edit-icon" icon="fa-solid fa-pen" @click="getRequiredKnowledge(item, index)" />
                        <fa class="delete-icon" icon="fa-solid fa-trash" @click="deleteRequiredKnowledge(index)" />
                    </td>
                </tr>


            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useJobCallStore } from '../../store/job-call'
import SectionTitle from './SectionTitle.vue';
const description = ref('');
const required = ref('Elija una opción...');
const requiredLevel = ref('Elija una opción...');
const editRequiredKnowledge = ref(false)
const editIndexList = ref(-1)
const jobCallStore = useJobCallStore()
const addRequiredKnowledge = () => {

    jobCallStore.requiredKnowledge = { description: description.value, requiredLevel: requiredLevel.value, required: required.value }
    jobCallStore.requiredKnowledgeArray.push(jobCallStore.requiredKnowledge);
    description.value = '';
    required.value = 'Elija una opción...';
    requiredLevel.value = 'Elija una opción...';
    jobCallStore.requiredKnowledge = { description: '', requiredLevel: '', required: '' }
}

const isDisabled = computed(() => {
    if (description.value === '' || description.value === null || required.value === 'Elija una opción...' || requiredLevel.value === 'Elija una opción...') {
        return true
    }
    return false
})

const getRequiredKnowledge = (currentRequiredExperience, index) => {
    description.value = currentRequiredExperience.description
    required.value = currentRequiredExperience.required
    requiredLevel.value = currentRequiredExperience.requiredLevel
    editIndexList.value = index
    editRequiredKnowledge.value = true
}


const editKnowledge = () => {
    if (editIndexList.value > -1) {
        jobCallStore.requiredKnowledgeArray[editIndexList.value].description = description.value
        jobCallStore.requiredKnowledgeArray[editIndexList.value].required = required.value
        jobCallStore.requiredKnowledgeArray[editIndexList.value].requiredLevel = requiredLevel.value
        resetValues()
    }
}

const deleteRequiredKnowledge = (index) => {
    jobCallStore.requiredKnowledgeArray.splice(index, 1)
    resetValues()
}

const resetValues = () => {
    editIndexList.value = -1
    description.value = '';
    required.value = 'Elija una opción...';
    requiredLevel.value = 'Elija una opción...';
    editRequiredKnowledge.value = false
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

.form-input-container select {
    height: 30px;
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

.job-call-form__add_button.disabled {
    background-color: #b7b8b9;
    border-color: #b7b8b9;
}

.edit-icon {
    color: #5686E1;
    width: 14px;
    height: 20px;
}

.delete-icon {
    color: #EB3223;
    width: 14px;
    height: 20px;
}

table,
th,
td {
    border: 1px solid #B9B9B9;
    border-collapse: collapse;
    font-family: 'Inter';
    font-size: 13px;
    padding: 5px 3px;
}

thead {

    background-color: #0B0273;
    color: #FFFFFF;
}

.actions-column {
    margin: auto;
    width: 10%;
}

.description-column {
    width: 60%;
}

.actions-cell {
    text-align: center;
}
</style>
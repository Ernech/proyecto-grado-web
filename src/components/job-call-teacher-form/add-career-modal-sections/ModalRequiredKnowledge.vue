<template>
    <div class="required-knowledge-section">
        <ModalSectionTitle title="Conocimientos requeridos" />
        <div class="inputs-container">
            <div class="form-input-container">
                <label for="required-knowledge" class="form-label">Conocimiento requerido</label>
                <input class="form-input" type="text" id="required-knowledge" v-model.trim="description"
                    maxlength="300">
            </div>
        </div>
        <button v-if="!editRequiredKnowledge" class="job-call-form__add_button" @click="addAcademicTraining"
            :disabled="isDisabled" :class="{ disabled: isDisabled }">Agregar conocimeinto requerido</button>
        <button v-else class="job-call-form__add_button" @click="editTraining" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Modificar conocimeinto requerido</button>
        <table>
            <thead>
                <tr>
                    <th class="description-column">Formación</th>
                    <th class="actions-column">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.requiredKnowledgeArray">
                    <td>{{ item.description }}</td>
                    <td class="actions-cell">
                        <fa class="edit-icon" icon="fa-solid fa-pen"
                            @click="getAcademicTraining(item.description, index)" />
                        <fa class="delete-icon" icon="fa-solid fa-trash" @click="deleteAcademicTraining(index)" />
                    </td>
                </tr>


            </tbody>
        </table>
    </div>

</template>
<script setup>
import { ref, computed } from 'vue'
import { useTeacherJobCallStore } from '../../../store/teacher-job-call'
import ModalSectionTitle from './ModalSectionTitle.vue';
const requirementType=ref('REQUIRED_KNOWLEDGE')
const description = ref('');
const jobCallStore = useTeacherJobCallStore();
const editRequiredKnowledge = ref(false)
const editIndexList = ref(-1)

const addAcademicTraining = () => {
    const newRequirement = {requirementType:requirementType.value, description: description.value }
    jobCallStore.requiredKnowledgeArray.push(newRequirement)

    resetValues()
}
const isDisabled = computed(() => {
    if (description.value === null || description.value === '') {
        return true
    }
    return false;
})

const getAcademicTraining = (requiredKnowledgeEdit, index) => {
    editRequiredKnowledge.value = true
    description.value = requiredKnowledgeEdit
    editIndexList.value = index
}

const editTraining = () => {

    if (editIndexList.value > -1) {
        jobCallStore.requiredKnowledgeArray[editIndexList.value].description = description.value
        resetValues()
    }
}
const deleteAcademicTraining = (index) => {
    if (index > -1) {
        jobCallStore.requiredKnowledgeArray.splice(index, 1)
        resetValues()
    }
}
const resetValues = () => {
    editRequiredKnowledge.value = false
    description.value = ''
    editIndexList.value = -1
}
</script>
<style scoped>
.inputs-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 15px;
}

.required-knowledge-section {
    display: flex;
    flex-direction: column;
    width: 95%;
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

.form-input-container label {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
}
.form-input-container select {
   height: 35px;
}

.form-input {
    width: 100%;
    height: 25px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
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
    margin: 2px;

}

.delete-icon {
    color: #EB3223;
    width: 14px;
    height: 20px;
    margin: 2px;

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

.actions-cell {
    text-align: center;
}
.description-column{
    width: 65%;
}
</style>
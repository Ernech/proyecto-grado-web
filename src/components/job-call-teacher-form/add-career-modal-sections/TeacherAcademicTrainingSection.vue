<template>
    <div class="academic-training-section">
        <ModalSectionTitle title="Formación académica" />
        <div class="inputs-container">
            <div class="form-input-container">
                <label for="academic-training" class="form-label">Formación</label>
                <input class="form-input" type="text" id="academic-training" v-model.trim="academicTraining"
                    maxlength="300">
            </div>
            <div class="form-input-container">
                <label class="form-label">Requisito</label>
                <select class="form-input" v-model="desiredLevel">
                    <option disabled>Elija una opción...</option>
                    <option>Indispensable</option>
                    <option>Deseable</option>
                    <option>Ninguno</option>
                </select>
            </div>
        </div>

        <button v-if="!editAcademicTraining" class="job-call-form__add_button" @click="addAcademicTraining"
            :disabled="isDisabled" :class="{ disabled: isDisabled }">Agregar formación requerida</button>
        <button v-else class="job-call-form__add_button" @click="editTraining" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Modificar formación requerida</button>


        <table>
            <thead>
                <tr>
                    <th class="description-column">Formación</th>
                    <th>Requisito</th>
                    <th class="actions-column">Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.academicTrainings">
                    <td>{{ item.description }}</td>
                    <td>{{ item.desiredLevel }}</td>
                    <td class="actions-cell">
                        <fa class="edit-icon" icon="fa-solid fa-pen"
                            @click="getAcademicTraining(item, index)" />
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
const dataType= ref('ACADEMIC_TRAINING')
const academicTraining = ref('');
const desiredLevel = ref('Elija una opción...');
const jobCallStore = useTeacherJobCallStore();
const editAcademicTraining = ref(false)
const editIndexList = ref(-1)

const addAcademicTraining = () => {
    const newAcademicTraining = {requirementType:dataType.value, description: academicTraining.value,desiredLevel:desiredLevel.value }
    jobCallStore.academicTrainings.push(newAcademicTraining)

    resetValues()
}
const isDisabled = computed(() => {
    if (academicTraining.value === null || academicTraining.value === '' || desiredLevel.value==='Elija una opción...') {
        return true
    }
    return false;
})

const getAcademicTraining = (academicTrainingEdit, index) => {
    editAcademicTraining.value = true
    academicTraining.value = academicTrainingEdit.description
    desiredLevel.value=academicTrainingEdit.desiredLevel
    editIndexList.value = index
}

const editTraining = () => {

    if (editIndexList.value > -1) {
        jobCallStore.academicTrainings[editIndexList.value].description = academicTraining.value
        jobCallStore.academicTrainings[editIndexList.value].desiredLevel = desiredLevel.value
        resetValues()
    }
}
const deleteAcademicTraining = (index) => {
    if (index > -1) {
        jobCallStore.academicTrainings.splice(index, 1)
        resetValues()
    }
}
const resetValues = () => {
    editAcademicTraining.value = false
    academicTraining.value = ''
    desiredLevel.value='Elija una opción...'
    editIndexList.value = -1
}
</script>
<style scoped>
.inputs-container {
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: 1fr;
    width: 100%;
    column-gap: 20px;
    align-items: center;
    justify-content: center;
}

.academic-training-section {
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
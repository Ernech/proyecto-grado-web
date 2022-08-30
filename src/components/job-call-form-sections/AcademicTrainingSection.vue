<template>
    <div class="academic-training-section">
        <SectionTitle title="Formación académica" />
        <div class="form-input-container">
            <label for="academic-training" class="form-label">Formación</label>
            <input class="form-input" type="text" id="academic-training" v-model.trim="academicTraining" maxlength="300">
        </div>
        <button v-if="!editAcademicTraining" class="job-call-form__add_button" @click="addAcademicTraining"
            :disabled="isDisabled" :class="{ disabled: isDisabled }">Agregar formación requerida</button>
        <button v-else class="job-call-form__add_button" @click="editTraining" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Modificar formación requerida</button>


        <table>
            <thead>
                <tr>
                    <th>Formación</th>
                    <th class="actions-column">Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.academicTrainings">
                    <td>{{ item.training }}</td>
                    <td class="actions-cell">
                        <fa class="edit-icon" icon="fa-solid fa-pen"
                            @click="getAcademicTraining(item.training, index)" />
                        <fa class="delete-icon" icon="fa-solid fa-trash" @click="deleteAcademicTraining(index)"/>
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
const academicTraining = ref('');
const jobCallStore = useJobCallStore();
const editAcademicTraining = ref(false)
const editIndexList = ref(-1)

const addAcademicTraining = () => {
    jobCallStore.training = { training: academicTraining.value }
    jobCallStore.academicTrainings.push(jobCallStore.training)
    jobCallStore.training = { training: '' }
    academicTraining.value = '';
}
const isDisabled = computed(() => {
    if (academicTraining.value === null || academicTraining.value === '') {
        return true
    }
    return false;
})

const getAcademicTraining = (academicTrainingEdit, index) => {
    editAcademicTraining.value = true
    academicTraining.value = academicTrainingEdit
    editIndexList.value = index
}

const editTraining = () => {

    if (editIndexList.value > -1) {
        jobCallStore.academicTrainings[editIndexList.value].training = academicTraining.value
       resetValues()
    }
}
const deleteAcademicTraining = (index)=>{
    if(index>-1){
        jobCallStore.academicTrainings.splice(index,1)
        resetValues()
    }
}
const resetValues=()=>{
    editAcademicTraining.value = false
        academicTraining.value = ''
        editIndexList.value = -1
}
</script>
<style scoped>
.academic-training-section {
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
</style>
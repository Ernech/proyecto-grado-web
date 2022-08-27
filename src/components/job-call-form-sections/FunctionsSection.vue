<template>
    <div class="functions-section">
       <SectionTitle title="Funciones generales"/>
        <div class="form-input-container">
            <label for="function" class="form-label">Función</label>
            <input class="form-input" type="text" id="function" v-model="jobFunction">
        </div>
        <button v-if="!editFunction" class="job-call-form__add_button" @click="addJobFunction" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Agregar función</button>
        <button v-else class="job-call-form__add_button" @click="editJobFunction" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Modificar función</button>

        <table>
            <thead>
                <tr>
                    <th>Funcion</th>
                    <th class="actions-column">Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="item in jobCallStore.jobFunctions">

                    <td>{{ item.jobFunction }}</td>
                    <td class="actions-cell">
                        <fa class="edit-icon" icon="fa-solid fa-pen" @click="getJobFunction(item.jobFunction)" />
                        <fa class="delete-icon" icon="fa-solid fa-trash" />
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
const jobCallStore = useJobCallStore()
const jobFunction = ref('')
const editFunction = ref(false)
const oldJobFunction = ref('')
const addJobFunction = () => {
    jobCallStore.jobFunction = { jobFunction: jobFunction.value }
    jobCallStore.jobFunctions.push(jobCallStore.jobFunction)
    jobFunction.value = '';
    jobCallStore.jobFunction = { jobFunction: '' };
}

const isDisabled = computed(() => {
    if (jobFunction.value === null || jobFunction.value === '') {
        return true
    }
    return false;
})
const getJobFunction = (jobFunctionEdit) => {
    editFunction.value = true
    jobFunction.value = jobFunctionEdit
    oldJobFunction.value = jobFunction

}
const editJobFunction = () => {

}


</script>
<style scoped>
.functions-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 15px;
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
    width: 15%;
    font-family: 'Nunito', sans-serif;
}

.job-call-form__add_button.disabled {
    background-color: #b7b8b9;
    border-color: #b7b8b9;
}

.section-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 0px;
    margin-top: 40px;
}

.functions-section p {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
    margin-top: 15px;
    margin-bottom: 0px;
    font-weight: bold;
}
hr {
    border: 0;
    clear: both;
    width: 100%;
    background-color: #000;
    height: 1px;
   
    
}
.edit-icon {
    color: #5686E1;
    margin: 2px;
    width: 14px;
    height: 20px;
   

}

.delete-icon {
    color: #EB3223;
    margin: 2px;
    width: 14px;
    height: 20px;
  

}

table {
    width: 100%;
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
.actions-cell{
    text-align: center;
}
</style>
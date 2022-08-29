<template>
    <div class="aptitude-section">
        <SectionTitle title="Competencias requeridas" />
        <div class="form-input-container">
            <label for="function" class="form-label">Descripción</label>
            <input class="form-input" type="text" id="function" v-model.trim="description">
        </div>
        <div class="grid-input-section">
            <div class="form-input-container">
                <label class="form-label">Tipo de competencia</label>
                <select class="form-input" v-model.trim="aptitudeType">
                    <option disabled>Elija una opción...</option>
                    <option>Gestión</option>
                    <option>Interpersonales</option>
                    <option>Personales</option>
                </select>
            </div>
            <div class="form-input-container">
                <label class="form-label">Grado requerido</label>
                <select class="form-input" v-model.trim="desiredLevel">
                    <option disabled>Elija una opción...</option>
                    <option>Experto</option>
                    <option>Muy Hábil</option>
                    <option>Hábil</option>
                    <option>En desarrollo</option>
                </select>
            </div>
        </div>
        <button v-if="!editAptitude" class="job-call-form__add_button" @click="addAptitude" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Agregar Competencia</button>
        <button v-else class="job-call-form__add_button" @click="editApt" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Modifcar Competencia</button>
        <table>
            <thead>
                <tr>
                    <th class="description-column">Descripción</th>
                    <th>Tipo de competencia</th>
                    <th>Nivel requerido</th>
                    <th class="actions-column">Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item, index) in jobCallStore.aptitudes">
                    <td>{{ item.aptitude }}</td>
                    <td>{{ item.aptitudeType }}</td>
                    <td>{{ item.desiredLevel }}</td>
                    <td class="actions-cell">
                        <fa class="edit-icon" icon="fa-solid fa-pen" @click="getCurrentAptitude(item, index)" />
                        <fa class="delete-icon" icon="fa-solid fa-trash" @click="deleteAptitude(index)"/>
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
const desiredLevel = ref('Elija una opción...');
const aptitudeType = ref('Elija una opción...');
const editAptitude = ref(false)
const editListIndex = ref(-1)
const jobCallStore = useJobCallStore();

const addAptitude = () => {
    jobCallStore.aptitude = { aptitude: description.value, aptitudeType: aptitudeType.value, desiredLevel: desiredLevel.value }
    jobCallStore.aptitudes.push(jobCallStore.aptitude)
    description.value = ''
    desiredLevel.value = 'Elija una opción...'
    aptitudeType.value = 'Elija una opción...'
    jobCallStore.aptitude = { aptitude: '', aptitudeType: '', desiredLevel: '' }
}

const isDisabled = computed(() => {
    if (description.value === null || description.value === '' || desiredLevel.value === 'Elija una opción...' || aptitudeType.value === 'Elija una opción...') {
        return true
    }
    return false
})

const getCurrentAptitude = (currentAptitude, index) => {
    description.value = currentAptitude.aptitude
    desiredLevel.value = currentAptitude.desiredLevel
    aptitudeType.value = currentAptitude.aptitudeType
    editListIndex.value = index
    editAptitude.value = true
}

const editApt = () => {
    if (editListIndex.value > -1) {
        jobCallStore.aptitudes[editListIndex.value].aptitude = description.value
        jobCallStore.aptitudes[editListIndex.value].desiredLevel = desiredLevel.value
        jobCallStore.aptitudes[editListIndex.value].aptitudeType = aptitudeType.value
        description.value = ''
        desiredLevel.value = 'Elija una opción...'
        aptitudeType.value = 'Elija una opción...'
        editAptitude.value = false
    }
}

const deleteAptitude = (index)=>{
    jobCallStore.aptitudes.splice(index,1)
}
</script>
<style scoped>
.aptitude-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 20px;
}

.section-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 40px;
}

.aptitude-section p {
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
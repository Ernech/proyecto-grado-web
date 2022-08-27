<template>
    <div class="job-experience-section">
       <SectionTitle title="Experiencia laboral"/>

        <div class="form-input-container">
            <label for="function" class="form-label">Descripción</label>
            <input class="form-input" type="text" id="function" v-model.trim="description">
        </div>
        <div class="grid-input-section">
            <div class="form-input-container">
                <label for="function" class="form-label">Cantidad (Años)</label>
                <input class="form-input" type="number" min="1" id="function" v-model="years">
            </div>
            <div class="form-input-container">
                <label class="form-label">Requisito</label>
                <select class="form-input" v-model="requirement">
                    <option disabled>Escoja una opción...</option>
                    <option>Indispensable</option>
                    <option>Deseable</option>
                </select>
            </div>
            <div class="form-input-container">
                <label class="form-label">Tipo</label>
                <select class="form-input" v-model="type">
                    <option disabled>Escoja una opción...</option>
                    <option>General</option>
                    <option>Específica</option>
                </select>
            </div>
        </div>
        <button class="job-call-form__add_button" @click="addJobExperience" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Agregar experiencia laboral</button>
        <table>
            <thead>
                <tr>
                    <th class="description-column">Descripción</th>
                    <th>Cantidad</th>
                    <th>Requisito</th>
                    <th>Tipo</th>
                    <th class="actions-column">Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="item in jobCallStore.experiences" :key="item.description">
                    <td>{{ item.description }}</td>
                    <td>Mayor igual a {{ item.yearsOfExperience }} años</td>
                    <td>{{ item.requirement }}</td>
                    <td>{{ item.type }}</td>
                    <td>
                        <fa class="edit-icon" icon="fa-solid fa-pen" />
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
const description = ref('');
const years = ref(1);
const requirement = ref('Escoja una opción...')
const type = ref('Escoja una opción...')
const jobCallStore = useJobCallStore()
const addJobExperience = () => {
    jobCallStore.experience = { description: description.value, yearsOfExperience: years.value, requirement: requirement.value, type: type.value }
    jobCallStore.experiences.push(jobCallStore.experience)
    description.value = ''
    years.value = 0
    jobCallStore.experience = { description: '', yearsOfExperience: 0, requirement: '', type: '' }
}

const isDisabled = computed(() => {
    if ((description.value === '' || description.value === null) || years.value < 1 || requirement.value === 'Escoja una opción...' || type.value === 'Escoja una opción...') {
        return true
    }
    return false;
})


</script>
<style scoped>
.job-experience-section {
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
    width: 50%;
}
</style>
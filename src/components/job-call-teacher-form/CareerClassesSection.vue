<template>
    <div class="career-classes-section">
        <SectionTitle title="Materias" />
        <AddCareerClassModal v-show="showModal"  @close-modal="showModal = false"/>
        <button  class="classes-add_button" @click="openModal">Agregar Materia</button>
        <table>
            <thead>
                <tr>
                    
                    <th class="code-column">Sigla</th>
                    <th>Materia</th>
                    <th class="actions-column">Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item,index) in teacherJobCallsStore.collegeClasses" :key="index">
                   
                    <td>
                        {{item.code}}
                    </td>
                    <td>
                       {{item.name}}
                    </td>
                    <td class="actions-cell">
                        <fa class="edit-icon" icon="fa-solid fa-pen" />
                        <fa class="delete-icon" icon="fa-solid fa-trash" />
                    </td>
                </tr>

            </tbody>
        </table>
       
    </div>
</template>
<script setup>
import SectionTitle from '../job-call-form-sections/SectionTitle.vue';
import AddCareerClassModal from '../../components/job-call-teacher-form/AddCareerClassModal.vue'
import {ref} from 'vue'
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
const showModal = ref(false)
const teacherJobCallsStore = useTeacherJobCallStore()

const openModal=()=>{
    showModal.value=true
}
</script>

<style scoped>
.career-classes-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 20px;
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
    text-align: center;
}

thead {

    background-color: #0B0273;
    color: #FFFFFF;
}

.actions-column {
    margin: auto;
    width: 10%;
}
.code-column {
    width: 15%;
}
.classes-add_button {
    background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #0094FF;
    width: 15%;
    font-family: 'Nunito', sans-serif;
}

</style>
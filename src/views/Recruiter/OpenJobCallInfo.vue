<template>
    <div class="main">
        <div class="job-call-info">
            <h3>CONVOCATORIA N°{{ jobCall.jobCallNumber }}</h3>
            <h3>{{ jobCall.jobCallName }}</h3>
            <b>Fecha límite de presentación: <span>{{ formatDate }}</span></b>
            <b>Total de postulantes: <span>{{ apply.length }}</span></b>
            <b>Estado: <span>Abierta</span></b>
        </div>
        <div class="candidates-section">
            <h3>Candidatos</h3>

            <table :style="'width:100%'">
                <thead>
                    <tr>
                        <th class="name-column">Nombre</th>
                        <th class="first-last-name-column">Apellido Paterno</th>
                        <th class="second-last-name-column">Apellido Materno</th>
                        <th class="date-column">Fecha de postulación</th>
                        <th class="cv-column">CV</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in apply" :key="index" class="college-classes-list">
                        <td>
                            {{ item.applyPersonalData.name }}
                        </td>
                        <td>
                            {{ item.applyPersonalData.firstLastName }}
                        </td>
                        <td>
                            {{ item.applyPersonalData.secondLastName }}
                        </td>
                        <td>
                            {{ formatTableDate(item.applyDate) }}
                        </td>
                        <td class="cv-cell">
                            <fa class="word-file" icon="fa-solid fa-file-word" @click="getCandidateCV(item)" />
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div class="buttons_container">
            <!-- <button class="add_button" @click="downloadManualFile">Descargar manual</button> -->
            <button class="get-word-file-button" @click="downloadJobCallFile"><fa class="get-word-file-icon" icon="fa-solid fa-file-word" />Descargar convocatoria</button>
        </div>

    </div>
</template>
<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useJobCallStore } from '../../store/job-call'
import { useRoute } from "vue-router"
import ReportComponent from '../../class/ReportComponent'
import CVFile from '../../class/cv-file'
const jobCall = ref({})
const apply = ref([])
const jobCallStore = useJobCallStore()
const router = useRoute()
onBeforeMount(async () => {
    await jobCallStore.getCandidatesAppliedToOpenedJobCall(router.params.id)
    jobCall.value = jobCallStore.applies
    apply.value = jobCall.value.apply
})
const formatDate = computed(() => {
    const date = new Date(jobCall.value.closingDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
})

const formatTableDate = (tableDate) => {
    const date = new Date(tableDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
const getCandidateCV = (item) => {

    const personalData = item.applyTPersonalData
    const cvData = item.applyTCVData
    const cv = getCV(personalData, cvData)
    const cvFile = new CVFile(cv)
    cvFile.getDoc()
}
const downloadManualFile = () => {
    console.log();
    var fileURL = window.URL.createObjectURL(new Blob([jobCall.value.jobManualFile]));
    var fileLink = document.createElement('a');

    fileLink.href = fileURL;
    fileLink.setAttribute('download',jobCall.value.jobManualFileName);
    document.body.appendChild(fileLink);

    fileLink.click();
}
const downloadJobCallFile = async() =>{ 
    await jobCallStore.getJobCallById(router.params.id)
    const reportComponent = new ReportComponent(jobCallStore.selectedJobCall)
    reportComponent.getDoc()
}
</script>
<style scoped lang="scss">
@import '../../styles/tables.scss';
@import '../../styles/icons.scss';
@import '../../styles/buttons.scss';

.main {
    padding: 10px 50px;
}

.job-call-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;

}

.candidates-section {
    margin-top: 25px;
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 30px;
}

h3 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    margin: 0px;
}

b {
    font-family: 'Inter';
    font-size: 15px;
}

b span {
    font-weight: normal;
    font-size: 15px;
}

.buttons_container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 20px 0px;
    width: 100%;
    gap: 20px;
}
.name-column {
    width: 20%;
}

.first-last-name-column {
    width: 20%;
}

.second-last-name-column {
    width: 20%;
}

.date-column {
    width: 20%;
}
</style>
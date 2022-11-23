<template>
    <div class="main">
        <div class="job-call-info">
            <h3>CONVOCATORIA N°{{ jobCall.jobCallNumber }}</h3>
            <h3>{{ jobCall.jobCallName }}</h3>
            <b>Fecha límite de presentación: <span>{{ formatDate }}</span></b>
            <b>Total de postulantes: <span v-if="apply">{{ apply.length }}</span>
                <span v-else>0</span></b>
            <b>Estado: <span>Abierta</span></b>
        </div>
        <div class="candidates-section">
            <h3>Candidatos</h3>
            <div v-if="apply" class="search-container">
                    <label for="search-input">Buscar candidato</label>
                    <input id="search-input" type="text" class="search-candidate-input" placeholder="Ingrese el nombre del candidato" v-model="searchCandidate"
                    @input="filtercandidates">
                </div>

            <table :style="'width:100%'" v-if="apply">
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
                    <tr v-for="(item, index) in pagedData" :key="index" class="candidates-list" @click="toCvInfo(item.id)">
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
            <div class="paginator-container" v-if="apply">
                <div class="page-items-container">
                    <label for="items-number">Número de filas</label>
                    <input id="items-number" type="number" v-model="pageItems" class="page-items-input" min="1" :max="apply.length" @input="onClickHandler(1)">
                </div>
                <vue-awesome-paginate :total-items="apply.length" :items-per-page="pageItems" :max-pages-shown="5"
                    :current-page="1" :on-click="onClickHandler" paginate-buttons-class="btn"
                    active-page-class="btn-active" back-button-class="back-btn" next-button-class="next-btn" />
            </div>
            <p v-if="!apply">No hay candidatos postulados a esta convocatoria.</p>
        </div>
        <div class="buttons_container">
            <!-- <button class="add_button" @click="downloadManualFile">Descargar manual</button> -->
            <button class="get-word-file-button" @click="downloadJobCallFile">
                <fa class="get-word-file-icon" icon="fa-solid fa-file-word" />Descargar convocatoria
            </button>
        </div>

    </div>
</template>
<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useJobCallStore } from '../../store/job-call'
import { useRoute } from "vue-router"
import ReportComponent from '../../class/ReportComponent'
import { getCV } from '../../helpers/get-cv-data'
import CVFile from '../../class/cv-file'
import router from '../../routes/recruiter-router'
const jobCall = ref({})
const apply = ref([])
const jobCallStore = useJobCallStore()
const routes = useRoute()
const pageItems = ref(1)
const pagedData = ref([]);
const searchCandidate=ref('')
onBeforeMount(async () => {
    await jobCallStore.getCandidatesAppliedToOpenedJobCall(routes.params.id)
    jobCall.value = jobCallStore.applies
    apply.value = jobCall.value.apply
    if(apply.value.length>0){
        pageItems.value=Math.round(apply.value.length/2)
    }
    onClickHandler(1)
})
const formatDate = computed(() => {
    const date = new Date(jobCall.value.closingDate);
    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
})

const formatTableDate = (tableDate) => {
    const date = new Date(tableDate);
    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
const getCandidateCV = (item) => {

    const personalData = item.applyPersonalData
    const cvData = item.applyCVData
    const cv = getCV(personalData, cvData)
    const cvFile = new CVFile(cv)
    cvFile.getDoc()
}
const downloadManualFile = () => {
    console.log();
    var fileURL = window.URL.createObjectURL(new Blob([jobCall.value.jobManualFile]));
    var fileLink = document.createElement('a');

    fileLink.href = fileURL;
    fileLink.setAttribute('download', jobCall.value.jobManualFileName);
    document.body.appendChild(fileLink);

    fileLink.click();
}
const downloadJobCallFile = async () => {
    await jobCallStore.getJobCallById(routes.params.id)
    const reportComponent = new ReportComponent(jobCallStore.selectedJobCall)
    reportComponent.getDoc()
}
const toCvInfo = (id) => {
    router.push({ name: 'CVInfo', params: { id } })
}
const onClickHandler = (page) => {
    pagedData.value=jobCallStore.getCandidatesPagedList(page,pageItems.value)
}
const filtercandidates = ()=>{
    jobCallStore.applies.apply=apply.value  
    if(searchCandidate.value && searchCandidate.value!==''){
        jobCallStore.applies.apply=apply.value.filter(obj=>obj.applyPersonalData.name.search(searchCandidate.value)>-1)
    }
    onClickHandler(1)

}
</script>
<style scoped lang="scss">
@import '../../styles/tables.scss';
@import '../../styles/icons.scss';
@import '../../styles/buttons.scss';
@import '../../styles/inputs.scss';

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

.candidates-section p {
    font-size: 25px;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    color: #000;
}

.buttons_container {
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

.candidates-list:hover {
    background-color: #efefef;
}

.date-column {
    width: 20%;
}



</style>
<style>
.paginator-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 15px;
}

.btn {
    height: 30px;
    width: 30px;
    border: #ddd solid 1px;
    cursor: pointer;
    border-radius: 5px;
    color: #0B0273;
    background-color: #fff;
}
.btn:hover {
   background-color: rgb(211, 211, 211);
}
.back-btn {
    background-color: #fff;
}

.next-btn {
    background-color: #fff;
}

.btn-active {
    background-color: #0B0273;
    color: white;
}
.page-items-container{
   display: flex;
   flex-direction: row;
   gap: 10px;
   align-self: center;
}
.page-items-container label{
   font-family: 'Nunito';
   font-size: 15px;
   color: #000;
   align-self: center;

}
.page-items-input{
    width: 35px;
    height: 25px;
    border-radius: 5px;
    border: #aaa solid 1px;
    padding-left: 5px;
   
}
.page-items-input:focus{
    border: #ccc solid 1px;
}

</style>
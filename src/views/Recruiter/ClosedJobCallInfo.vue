<template>
    <div class="main">
        <div class="job-call-info">
            <h3>CONVOCATORIA N°{{ jobCall.jobCallNumber }}</h3>
            <h3>{{ jobCall.jobCallName }}</h3>
            <b>Fecha límite de presentación: <span>{{ formatDate }}</span></b>
            <b>Total de postulantes: <span v-if="apply">{{ totalCandidates }}</span>
                <span v-else>0</span></b>
            <b>Estado: <span>Cerrada</span></b>
        </div>
        <div class="candidates-section">
            <h3>Candidatos</h3>
            <div class="search-container">
                <label for="search-input">Buscar candidato</label>
                <input id="search-input" type="text" class="search-candidate-input"
                    placeholder="Ingrese el nombre del candidato" v-model="searchCandidate" @input="filtercandidates">
            </div>
            <div class="table-container">
                <div class="buttons-container" v-if="apply">
                    <button
                        @click="tableTab = 'ACEPTED'; acceptedTab = true; rejectedTab = false; searchCandidate = ''; filtercandidates(); onClickHandler(1)"
                        class="buttons-container__tab" :class="{ selected: acceptedTab }">Candidatos
                        habilitados | {{ getAcceptedCandidates.length }}</button>
                    <button
                        @click="tableTab = 'REJECTED'; acceptedTab = false; rejectedTab = true; searchCandidate = ''; filtercandidates(); onClickHandler(1)"
                        class="buttons-container__tab" :class="{ selected: rejectedTab }">Candidatos no
                        habilitados | {{ getRejectedCandidates.length }}</button>
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
                    <tbody v-if="tableTab === 'ACEPTED'">
                        <tr v-for="(item, index) in pagedData" :key="index" class="candidates-list"
                            @click="toCvInfo(item.id)">
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
                    <tbody v-else>
                        <tr v-for="(item, index) in pagedData" :key="index" class="candidates-list"
                            @click="toCvInfo(item.id)">
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
                        <input id="items-number" type="number" v-model="pageItems" class="page-items-input" min="1"
                            :max="totalItems" @input="onClickHandler(1)">
                    </div>
                    <vue-awesome-paginate :total-items="totalItems" :items-per-page="pageItems" :max-pages-shown="5"
                        :current-page="1" :on-click="onClickHandler" paginate-buttons-class="btn"
                        active-page-class="btn-active" back-button-class="back-btn" next-button-class="next-btn" />
                </div>
                <p v-else>No hay candidatos postulados a esta convocatoria.</p>
            </div>
            <div class="buttons_container">
                <button class="xlsx-button" v-if="apply">
                    <fa class="excel-icon" icon="fa-solid fa-file-excel" />Planilla
                </button>
                <!-- <button class="add_button" @click="downloadManualFile">Descargar manual</button> -->
                <button class="get-word-file-button" @click="downloadJobCallFile">
                    <fa class="get-word-file-icon" icon="fa-solid fa-file-word" />Descargar convocatoria
                </button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useJobCallStore } from '../../store/job-call'
import { useRoute } from "vue-router"
import CVFile from '../../class/cv-file'
import { getCV } from '../../helpers/get-cv-data'
import ReportComponent from '../../class/ReportComponent'
import router from '../../routes/recruiter-router'
const jobCall = ref({})
const apply = ref([])
const jobCallStore = useJobCallStore()
const routes = useRoute()
const tableTab = ref('ACEPTED')
const acceptedTab = ref(true)
const rejectedTab = ref(false)
const pageItems = ref(1)
const totalCandidates = ref(0)
const pagedData = ref([]);
const searchCandidate = ref('')
onBeforeMount(async () => {
    await jobCallStore.getCandidatesAppliedToClosedJobCalls(routes.params.id)
    jobCall.value = jobCallStore.applies
    totalCandidates.value = jobCall.value.apply.length
    apply.value = jobCall.value.apply
    if(apply.value && apply.value.length){
        pageItems.value = tableTab.value === 'ACEPTED' ? Math.round(apply.value.filter(obj => obj.applyStatus === 'ACEPTED').length/2) :
        Math.round(apply.value.filter(obj => obj.applyStatus === 'REJECTED').length/2) 
    }
    onClickHandler(1)
})
const formatDate = computed(() => {
    const date = new Date(jobCall.value.closingDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
})
const totalItems = computed(() => {
    return tableTab.value === 'ACEPTED' ? apply.value.filter(obj => obj.applyStatus === 'ACEPTED').length : apply.value.filter(obj => obj.applyStatus === 'REJECTED').length

})

const formatTableDate = (tableDate) => {
    const date = new Date(tableDate);
    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}


const getAcceptedCandidates = computed(() => {
    return apply.value.filter(obj => obj.applyStatus === 'ACEPTED')
})
const getRejectedCandidates = computed(() => {
    return apply.value.filter(obj => obj.applyStatus === 'REJECTED')
})
const getCandidateCV = (item) => {

    const personalData = item.applyPersonalData
    const cvData = item.applyCVData
    const cv = getCV(personalData, cvData)
    const cvFile = new CVFile(cv)
    cvFile.getDoc()
}
const toCvInfo = (id) => {
    router.push({ name: 'CVInfo', params: { id } })
}
const downloadJobCallFile = async () => {
    await jobCallStore.getJobCallById(routes.params.id)
    const reportComponent = new ReportComponent(jobCallStore.selectedJobCall)
    reportComponent.getDoc()
}
const onClickHandler = (page) => {
    const listItems = tableTab.value === 'ACEPTED' ? apply.value.filter(obj => obj.applyStatus === 'ACEPTED') : apply.value.filter(obj => obj.applyStatus === 'REJECTED')
    pagedData.value = jobCallStore.getCandidatesPagedListClosedJobCall(page, pageItems.value, listItems)
}
const filtercandidates = () => {
    apply.value = jobCallStore.applies.apply
    if (searchCandidate.value && searchCandidate.value !== '') {
        if (tableTab.value === 'ACEPTED') {
            apply.value = jobCallStore.applies.apply.filter(obj => (obj.applyPersonalData.name.search(searchCandidate.value) > -1 && obj.applyStatus === 'ACEPTED'))
            apply.value = apply.value.concat(jobCallStore.applies.apply.filter(obj => obj.applyStatus === 'REJECTED'))
        } else {
            apply.value = jobCallStore.applies.apply.filter(obj => (obj.applyPersonalData.name.search(searchCandidate.value) > -1 && obj.applyStatus === 'REJECTED'))
            apply.value = apply.value.concat(jobCallStore.applies.apply.filter(obj => obj.applyStatus === 'ACEPTED'))
        }

    }
    onClickHandler(1)
}
</script>
<style scoped lang="scss">
@import '../../styles/tables.scss';
@import '../../styles/buttons.scss';
@import '../../styles/icons.scss';
@import '../../styles/inputs.scss';

.main {
    padding: 10px 50px;
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

.buttons-container {
    display: flex;
    flex-direction: row;
    justify-self: flex-start;
    gap: 0px;
    width: 100%;
    align-self: flex-start;
}

.buttons-container__tab {
    background-color: #1001af;
    color: #fff;
    border-radius: 10px 10px 0px 0px;
    height: 30px;
    border: #1001af;
}

.buttons-container__tab.selected {
    background-color: #0B0273;
    height: 30px;
    border: #0B0273;
}

.table-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
}

.candidates-list:hover {
    background-color: #efefef;
}



.xlsx-button {
    background-color: #179B34;
    border-radius: 8px;
    color: #FFFFFF;
    border-color: #179B34;
    width: 15%;
    font-family: 'Nunito', sans-serif;
}

.excel-icon {
    color: #fff;
    width: 12px;
    height: 18px;
    margin-right: 5px;

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

.page-items-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-self: center;
}

.page-items-container label {
    font-family: 'Nunito';
    font-size: 15px;
    color: #000;
    align-self: center;

}

.page-items-input {
    width: 35px;
    height: 25px;
    border-radius: 5px;
    border: #aaa solid 1px;
    padding-left: 5px;

}

.page-items-input:focus {
    border: #ccc solid 1px;
}
</style>
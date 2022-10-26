<template>
    <div class="main">
        <h3 class="title">Convocatorias abiertas</h3>

        <div class="input-container">
            <div class="form-input-container">
                <label for="job-call-name" class="form-label">Buscar convocatoria</label>
                <input class="form-input" type="text" id="job-call-name" maxlength="100" v-model.trim="searchJobCall"
                    @input="filterJobCalls">
            </div>
            <div class="form-input-container">
                <label class="form-label">Cargo</label>
                <select class="form-input" v-model="jobCallType">
                    <option>Administrativo</option>
                    <option>Docente</option>
                </select>
            </div>
        </div>
        <div v-if="jobCallType==='Administrativo'">
            <div v-if="jobCallStore.jobCalls.length>0" class="job-call-list-container">
                <JobCallCard v-for="item in pagedData" :key="item.id" :jobCallName="item.jobCallName"
                    :jobCallNumber="item.jobCallNumber" :openingDate="new Date(item.openingDate)" 
                    @click="toOpenedJobCallInfo(item.id)"/>
            </div>
            <div v-else class="job-call-list-container">
                <p>No existen convocatorias guardadas</p>
            </div>
        </div>
        <div v-else>
            <div v-if="teacherJobCallStore.jobCalls.length>0" class="job-call-list-container">
                <JobCallCard v-for="item in teacherPagedData" :key="item.id" :jobCallName="item.jobCallName"
                    :jobCallNumber="item.jobCallNumber" :openingDate="new Date(item.openingDate)"
                    @click="toTeacherJobCallInfo(item.id)" />
            </div>
            <div v-else class="job-call-list-container">
                <p>No existen convocatorias guardadas</p>
            </div>
        </div>

        <vue-awesome-paginate v-if="jobCallStore.jobCalls.length>0 && jobCallType==='Administrativo'"
            :total-items="jobCallStore.jobCalls.length" :items-per-page="4" :max-pages-shown="10" :current-page="1"
            :on-click="onClickHandler" />

        <vue-awesome-paginate v-if="teacherJobCallStore.jobCalls.length>0 && jobCallType==='Docente'"
            :total-items="teacherJobCallStore.jobCalls.length" :items-per-page="4" :max-pages-shown="10" :current-page="1"
            :on-click="onClickHandlerTeacher" />

    </div>
</template>
<script setup>
import JobCallCard from '../../components/job-call/JobCallCard.vue';
import { useJobCallStore } from '../../store/job-call';
import { useTeacherJobCallStore } from '../../store/teacher-job-call'
import { onBeforeMount, ref } from 'vue'
import router from '../../routes/recruiter-router'
const jobCallStore = useJobCallStore()
const teacherJobCallStore = useTeacherJobCallStore()
const searchJobCall = ref('')
const jobCalls = ref([])
const teacherJobCalls = ref([])
const jobCallType = ref('Administrativo')
onBeforeMount(async () => {
    await jobCallStore.getOpenedJobCalls();
    await teacherJobCallStore.getOpenedTeacherJobCalls();
    jobCalls.value = jobCallStore.jobCalls
    teacherJobCalls.value = teacherJobCallStore.jobCalls;
    onClickHandler(1)
    onClickHandlerTeacher(1)
})
const filterJobCalls = () => {
    jobCallStore.jobCalls = jobCalls.value
    if (searchJobCall.value !== null && searchJobCall.value !== '') {
        jobCallStore.jobCalls = jobCalls.value.filter(obj => obj.jobCallName.search(searchJobCall.value.toUpperCase()) > -1)

    }
    onClickHandler(1)
}
const pageItems = ref(4)
const pagedData = ref([]);
const teacherPagedData = ref([])
const onClickHandler = (page) => {
    pagedData.value = jobCallStore.getPagedList(page, pageItems.value)

}
const onClickHandlerTeacher = (page) => {
    teacherPagedData.value = teacherJobCallStore.getPagedList(page, pageItems.value)
}
const toOpenedJobCallInfo = (id)=>{
    router.push({name:'open-job-call-info',params:{id}})
}
const toTeacherJobCallInfo = (id)=>{
    console.log(id);
    router.push({name:'teacher-job-calls',params:{id}})
}

</script>

<style scoped>
.main {
    padding: 10px 50px;
}

.title {
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-size: 40px;
    color: #064D90;
    margin: 0px;
}

.job-call-list-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(185, 185, 185, 0.2);
    width: 100%;
    gap: 15px;
    padding: 10px;

}

.job-call-list-container p {
    font-size: 25px;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    color: #000;
}

.input-container {
    display: grid;
    grid-template-columns: repeat(2, 35%);
    grid-template-rows: 1fr;
    gap: 30px;
    margin: 20px 0px;
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
    height: 20px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}

#job-call-name {
    text-transform: uppercase;
}

.form-input-container select {
    height: 30px;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}
</style>
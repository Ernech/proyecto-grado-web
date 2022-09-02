<template>
    <div class="main">
        <h3 class="title">Convocatorias guardadas</h3>

        <div class="input-container">
            <div class="form-input-container">
                <label for="job-call-name" class="form-label">Buscar convocatoria</label>
                <input class="form-input" type="text" id="job-call-name" maxlength="100" @change="filterJobCalls"
                    v-model.trim="searchJobCall">
            </div>
            <div class="form-input-container">
                <label class="form-label">Ordenar por</label>
                <select class="form-input">
                    <option>Nombre</option>
                    <option>Fecha de apertura</option>
                </select>
            </div>
        </div>

        <div v-if="jobCallStore.savedJobCalls.length>0" class="job-call-list-container">
            <JobCallCard v-for="item in pagedData" :key="item.id" :jobCallName="item.jobCallName"
                :jobCallNumber="item.jobCallNumber" :openingDate="item.openingDate" />
        </div>
        <div v-else class="job-call-list-container">
           <p>No existen convocatorias guardadas</p>
        </div>
        <vue-awesome-paginate v-if="jobCallStore.savedJobCalls.length>0" :total-items="jobCallStore.savedJobCalls.length" :items-per-page="4" :max-pages-shown="10" :current-page="1"
            :on-click="onClickHandler" />
   
    </div>
</template>
<script setup>
import JobCallCard from '../../components/job-call/JobCallCard.vue';
import { useJobCallStore } from '../../store/job-call';
import { onBeforeMount, ref } from 'vue'
const jobCallStore = useJobCallStore()
const searchJobCall = ref('')
onBeforeMount(async () => {
    await jobCallStore.getSavedJobCalls();
    onClickHandler(1)
})

const filterJobCalls = () => {
    console.log(jobCallStore.savedJobCalls[8]);
}
const pageItems = ref(4)
const pagedData = ref([]);
const onClickHandler = (page) => {
    pagedData.value = jobCallStore.getPagedList(page,pageItems.value)

}

</script>

<style>
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
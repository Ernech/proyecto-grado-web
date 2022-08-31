<template>
    <div class="main">
        <h3 class="title">Convocatorias guardadas</h3>
        <div v-for="item in jobCallStore.savedJobCalls" :key="item.id">
            <JobCallCard :jobCallName= "item.jobCallName" :jobCallNumber="item.jobCallNumber" :openingDate="item.openingDate"/>
        </div>
        
    </div>
</template>
<script setup>
import JobCallCard from '../../components/job-call/JobCallCard.vue';
import {useJobCallStore} from '../../store/job-call';
import {onBeforeMount} from 'vue'
const jobCallStore = useJobCallStore()
onBeforeMount(async()=>{
    await jobCallStore.getSavedJobCalls()
})
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
</style>
<template>
    <div class="main">
        <div class="job-call-info">
            <h3>CONVOCATORIA N°{{jobCall.jobCallNumber}}</h3>
            <h3>{{jobCall.jobCallName}}</h3>
            <b>Fecha límite de presentación: <span>{{formatDate}}</span></b>
            <b>Total de postulantes: <span>{{jobCall.apply.length}}</span></b>
            <b>Estado: <span>Cerrada</span></b>
        </div>
        <div class="candidates-section">
            <h3>Candidatos</h3>
            <div class="table-container">
                <div class="buttons-container">
                    <button @click="tableTab='ACEPTED'; acceptedTab=true;rejectedTab=false;"
                        class="buttons-container__tab" :class="{selected:acceptedTab}">Candidatos
                        habilitados|{{getAcceptedCandidates.length}}</button>
                    <button @click="tableTab='REJECTED'; acceptedTab=false;rejectedTab=true;"
                        class="buttons-container__tab" :class="{selected:rejectedTab}">Candidatos no
                        habilitados |{{getRejectedCandidates.length}}</button>
                </div>
                <table :style="'width:100%'">
                    <thead>
                        <tr>
                            <th class="code-column">Nombre</th>
                            <th class="code-column">Apellido Paterno</th>
                            <th class="class-name-column">Apellido Materno</th>
                            <th class="candidates-column">Fecha de postulación</th>
                        </tr>
                    </thead>
                    <tbody v-if="tableTab==='ACEPTED'">
                        <tr v-for="(item,index) in getAcceptedCandidates" :key="index" class="college-classes-list">
                            <td>
                                {{item.applyTPersonalData.name}}
                            </td>
                            <td>
                                {{item.applyTPersonalData.firstLastName}}
                            </td>
                            <td>
                                {{item.applyTPersonalData.secondLastName}}
                            </td>
                            <td>
                                {{item.applyDate}}
                            </td>

                        </tr>

                    </tbody>
                    <tbody v-else>
                        <tr v-for="(item,index) in getRejectedCandidates" :key="index" class="college-classes-list">
                            <td>
                                {{item.applyTPersonalData.name}}
                            </td>
                            <td>
                                {{item.applyTPersonalData.firstLastName}}
                            </td>
                            <td>
                                {{item.applyTPersonalData.secondLastName}}
                            </td>
                            <td>
                                {{item.applyDate}}
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useJobCallStore } from '../../store/job-call'
import { useRoute } from "vue-router"
import SectionTitle from '../../components/job-call-form-sections/SectionTitle.vue'

const jobCall = ref({})
const jobCallStore = useJobCallStore()
const router = useRoute()
const tableTab = ref('ACEPTED')
const acceptedTab = ref(true)
const rejectedTab = ref(false)
onBeforeMount(async () => {
    await jobCallStore.getCandidatesAppliedToClosedJobCalls(router.params.id)
    jobCall.value = jobCallStore.applies
})
const formatDate = computed(() => {
    const date = new Date(jobCall.value.closingDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
})

const getAcceptedCandidates = computed(() => {
    return jobCall.value.apply.filter(obj => obj.applyStatus === 'ACEPTED')
})
const getRejectedCandidates = computed(() => {
    return jobCall.value.apply.filter(obj => obj.applyStatus === 'REJECTED')
})
</script>
<style scoped lang="scss">
@import '../../styles/tables.scss';

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


.college-classes-list:hover {
    background-color: #efefef;
}

.code-column {
    width: 20%;
}

.class-name-column {
    width: 50%;
}

.candidates-column {
    width: 20%;
}

.career-classes-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 20px;
}

.actions-column {
    text-align: center;
    width: 10%;
}

.actions-cell {
    text-align: center;
}
</style>
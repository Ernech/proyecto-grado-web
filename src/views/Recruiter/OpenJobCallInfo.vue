<template>
    <div class="main">
        <div class="job-call-info">
            <h3>CONVOCATORIA N°{{jobCall.jobCallNumber}}</h3>
            <h3>{{jobCall.jobCallName}}</h3>
            <b>Fecha límite de presentación: <span>{{formatDate}}</span></b>
            <b>Total de postulantes: <span>{{apply.length}}</span></b>
            <b>Estado: <span>Abierta</span></b>
        </div>
        <div class="candidates-section">
            <h3>Candidatos</h3>
            
                <table :style="'width:100%'">
                    <thead>
                        <tr>
                            <th class="code-column">Nombre</th>
                            <th class="code-column">Apellido Paterno</th>
                            <th class="class-name-column">Apellido Materno</th>
                            <th class="candidates-column">Fecha de postulación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in apply" :key="index" class="college-classes-list">
                            <td>
                                {{item.applyPersonalData.name}}
                            </td>
                            <td>
                                {{item.applyPersonalData.firstLastName}}
                            </td>
                            <td>
                                {{item.applyPersonalData.secondLastName}}
                            </td>
                            <td>
                                {{formatTableDate(item.applyDate)}}
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
        
    </div>
</template>
<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useJobCallStore } from '../../store/job-call'
import { useRoute } from "vue-router"
const jobCall = ref({})
const apply=ref([])
const jobCallStore = useJobCallStore()
const router = useRoute()
onBeforeMount(async () => {
    await jobCallStore.getCandidatesAppliedToOpenedJobCall(router.params.id)
    jobCall.value = jobCallStore.applies
    apply.value=jobCall.value.apply
})
const formatDate = computed(() => {
    const date = new Date(jobCall.value.closingDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
})

const formatTableDate = (tableDate) => {
    const date = new Date(tableDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

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

.college-classes-list:hover {
    background-color: #efefef;
}

.code-column {
    width: 30%;
}

.class-name-column {
    width: 25%;
}

.candidates-column {
    width: 20%;
}
</style>
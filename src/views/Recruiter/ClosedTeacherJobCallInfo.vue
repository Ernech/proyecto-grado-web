<template>
    <div class="main">
        <div class="job-call-info">
            <h3>CONVOCATORIA N°{{jobCall.jobCallNumber}}</h3>
            <h3>DOCENTE TIEMPO HORARIO</h3>
            <b>Fecha límite de presentación: <span>{{formatDate(jobCall.closingDate)}}</span></b>
            <b>Estado: <span>Cerrada</span></b>
        </div>
        <div class="career-classes-section ">
            <SectionTitle title="Materias" />
            <table>
            <thead>
                <tr>
                    <th class="code-column">Número</th>
                    <th class="code-column">Sigla</th>
                    <th class="class-name-column">Materia</th>
                    <th class="candidates-column">N° de candidatos</th>
                    <th class="actions-column">Candidatos</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(item,index) in jobCall.teacherJobCalls" :key="index" @click="openModal(item)" class="college-classes-list"> 
                    <td>
                        {{item.jobCallCode}}
                    </td>    
                    <td>
                        {{item.collegeClass.code}}
                    </td>
                    <td>
                       {{item.collegeClass.name}}
                    </td>
                    <td>
                       {{item.candidates}}
                    </td>
                    <td class="actions-cell">
                        <fa class="excel-icon" icon="fa-solid fa-file-excel" @click="getCandidates(item.id,item.collegeClass.code,item.collegeClass.name)"/>
                    </td>
                </tr>
                

            </tbody>
        </table>
        </div>
    </div>
    <CandidatesCLosedJCModal v-show="showModal" @close-modal="showModal=false" :candidates="candidates" />
</template>
<script setup>
import {onBeforeMount,ref} from'vue'
import {useTeacherJobCallStore} from '../../store/teacher-job-call'
import {useRoute} from "vue-router"
import SectionTitle from '../../components/job-call-form-sections/SectionTitle.vue'
import CandidatesCLosedJCModal from '../../components/modals/CandidatesClosedJCModal.vue'
import CandidatesReport from '../../class/CandidatesReport'

const jobCall = ref({})
const teacherJobCallStore = useTeacherJobCallStore()
const router = useRoute()
const showModal = ref(false)
const candidates = ref([])
const jobCallCode=ref({})
const selectedCollegeClass=ref({})
onBeforeMount(async()=>{
    await teacherJobCallStore.getTeacherJobCallById(router.params.id)
    jobCall.value = teacherJobCallStore.selectedTeacherJobCall
})
const getCandidates = async(id,code,name)=>{
   await teacherJobCallStore.getCandidatesByTeacherJobCallId(id)
   const candidatesReport = new CandidatesReport(teacherJobCallStore.generateReportData(code,name))
   candidatesReport.getDoc()
}

const openModal = async(item)=>{
    jobCallCode.value=item.jobCallCode
    selectedCollegeClass.value=item.collegeClass
    await teacherJobCallStore.getCandidatesByTeacherJobCallId(item.id)
    if(teacherJobCallStore.teacherApplies.teacherApply){
        candidates.value=teacherJobCallStore.teacherApplies.teacherApply 
    }
    else{
        candidates.value=[]
    }
    showModal.value=true
}
const formatDate = (itemDate) => {
    const date = new Date(itemDate);
    return `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
</script>
<style scoped lang="scss">
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

h3 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    margin: 0px;
}
b{
    font-family: 'Inter';
    font-size: 15px;
}
b span{
    font-weight: normal;
    font-size: 15px;
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

.excel-icon {
    color: #188831;
    width: 14px;
    height: 20px;
    margin: 2px;
}
.excel-icon:hover {
    color: #1c9a38;
   
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
.college-classes-list:hover{
    background-color: #efefef;
}
.code-column{
    width: 20%;
}
.class-name-column{
    width: 50%;
}

.candidates-column{
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
.buttons_container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 20px 0px;
    width: 100%;
    gap: 20px;
}
</style>
<template>
    <div class="main">
        <h3 class="title">Modificar convocatoria</h3>
        <div class="job-call-form">
            <GeneralInformationSectionTeacherVue />
            <JobExperienceSection />
            <CareerClassesSectionSection />
            <div class="button-container">
                <button class="add_button" @click="editTeacherJobCall" :disabled="isDisabled"
                    :class="{disabled:isDisabled}">Modificar convocatoria</button>
                    <button type="submit" class="publish_button" @click="publishAndSaveJobCall">Publicar convocatoria</button>
            </div>
            <FeetbackModal v-show="showModal" @close-modal="showModal=false;router.push('/saved-job-call')"
                :title="modalTitle" :message="modalMessage" />
        </div>
    </div>
</template>
<script>
import GeneralInformationSectionTeacherVue from '../../components/job-call-teacher-form/GeneralInformationSectionTeacher.vue';
import CareerClassesSectionSection from '../../components/job-call-teacher-form/CareerClassesSection.vue'
import JobExperienceSection from '../../components/job-call-teacher-form/JobExperienceSection.vue'
import FeetbackModal from '../../components/modals/FeetbackModal.vue'
import { onBeforeMount, computed, ref } from 'vue';
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
import router from '../../routes/recruiter-router'
import { useRoute } from "vue-router";
export default {
    components: {
        GeneralInformationSectionTeacherVue,
        CareerClassesSectionSection,
        JobExperienceSection,
        FeetbackModal
    },

    setup(props) {
        const teacherJobCallsStore = useTeacherJobCallStore()
        const showModal = ref(false)
        const modalTitle = ref('')
        const modalMessage = ref('')
        const teacherJobCallToEdit = ref({})
        const vueRouter = useRoute()
        onBeforeMount(async () => {
            await teacherJobCallsStore.getCollegeClasses()
            await teacherJobCallsStore.getTeacherJobCallById(vueRouter.params.id)
            teacherJobCallToEdit.value = teacherJobCallsStore.selectedTeacherJobCall
            teacherJobCallsStore.setTeacherJobCall(teacherJobCallToEdit.value)
        })
        const isDisabled = computed(() => {
            const today = new Date()
            if (teacherJobCallsStore.jobCallName !== null && teacherJobCallsStore.jobCallName !== ''
                && teacherJobCallsStore.jobCallNumber !== null && teacherJobCallsStore.jobCallNumber !== ''
                && teacherJobCallsStore.jobManualFile !== null && teacherJobCallsStore.jobManualFile !== '') {

                if (new Date(teacherJobCallsStore.closingDate) > new Date(teacherJobCallsStore.openingDate)
                    && new Date(teacherJobCallsStore.openingDate) > today) {
                    if (teacherJobCallsStore.collegeClassesToDB.length > 0 && teacherJobCallsStore.experiences.length > 0) {
                        return false;

                    }
                }

            }
            return true
        })
        const editTeacherJobCall = async () => {
            const resp = await teacherJobCallsStore.editTeacherJobCall(vueRouter.params.id)
            if (resp === 200) {
                modalTitle.value = "Convocatoria modificada"
                modalMessage.value = "Se han guardado los cambios"
                showModal.value = true
                return
            }
            modalTitle.value = "Se ha producido un error"
            modalMessage.value = "No se pudo modificar la convocatoria."
            showModal.value = true
        }
        const publishJobCall = async ()=>{
            const resp = await teacherJobCallsStore.publishJobCall(vueRouter.params.id)
            showModal.value = true
            if (resp === 200) {
                modalTitle.value = 'Se ha publicado la convocatoria'
                modalMessage.value = 'Se ha agregado la convoatoria a la lista de pendientes'
                return
            }else if(resp===403){
                modalTitle.value = 'Ha ocurrido un error'
                modalMessage.value = 'Ya exiten convocatorias abiertas o en la lista de pendientes'
                
            }
            modalTitle.value = 'Ha ocurrido un error'
            modalMessage.value = 'No se pudo publicar la convocatoria'
        }
        const publishAndSaveJobCall = async () => {
            const editResp = await teacherJobCallsStore.editTeacherJobCall(vueRouter.params.id)
            if(editResp===200){
               await publishJobCall()
            }
            
        }
        return { editTeacherJobCall, isDisabled, modalMessage, modalTitle, showModal, router ,publishAndSaveJobCall}

    }

}
</script>
<style lang="scss" scoped>
@import '../../styles/buttons.scss';



.main {
    padding: 10px 50px;
}

.job-call-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-size: 40px;
    color: #064D90;
    margin: 0px;
}

.button-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin: 20px 15px;
    gap: 6px;
}
.publish_button {
    background-color: #00ff1e;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #00ff1e;
    width: 25%;
    font-family: 'Nunito', sans-serif;


}
</style>
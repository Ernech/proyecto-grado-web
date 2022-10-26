<template>
    <div class="job-call-form">
        <GeneralInformationSectionTeacherVue />
        <JobExperienceSection />
        <CareerClassesSectionSection />
        <div class="button-container">
            <button class="add_button" @click="createNewTeacherJobCall" :disabled="isDisabled"
                :class="{disabled:isDisabled}">Crear convocatoria</button>
        </div>
        <FeetbackModal v-show="showModal" @close-modal="showModal=false;router.push('/saved-job-call')" :title="modalTitle" :message="modalMessage" />
    </div>
</template>
<script>
import GeneralInformationSectionTeacherVue from '../../components/job-call-teacher-form/GeneralInformationSectionTeacher.vue';
import CareerClassesSectionSection from '../../components/job-call-teacher-form/CareerClassesSection.vue'
import JobExperienceSection from '../../components/job-call-teacher-form/JobExperienceSection.vue'
import FeetbackModal from '../../components/modals/FeetbackModal.vue'
import { onBeforeMount, computed,ref } from 'vue';
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
import router from '../../routes/recruiter-router'
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
        onBeforeMount(async () => {
            await teacherJobCallsStore.getCollegeClasses()
        })
        const isDisabled = computed(() => {
            const today = new Date()
            if (teacherJobCallsStore.jobCallName !== null && teacherJobCallsStore.jobCallName !== ''
                && teacherJobCallsStore.jobCallNumber !== null && teacherJobCallsStore.jobCallNumber !== ''
                && teacherJobCallsStore.jobManualFile !== null && teacherJobCallsStore.jobManualFile !== '') {
                   
                if (new Date(teacherJobCallsStore.closingDate) > new Date(teacherJobCallsStore.openingDate) 
                &&  new Date(teacherJobCallsStore.openingDate) > today) {
                    if (teacherJobCallsStore.collegeClassesToDB.length >0 && teacherJobCallsStore.experiences.length>0) {
                        return false;
                        
                    }
                }

            }
            return true
        })
        const createNewTeacherJobCall = async () => {
           const resp =  await teacherJobCallsStore.createTeacherJobCall()
           if (resp === 201) {
                modalTitle.value = "Convocatoria creada"
                modalMessage.value = "Se ha creado una nueva convocatoria."
                showModal.value = true
                return
            }
            modalTitle.value = "Se ha producido un error"
            modalMessage.value = "No se pudo crear la convocatoria."
            showModal.value = true
        }
        return { createNewTeacherJobCall, isDisabled, modalMessage,modalTitle,showModal}

    }

}
</script>
<style lang="scss" scoped>
@import '../../styles/buttons.scss';

.job-call-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.button-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin: 20px 15px;
}
</style>
<template>
    <div class="main">
        <h3 class="title">Modificar convocatoria</h3>
        <div class="job-call-form">
            <GeneralInformationSection />
            <FunctionsSection />
            <AcademicTrainingSection />
            <JobExperienceSection />
            <RequiredKnowledge />
            <AptitudeSection />
            <div class="job-call-form__buttons-container">
                <GetJobCallFileButton :item="jobCallStore.jobCallEdit" />
                <button type="submit" class="job-call-form__publish_button"
                    @click="publishAndSaveJobCall($route.params.id)">Publicar convocatoria</button>
                <button type="submit" class="job-call-form__create_button " @click="editJobCall($route.params.id)"
                    :disabled="isDisabled" :class="{ disabled: isDisabled }">Modificar
                    convocatoria</button>
            </div>

        </div>
        <FeetbackModal v-show="showModal" @close-modal="showModal=false; router.push('/pending-job-call')"
            :title="modalTitle" :message="modalMessage" />
    </div>

</template>
<script>
import FunctionsSection from '../../components/job-call-form-sections/FunctionsSection.vue';
import AcademicTrainingSection from '../../components/job-call-form-sections/AcademicTrainingSection.vue';
import JobExperienceSection from '../../components/job-call-form-sections/JobExperienceSection.vue';
import RequiredKnowledge from '../../components/job-call-form-sections/RequiredKnowledge.vue';
import AptitudeSection from '../../components/job-call-form-sections/AptitudeSection.vue';
import GeneralInformationSection from '../../components/job-call-form-sections/GeneralInformationSection.vue';
import GetJobCallFileButton from '../../components/job-call/GetJobCallFileButton.vue';
import { useJobCallStore } from '../../store/job-call'
import { computed, onBeforeMount, ref } from 'vue';
import router from '../../routes/recruiter-router'
import FeetbackModal from '../../components/modals/FeetbackModal.vue'
export default {
    components: {
        GeneralInformationSection,
        FunctionsSection,
        AcademicTrainingSection,
        JobExperienceSection,
        RequiredKnowledge,
        AptitudeSection,
        GetJobCallFileButton,
        FeetbackModal
    },
    setup() {

        const jobCallStore = useJobCallStore()
        const showModal = ref(false)
        const modalTitle = ref('')
        const modalMessage = ref('')
        onBeforeMount(() => {
            if (!jobCallStore.editJobCall || JSON.stringify(jobCallStore.jobCallEdit) === '{}') {
                router.push('/saved-job-call')
            }
        })
        const editJobCall = async (id) => {
            await jobCallStore.editJobCall(id)
            jobCallStore.resetValues()
        }

        const publishJobCall = async (id) => {
            const resp = await jobCallStore.publishJobCall(id)
            console.log(resp);
            showModal.value = true
            if (resp === 200) {
                modalTitle.value = 'Se ha publicado la convocatoria'
                modalMessage.value = 'Se ha agregado la convoatoria a la lista de pendientes'
                return
            }
            modalTitle.value = 'Ha ocurrido un error'
            modalMessage.value = 'No se pudo publicar la convocatoria'
        }

        const publishAndSaveJobCall = async (id) => {
            const editResp = await jobCallStore.editJobCall(id)
            if(editResp===200){
               await publishJobCall(id)
            }
        }        

        const isDisabled = computed(() => {
            if (jobCallStore.jobCallName !== null && jobCallStore.jobCallName !== ''
                && jobCallStore.jobCallNumber !== null && jobCallStore.jobCallNumber !== ''
                && jobCallStore.jobManualFile !== null && jobCallStore.jobManualFile !== ''
                && jobCallStore.jobCallObj !== null && jobCallStore.jobCallObj !== '') {

                if (jobCallStore.closingDate > jobCallStore.openingDate) {
                    if (jobCallStore.jobFunctions.length >= 1
                        && jobCallStore.academicTrainings.length >= 1
                        && jobCallStore.experiences.length >= 1
                        && jobCallStore.aptitudes.length >= 1
                        && jobCallStore.requiredKnowledgeArray.length >= 1) {
                        return false;
                    }
                }

            }
            return true
        })
        return { editJobCall, publishAndSaveJobCall, isDisabled, jobCallStore, router, showModal, modalTitle, modalMessage }
    }
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

.job-call-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
}

.job-call-form__buttons-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin: 20px 15px;
    width: 100%;
    gap: 20px;
}

.job-call-form__create_button {
    background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #0094FF;
    width: 25%;
    font-family: 'Nunito', sans-serif;

}

.job-call-form__publish_button {
    background-color: #00ff1e;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #00ff1e;
    width: 25%;
    font-family: 'Nunito', sans-serif;


}

.job-call-form__create_button.disabled {
    background-color: #b7b8b9;
    border-color: #b7b8b9;
}
</style>
<template>

    <div class="job-call-form">
        <GeneralInformationSection />
        <FunctionsSection />
        <AcademicTrainingSection />
        <JobExperienceSection />
        <RequiredKnowledge />
        <AptitudeSection />
        <button type="submit" class="job-call-form__create_button" @click="createJobCall" :disabled="isDisabled"
            :class="{ disabled: isDisabled }">Crear
            convocatoria</button>
        <FeetbackModal v-show="showModal" @close-modal="showModal=false" :title="modalTitle" :message="modalMessage" />
    </div>

</template>
<script>
import FunctionsSection from '../../components/job-call-form-sections/FunctionsSection.vue';
import AcademicTrainingSection from '../../components/job-call-form-sections/AcademicTrainingSection.vue';
import JobExperienceSection from '../../components/job-call-form-sections/JobExperienceSection.vue';
import RequiredKnowledge from '../../components/job-call-form-sections/RequiredKnowledge.vue';
import AptitudeSection from '../../components/job-call-form-sections/AptitudeSection.vue';
import GeneralInformationSection from '../../components/job-call-form-sections/GeneralInformationSection.vue';
import FeetbackModal from '../../components/modals/FeetbackModal.vue'
import { useJobCallStore } from '../../store/job-call'
import { computed, onBeforeMount, ref } from 'vue';
export default {

    components: {
        FunctionsSection,
        AcademicTrainingSection,
        JobExperienceSection,
        RequiredKnowledge,
        AptitudeSection,
        GeneralInformationSection,
        FeetbackModal
    },
    setup() {
        const jobCallStore = useJobCallStore()
        const showModal = ref(false)
        const modalTitle = ref('')
        const modalMessage = ref('')
        onBeforeMount(() => {
            jobCallStore.resetValues()
        })
        const createJobCall = async () => {
            const resp = await jobCallStore.createJobCall()
            if (resp === 201) {
                modalTitle.value = "Convocatoria creada"
                modalMessage.value = "Se ha creado una nueva convocatoria."
                showModal.value = true
                jobCallStore.resetValues()
                return
            }
            modalTitle.value = "Se ha producido un error"
            modalMessage.value = "No se pudo crear la convocatoria."
            showModal.value = true
            jobCallStore.resetValues()

        }
        const isDisabled = computed(() => {
            const today = new Date()
            if (jobCallStore.jobCallName !== null && jobCallStore.jobCallName !== ''
                && jobCallStore.jobCallNumber !== null && jobCallStore.jobCallNumber !== ''
                && jobCallStore.jobManualFile !== null && jobCallStore.jobManualFile !== ''
                && jobCallStore.jobCallObj !== null && jobCallStore.jobCallObj !== '') {

                if (new Date(jobCallStore.closingDate) > new Date(jobCallStore.openingDate)
                    && new Date(jobCallStore.openingDate) > today) {
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
        return { createJobCall, isDisabled, showModal, modalTitle, modalMessage }
    }
}
</script>
<style scoped>
.job-call-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.job-call-form__create_button {
    background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #0094FF;
    width: 25%;
    font-family: 'Nunito', sans-serif;
    align-self: flex-end;
    margin: 20px 15px;
}

.job-call-form__create_button.disabled {
    background-color: #b7b8b9;
    border-color: #b7b8b9;
}
</style>
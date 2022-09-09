<template>
    <div class="main">
        <h3 class="title">Nueva convocatoria</h3>
        <div class="job-call-form">
            <GeneralInformationSection />
            <FunctionsSection />
            <AcademicTrainingSection />
            <JobExperienceSection />
            <RequiredKnowledge />
            <AptitudeSection />
            <button type="submit" class="job-call-form__create_button " @click="createJobCall" :disabled="isDisabled"
                :class="{ disabled: isDisabled }">Crear
                convocatoria</button>
        </div>
    </div>
</template>
<script>
import FunctionsSection from '../../components/job-call-form-sections/FunctionsSection.vue';
import AcademicTrainingSection from '../../components/job-call-form-sections/AcademicTrainingSection.vue';
import JobExperienceSection from '../../components/job-call-form-sections/JobExperienceSection.vue';
import RequiredKnowledge from '../../components/job-call-form-sections/RequiredKnowledge.vue';
import AptitudeSection from '../../components/job-call-form-sections/AptitudeSection.vue';
import GeneralInformationSection from '../../components/job-call-form-sections/GeneralInformationSection.vue';
import { useJobCallStore } from '../../store/job-call'
import { computed } from 'vue';
export default {

    components: {
        FunctionsSection,
        AcademicTrainingSection,
        JobExperienceSection,
        RequiredKnowledge,
        AptitudeSection,
        GeneralInformationSection
    },
    setup() {
        const jobCallStore = useJobCallStore()
        const createJobCall = async () => {
            await jobCallStore.createJobCall()
            jobCallStore.resetValues()

        }
        const isDisabled = computed(() => {
            const today = new Date()
            if (jobCallStore.jobCallName !== null && jobCallStore.jobCallName !== ''
                && jobCallStore.jobCallNumber !== null && jobCallStore.jobCallNumber !== ''
                && jobCallStore.jobManualFile !== null && jobCallStore.jobManualFile !== ''
                && jobCallStore.jobCallObj !== null && jobCallStore.jobCallObj !== '') {

                if (jobCallStore.closingDate>jobCallStore.openingDate && jobCallStore.openingDate>today) {
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
        return { createJobCall, isDisabled }
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
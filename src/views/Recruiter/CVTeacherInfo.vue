<template >
    <div class="main">
        <div class="basic-info">
            <h3><b>Información del candidato</b></h3>
            <h3 v-if="jobCallStore.applyPersonalData && jobCallStore.applyCVData.length > 0">
                <b>Nombre: </b>{{ applyPersonalData.name }} {{ applyPersonalData.firstLastName }}
                {{ applyPersonalData.secondLastName }}
            </h3>
            <h3 v-else><b>Nombre: </b>--</h3>
            <button class="get-word-file-button" @click="getCandidateCV">
                <fa class="get-word-file-icon" icon="fa-solid fa-file-word" />Descargar CV
            </button>
        </div>
        <div class="accordion-container" v-if="jobCallStore.applyPersonalData && jobCallStore.applyCVData.length > 0">
            <PersonalDataAccordion />
            <AcademicTrainingAccordion />
            <LanguagesAccordion />
            <CurrentProfessionalAccordion />
            <JobExperienceAccordion />
            <TeachingExperienceAccordion />
            <CoursesAndSeminarsAccordion />
            <PublicationsAccordion />
            <ConsultingsAndResearchsAccordion />
            <AwardsAccordion />
            <AffiliationsAccordion />
            <JobReferencesAccordion />
            <FamilyReferencesAccordion />
        </div>
        <div v-else class="msg-container">
            <p>No existe información del candidato</p>
        </div>
    </div>
</template>
<script>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from "vue-router"
import { useJobCallStore } from '../../store/job-call';
import CVFile from '../../class/cv-file'
import { getCV } from '../../helpers/get-cv-data'
import PersonalDataAccordion from '../../components/cv-accordion-sections/PersonalDataAccordion.vue';
import AcademicTrainingAccordion from '../../components/cv-accordion-sections/AcademicTrainingAccordion.vue';
import LanguagesAccordion from '../../components/cv-accordion-sections/LanguagesAccordion.vue'
import CurrentProfessionalAccordion from '../../components/cv-accordion-sections/CurrentProfessionalAccordion.vue'
import JobExperienceAccordion from '../../components/cv-accordion-sections/JobExperienceAccordion.vue'
import TeachingExperienceAccordion from '../../components/cv-accordion-sections/TeachingExperienceAccordion.vue'
import CoursesAndSeminarsAccordion from '../../components/cv-accordion-sections/CoursesAndSeminarsAccordion.vue'
import PublicationsAccordion from '../../components/cv-accordion-sections/PublicationsAccordion.vue'
import ConsultingsAndResearchsAccordion from '../../components/cv-accordion-sections/ConsultingsAndResearchsAccordion.vue'
import AwardsAccordion from '../../components/cv-accordion-sections/AwardsAccordion.vue'
import AffiliationsAccordion from '../../components/cv-accordion-sections/AffiliationsAccordion.vue'
import JobReferencesAccordion from '../../components/cv-accordion-sections/JobReferencesAccordion.vue'
import FamilyReferencesAccordion from '../../components/cv-accordion-sections/FamilyReferencesAccordion.vue'
export default {
    components: {
        PersonalDataAccordion,
        AcademicTrainingAccordion,
        LanguagesAccordion,
        CurrentProfessionalAccordion,
        JobExperienceAccordion,
        TeachingExperienceAccordion,
        CoursesAndSeminarsAccordion,
        PublicationsAccordion,
        ConsultingsAndResearchsAccordion,
        AwardsAccordion,
        AffiliationsAccordion,
        JobReferencesAccordion,
        FamilyReferencesAccordion
    },
    setup(props) {
        const router = useRoute()
        const jobCallStore = useJobCallStore()
        const applyPersonalData = ref({})
        onBeforeMount(async () => {
            await jobCallStore.getTeacherApplyById(router.params.id)
            applyPersonalData.value = jobCallStore.applyPersonalData
        })

        const getCandidateCV = () => {

            const personalData = jobCallStore.applyPersonalData
            const cvData = jobCallStore.applyCVData
            const cv = getCV(personalData, cvData)
            const cvFile = new CVFile(cv)
            cvFile.getDoc()
        }

        return { jobCallStore, applyPersonalData, getCandidateCV }
    }
}
</script>
<style scoped lang="scss">
@import '../../styles/buttons.scss';

.main {
    padding: 10px 50px;
}

.basic-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 10px;

}

h3 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    margin: 0px;
}

.accordion-container {
    width: 100%;
    margin-top: 25px;
}

.msg-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.msg-container p {
    font-size: 25px;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    color: #000;
}
</style>
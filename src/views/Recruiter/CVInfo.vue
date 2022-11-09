<template >
    <div class="main">
        <div class="basic-info">
            <h3><b>Información del candidato</b></h3>
            <h3><b>Nombre: </b>Ernesto Vilela Montero</h3>
        </div>
        <div class="accordion-container">
            <PersonalDataAccordion />
            <AcademicTrainingAccordion />
            <LanguagesAccordion />
            <CurrentProfessionalAccordion />
            <JobExperienceAccordion />
            <TeachingExperienceAccordion />
            <CoursesAndSeminarsAccordion />
            <PublicationsAccordion />
            <ConsultingsAndResearchsAccordion/>
            <AwardsAccordion/>
            <AffiliationsAccordion/>
            <JobReferencesAccordion/>
            <FamilyReferencesAccordion/>
        </div>
    </div>
</template>
<script>
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
        JobReferencesAccordion
    }
}
</script>
<style scoped lang="scss">
.main {
    padding: 10px 50px;
}

.basic-info {
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

.accordion-container {
    width: 100%;
    margin-top: 25px;
}
</style>
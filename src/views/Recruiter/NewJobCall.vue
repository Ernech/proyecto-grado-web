<template>
    <div class="main">
        <h3 class="title">Nueva convocatoria</h3>
        <div class="job-call-form">
           <GeneralInformationSection/>
           <FunctionsSection/>
           <AcademicTrainingSection/>
           <JobExperienceSection/>
           <RequiredKnowledge/>
           <AptitudeSection/>    
           <button type="submit">Crear convocatoria</button>
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
export default {
    components: {
    FunctionsSection,
    AcademicTrainingSection,
    JobExperienceSection,
    RequiredKnowledge,
    AptitudeSection,
    GeneralInformationSection
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



</style>
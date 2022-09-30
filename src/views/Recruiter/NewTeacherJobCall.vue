<template>
    <div class="job-call-form">
        <GeneralInformationSectionTeacherVue/>
        <CareerClassesSectionSection/>
        <JobExperienceSection/>
      
    </div>
</template>
<script>
import GeneralInformationSectionTeacherVue from '../../components/job-call-teacher-form/GeneralInformationSectionTeacher.vue';
import CareerClassesSectionSection from '../../components/job-call-teacher-form/CareerClassesSection.vue'
import JobExperienceSection from '../../components/job-call-teacher-form/JobExperienceSection.vue'
export default {
    components:{
    GeneralInformationSectionTeacherVue,
    CareerClassesSectionSection,
    JobExperienceSection
},

}
</script>
<style>
    .job-call-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>
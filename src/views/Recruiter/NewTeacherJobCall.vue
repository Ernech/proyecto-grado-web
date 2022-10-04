<template>
    <div class="job-call-form">
        <GeneralInformationSectionTeacherVue />
        <JobExperienceSection />
        <CareerClassesSectionSection />
        <div class="button-container">
            <button class="add_button" @click="createNewTeacherJobCall" :disabled="isDisabled"
                :class="{disabled:isDisabled}">Crear convocatoria</button>
        </div>
    </div>
</template>
<script>
import GeneralInformationSectionTeacherVue from '../../components/job-call-teacher-form/GeneralInformationSectionTeacher.vue';
import CareerClassesSectionSection from '../../components/job-call-teacher-form/CareerClassesSection.vue'
import JobExperienceSection from '../../components/job-call-teacher-form/JobExperienceSection.vue'
import { onBeforeMount, computed } from 'vue';
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
export default {
    components: {
        GeneralInformationSectionTeacherVue,
        CareerClassesSectionSection,
        JobExperienceSection
    },

    setup(props) {
        const teacherJobCallsStore = useTeacherJobCallStore()
        onBeforeMount(async () => {
            await teacherJobCallsStore.getCollegeClasses()
        })
        const isDisabled = computed(() => {
            const today = new Date()
            if (teacherJobCallsStore.jobCallName !== null && teacherJobCallsStore.jobCallName !== ''
                && teacherJobCallsStore.jobCallNumber !== null && teacherJobCallsStore.jobCallNumber !== ''
                && teacherJobCallsStore.jobManualFile !== null && teacherJobCallsStore.jobManualFile !== '') {

                if (teacherJobCallsStore.closingDate > teacherJobCallsStore.openingDate && teacherJobCallsStore.openingDate > today) {
                    if (teacherJobCallsStore.collegeClassesToDB.length >= 1) {
                        return false;
                    }
                }

            }
            return true
        })
        const createNewTeacherJobCall = async () => {
            await teacherJobCallsStore.createTeacherJobCall()
        }
        return { createNewTeacherJobCall, isDisabled }

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
<template>
    <div class="job-call-form">
        <GeneralInformationSectionTeacherVue />
        <JobExperienceSection />
        <CareerClassesSectionSection />
        <button class="add-button" @click="createNewJobCall" :class="{disabled:isDisabled}" :disabled="isDisabled">Crear convocatoria</button>
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

                if (teacherJobCallsStore.closingDate>teacherJobCallsStore.openingDate && teacherJobCallsStore.openingDate>today) {
                    if (teacherJobCallsStore.collegeClassesToDB.length >= 1) {
                        return false;
                    }
                }

            }
            return true
        })
        const createNewJobCall = async () => {
            await teacherJobCallsStore.createJobCall()
        }
        return { createNewJobCall ,isDisabled}

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
</style>
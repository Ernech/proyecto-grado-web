<template>
    <div class="container">
        <div class="form-input-container">
            <label for="code" class="form-label">Sigla</label>
            <input class="form-input" type="text" id="code" maxlength="10" v-model="teacherJobCallStore.code" @change="getJobCallByCode"/>
        </div>
        <div class="form-input-container">
            <label for="college-class" class="form-label">Materia</label>
            <input class="form-input" type="text" id="college-class" maxlength="100" v-model="teacherJobCallStore.name" disabled/>
        </div>
        <div class="form-input-container">
            <label for="required-number" class="form-label">Paralelos</label>
            <input class="form-input" type="number" min="1" max="7" id="required-number" maxlength="10" v-model="teacherJobCallStore.requiredNumber">
        </div>
    </div>

</template>
<script setup>
import { ref,computed } from 'vue'
import { useTeacherJobCallStore  } from '../../../store/teacher-job-call' ;
const teacherJobCallStore = useTeacherJobCallStore()
const collegeClass = ref({})
const getJobCallByCode =()=>{
    collegeClass.value = teacherJobCallStore.collegeClassesFromDB.find(obj=> obj.code===teacherJobCallStore.code)
    if(collegeClass.value){
        teacherJobCallStore.name=collegeClass.value.name
        teacherJobCallStore.id=collegeClass.value.id
    }
}
const filterCollegeClasses = computed(()=>{

    if(teacherJobCallStore.code===''){
        return []
    }

    return teacherJobCallStore.collegeClassesFromDB.filter(collegeClass => collegeClass.code.toUpperCase().includes(teacherJobCallStore.code))



})

</script>
<style lang="scss" scoped>
@import '../../../styles/inputs.scss';

.container {
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 2fr;
    width: 95%;
    column-gap: 20px;
    row-gap: 10px;
    align-items: center;
    justify-content: center;

}
</style>
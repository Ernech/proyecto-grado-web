<template>
    <div class="container">
        <div class="form-input-container">
            <label for="code" class="form-label">Sigla</label>
            <input class="form-input" type="text" id="code" autocomplete="off" maxlength="10"
                v-model.trim="teacherJobCallStore.code" @input="filterCollegeClasses" @change="getJobCallByCode"
                @focus="suggestionList=true" />
            <div class="class-code-list" v-if="filterCollegeClasses.length>0 && suggestionList">
                <ul>
                    <li v-for="item in filterCollegeClasses" @click="getCollegeClassByCode(item)">
                        {{item.code}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="form-input-container">
            <label for="college-class" class="form-label">Materia</label>
            <input class="form-input" type="text" id="college-class" maxlength="100" v-model.trim="teacherJobCallStore.name"
                disabled />
        </div>
        <div class="form-input-container">
            <label for="required-number" class="form-label">Paralelos</label>
            <input class="form-input" type="number" min="1" max="7" id="required-number" maxlength="10"
                v-model="teacherJobCallStore.requiredNumber">
        </div>
    </div>

</template>
<script setup>
import { ref, computed } from 'vue'
import { useTeacherJobCallStore } from '../../../store/teacher-job-call';
const teacherJobCallStore = useTeacherJobCallStore()
const collegeClass = ref({})
const suggestionList = ref(false)
const getCollegeClassByCode = (item) => {
    collegeClass.value = teacherJobCallStore.collegeClassesFromDB.find(obj => obj.code === item.code)
    if (collegeClass.value) {
        teacherJobCallStore.code = collegeClass.value.code
        teacherJobCallStore.name = collegeClass.value.name
        teacherJobCallStore.id = collegeClass.value.id
    }
    suggestionList.value = false
}
const filterCollegeClasses = computed(() => {

    if (teacherJobCallStore.code === '') {
        return teacherJobCallStore.collegeClassesFromDB
    }

    return teacherJobCallStore.collegeClassesFromDB
        .filter(collegeClass => collegeClass.code.toUpperCase().startsWith(teacherJobCallStore.code))



})

</script>
<style lang="scss" scoped>
@import '../../../styles/inputs.scss';

.container {
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 3fr;
    width: 95%;
    column-gap: 20px;
    row-gap: 10px;
    align-items: center;
    justify-content: center;
    position: static;
    z-index: 1;

}

.class-code-list {
    width: 105%;
    z-index: 10;
    margin: 0px;
    
}

.class-code-list ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    list-style-type: none;
    margin: 0px 5px;
    gap: 3px;
    z-index: 100;
    background-color: #fff;
    border: 0.5px solid #a7a7a7;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding-left: 5px;
    width: 16%;
}

.class-code-list ul li {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    width: 100%;
}

.class-code-list ul li:hover {
    background: #ececec;

}
</style>
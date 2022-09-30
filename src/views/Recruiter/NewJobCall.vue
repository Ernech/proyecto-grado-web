<template>
    <div class="main">
        <h3 class="title">Nueva convocatoria</h3>
        <div class="form-input-container">
            <label class="form-label">Cargo</label>
            <select class="form-input" v-model="jobCallType">
                <option>Administrativo</option>
                <option>Docente</option>
            </select>
        </div>
        <div v-if="jobCallType==='Administrativo'">
            <NewADMJobCallVue />
        </div>
        <div v-else>
            <NewTeacherJobCall />
        </div>

    </div>
</template>
<script>
import NewADMJobCallVue from './NewADMJobCall.vue';
import NewTeacherJobCall from './NewTeacherJobCall.vue'
import { ref } from 'vue';
export default {

    components: {
        NewADMJobCallVue,
        NewTeacherJobCall
    }, setup() {
        const jobCallType = ref('Administrativo')

        return { jobCallType }

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

.form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
    margin-top: 10px;

}

.form-input {
    width: 100%;
    height: 25px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}
</style>
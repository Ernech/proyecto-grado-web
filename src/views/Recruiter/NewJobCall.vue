<template>
    <div class="main">
        <h3 class="title">Nueva convocatoria</h3>
        <div class="job-call-form">
            <div class="form-input-container">
                <label for="manual" class="form-label">Manual de puesto</label>
                <input class="form-input" type="text" id="manual">
            </div>
            <div class="form-input-container">
                <label for="number-job-call" class="form-label">Número de convocatoria</label>
                <input class="form-input" type="text" id="number-job-call">
            </div>
            <div class="form-input-container">
                <label for="objective" class="form-label">Objetivo del cargo</label>
                <textarea class="form-input" type="text" id="objective"></textarea>
            </div>
           <FunctionsSection/>
           <AcademicTrainingSection/>
            
        </div>
    </div>
</template>
<script>
import FunctionsSection from '../../components/job-call-form-sections/FunctionsSection.vue';
import AcademicTrainingSection from '../../components/job-call-form-sections/AcademicTrainingSection.vue';
export default {
    components: {
    FunctionsSection,
    AcademicTrainingSection,
    
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

.form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    padding: 10px;
    width: 100%;

}

.form-input-container textarea {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    padding: 10px 15px;
    font-size: 15px;

}

.form-input-container label {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;

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
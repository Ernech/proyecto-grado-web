<template>
    <div>
        <div class="modal-overlay">
            <div class="modal">
                <h3 class="title">Agregar materia</h3>
                <CareerClassSection/>
                <TeacherAcademicTrainingSection/>
                <button @click="$emit('close-modal')">Cerrar</button>
            </div>

        </div>
    </div>
</template>
<script setup>
import CareerClassSection from './add-career-modal-sections/CareerClassSection.vue'
import TeacherAcademicTrainingSection from './add-career-modal-sections/TeacherAcademicTrainingSection.vue'
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000da;
    margin-left: 360px;
    overflow-y: scroll;
}

.modal {
    margin: 0px;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 75%;
    width: 85%;
    padding: 30px;
    border-radius: 20px;
    align-items: center;
    gap: 20px;

}
.title {
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-size: 30px;
    color: #064D90;
    margin: 0px;
    align-self: flex-start;
        
}
</style>
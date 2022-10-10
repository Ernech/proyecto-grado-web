<template>
    <div>
        <div class="modal-overlay">
            <div class="modal">
                <h3 class="title">Candidatos</h3>
                <div class="button_container">
                    <button class="back-button" @click="$emit('close-modal')">Cerrar</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
import { computed } from 'vue';
const teacherJobCallStore = useTeacherJobCallStore()
props:{
    
}


</script>
<style lang="scss" scoped>
@import '../../styles/buttons.scss';

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

}

.modal {
    margin: 0px;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 65%;
    width: 85%;
    padding: 30px;
    border-radius: 20px;
    align-items: center;
    gap: 20px;
    overflow-y: scroll;

}

.title {
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-size: 30px;
    color: #064D90;
    margin: 0px;
    align-self: flex-start;

}

.button_container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 5px;
    width: 95%;
}
</style>
<template>
    <div>
        <div class="modal-overlay">
            <div class="modal">
                <h3 class="title">Candidatos</h3>
                <table>
            <thead>
                <tr>
                    <th class="code-column">Nombre</th>
                    <th class="code-column">Apellido Paterno</th>
                    <th class="class-name-column">Apellido Materno</th>
                    <th class="candidates-column">Fecha de postulación</th>
                    <th class="cv-column">CV</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in candidates" :key="index" class="college-classes-list"> 
                    <td>
                        {{item.applyTPersonalData.name}}
                    </td>    
                    <td>
                        {{item.applyTPersonalData.firstLastName}}
                    </td>
                    <td>
                       {{item.applyTPersonalData.secondLastName}}
                    </td>
                    <td>
                       {{formatDate(item.applyDate)}}
                    </td>
                    <td class="cv-cell">
                        <fa class="word-file" icon="fa-solid fa-file-word" @click="getCandidateCV(item)"/>
                    </td>
                </tr>
                

            </tbody>
        </table>
                <button class="back-button" @click="$emit('close-modal')">Cerrar</button>
                
            </div>

        </div>
    </div>
</template>
<script>
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
import { getCV } from '../../helpers/get-cv-data';
import { computed } from 'vue';
import CVFile from '../../class/cv-file'
export default{
    props:{
        candidates:{type:Array,required:true}
    },

    setup(props){
        const teacherJobCallStore = useTeacherJobCallStore()

        const formatDate = (itemDate) =>{
            const date = new Date(itemDate);
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        }

        const getCandidateCV=(item) =>{
            
           const personalData = item.applyTPersonalData
           const cvData = item.applyTCVData
           const cv = getCV(personalData,cvData)
           const cvFile = new CVFile(cv)
           cvFile.getDoc()
        }

        return {formatDate,getCandidateCV}
    }

}


</script>
<style lang="scss" scoped>
@import '../../styles/buttons.scss';
@import '../../styles/tables.scss';
@import '../../styles/icons.scss';
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
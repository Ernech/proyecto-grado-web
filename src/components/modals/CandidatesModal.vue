<template>
    <div>
        <div class="modal-overlay">
            <div class="modal">
                <h3 class="title">Candidatos</h3>
                <h3 class="teacher-job-call-info">CONVOCATORIA N°{{ collegeClassJobCallCode }}</h3>
                <h3 class="teacher-job-call-info">{{ collegeClassInfo.code }} {{ collegeClassInfo.name }}</h3>
                <b>Total de postulantes: <span v-if="candidates">{{ candidates.length }}</span>
                    <span v-else>0</span></b>
                <!-- <button class="xlsx-button-modal" v-if="candidates && candidates.length > 0">
                    <fa class="excel-icon" icon="fa-solid fa-file-excel" />Planilla
                </button> -->
                <!-- <div v-if="candidates && candidates.length > 0" class="search-container">
                    <label for="search-input">Buscar candidato</label>
                    <input id="search-input" type="text" class="search-candidate-input"
                        placeholder="Ingrese el nombre del candidato" v-model="searchCandidate"
                        @input="filtercandidates">
                </div> -->
                <div class="table-container" v-if="candidates && candidates.length > 0">
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
                            <tr v-for="(item, index) in candidates" :key="index" class="college-classes-list" @click="toCvInfo(item.id)">
                                <td>
                                    {{ item.applyTPersonalData.name }}
                                </td>
                                <td>
                                    {{ item.applyTPersonalData.firstLastName }}
                                </td>
                                <td>
                                    {{ item.applyTPersonalData.secondLastName }}
                                </td>
                                <td>
                                    {{ formatDate(item.applyDate) }}
                                </td>
                                <td class="cv-cell">
                                    <fa class="word-file" icon="fa-solid fa-file-word" @click="getCandidateCV(item)" />
                                </td>
                            </tr>


                        </tbody>
                    </table>
                    <!-- <div class="paginator-container">
                        <div class="page-items-container">
                            <label for="items-number">Número de filas</label>
                            <input id="items-number" type="number" v-model="pageItems" class="page-items-input" min="1"
                                :max="candidates.length" @input="onClickHandler(1)">
                        </div>
                        <vue-awesome-paginate :total-items="candidates.length" :items-per-page="pageItems"
                            :max-pages-shown="5" :current-page="1" :on-click="onClickHandler"
                            paginate-buttons-class="btn" active-page-class="btn-active" back-button-class="back-btn"
                            next-button-class="next-btn" />
                    </div> -->
                </div>
                <p v-else>No existen candidatos postulados</p>
                <button class="back-button" @click="$emit('close-modal')">Cerrar</button>

            </div>

        </div>
    </div>
</template>
<script>
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
import { getCV } from '../../helpers/get-cv-data';
import {ref, onBeforeMount } from 'vue';
import CVFile from '../../class/cv-file'
import router from '../../routes/recruiter-router'
export default {
    props: {
        candidates: { type: Array, required: true },
        collegeClassJobCallCode: { type: String, required: true },
        collegeClassInfo: { type: Object, required: true }
    },

    setup(props) {
        const pageItems = ref(1)
        const pagedData = ref([]);
        const teacherJobCall = useTeacherJobCallStore()
        const searchCandidate = ref('')
        const candidatesList = ref(props, 'candidates')
        const aux = ref(props, 'candidates')
        const formatDate = (itemDate) => {
            const date = new Date(itemDate);
            date.setHours(date.getHours()-4)
            return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        }
        const getCandidateCV = (item) => {

            const personalData = item.applyTPersonalData
            const cvData = item.applyTCVData
            const cv = getCV(personalData, cvData)
            const cvFile = new CVFile(cv)
            cvFile.getDoc()
        }
        const onClickHandler = page => {
            pagedData.value = teacherJobCall.getCandidatesPagedList(page, pageItems.value, props.candidates)

        }
        const filtercandidates = () => {
            // candidatesList.value=aux.value
            // if (searchCandidate.value && searchCandidate.value !== '') {
            //     candidatesList.value = aux.value.filter(obj => obj.applyTPersonalData.name.search(searchCandidate.value) > -1)
            //     console.log(candidatesList.value);
            // }
            // onClickHandler(1)

        }
        const toCvInfo = (id) => {
            router.push({ name: 'CVTeacherInfo', params: { id } })
        }
        return { formatDate, getCandidateCV, pagedData, pageItems, onClickHandler, filtercandidates, searchCandidate,toCvInfo }
    }

}


</script>
<style lang="scss" scoped>
@import '../../styles/buttons.scss';
@import '../../styles/tables.scss';
@import '../../styles/icons.scss';
@import '../../styles/inputs.scss';

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
    gap: 15px;
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

.table-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
}

.modal p {
    font-size: 25px;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    color: #000;
}

.teacher-job-call-info {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    margin: 0px;
    align-self: flex-start;
}

b {
    font-family: 'Inter';
    font-size: 15px;
    align-self: flex-start;
}

b span {
    font-weight: normal;
    font-size: 15px;
    align-self: flex-start;
}

.paginator-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 15px;
    width: 80%;
}

.btn {
    height: 30px;
    width: 30px;
    border: #ddd solid 1px;
    cursor: pointer;
    border-radius: 5px;
    color: #0B0273;
    background-color: #fff;
}

.btn:hover {
    background-color: rgb(211, 211, 211);
}

.back-btn {
    background-color: #fff;
}

.next-btn {
    background-color: #fff;
}

.btn-active {
    background-color: #0B0273;
    color: white;
}

.page-items-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-self: center;
}

.page-items-container label {
    font-family: 'Nunito';
    font-size: 15px;
    color: #000;
    align-self: center;

}

.page-items-input {
    width: 35px;
    height: 25px;
    border-radius: 5px;
    border: #aaa solid 1px;

}

.page-items-input:focus {
    border: #ccc solid 1px;
}
</style>
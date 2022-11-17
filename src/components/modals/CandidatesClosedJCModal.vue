<template>
    <div>
        <div class="modal-overlay">
            <div class="modal">
                <h3 class="title">Candidatos</h3>
                <h3 class="teacher-job-call-info">CONVOCATORIA N°{{ collegeClassJobCallCode }}</h3>
                <h3 class="teacher-job-call-info">{{ collegeClassInfo.code }} {{ collegeClassInfo.name }}</h3>
                <b>Total de postulantes: <span v-if="candidates">{{ candidates.length }}</span>
                    <span v-else>0</span></b>
                <button class="xlsx-button-modal" v-if="candidates && candidates.length > 0">
                    <fa class="excel-icon" icon="fa-solid fa-file-excel" />Planilla
                </button>
                <div class="table-container" v-if="candidates && candidates.length > 0">
                    <div class="buttons-container">
                        <button
                            @click="tableTab = 'ACEPTED'; acceptedTab = true; rejectedTab = false; onClickHandler(1)"
                            class="buttons-container__tab" :class="{ selected: acceptedTab }">Candidatos
                            habilitados|{{ getAcceptedCandidates.length }}</button>
                        <button
                            @click="tableTab = 'REJECTED'; acceptedTab = false; rejectedTab = true; onClickHandler(1)"
                            class="buttons-container__tab" :class="{ selected: rejectedTab }">Candidatos no
                            habilitados |{{ getRejectedCandidates.length }}</button>
                    </div>
                    <table :style="'width:100%'">
                        <thead>
                            <tr>
                                <th class="code-column">Nombre</th>
                                <th class="code-column">Apellido Paterno</th>
                                <th class="class-name-column">Apellido Materno</th>
                                <th class="candidates-column">Fecha de postulación</th>
                                <th class="cv-column">CV</th>
                            </tr>
                        </thead>
                        <tbody v-if="tableTab === 'ACEPTED'">
                            <tr v-for="(item, index) in pagedData" :key="index" class="college-classes-list"
                                @click="toCvInfo(item.id)">
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
                                    {{ item.applyDate }}
                                </td>
                                <td class="cv-cell">
                                    <fa class="word-file" icon="fa-solid fa-file-word" @click="getCandidateCV(item)" />
                                </td>
                            </tr>

                        </tbody>
                        <tbody v-else>
                            <tr v-for="(item, index) in pagedData" :key="index" class="college-classes-list"
                                @click="toCvInfo(item.id)">
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
                                    {{ item.applyDate }}
                                </td>
                                <td class="cv-cell">
                                    <fa class="word-file" icon="fa-solid fa-file-word" @click="getCandidateCV(item)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paginator-container" v-if="candidates">
                        <div class="page-items-container">
                            <label for="items-number">Número de filas</label>
                            <input id="items-number" type="number" v-model="pageItems" class="page-items-input" min="1"
                                :max="totalItems" @input="onClickHandler(1)">
                        </div>
                        <vue-awesome-paginate :total-items="totalItems" :items-per-page="pageItems" :max-pages-shown="5"
                            :current-page="1" :on-click="onClickHandler" paginate-buttons-class="btn"
                            active-page-class="btn-active" back-button-class="back-btn" next-button-class="next-btn" />
                    </div>
                </div>
                <p v-else>No existen candidatos postulados</p>
                <button class="back-button" @click="$emit('close-modal')">Cerrar</button>

            </div>

        </div>
    </div>
</template>
<script>
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
import { ref, computed } from 'vue'
import CVFile from '../../class/cv-file'
import router from '../../routes/recruiter-router'
export default {
    props: {
        candidates: { type: Array, required: true },
        collegeClassJobCallCode: { type: String, required: true },
        collegeClassInfo: { type: Object, required: true }
    },

    setup(props) {
        const teacherJobCallStore = useTeacherJobCallStore()
        const tableTab = ref('ACEPTED')
        const acceptedTab = ref(true)
        const rejectedTab = ref(false)
        const pageItems = ref(1)
        const pagedData = ref([]);

        const getAcceptedCandidates = computed(() => {
            return props.candidates.filter(obj => obj.applyStatus === 'ACEPTED')
        })
        const getRejectedCandidates = computed(() => {
            return props.candidates.filter(obj => obj.applyStatus === 'REJECTED')
        })
        const getCandidateCV = (item) => {

            const personalData = item.applyTPersonalData
            const cvData = item.applyTCVData
            const cv = getCV(personalData, cvData)
            const cvFile = new CVFile(cv)
            cvFile.getDoc()
        }

        const toCvInfo = (id) => {
            router.push({ name: 'CVTeacherInfo', params: { id } })
        }

        const totalItems = computed(() => {
            return tableTab.value === 'ACEPTED' ? props.candidates.filter(obj => obj.applyStatus === 'ACEPTED').length : props.candidates.filter(obj => obj.applyStatus === 'REJECTED').length

        })
        const onClickHandler = (page) => {
            const listItems = tableTab.value === 'ACEPTED' ? props.candidates.filter(obj => obj.applyStatus === 'ACEPTED') : props.candidates.filter(obj => obj.applyStatus === 'REJECTED')
            pagedData.value = teacherJobCallStore.getCandidatesPagedList(page, pageItems.value, listItems)

        }
        return { tableTab, acceptedTab, rejectedTab, getAcceptedCandidates, getRejectedCandidates, getCandidateCV, toCvInfo, totalItems, onClickHandler, pageItems, pagedData }
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
    gap: 10px;
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

.buttons-container {
    display: flex;
    flex-direction: row;
    justify-self: flex-start;
    gap: 0px;
    width: 100%;
    align-self: flex-start;
}

.buttons-container__tab {
    background-color: #1001af;
    color: #fff;
    border-radius: 10px 10px 0px 0px;
    height: 30px;
    border: #1001af;
}

.buttons-container__tab.selected {
    background-color: #0B0273;
    height: 30px;
    border: #0B0273;
}

.table-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
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

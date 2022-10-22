<template>
    <div>
        <div class="modal-overlay">
            <div class="modal">
                <h3 class="title">Candidatos</h3>
                <div class="table-container">
                    <div class="buttons-container">
                        <button @click="tableTab='ACEPTED'; acceptedTab=true;rejectedTab=false;"
                            class="buttons-container__tab" :class="{selected:acceptedTab}">Candidatos
                            habilitados|{{getAcceptedCandidates.length}}</button>
                        <button @click="tableTab='REJECTED'; acceptedTab=false;rejectedTab=true;"
                            class="buttons-container__tab" :class="{selected:rejectedTab}">Candidatos no
                            habilitados |{{getRejectedCandidates.length}}</button>
                    </div>
                    <table :style="'width:100%'">
                        <thead>
                            <tr>
                                <th class="code-column">Nombre</th>
                                <th class="code-column">Apellido Paterno</th>
                                <th class="class-name-column">Apellido Materno</th>
                                <th class="candidates-column">Fecha de postulación</th>
                            </tr>
                        </thead>
                        <tbody v-if="tableTab==='ACEPTED'">
                            <tr v-for="(item,index) in getAcceptedCandidates" :key="index" class="college-classes-list">
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
                                    {{item.applyDate}}
                                </td>

                            </tr>

                        </tbody>
                        <tbody v-else>
                            <tr v-for="(item,index) in getRejectedCandidates" :key="index" class="college-classes-list">
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
                                    {{item.applyDate}}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="back-button" @click="$emit('close-modal')">Cerrar</button>

            </div>

        </div>
    </div>
</template>
<script>
import { useTeacherJobCallStore } from '../../store/teacher-job-call';
import { ref, computed } from 'vue'
export default {
    props: {
        candidates: { type: Array, required: true }
    },

    setup(props) {
        const teacherJobCallStore = useTeacherJobCallStore()
        const tableTab = ref('ACEPTED')
        const acceptedTab = ref(true)
        const rejectedTab = ref(false)
        const getAcceptedCandidates = computed(() => {
            return props.candidates.filter(obj => obj.applyStatus === 'ACEPTED')
        })
        const getRejectedCandidates = computed(() => {
            return props.candidates.filter(obj => obj.applyStatus === 'REJECTED')
        })
        return { tableTab, acceptedTab, rejectedTab, getAcceptedCandidates, getRejectedCandidates }
    }

}


</script>
<style lang="scss" scoped>
@import '../../styles/buttons.scss';
@import '../../styles/tables.scss';

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
</style>
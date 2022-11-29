<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Formación Académica</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon" />
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon" />
        </div>
        <div class="content" v-if="isOpen">
            <table v-if="jobCallStore.getAcademicTrainings.length > 0">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Universidad/centro/instituto</th>
                        <th>Grado</th>
                        <th>Titulo 1</th>
                        <th>Titulo 2</th>
                        <th class="data_date">Fecha de titulación</th>
                    </tr>

                </thead>
                <tbody>
                    <tr v-for="(item, index) in jobCallStore.getAcademicTrainings" :key="index">

                        <td>{{ item.title }}</td>
                        <td>{{ item.institution }}</td>
                        <td>{{ item.degree }}</td>
                        <td v-if="item.professionalTitleFile">
                            <fa icon="fa-solid fa-file-pdf" class="pdf-icon"
                                @click="downloadFile(item.professionalTitleFileName, item.id)" />
                        </td>
                        <td v-else>
                            <fa icon="fa-solid fa-file-pdf" class="pdf-icon-disabled" />
                        </td>
                        <td v-if="item.professionalNTitleFile">
                            <fa icon="fa-solid fa-file-pdf" class="pdf-icon" />
                        </td>
                        <td v-else>
                            <fa icon="fa-solid fa-file-pdf" class="pdf-icon-disabled" />
                        </td>
                        <td>{{ item.degreeDate }}</td>
                    </tr>


                </tbody>
            </table>
            <p v-else>No existe información</p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useJobCallStore } from '../../store/job-call';
import axios from 'axios';
const isOpen = ref(false)
const jobCallStore = useJobCallStore()
const changeAccordeonStatus = () => {
    if (isOpen.value) {
        isOpen.value = false
        return
    }
    isOpen.value = true
}
const downloadFile = (fileName, id) => {
    console.log(id);
    axios({
        url: `http://localhost:3000/file/proffesional-title/${id}`, // File URL Goes Here
        method: 'GET',
        responseType: 'arraybuffer',
    }).then((res) => {
        console.log(res);
        var fileURL = window.URL.createObjectURL(new Blob([res.data]), { type: 'application/pdf' });
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);

        fileLink.click();


    }).catch(err => {
        console.log(err);
    });
}
</script>
<style lang="scss" scoped>
@import '../../styles/accordion.scss';
@import '../../styles/tables.scss';

.pdf-icon {
    width: 15px;
    height: 20px;
    color: #F40F02;
}

.pdf-icon-disabled {
    width: 15px;
    height: 20px;
    color: #aaa2a1;
}

.pdf-icon:hover {
    width: 15px;
    height: 20px;
    color: #E00F01;
}
</style>
<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Idiomas</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="content" v-if="isOpen">
            <table>
            <thead>
                <tr>
                    <th class="language-column">Idioma</th>
                    <th class="writing-column">Escritura</th>
                    <th class="reading-column">Lectura</th>
                    <th class="listening-column">Habla</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="(item, index) in cvStore.getLanguages" :key="index">
                    <td>{{item.language}}</td>
                    <td>{{item.writing}}</td>
                    <td>{{item.reading}}</td>
                    <td>{{item.speacking}}</td>
                </tr> -->


            </tbody>
        </table>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
const isOpen=ref(false)

const changeAccordeonStatus=()=>{
    if(isOpen.value){
        isOpen.value=false
        return
    }
    isOpen.value=true
}
</script>
<style lang="scss" scoped>
@import '../../styles/accordion.scss';

</style>
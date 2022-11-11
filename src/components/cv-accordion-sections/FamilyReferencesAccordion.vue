<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Referencias laborales</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon" />
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon" />
        </div>
        <div class="content" v-if="isOpen">
            <table v-if="jobCallStore.getFamilyReferences.length > 0">
                <thead>
                    <tr>
                        <th>Nombre del pariente</th>
                        <th>Cargo administrativo o académico</th>
                        <th class="data_date">Año de ingreso a la UCB</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in jobCallStore.getFamilyReferences" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.position }}</td>
                        <td>{{ item.teachingUCBStartYear }}</td>
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
const isOpen = ref(false)
const jobCallStore = useJobCallStore()
const changeAccordeonStatus = () => {
    if (isOpen.value) {
        isOpen.value = false
        return
    }
    isOpen.value = true
}
</script>
<style lang="scss" scoped>
@import '../../styles/accordion.scss';
</style>
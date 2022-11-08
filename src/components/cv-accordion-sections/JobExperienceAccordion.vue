<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Experiencia profesional</h3>
            <fa v-if="!isOpen" icon="fa-solid fa-chevron-down" class="arrow-icon"/>
            <fa v-else icon="fa-solid fa-chevron-up" class="arrow-icon"/>
        </div> 
        <div class="content" v-if="isOpen">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, dicta, eius aliquid commodi sint similique ea ducimus facilis amet harum corrupti. Enim mollitia culpa dicta accusantium similique dolore quibusdam? Quod.</p>
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
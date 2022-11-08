<template>
    <div class="accordion">
        <div class="title" @click="changeAccordeonStatus">
            <h3>Cursos y seminarios impartidos</h3>
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

.accordion{
    width: 100%;
    
}
.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    gap: 650px;
    border-top: rgb(166, 166, 166) solid 1px;
    border-bottom: rgb(166, 166, 166) solid 1px;
}

.title h3 {
    font-family: 'Inter';
    font-size: 20px;
    color: #000;
}

.content{
    padding: 5px;
    margin: 0;
}
.arrow-icon{
    color: #000;
    width: 40px;
    height: 30px;
}
</style>
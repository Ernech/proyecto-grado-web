<template>
    <div class="card-container">
        <h3 class="card-container__job-call-name">{{jobCallName}}</h3>
        <span class="card-container__job-call-number">Convocatoria N°{{jobCallNumber}}</span>
        <div class="card-container__opening-date">
            <fa icon="fa-solid fa-calendar-days" class="opening-date__icon" />
            <span class="opening-date__text">
                Fecha de apertura: {{formatDate}} - Fecha de cierrre: {{formatClosingDate}} </span>
        </div>
    </div>
</template>
<script>
import {computed} from 'vue'
export default {
    props:{
        jobCallName:{type:String,required:true},
        jobCallNumber:{type:String,required:true},
        openingDate:{type:Date,required:true},
        closingDate:{type:Date,required:true}
    },
    setup(props){
        const formatDate = computed(() => {
            const date = new Date(props.openingDate);
            return `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth() + 1)).slice(-2)}-${date.getFullYear()} ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`;
        })
        const formatClosingDate = computed(() => {
            const date = new Date(props.closingDate);
            return `${('0'+date.getDate()).slice(-2)}-${('0'+(date.getMonth() + 1)).slice(-2)}-${date.getFullYear()} ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`;
        })  
        
        return{formatDate,formatClosingDate}
    }
}
</script>
<style scoped>
.card-container {
    width: 88%;
    height: 100px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    gap: 15px;
    background: #fff;
}

.card-container__job-call-name {

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    margin: 0px;
}

.card-container__job-call-number {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
}

.card-container__opening-date {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.opening-date__icon {
    width: 25px;
    height: 25px;
}

.opening-date__text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
}
.card-container:hover{
    width: 90%;
    height: 102px;
    transition: 0.3s;
}
</style>
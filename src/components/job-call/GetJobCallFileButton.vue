<template>
  <div>
    <button class="get-word-file-button" :disabled="isDisabled" :class="{disabled:isDisabled}" @click="reportComponent.getDoc">
      <fa class="get-word-file-icon" icon="fa-solid fa-file-word"/>Descargar convocatoria</button>
  </div>
</template>

<script>
  import {computed} from 'vue'
 import ReportComponent from '../../class/ReportComponent'
 import { useJobCallStore } from '../../store/job-call'
 export default{
  props:{
    item:{type:Object,required:true}
  },
  setup(props){
    const reportComponent = new ReportComponent(props.item)
    const jobCallStore =useJobCallStore()
    const isDisabled = computed(() => {
            if (jobCallStore.jobCallName !== null && jobCallStore.jobCallName !== ''
                && jobCallStore.jobCallNumber !== null && jobCallStore.jobCallNumber !== ''
                && jobCallStore.jobManualFile !== null && jobCallStore.jobManualFile !== ''
                && jobCallStore.jobCallObj !== null && jobCallStore.jobCallObj !== '') {

                if (new Date(jobCallStore.closingDate) > new Date(jobCallStore.openingDate)) {
                    if (jobCallStore.jobFunctions.length >= 1
                        && jobCallStore.academicTrainings.length >= 1
                        && jobCallStore.experiences.length >= 1
                        && jobCallStore.aptitudes.length >= 1
                        && jobCallStore.requiredKnowledgeArray.length >= 1) {
                        return false;
                    }
                }

            }
            return true
        })
    return {reportComponent, isDisabled}
  }
 }
 
</script>


<style scoped>

.get-word-file-button {
    background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px 10px;
    border-color: #0094FF;
    width: 100%;
    font-family: 'Nunito', sans-serif;
   
}
.get-word-file-icon{
  margin: 0px 5px;
}
.get-word-file-button.disabled {
    background-color: #b7b8b9;
    border-color: #b7b8b9;
}
</style>
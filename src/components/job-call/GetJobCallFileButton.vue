<template>
  <div>
    <button @click="reportComponent.getDoc">Download Word Document</button>
  </div>
</template>

<script setup>
/* eslint-disable */
 import ReportComponent from '../../class/ReportComponent'
 const reportComponent = new ReportComponent()
</script>


<style scoped lang="scss">
</style>
<template >
    <div class="container">
        <span class="data-type">{{dataType}}</span>
        <span class="data-info">{{dataInfo}}</span>
    </div>
</template>
<script>
export default {
props:{
    dataType:{type:String,required:true},
    dataInfo:{type:String,required:true},
}
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    gap: 5px;
}

.data-type {
    font-family: 'Inter';
    font-style: normal;
    font-size: 13px;
    color: #9C9B9F;
}

.data-info {
    font-family: 'Inter';
    font-style: normal;
    font-size: 17px;
    color: #000000;
}
</style>
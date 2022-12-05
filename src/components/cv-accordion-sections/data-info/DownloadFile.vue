<template >
    <div class="container">
        <span class="data-type">{{dataType}}</span>
        <span class="data-info">{{dataInfo}} <fa class="download-icon" icon="fa-solid fa-file-arrow-down" @click="$emit('edit')" /></span>
        
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
    padding: 5px;
}
.download-icon {
    color: #5686E1;
    margin: 2px;
    width: 14px;
    height: 20px;


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
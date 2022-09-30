<template>
    <div class="container">
        <div class="form-input-container">
            <label for="code" class="form-label">Sigla</label>
            <input class="form-input" type="text" id="code" maxlength="10">
        </div>
        <div class="form-input-container">
            <label for="career-class" class="form-label">Materia</label>
            <input class="form-input" type="text" id="career-class" maxlength="100">
        </div>
    </div>
    
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import '../../../styles/inputs.scss'; 

.container{
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 1fr;
    width: 95%;
    column-gap: 20px;
    align-items: center;
    justify-content: center;
    
}
</style>
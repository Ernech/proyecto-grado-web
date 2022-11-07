<template >
    <div class="main">
        <div class="basic-info">
            <h3><b>Información del candidato</b></h3>
          <h3><b>Nombre: </b>Ernesto Vilela Montero</h3>
        </div>
        <div class="accordion-container">

        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
.main {
    padding: 10px 50px;
}
.basic-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;

}
h3 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    margin: 0px;
}
.accordion-container{
    width: 100%;
}
</style>
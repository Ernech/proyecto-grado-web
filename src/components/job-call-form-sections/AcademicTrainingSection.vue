<template>
    <div class="academic-training-section">
         <p>Formación Académica</p>
            <div class="form-input-container">
                <label for="function" class="form-label">Formación</label>
                <input class="form-input" type="text" id="function">
            </div>
            <button class="job-call-form__add_button">Agregar formación requerida</button>

        <table>
            <thead>
                <tr>
                    <th>Formación</th>
                    <th>Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>Egreso o Licenciatura en Administración de Empresas, Marketing, Ingeniería Comercial, Comunicación Social o ramas afines</td>
                    <td>
                        <fa icon="fa-solid fa-pen" />
                        <fa icon="fa-solid fa-trash" />
                    </td>
                </tr>
                

            </tbody>
        </table>
    </div>

</template>
<script>
export default {

}
</script>
<style scoped>
.academic-training-section{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 20px;
}
.form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;

}
.form-input-container label {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
}
.form-input {
    width: 100%;
    height: 25px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}
.job-call-form__add_button{
     background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #0094FF;
    width: 25%;
    font-family: 'Nunito', sans-serif;
}
.academic-training-section p{
      font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
    margin-top: 15px;
    margin-bottom: 0px;
}
</style>
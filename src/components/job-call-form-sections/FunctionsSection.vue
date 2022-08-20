<template>
    <div class="functions-section">
         <p>Funciones Generales</p>
            <div class="form-input-container">
                <label for="function" class="form-label">Función</label>
                <input class="form-input" type="text" id="function">
            </div>
            <button class="job-call-form__add_button">Agregar función</button>

        <table>
            <thead>
                <tr>
                    <th>Funcion</th>
                    <th>Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>Coordinar actividades orientadas a la gestión de reclutamiento de estudiantes nuevos.</td>
                    <td>
                        <fa icon="fa-solid fa-pen" />
                        <fa icon="fa-solid fa-trash" />
                    </td>
                </tr>
                <tr>
                    <td>Apoyar en el seguimiento de estudiantes interesados en la Universidad.</td>
                    <td>
                        <fa icon="fa-solid fa-pen" />
                        <fa icon="fa-solid fa-trash" />
                    </td>
                </tr>
                <tr>
                    <td>Mantener la base de datos e información actualizada.</td>
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
.functions-section{
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
    width: 15%;
    font-family: 'Nunito', sans-serif;
}
.functions-section p{
      font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
    margin-top: 15px;
    margin-bottom: 0px;
}
</style>
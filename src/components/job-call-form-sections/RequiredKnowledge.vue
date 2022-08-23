<template>
    <div class="required-kwowledge-section">
        <p>Conocimientos requeridos</p>
        <div class="form-input-container">
            <label for="function" class="form-label">Descripción</label>
            <input class="form-input" type="text" id="function">
        </div>
        <div class="grid-input-section">
            <div class="form-input-container">
                <label class="form-label">Requisito</label>
                <select class="form-input">
                    <option>Indispensable</option>
                    <option>Deseable</option>
                </select>
            </div>
            <div class="form-input-container">
                <label class="form-label">Nivel requerido</label>
                <select class="form-input">
                    <option>Básico</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                </select>
            </div>
        </div>
         <button class="job-call-form__add_button">Agregar conocimiento requerido</button>
         <table>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Nivel requerido</th>
                    <th>Requisito</th>
                    <th>Acciones</th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <td>Idioma Ingles</td>
                     <td>Intermedio</td>
                     <td>Deseable</td>
                    <td>
                        <fa icon="fa-solid fa-pen" />
                        <fa icon="fa-solid fa-trash" />
                    </td>
                </tr>
                  <tr>
                    <td>Ofimática: manejo de Word, Excel, Power Point, Outlook,Correo electrónico y otras aplicaciones para el soporte administrativo de la oficina</td>
                     <td>Intermedio</td>
                     <td>Indispensable</td>
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
.required-kwowledge-section {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px;
    gap: 20px;
}

.required-kwowledge-section p {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 15px;
    margin-top: 15px;
    margin-bottom: 0px;
}

.form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;

}

.form-input {
    width: 100%;
    height: 25px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}

.grid-input-section {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 1fr;
    gap: 1.5%;
}

.grid-input-section .form-input-container {
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
.job-call-form__add_button{
     background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 5px;
    border-color: #0094FF;
    width: 25%;
    font-family: 'Nunito', sans-serif;
}
</style>
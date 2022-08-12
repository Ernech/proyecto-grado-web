<template >
    <div class="main">
        <div class="grid-item-1">

            <img src="../../assets/cropped-logo-UCB.png">

            <h3 class="grid-item-1__text">Departamento de recursos humanos</h3>

        </div>
        <div class="grid-item-2">
            <div class="card-container">
                <h3 class="card-container__text">Bienvenido</h3>
                <div class="form">
                    <form @submit.prevent="handleSubmit">
                        <div class="form-input-container">
                            <label for="email" class="form-label">Correo electrónico</label>
                            <input class="form-input" type="email" placeholder="Ingrese su correo electrónico"
                                id="email" v-model.trim="email">
                        </div>
                        <div class="form-input-container">
                            <label for="password" class="form-label">Contraseña</label>
                            <input class="form-input" type="password" placeholder="Ingrse su contraseña" id="password"
                                v-model.trim="password">
                        </div>
                        <div class="form-input-container">
                            <button type="submit" class="login-button">Iniciar Sesion</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    </div>


</template>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../store/user'
const userStore = useUserStore();
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
    await userStore.loginUser(email.value, password.value)
}

</script>
<style lang="css" scoped>
.main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 40% 60%;
    grid-template-rows: 100%;
}

.grid-item-1 {
    background-color: #0B0273;
    display: flex;
    flex-direction: column;
    grid-column-start: 1;
    grid-column-end: 2;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 50px;
    grid-row: 1;

}

.grid-item-1 img {
    width: 456px;
    height: 452px;
    order: 5;
}

.grid-item-2 {
    background-color: #D3D7DC;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-container {
    display: flex;
    flex-direction: column;
    width: 481px;
    height: 389px;
    background: #FFFFFF;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    align-items: center;
    justify-content: center;

}

.card-container__text {
    font-family: 'Oswald';
    font-style: normal;
    font-size: 40px;
    color: #064D90;
    margin: 20px;

}

.form {
    width: 90%;
    height: 60%;


}

.form-input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    padding: 10px;
    width: 100%;

}

.form-input {
    width: 80%;
    height: 25px;
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
}

.login-button {
    background-color: #0094FF;
    border-radius: 8px;
    color: #FFFFFF;
    padding: 10px;
    border-color: #0094FF;
    width: 83%;
}

.grid-item-1__text {
    color: #FFFFFF;
    font-size: 30px;
    order: 10;
}
</style>
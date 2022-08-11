<template >
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <input type="email" placeholder="Ingrese su correo electrónico" v-model.trim="email">
            </div>
            <div>
                <input type="password" placeholder="Ingrse su contraseña" v-model.trim="password">
            </div>
            <button type="submit">Login</button>
        </form>
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
<style >
</style>
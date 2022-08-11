<template>
    <div>
        <h1>Home</h1>
        <button @click="userStore.logoutUser">Logout</button>
    </div>
</template>
<script setup>
import {useUserStore} from '../../store/user'
const userStore = useUserStore()


</script>

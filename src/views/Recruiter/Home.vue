<template>

    <Sidebar />
    <div class="container">
        <router-view />
    </div>

</template>
<script>
import Sidebar from '../../components/sidebar/Sidebar.vue';
export default {
    components: {
        Sidebar
    }
}
</script>
<style scoped>
.container {
    margin-left: 360px;
}
</style>
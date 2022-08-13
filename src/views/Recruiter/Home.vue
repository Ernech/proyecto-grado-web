<template>
    <div>
        <!-- <h1>Home</h1>
        <button @click="userStore.logoutUser">Logout</button> -->
     <Sidebar/>
    </div>
</template>
<script>
import Sidebar from '../../components/sidebar/Sidebar.vue';
export default{
    components:{
        Sidebar
    }
}

// import {useUserStore} from '../../store/user'
// const userStore = useUserStore()


</script>

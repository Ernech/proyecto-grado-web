<template>
    <div>
        <div class="sidebar">
            <div class="sidebar__user-info">
                <div class="user-into__first-letter">
                    <span>E</span>
                </div>
                <p>Ernesto Vilela Montero</p>
                <p>ernesto.vilela@ucb.edu.bo</p>
            </div>
            <div class="sidebar__router-links">
                <SidebarLink icon="fa-solid fa-unlock" to="/open-job-call" router="Convocatorias abiertas">
                </SidebarLink>
                <SidebarLink icon="fa-solid fa-floppy-disk" to="/saved-job-call" router="Convocatorias guardadas">
                </SidebarLink>
                <SidebarLink icon="fa-solid fa-clock" to="/pending-job-call" router="Convocatorias pendientes">
                </SidebarLink>
                <SidebarLink icon="fa-solid fa-lock" to="/closed-job-call" router="Convocatorias cerradas">
                </SidebarLink>
                <SidebarLink icon="fa-solid fa-circle-plus" to="/new-job-call" router="Crear convocatoria">
                </SidebarLink>     
            </div>
            <div class="link" @click="userStore.logoutUser">
                <fa icon="fa-solid fa-arrow-right-from-bracket"/>
                <p>Cerrar sesión</p>
            </div>

        </div>
    </div>
</template>
<script setup>
import SidebarLink from '../sidebar/SidebarLink.vue';
import {useUserStore} from '../../store/user'
const userStore = useUserStore()  
</script>
<style>
.link {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffffff;
    text-decoration: none;
    font-size: 15px;
    gap: 10px;
    padding: 5px;
}
</style>
<style scoped>
.sidebar {
    color: white;
    background-color: #0B0273;

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 30px;
    width: 365px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

}

.slidebar__user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.slidebar__user-info p {
    margin: 0px;
    font-size: 15px;
}

.user-into__first-letter {
    width: 164px;
    height: 164px;
    background-color: #ffffff;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-into__first-letter span {
    color: #0B0273;
    font-size: 70px;

}

.sidebar__router-links {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 100%;
}
</style>
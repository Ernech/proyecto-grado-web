import {createWebHistory,createRouter} from 'vue-router'
import Login from '../views/Recruiter/Login.vue'
import Home from '../views/Recruiter/Home.vue'
import { useUserStore } from '../store/user'


const requireAuth= (to,from,next)=>{
    const userStore = useUserStore();
    const authToken = userStore.accessToken;
    if(authToken){
        next()
    }else{
        next('/login')
    }

}

const routes = [
    {path:'/login',component:Login},
    {path:'/',component:Home,beforeEnter:requireAuth}
]

const history = createWebHistory()

const router= createRouter({
    routes,history
})

export default router;


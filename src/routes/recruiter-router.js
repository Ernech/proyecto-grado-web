import {createWebHistory,createRouter} from 'vue-router'
import Login from '../views/Recruiter/Login.vue'
import Home from '../views/Recruiter/Home.vue'

const routes = [
    {path:'/login',component:Login},
    {path:'/',component:Home}
]

const history = createWebHistory()

const router= createRouter({
    routes,history
})

export default router;


import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Recruiter/Login.vue'
import Home from '../views/Recruiter/Home.vue'

import OpenJobCall from '../views/Recruiter/OpenJobCall.vue'
import PendingJobCall from '../views/Recruiter/PendingJobCall.vue'
import ClosedJobCall from '../views/Recruiter/ClosedJobCall.vue'
import SavedJobCall from '../views/Recruiter/SavedJobCall.vue'
import NewJobCall from '../views/Recruiter/NewJobCall.vue'
import { useUserStore } from '../store/user'


const requireAuth = (to, from, next) => {
    const userStore = useUserStore();
    const authToken = userStore.accessToken;
    if (authToken) {
        next()
    } else {
        next('/login')
    }

}

const routes = [
    { path: '/login', component: Login },
    {
        path: '/', component: Home,
        children:[{
            path: '/open-job-call', component: OpenJobCall
        },
        {
            path:'/pending-job-call',component: PendingJobCall
        },
        {
            path:'/closed-job-call',component: ClosedJobCall
        },{
            path:'/saved-job-call',component: SavedJobCall
        },{
            path:'/new-job-call',component:NewJobCall
        }
    ],
        beforeEnter:requireAuth
    }, 
]

const history = createWebHistory()

const router = createRouter({
    routes, history
})

export default router;


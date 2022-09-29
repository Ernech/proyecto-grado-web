import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Recruiter/Login.vue'
import Home from '../views/Recruiter/Home.vue'

import OpenJobCall from '../views/Recruiter/OpenJobCall.vue'
import PendingJobCall from '../views/Recruiter/PendingJobCall.vue'
import ClosedJobCall from '../views/Recruiter/ClosedJobCall.vue'
import SavedJobCall from '../views/Recruiter/SavedJobCall.vue'
import NewJobCall from '../views/Recruiter/NewJobCall.vue'
import EditJobCall from '../views/Recruiter/EditJobCall.vue'
import { useUserStore } from '../store/user'


const requireAuth = (to, from, next) => {

    const authToken = localStorage.getItem('recruiter-token');
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
        children: [{
            path: '/open-job-call', component: OpenJobCall
        },
        {
            path: '/pending-job-call', component: PendingJobCall
        },
        {
            path: '/closed-job-call', component: ClosedJobCall
        }, 
        {
            path: '/saved-job-call', component: SavedJobCall, 
        }, 
        {
            path: '/new-job-call', component: NewJobCall
        },
        { 
            path: '/edit-job-call/:id', component: EditJobCall,name:'Edit-job-call'
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


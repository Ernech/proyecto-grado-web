import { createWebHistory, createRouter } from 'vue-router'
import Login from '../views/Recruiter/Login.vue'
import Home from '../views/Recruiter/Home.vue'

import OpenJobCall from '../views/Recruiter/OpenJobCall.vue'
import OpenJobCallInfo from '../views/Recruiter/OpenJobCallInfo.vue'

import PendingJobCall from '../views/Recruiter/PendingJobCall.vue'
import ClosedJobCall from '../views/Recruiter/ClosedJobCall.vue'
import ClosedJobCallInfo from '../views/Recruiter/ClosedJobCallInfo.vue'
import SavedJobCall from '../views/Recruiter/SavedJobCall.vue'
import NewJobCall from '../views/Recruiter/NewJobCall.vue'
import EditJobCall from '../views/Recruiter/EditJobCall.vue'
import TeacherJobCall from '../views/Recruiter/TeacherJobCall.vue'
import ClosedTeacherJobCallInfo from '../views/Recruiter/ClosedTeacherJobCallInfo.vue'
import { useUserStore } from '../store/user'
import { useTeacherJobCallStore } from '../store/teacher-job-call'


const requireAuth = (to, from, next) => {
    const userStore = useUserStore()
    const authToken = userStore.accessToken
    if (authToken) {
        next()
    } else {
        next('/login')
    }

}

const routes = [
   
    { path: '/login', component: Login },
    {
        path: '/', component: Home, redirect: '/open-job-call',
        children: [{
            path: '/open-job-call', component: OpenJobCall
        },
        {
            path: '/open-job-call/teacher/:id', component: TeacherJobCall, name: 'teacher-job-calls'
        },
        {
            path: '/open-job-call/:id', component: OpenJobCallInfo, name: 'open-job-call-info'
        },
        {
            path: '/pending-job-call', component: PendingJobCall
        },
        {
            path: '/closed-job-call', component: ClosedJobCall
        },
        {
            path: '/closed-job-call/:id', component: ClosedJobCallInfo,  name:'closed-job-call-info'
        },
        {
            path: '/closed-job-call/teacher/:id', component: ClosedTeacherJobCallInfo,name:'closed-teacher-job-call'
        },
        {
            path: '/saved-job-call', component: SavedJobCall,
        },
        {
            path: '/new-job-call', component: NewJobCall
        },
        {
            path: '/edit-job-call/:id', component: EditJobCall, name: 'Edit-job-call'
        }
        ],
        beforeEnter: requireAuth
    },
]

const history = createWebHistory()

const router = createRouter({
    routes, history
})

export default router;


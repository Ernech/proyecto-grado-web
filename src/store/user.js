import { defineStore } from 'pinia';
import router from '../routes/recruiter-router'
export const useUserStore = defineStore('user', {
    state: () => ({
        loginData: null,
        accessToken: localStorage.getItem('recruiter-token'),
        isLoading: false
    }),
    actions: {
        async loginUser(email, password) {
            this.isLoading = true;
            this.loginData = { email, password }
            try {
                const resp = await fetch('http://localhost:3000/user/token', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.loginData)
                })
                const { token } = await resp.json()
                if (token) {
                    this.accessToken = token;
                    localStorage.setItem('recruiter-token', `bearer ${token}`)
                }
                return resp.status
            } catch (error) {
                console.log(error);
            } finally {
                this.loginData = null;
                this.isLoading = false;
            }
        },
        logoutUser() {
            try {
                localStorage.removeItem('recruiter-token')
                this.accessToken = null;
                router.push('/login')
            } catch (error) {
                console.log(error);
            }
        }

    }
})
import {defineStore} from 'pinia';
import router from '../routes/recruiter-router'
export const useUserStore=defineStore('user',{
    state: () =>({
        loginData:null
    }),
    actions:{
        async loginUser(email,password){
            this.loginData={email,password}
            try {
                const resp = await fetch('http://localhost:3000/user/token',{
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(this.loginData)
                })
                const {token} =await resp.json()
                localStorage.setItem('token',JSON.stringify(token))
               router.push('/')
            } catch (error) {
                console.log(error);
            }finally{
                this.loginData=null
            }
           

        }
    }
})
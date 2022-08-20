import {defineStore} from 'pinia';
import router from '../routes/recruiter-router'
export const useUserStore=defineStore('user',{
    state: () =>({
        loginData:null,
        accessToken:null,
        isLoading: false
    }),
    actions:{
        async loginUser(email,password){
            this.isLoading=true;
            this.loginData={email,password}
            try {
                const resp = await fetch('http://localhost:3000/user/token',{
                    method:'POST',
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(this.loginData)
                })
                const {token} =await resp.json()
                this.accessToken=token;
                localStorage.setItem('token',JSON.stringify(token))  
               router.push('/')
            } catch (error) {
               console.log(error);
            }finally{
                this.loginData=null;
                this.isLoading=false;
            }
        },
        logoutUser(){
            try {
                localStorage.removeItem('token')
                this.accessToken=null;
                router.push('/login')
            } catch (error) {
                console.log(error);
            }
        }

    }
})
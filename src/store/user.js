import {defineStore} from 'pinia';

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
                console.log(token);
            } catch (error) {
                console.log(error);
            }finally{
                this.loginData=null
            }
           

        }
    }
})
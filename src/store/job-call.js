import {defineStore} from 'pinia';

export const useJobCallStore = defineStore('job-call',{
    state:()=>({
        jobCallName:'',
        jobCallNUmber:0,
        jobManualFile:'',
        jobInfoFile:'',
        openingDate:'',
        closingDate:'',
        experiences:[],
        jobFunctions:[],
        academicTrainings:[],
        requiredKnowledge:[],
        aptitudes:[],
        experience:{
            yearsOfExperience:3,
            requirement:'',
            type:''
        },
        jobFunction:'',
        training:'',
        requiredKnowledge:{
            description:'',
            requiredLevel:'',
            required:''
        },
        aptitude:{
            aptitude:'',
            aptitudeType:'',
            desiredLevel:''
        }


    }),actions:{
        async createJobCall(){
            
        }
    }
})


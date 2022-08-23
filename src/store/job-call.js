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
        requiredKnowledgeArray:[],
        aptitudes:[],
        experience:{
            description:'',
            yearsOfExperience:0,
            requirement:'',
            type:''
        },
        jobFunction:{
            jobFunction:''
        },
        training:{
            training:''
        },
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


import {defineStore} from 'pinia';

export const useJobCallStore = defineStore('job-call',{
    state:()=>({
        jobCallName:'',
        jobCallNumber:'',
        jobCallObj:'',
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
            try {
                const newJobCallBody={jobCallName:this.jobCallName,
                    jobCallNumber :this.jobCallNumber,
                    jobCallObj:this.jobCallObj,
                    jobManualFile: this.jobManualFile,
                    jobInfoFile:'Info.pdf',
                    openingDate: this.openingDate,
                    closingDate:this.closingDate,
                    experiences:this. experiences,
                    jobFunctions: this.jobFunctions,
                    academicTrainings:this.academicTrainings,
            requiredKnowledge:this.requiredKnowledgeArray,
            aptitudes:this.aptitudes}
           const resp = await fetch('http://localhost:3000/job-call',{
            method:'POST',
            headers: { "Content-Type": "application/json",
            'Authorization':'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUkVDUlVJVEVSIiwiaWQiOiIyMTEzZDAxMy0zYmFjLTRkNDEtOGMxMC05MDg2YzMyMzg4MzQiLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwiaWF0IjoxNjYxMjg4NTk0LCJleHAiOjE2NjEyOTU3OTR9.3g7X7XUftpsbStLnclQuxrFgg0P9rY6Cz2dNg0eYlNI'},
            body: JSON.stringify(newJobCallBody)
           })
           console.log(JSON.stringify(newJobCallBody));
           console.log(resp.status);
           console.log(resp.json);
            } catch (error) {
                console.log(error);
            }finally{
            }
            

        }
    }
})


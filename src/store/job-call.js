import {defineStore} from 'pinia';
import router from '../routes/recruiter-router'
export const useJobCallStore = defineStore('job-call',{
    state:()=>({
        jobCallName:'',
        jobCallNumber:'',
        jobCallObj:'',
        jobManualFile:null,
        jobInfoFile:'',
        openingDate:Date("yyyy-MM-ddThh:mm"),
        closingDate:Date("yyyy-MM-ddThh:mm"),
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
                    jobManualFile: 'Maual.docx',
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
            'Authorization':localStorage.getItem('token')},
            body: JSON.stringify(newJobCallBody)
           })
           console.log(JSON.stringify(newJobCallBody));
           console.log(resp.status);
           console.log(resp.json);
            } catch (error) {
                console.log(error);
            }finally{
                router.push('/new-job-call')
            }
            

        }
    }
})


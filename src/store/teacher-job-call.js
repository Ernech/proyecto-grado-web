import { defineStore } from 'pinia';
import router from '../routes/recruiter-router'
export const useTeacherJobCallStore = defineStore('teacher-job-call', {
    state: () => ({
        jobCalls: [],
        careerClasses:[],
        jobCallName: '',
        jobCallNumber: '',
        jobManualFile: null,
        jobInfoFile: '',
        openingDate: '',
        closingDate: '',
        experiences: [],
        academicTrainings: [],
        requiredKnowledgeArray: [],
        requirements:[],
        jobCallEdit: {}

    }), actions: {
        async createJobCall() {
            try {
                const newJobCallBody = {
                    jobCallName: this.jobCallName.toUpperCase(),
                    jobCallNumber: this.jobCallNumber,
                    jobManualFile: 'Maual.docx',
                    jobInfoFile: 'Info.pdf',
                    openingDate: this.openingDate,
                    closingDate: this.closingDate,
                    experiences: this.experiences,
                   
                    academicTrainings: this.academicTrainings,
                    requiredKnowledge: this.requiredKnowledgeArray,
                }
                const resp = await fetch('http://localhost:3000/job-call', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                    body: JSON.stringify(newJobCallBody)
                })
                console.log(resp.status);
                console.log(resp);  
              
            } catch (error) {
                console.log(error);
            } finally {
                router.push('/saved-job-call')
            }
        },

        async publishJobCall(id){
            try {
                const resp = await fetch(`http://localhost:3000/job-call/pending/${id}`,{
                    method:'PATCH',
                    headers:{
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    }
                })
                console.log(resp);
                console.log(resp.status);
            } catch (error) {
                console.log(error);
            }
        },
        getPagedList(page, pageItems) {
            const pageData = [];
            let init = (page * pageItems) - pageItems
            let end = (page * pageItems)
            for (let i = init; i < end; i++) {
                if (this.jobCalls[i]) {
                    pageData.push(this.jobCalls[i])
                } else {
                    break
                }

            }
            return pageData;
        },
       
        resetValues(){
            this.jobCallName= ''
            this.jobCallNumber=''
            this.jobCallObj = ''
            this.openingDate = new Date()
            this.closingDate = ''
            this.experiences = []
            this.academicTrainings = []
            this.requiredKnowledgeArray = []
          
        }
    },

})


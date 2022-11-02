import { defineStore } from 'pinia';
import router from '../routes/recruiter-router'
export const useJobCallStore = defineStore('job-call', {
    state: () => ({
        jobCalls: [],
        jobCallName: '',
        jobCallNumber: '',
        jobCallObj: '',
        jobManualFile: null,
        openingDate: '',
        closingDate: '',
        experiences: [],
        jobFunctions: [],
        academicTrainings: [],
        requiredKnowledgeArray: [],
        aptitudes: [],
        experience: {
            description: '',
            yearsOfExperience: 0,
            requirement: '',
            type: ''
        },
        jobFunction: {
            jobFunction: ''
        },
        training: {
            training: ''
        },
        requiredKnowledge: {
            description: '',
            requiredLevel: '',
            required: ''
        },
        aptitude: {
            aptitude: '',
            aptitudeType: '',
            desiredLevel: ''
        },
        jobCallEdit: {},
        applies:{},
        selectedJobCall:{}

    }), actions: {
        async createJobCall() {
            try {
                const newJobCallBody = {
                    jobCallName: this.jobCallName.toUpperCase(),
                    jobCallNumber: this.jobCallNumber,
                    jobCallObj: this.jobCallObj,
                    jobManualFile: this.jobManualFile,
                    jobManualFileName: this.jobManualFile.name,
                    openingDate: this.openingDate,
                    closingDate: this.closingDate,
                    experiences: this.experiences,
                    jobFunctions: this.jobFunctions,
                    academicTrainings: this.academicTrainings,
                    requiredKnowledge: this.requiredKnowledgeArray,
                    aptitudes: this.aptitudes
                }
                const resp = await fetch('http://localhost:3000/job-call', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                    body: JSON.stringify(newJobCallBody)
                })
                return resp.status
              
            } catch (error) {
                console.log(error);
            }
        },
        async editJobCall(id) {      
            try {
                const editJobCallBody = {
                    jobCallName: this.jobCallName.toUpperCase(),
                    jobCallNumber: this.jobCallNumber,
                    jobCallObj: this.jobCallObj,
                    jobManualFile: this.jobManualFile,
                    jobManualFileName: this.jobManualFile.name,
                    openingDate: this.openingDate,
                    closingDate: this.closingDate,
                    experiences: this.experiences,
                    jobFunctions: this.jobFunctions,
                    academicTrainings: this.academicTrainings,
                    requiredKnowledge: this.requiredKnowledgeArray,
                    aptitudes: this.aptitudes
                }
                const resp = await fetch(`http://localhost:3000/job-call/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                    body: JSON.stringify(editJobCallBody)
                })
                console.log(resp.status);
                console.log(resp); 
            } catch (error) {
                console.log(error);
            } finally {
                router.push('/saved-job-call')
            }
        },
        async getJobCallById(id){
            try {
                
            const resp = await fetch(`http://localhost:3000/job-call/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('recruiter-token')
                }
            })
            const dataDB= await resp.json()
            this.selectedJobCall = dataDB
            } catch (error) {
                console.log(error);
            }
        },
        async getSavedJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/saved', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.jobCalls = dataDb
            } catch (error) {
                console.log(error);
            }
        },
        async getPendingJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/pending', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.jobCalls = dataDb
            } catch (error) {
                console.log(error);
            }
        },
        async getOpenedJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/opened', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.jobCalls = dataDb
            } catch (error) {
                console.log(error);
            }
        },
        async getClosedJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/closed', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.jobCalls = dataDb
            } catch (error) {
                console.log(error);
            }
        },
        async getCandidatesAppliedToClosedJobCalls(id) {
            try {
                const resp = await fetch(`http://localhost:3000/job-call/closed/candidates/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.applies = dataDb
            } catch (error) {
                console.log(error);
            }
        },
        async getCandidatesAppliedToOpenedJobCall(id) {
            try {
                const resp = await fetch(`http://localhost:3000/job-call/opened/candidates/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.applies = dataDb
            } catch (error) {
                console.log(error);
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
                return resp.status
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
        setEditJobCall(item) {
            this.jobCallName= item.jobCallName
            this.jobCallNumber=item.jobCallNumber
            this.jobCallObj = item.jobCallObj
            this.openingDate = item.openingDate
            this.closingDate = item.closingDate
            this.experiences = item.experiences
            this.jobFunctions = item.jobFunctions
            this.academicTrainings = item.academicTrainings
            this.requiredKnowledgeArray = item.requiredKnowledge
            this.aptitudes= item.aptitudes
        },
        resetValues(){
            this.jobCallName= ''
            this.jobCallNumber=''
            this.jobCallObj = ''
            this.openingDate = new Date()
            this.closingDate = ''
            this.experiences = []
            this.jobFunctions = []
            this.academicTrainings = []
            this.requiredKnowledgeArray = []
            this.aptitudes= [] 
        }
    },

})


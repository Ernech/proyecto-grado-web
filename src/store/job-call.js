import { defineStore } from 'pinia';
import router from '../routes/recruiter-router'
export const useJobCallStore = defineStore('job-call', {
    state: () => ({
        jobCalls: [],
        jobCallName: '',
        jobCallNumber: '',
        jobCallObj: '',
        jobManualFile: null,
        jobInfoFile: '',
        openingDate: Date("yyyy-MM-ddThh:mm"),
        closingDate: Date("yyyy-MM-ddThh:mm"),
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
        jobCallEdit: {}

    }), actions: {
        async createJobCall() {
            try {
                const newJobCallBody = {
                    jobCallName: this.jobCallName,
                    jobCallNumber: this.jobCallNumber,
                    jobCallObj: this.jobCallObj,
                    jobManualFile: 'Maual.docx',
                    jobInfoFile: 'Info.pdf',
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
                        'Authorization': localStorage.getItem('token')
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
        async editJobCall(id) {      
            console.log(id);
            try {
                const editJobCallBody = {
                    jobCallName: this.jobCallName,
                    jobCallNumber: this.jobCallNumber,
                    jobCallObj: this.jobCallObj,
                    jobManualFile: 'Maual.docx',
                    jobInfoFile: 'Info.pdf',
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
                        'Authorization': localStorage.getItem('token')
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
        async getSavedJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/saved', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('token')
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
                        'Authorization': localStorage.getItem('token')
                    },
                })
                const dataDb = await resp.json()
                this.jobCalls = dataDb
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
            this.openingDate = Date("yyyy-MM-ddThh:mm")
            this.closingDate = Date("yyyy-MM-ddThh:mm")
            this.experiences = []
            this.jobFunctions = []
            this.academicTrainings = []
            this.requiredKnowledgeArray = []
            this.aptitudes= [] 
        }
    },

})


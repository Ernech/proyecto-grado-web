import { defineStore } from 'pinia';
import router from '../routes/recruiter-router'
export const useJobCallStore = defineStore('job-call', {
    state: () => ({
        savedJobCalls: [],
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
        }


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
                this.savedJobCalls = dataDb
            } catch (error) {
                console.log(error);
            }
        },
        getPagedList(page, pageItems) {
            const pageData = [];
            let init = (page * pageItems) - pageItems
            let end = (page * pageItems)
            for (let i = init; i < end; i++) {
                if (this.savedJobCalls[i]) {
                    pageData.push(this.savedJobCalls[i])
                } else {
                    break
                }

            }
            return pageData;
        }
    },

})


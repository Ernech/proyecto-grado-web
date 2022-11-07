import { defineStore } from 'pinia';
import router from '../routes/recruiter-router'
export const useTeacherJobCallStore = defineStore('teacher-job-call', {
    state: () => ({
        jobCalls: [],
        collegeClasses: [],
        collegeClassesToDB: [],
        collegeClassesFromDB: [],
        teacherApplies: [],
        id: '',
        name: '',
        requiredNumber: 0,
        code: '',
        jobCallCode: '',
        jobCallName: 'DOCENTE TIEMPO HORARIO',
        jobCallNumber: '',
        jobManualFile: 'Manual.docx',
        jobInfoFile: 'Info.pdf',
        openingDate: '',
        closingDate: '',
        experiences: [],
        academicTrainings: [],
        requiredKnowledgeArray: [],
        requirements: [],
        jobCallEdit: {},
        showModal: false,
        selectedTeacherJobCall: {},
        editIndex: -1

    }), actions: {

        async getCollegeClasses() {
            try {
                const resp = await fetch('http://localhost:3000/college-class', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    }
                })
                const dataDb = await resp.json()
                this.collegeClassesFromDB = dataDb
            } catch (error) {

            }
        },
        async publishJobCall(id) {
            try {
                const resp = await fetch(`http://localhost:3000/job-call/pending/${id}`, {
                    method: 'PATCH',
                    headers: {
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
        async createTeacherJobCall() {
            const newJobCallBody = {
                teacherJobCall: {
                    jobCallName: this.jobCallName,
                    jobCallNumber: this.jobCallNumber,
                    jobManualFile: this.jobManualFile,
                    openingDate: this.openingDate,
                    closingDate: this.closingDate
                },
                newCareerClass: this.collegeClassesToDB
            }
            try {
                const resp = await fetch('http://localhost:3000/job-call/teacher', {
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
        async editTeacherJobCall(id) {
            const editJobCallBody = {
                teacherJobCall: {
                    jobCallName: this.jobCallName,
                    jobCallNumber: this.jobCallNumber,
                    jobManualFile: this.jobManualFile,
                    openingDate: this.openingDate,
                    closingDate: this.closingDate
                },
                newCareerClass: this.collegeClassesToDB
            }
            console.log(editJobCallBody);
            try {
                const resp = await fetch(`http://localhost:3000/job-call/teacher/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                    body: JSON.stringify(editJobCallBody)
                })
                const dataDb = await resp.json()
                console.log(dataDb);
                return resp.status

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
        async getOpenedTeacherJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/opened/teacher/jc', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const dataDb = await resp.json()
                this.jobCalls = dataDb
            } catch (error) {
                console.log(error);
            }
        },

        async getSavedTeacherJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/saved/teacher', {
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
        async getPendingTeacherJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/pending/teacher', {
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
        async getClosedTeacherJobCalls() {
            try {
                const resp = await fetch('http://localhost:3000/job-call/closed/teacher', {
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
        async getTeacherJobCallById(id) {
            try {
                const resp = await fetch(`http://localhost:3000/job-call/teacher-jc/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.selectedTeacherJobCall = dataDb
            } catch (error) {
                console.log(error);
            }
        },

        async getCandidatesByTeacherJobCallId(id) {
            try {
                const resp = await fetch(`http://localhost:3000/job-call/candiates/teacher/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem('recruiter-token')
                    },
                })
                const dataDb = await resp.json()
                this.teacherApplies = dataDb
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
        generateReportData(code, name) {
            const data = {
                code, name,
                candidates: this.teacherApplies.teacherApply.map(obj => this.generateCandidatesData(obj.applyTPersonalData, obj.applyTCVData))
            }
            return data
        },
        generateCandidatesData(personalData, cvData) {
            const candidateName = `${personalData.name} ${personalData.firstLastName} ${personalData.secondLastName}`
            const candidateBirthDay = personalData.birthDate
            const candidateAge = this.calculateAge(personalData.birthDate)
            const academicTitle = this.getMainAcademicTitle(cvData) ?
                `Licenciatura en ${this.getMainAcademicTitle(cvData).title} ${this.getMainAcademicTitle(cvData).institution} (${this.getMainAcademicTitle(cvData).degreeDate})` : 'NO'
            const secondAcademicTitle = this.getSecondAcademicTitle(cvData).length > 0 ? 'SI' : 'NO'
            const teacherAcadmicTraining = 'SI'
            const requiredKnowledge = 'NO'
            const professionalExperienceTime = this.getProfessionalExperienceTime(cvData)
            const teachingExperienceYears = personalData.teachingStartYear > 0 ? this.getTeachingExperienceTime(personalData.teachingStartYear) : 'NO'
            const ucbFormatDocument = 'SI'
            const techingPlan = 'SI'
            const mainTitleFile = this.getMainAcademicTitle(cvData) && !this.getMainAcademicTitle(cvData).professionalTitleFile !== '--' ? 'SI' : 'NO'
            const teacherTitleFile = 'NO'
            const personalIdFile = personalData.personalIdFile !== '--' ? 'SI' : 'NO'
            const academicTrainingTrue = 'NO'
            const professionalExperienceTrue = 'NO'
            const TeachingExperienceTrue = 'SI'
            const Habilitated = ''
            const candidateData = {
                candidateName,
                candidateBirthDay,
                candidateAge,
                academicTitle,
                secondAcademicTitle,
                teacherAcadmicTraining,
                requiredKnowledge,
                professionalExperienceTime,
                teachingExperienceYears,
                ucbFormatDocument,
                techingPlan,
                mainTitleFile,
                teacherTitleFile,
                personalIdFile,
                academicTrainingTrue,
                professionalExperienceTrue,
                TeachingExperienceTrue,
                Habilitated
            }
            return candidateData
        },

        getMainAcademicTitle(cvData) {
            const academicTitles = cvData.filter(obj => obj.dataType === 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
            const mainTitle = academicTitles[0]
            return mainTitle



        },
        getProfessionalExperienceTime(cvData) {
            const mainTitle = this.getMainAcademicTitle(cvData)
            if (!mainTitle) {
                return 'NO'
            }
            let df = new Date(mainTitle.degreeDate);
            let dt = new Date();
            let allYears = dt.getFullYear() - df.getFullYear();
            let partialMonths = dt.getMonth() - df.getMonth();
            if (partialMonths < 0) {
                allYears--;
                partialMonths = partialMonths + 12;
            }
            let total = allYears + " años " + partialMonths + " meses";
            return total
        },
        getTeachingExperienceTime(teachingYears) {
            let df = new Date(teachingYears + '');
            let dt = new Date();
            let allYears = dt.getFullYear() - df.getFullYear();
            let partialMonths = dt.getMonth() - df.getMonth();
            if (partialMonths < 0) {
                allYears--;
                partialMonths = partialMonths + 12;
            }
            let total = allYears + " años " + partialMonths + " meses";

            return `(${teachingYears}) ${total}`
        },
        getSecondAcademicTitle(cvData) {
            const academicTitles = cvData.filter(obj => obj.dataType === 'ACADEMIC_TRAINING' && obj.degree === 'Postgrado')
            return academicTitles

        },
        calculateAge(birthDate) {
            const ageDifMs = Date.now() - new Date(birthDate).getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        resetValues() {
            this.jobCallName = ''
            this.jobCallNumber = ''
            this.jobCallObj = ''
            this.openingDate = ''
            this.experiences = []
            this.academicTrainings = []
            this.requiredKnowledgeArray = []

        }, setTeacherJobCall(item) {
            this.jobCallNumber=item.jobCallNumber
            this.openingDate=item.openingDate
            this.closingDate=item.closingDate
            this.jobManualFile=item.jobManualFile
            this.experiences=item.teacherJobCalls[0].requirements.filter(obj=>obj.requirementType==='PROFESSIONAL_EXPERIENCE')
            this.collegeClasses = item.teacherJobCalls.map(obj=>{
                return {
                    code: obj.collegeClass.code,
                    name: obj.collegeClass.name,
                    requiredNumber: obj.requiredNumber,
                    academicTraining:obj.requirements.filter(obj=>obj.requirementType==='ACADEMIC_TRAINING'),
                    requiredKnowledge:obj.requirements.filter(obj=>obj.requirementType==='REQUIRED_KNOWLEDGE')
                }
            })
            this.collegeClassesToDB=item.teacherJobCalls.map(obj=>{
                return {
                    id:obj.collegeClass.id,
                    requiredNumber: obj.requiredNumber,
                    jobCallCode: obj.jobCallCode,
                    requirements:obj.requirements
                }
            })
        },
        setCollegeClass(item, index) {
            this.editIndex = index
            this.code = item.code
            this.name = item.name
            this.requiredNumber = item.requiredNumber
            this.requiredKnowledgeArray=item.requiredKnowledge
            this.academicTrainings=item.academicTraining
        }
    },

})


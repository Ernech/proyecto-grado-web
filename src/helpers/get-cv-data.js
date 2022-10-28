const getAcademicTrainings = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'ACADEMIC_TRAINING');

const getLanguages = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'LANGUAGE');

const getJobExperiences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'PROFESSIONAL_EXPERIENCE');

const getTeachingExperiences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'TEACHING_EXPERIENCE');

const getCoursesAndSeminars = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'COURSES_AND_SEMINARS');

const getPublications = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'PUBLICATIONS');

const getConsultingAndResearch = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'CONSULTING_AND_RESEARCH');

const getAwards = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'AWARDS');

const getAffiliations = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'AFFILIATIONS');

const getJobReferences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'JOB_REFERENCES');

const getFamilyReferences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'FAMILY_REFERENCES');

const getcv=(personalData,cvData)=>{
    return{
        firstLastName: personalData.firstLastName,
        secondLastName: personalData.secondLastName,
        name: personalData.name,
        marriedLastName: personalData.marriedLastName,
        personalIdNumber: personalData.personalIdNumber,
        issued: personalData.issued,
        idType: personalData.idType,
        gender: personalData.gender,
        civilStatus: personalData.civilStatus,
        birthDate: personalData.birthDate,
        placeOfBirth: personalData.placeOfBirth,
        nationality: personalData.nationality,
        address: personalData.address,
        zone: personalData.zone,
        afp: personalData.afp,
        cuaNumber: personalData.cuaNumber,
        homePhone: personalData.homePhone,
        cellPhone: personalData.cellPhone,
        email: personalData.email,
        techingStartYear: personalData.teachingStartYear,
        teachingUCBStartYear: personalData.teachingUCBStartYear,
        professionalStartYear: personalData.professionalStartYear,
        academicTrainings:this.getAcademicTrainings(cvData),
        languages:this.getLanguages(cvData),
        jobExperiences:this.getJobExperiences(cvData),
        teachingExperience:this.getTeachingExperiences(cvData),
        coursesAndSeminars:this.getCoursesAndSeminars(cvData),
        publications:this.getPublications(cvData),
        consultingAndResearch:this.getConsultingAndResearch(cvData),
        awards:this.getAwards(cvData),
        affilitations:this.getAffiliations(cvData),
        jobReferences:this.getJobReferences(cvData),
        familyReferences:this.getFamilyReferences(cvData)
    }
}
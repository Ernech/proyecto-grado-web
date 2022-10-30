const getAcademicTrainings = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'ACADEMIC_TRAINING');

const getLanguages = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'LANGUAGE');

const getJobExperiences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'PROFESSIONAL_EXPERIENCE');

const getCurrentProfessionalInfo = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'CURRENT_PROFESSIONAL_INFO');

const getTeachingExperiences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'TEACHING_EXPERIENCE');

const getCoursesAndSeminars = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'COURSES_AND_SEMINARS');

const getPublications = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'PUBLICATIONS');

const getConsultingAndResearch = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'CONSULTING_AND_RESEARCH');

const getAwards = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'AWARDS');

const getAffiliations = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'AFFILIATIONS');

const getJobReferences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'JOB_REFERENCES');

const getFamilyReferences = cvDataArray => cvDataArray.filter(obj => obj.dataType === 'FAMILY_REFERENCES');

const getLanguagesArray =(languages) =>{
    return languages.map((obj) => { 
        return{
        language:obj.language,
        ar: obj.reading==='Avanzado'? 'X' :'',
        mr:obj.reading==='Medio'? 'X' :'',
        br:obj.reading==='Básico'? 'X' :'',
        aw: obj.writing==='Avanzado'? 'X' :'',
        mw:obj.writing==='Medio'? 'X' :'',
        bw:obj.writing==='Básico'? 'X' :'',
        as: obj.speacking==='Avanzado'? 'X' :'',
        ms:obj.speacking==='Medio'? 'X' :'',
        bs:obj.speacking==='Básico'? 'X' :''
        } 
    })
}

const getBirthDateDigits=(birthDate) =>{
    let fd=''
    let sd=''
    let fm=''
    let sm=''
    const date = new Date(birthDate+'T00:00');
    if(date.getDate()>9){
        const dayToString = date.getDate().toString().split('')
        fd=dayToString[0]
        sd=dayToString[1]
    }else{
        const dayToString = date.getDate().toString()
        fd='0'
        sd=dayToString
    }
    if(date.getMonth()+1>9){
        const monthToString = (date.getMonth()+1).toString().split('')
        fm=monthToString[0]
        sm=monthToString[1]
    }else{
        const monthToString =(date.getMonth()+1).toString()
        fm='0'
        sm=monthToString
    }
    const yearToString = date.getFullYear().toString().split('')
    const fa = yearToString[2]
    const sa = yearToString[3]
    return{fd,sd,fm,sm,fa,sa}
}

const getCV=(personalData,cvData)=>{
    return{
        firstLastName: personalData.firstLastName,
        secondLastName: personalData.secondLastName,
        name: personalData.name,
        marriedLastName: personalData.marriedLastName,
        personalIdNumber: personalData.personalIdNumber,
        issued: personalData.issued,
        ci: personalData.idType==='CI' ?'X' : '',
        cie: personalData.idType==='CI Extranjero' ?'X' : '',
        run: personalData.idType==='RUN' ?'X' : '',
        p: personalData.idType==='Pasaporte' ?'X' : '',
        m: personalData.gender==='Masculino' ? 'X' :'',
        f: personalData.gender==='Femenino' ? 'X' :'',
        s: personalData.civilStatus==='Soltero' ? 'X' :'',
        c: personalData.civilStatus==='Casado' ? 'X' :'',
        d: personalData.civilStatus==='Divorciado' ? 'X' :'',
        v: personalData.civilStatus==='Viudo' ? 'X' :'',
        fd: getBirthDateDigits( personalData.birthDate).fd,
        sd: getBirthDateDigits( personalData.birthDate).sd,
        fm: getBirthDateDigits( personalData.birthDate).fm,
        sm: getBirthDateDigits( personalData.birthDate).sm,
        fa: getBirthDateDigits( personalData.birthDate).fa,
        sa: getBirthDateDigits( personalData.birthDate).sa,
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
        currentInstitution:getCurrentProfessionalInfo(cvData).length >0 ? getCurrentProfessionalInfo(cvData)[0].institution:'',
        currentPosition:getCurrentProfessionalInfo(cvData).length >0 ? getCurrentProfessionalInfo(cvData)[0].position:'',
        currentInstitution: getCurrentProfessionalInfo(cvData).length >0 ? getCurrentProfessionalInfo(cvData)[0].institution:'',
        currentPhone: getCurrentProfessionalInfo(cvData).length >0 ? getCurrentProfessionalInfo(cvData)[0].phone : '',
        currentAddress:getCurrentProfessionalInfo(cvData).length >0 ? getCurrentProfessionalInfo(cvData)[0].address:'',
        cfd: getCurrentProfessionalInfo(cvData).length >0 ? getBirthDateDigits( getCurrentProfessionalInfo(cvData)[0].dataDate).fd:'',
        csd: getCurrentProfessionalInfo(cvData).length >0 ? getBirthDateDigits( getCurrentProfessionalInfo(cvData)[0].dataDate).sd:'',
        cfm: getCurrentProfessionalInfo(cvData).length >0 ? getBirthDateDigits( getCurrentProfessionalInfo(cvData)[0].dataDate).fm:'',
        csm: getCurrentProfessionalInfo(cvData).length >0 ? getBirthDateDigits( getCurrentProfessionalInfo(cvData)[0].dataDate).sm:'',
        cfa: getCurrentProfessionalInfo(cvData).length >0 ? getBirthDateDigits( getCurrentProfessionalInfo(cvData)[0].dataDate).fa:'',
        csa: getCurrentProfessionalInfo(cvData).length >0 ? getBirthDateDigits( getCurrentProfessionalInfo(cvData)[0].dataDate).sa:'',
        academicTrainings:getAcademicTrainings(cvData),
        languages:getLanguages(cvData).length>1 ? getLanguagesArray(getLanguages(cvData)) : [],
        jobExperiences:getJobExperiences(cvData),
        teachingExperience:getTeachingExperiences(cvData),
        coursesAndSeminars:getCoursesAndSeminars(cvData),
        publications:getPublications(cvData),
        consultingAndResearch:getConsultingAndResearch(cvData),
        awards:getAwards(cvData),
        affilitations:getAffiliations(cvData),
        jobReferences:getJobReferences(cvData),
        hasFamilyFalse: getFamilyReferences(cvData).length<1?'X':'',
        hasFamilyTrue: getFamilyReferences(cvData).length>=1?'X':'',
        familyReferences:getFamilyReferences(cvData)
    }
}

export {getCV}
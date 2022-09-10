//import { Vue } from "vue";
  import docxtemplater from 'docxtemplater';
  import JSZip from 'jszip';
  import JSzipUtils from 'jszip-utils';
  import  saveAs  from 'file-saver';
  export default class ReportComponent {
    getDoc() {
      this.createAndSaveDocument();
    }
    loadFile(url,callback){
        JSzipUtils.getBinaryContent(url,callback);
    }
    createAndSaveDocument(){
        /*
        *   This required JSON dataset must be fetched from the backend API.
        *   The tags in the template will be replaced by these data.
        *   For demonstrations, I have hardcoded the tesdt dataset
        */
        let dataset = {
            "jobCallName": "SECRETARIO EN COMUNICACIÓN Y MARKETING",
            "jobCallNumber": "50/2022",
            "jobCallObj": "Apoyar la gestión de marketing y atención al cliente a través de brindar información, reclutar y captar nuevos estudiantes para la Universidad Católica Boliviana San Pablo Regional La Paz de acuerdo a metas y acciones definidas en la Unidad de Marketing y Comunicación.",
            "jobManualFile": "Manual.docx",
            "jobInfoFile": "Info.pfd",
            "openingDate": "2022-09-08T04:45:00.0Z",
            "closingDate": "2022-09-08T04:50:00.0Z",
            "experiences": [{
                    "yearsOfExperience": 3,
                    "description":"Funciones de asistencia, apoyo logístico, administración y/o de atención al público",
                    "requirement": "Indispensable",
                    "type": "Especifico"
                },
                {
                    "yearsOfExperience": 2,
                    "description":"Técnico en marketing",
                    "requirement": "Deseable",
                    "type": "General"
                }
            ],
            "jobFunctions":[
                {
                    "jobFunction": "Coordinar actividades orientadas a la gestión de reclutamiento de estudiantes nuevos."
                },
                {
                    "jobFunction": "Apoyar en el seguimiento de estudiantes interesados en la Universidad."
                },
                {
                    "jobFunction": "Mantener la base de datos e información actualizada."
                }
            ],
            "academicTrainings": [{
                "training": "Egreso o Licenciatura en Administración de Empresas, Marketing, Ingeniería Comercial, Comunicación Social o ramas afines"
            }],
            "requiredKnowledge":[
                {
                    "description":"Ofimática: manejo de Word, Excel, Power Point, Outlook, Correo electrónico y otras aplicaciones para el soporte administrativo de la oficina",
                    "requiredLevel":"Intermedio",
                    "required": "Indispensable"
                },
                {
                    "description":"Conocimiento de inglés",
                    "requiredLevel":"Intermedio",
                    "required": "Deseable"
                }
            ],
            "aptitudes": [{
                    "aptitude": "Trabajar bajo presion",
                    "aptitudeType": "General",
                    "desiredLevel": "Alto"
                },
                {
                    "aptitude": "Liderazgo",
                    "aptitudeType": "Especifico",
                    "desiredLevel": "Medio"
                }
            ]
        
        }
        /* *
        * The template's path must be passed as an arguement .
        * This path can be either a URL(as  in the commented line) or a path relative to the Public folder
        * For testing, I have created a folder named  "ReportTemplates" inside the public folder and it contains my sample
        * template named "template1.docx" .
        * */
        // this.loadFile("https://docxtemplater.com/tag-example.docx",function(error: any,content : any){
          this.loadFile(`${import.meta.env.BASE_URL}Templates/template.docx`,function(error,content){
            if (error) { 
              throw error
            };
            let zip = new JSZip(content);
            let doc = new docxtemplater().loadZip(zip)
            doc.setData(dataset)
            try {
                doc.render()
            }
            catch (error) {
                let e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({error: e}));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }
            // docx generating
            let out = doc.getZip().generate({
                type:"blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                })
            saveAs(out,`Arte para página web convocatoria ${dataset.jobCallNumber}.docx`);    // You can pass this blob to a custom file saver component in the project.  
        });
    }
  }
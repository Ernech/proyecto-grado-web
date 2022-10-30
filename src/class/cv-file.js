//import { Vue } from "vue";
import docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import JSzipUtils from 'jszip-utils';
import  saveAs  from 'file-saver';
export default class CVFile {

constructor(cv){
  this.cv=cv
}

  getDoc() {
    this.createAndSaveDocument();
  }
  loadFile(url,callback){
      JSzipUtils.getBinaryContent(url,callback);
  }
  createAndSaveDocument(){
    
      let dataset = this.cv
  
        this.loadFile(`${import.meta.env.BASE_URL}Templates/plantilla-cv.docx`,function(error,content){
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
              throw error;
          }
        
          let out = doc.getZip().generate({
              type:"blob",
              mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              })
          saveAs(out,`Hoja de vida ${dataset.name} ${dataset.firstLastName} ${dataset.secondLastName}.docx`);   
      });
  }
}
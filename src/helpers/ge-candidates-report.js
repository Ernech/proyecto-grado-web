import { saveAs } from 'file-saver';

const exportToExcel = () => {
    const data = [{ "name": "Ernesto", "Age": 25 }, { "name": "Andrés", "Age": 25 }];
    const myJsonString = JSON.stringify(data);
    const blob = new Blob([myJsonString], {
        type: "application/vnd.ms-excel;charset=utf-8"
    });
    saveAs(blob, "Report.xls");


}

export { exportToExcel }
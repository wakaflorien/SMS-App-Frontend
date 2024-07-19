import { notification } from "antd";
import * as XLSX from 'xlsx';

export const removeLastEmptyObject = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
      let obj = array[i];
      let values = Object.keys(obj)
        .filter(key => key !== "id") // Exclude 'id' property
        .map(key => obj[key]);
      values.every(value => value === "" || typeof value === "undefined")
  
      if (values.every(value => value.trim() === "" || typeof value === "undefined")) {
        // Remove the empty line at the end
        array.pop();
      } else {
        // Once a non-empty line is encountered, stop the loop
        break;
      }
    }
    return array;
  }
export const readFile = async (file) => {
    let response = {
        fileData: '',
        fileName: '',
        fileId: '',
        fileColumns: ''

    }

    if (!file || !file.name) {
        return notification.warning({
            message: 'Invalid File',
            description: 'Please select a file.'
        })
    }
    const fileName = file.name;
    const fileId = file.uid;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(fileExtension)) {
        return notification.warning({
            message: 'Invalid File',
            description: 'Please select an Excel or CSV file.'
        })
    }

    try {

        const fileReader = new FileReader();
        const fileContent = await new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsBinaryString(file);
        });

        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
        const sheetColumns = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, blankrows: true })[0];
        let array_data = [];

        if (!sheetColumns || sheetColumns.length === 0) {
            return notification.error({
                message: 'Failed',
                description: `File Error, unable to read columns. Please reformat your file and try again.`
            })
        }

        for (let index = 0; index < sheetData.length; index++) {
            const item = sheetData[index];

            const newObjectKeys = Object.keys(item).reduce((acc, key, index) => {

                if (!key?.toString().toLowerCase().includes("empty") && sheetColumns[index] !== undefined && sheetColumns[index] !== null && sheetColumns[index] !== '') {
                    acc[sheetColumns[index]] = item[key];
                }
                return acc;
            }, {})

            // console.log("item 66", sheetColumns, item);
            array_data.push({ "id": index + 1, ...newObjectKeys });
        }

        response = {
            fileData: removeLastEmptyObject(array_data),
            fileName: fileName,
            fileId: fileId,
            fileColumns: sheetColumns
        }
        // set('recent_file', {file_name: fileName, file_id: fileId});
    } catch (err) {
        // console.log("ERROR in readExcelFile ==>", err.message);
        return notification.error({
            message: 'File Error',
            description: `Failed to parse the file.`
        });
    }
    return response;
}
import api from './api.js';
import initPage, { toggleLoaderElement } from './initPage.js';

const onFetchBtnClick = () => {
    const selectElement = document.getElementById('patient-select')
    const options = selectElement.children;
    const selectedOption = [...options].find(option => option.selected);

    if(selectedOption && !selectedOption.disabled) {
        toggleLoaderElement(true);
        api.getMedicalRecords(selectedOption.value)
        .then(data => {
            toggleLoaderElement(false);
            generateTable(headers, data);
        })
    }
}

initPage({
    fetchDataCb: onFetchBtnClick,
});

const generateUserDataSlicing = (data) => {
    const patientNameElement = document.getElementById('patient-name');
    const patientDobElement = document.getElementById('patient-dob');
    const patientHeightElement = document.getElementById('patient-height');

    const userData = data.data[0];
    patientNameElement.innerHTML = userData.userName;
    patientDobElement.innerHTML = `DOB: ${userData.userDob}`;
    patientHeightElement.innerHTML = `Height: ${userData.meta.height}`;
}

const generateTableRows = (data, headers, isSlicingGenerated) => {
    const tableBody = document.getElementById('table-body');

    const generateRow = (rowElement, record, headers) => {
        headers.forEach((header, index) => {
            const cellElement = isSlicingGenerated ? rowElement.children[index] : document.createElement('td');
            let cellContent = null;
            switch(index) {
                case 0: {
                    cellContent = record.id;
                    break;
                }
                case 1: {
                    const date = new Date(record.timestamp);
                    const day = date.getDate();
                    const fullDay = day < 10 ? `0${day}` : day;
                    const month = date.getMonth() + 1;
                    const fullMonth = month < 10 ? `0${month}` : month;
                    const fullYear = date.getFullYear();
                    cellContent = `${fullDay}/${fullMonth}/${fullYear}`;
                    break;
                }
                case 2: {
                    cellContent = `${record.diagnosis.name}(${record.diagnosis.id})`;
                    break;
                }
                case 3: {
                    cellContent = record.meta.weight;
                    break;
                }
                case 4: {
                    cellContent = record.doctor.name;
                    break;
                }
                default: cellContent = '';
            }

            cellElement.innerHTML = cellContent;
            if(!isSlicingGenerated) {
                rowElement.appendChild(cellElement);
            }
        })
    }

    const recordsList = [...data.data].sort((a, b) => b.timestamp - a.timestamp);
    recordsList.forEach((record, index) => {
        const rowElement = isSlicingGenerated ? tableBody.children[index] : document.createElement('tr');
        if(!isSlicingGenerated) {
            tableBody.appendChild(rowElement);
        }
        generateRow(rowElement, record, headers);
    })
}

const generateTable = (headers, data) => {
    const tableHeader = document.getElementById('table-header');

    generateUserDataSlicing(data);

    const isSlicingGenerated = !!tableHeader.children.length;

    headers.forEach((header) => {
        if(!isSlicingGenerated) {
            const headerElement = document.createElement('th');
            headerElement.innerHTML = header;
            tableHeader.appendChild(headerElement);            
        }
    });

    generateTableRows(data, headers, isSlicingGenerated);
}

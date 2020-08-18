const selectElement = document.getElementById('patient-select')
const btnElement = document.getElementById('submit-btn');
const loaderView = document.getElementById('loader-view');
const profileView = document.getElementById('profile-view');
const profileTable = document.getElementById('patient-records-table');
const tableHeader = document.getElementById('table-header');

loaderView.style.display = 'none';

const generateTable = () => {
    headers.forEach(header => {
        const headerElement = document.createElement('th');
        headerElement.innerHTML = header;
        tableHeader.appendChild(headerElement);
    });
}

const onFetchBtnClick = () => {
    const options = selectElement.children;
    const selectedOption = [...options].find(option => option.selected);
    loaderView.style.display = 'block';

    if(selectedOption && !selectedOption.disabled) {
        fetch(`https://jsonmock.hackerrank.com/api/medical_records?userId=${selectedOption.value}`)
        .then(response => response.json()).then(data => {
            console.log(data)
            loaderView.style.display = 'none';

            generateTable()
        })
    }
}


btnElement.addEventListener('click', onFetchBtnClick);

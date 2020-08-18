export const toggleLoaderElement = (isVisible) => {
    const loaderView = document.getElementById('loader-view');

    if(isVisible) {
        loaderView.style.display = 'block';
    } else {
        loaderView.style.display = 'none';
    }
}

const initPage = ({ fetchDataCb }) => {
    const btnElement = document.getElementById('submit-btn');
    toggleLoaderElement(false);

    btnElement.addEventListener('click', fetchDataCb);
}

export default initPage;

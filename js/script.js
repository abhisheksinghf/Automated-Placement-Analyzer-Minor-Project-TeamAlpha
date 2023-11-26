// file-upload.html

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const analyzeButton = document.getElementById('analyze-btn');
const fileLabel = document.getElementById('file-label');

/*        fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        fileLabel.textContent = 'Files Selected';
    }
});
*/
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#007BFF';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#444';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#444';
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});

analyzeButton.addEventListener('click', () => {
    // Implement analysis logic here.
});

function handleFiles(files) {
    for (const file of files) {
        const fileItem = document.createElement('li');
        fileItem.classList.add('file-item');
        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('progress-bar-container');
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBarContainer.appendChild(progressBar);
        fileItem.appendChild(progressBarContainer);
        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        fileItem.appendChild(fileName);
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            fileItem.remove();
        });
        fileItem.appendChild(removeButton);
        fileList.appendChild(fileItem);
    }
}
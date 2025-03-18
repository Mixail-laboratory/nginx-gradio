function toggleInputs() {
    const method = document.getElementById('enhancement_method').value;
    const input = document.getElementById('file_input');
    input.accept = method === 'Видео' ? 'video/*' : 'image/*';
}

function previewFile() {
    const fileInput = document.getElementById('file_input');
    const file = fileInput.files[0];

    if (!file) return;

    const fileType = file.type.startsWith('video') ? 'Видео' : 'Фото';
    const removeButton = document.getElementById('remove_file_btn');

    if (fileType === 'Видео') {
        const originalVideo = document.getElementById('original_video');
        const originalImage = document.getElementById('original_image');
        const uploadContainer = document.getElementById('upload_container');
        originalImage.classList.add('hidden');
        originalVideo.classList.remove('hidden');
        uploadContainer.style.display = 'none';
        removeButton.classList.remove('hidden');
        originalVideo.src = URL.createObjectURL(file);
        originalVideo.load();
    } else {
        const originalImage = document.getElementById('original_image');
        const originalVideo = document.getElementById('original_video');
        const uploadContainer = document.getElementById('upload_container');
        originalVideo.classList.add('hidden');
        originalImage.classList.remove('hidden');
        uploadContainer.style.display = 'none';
        removeButton.classList.remove('hidden');
        originalImage.src = URL.createObjectURL(file);
    }
}

function removeFile() {
    const fileInput = document.getElementById('file_input');
    const uploadContainer = document.getElementById('upload_container');
    const originalVideo = document.getElementById('original_video');
    const originalImage = document.getElementById('original_image');
    const removeButton = document.getElementById('remove_file_btn');

    // Сбрасываем файл
    fileInput.value = "";
    originalVideo.classList.add('hidden');
    originalImage.classList.add('hidden');
    uploadContainer.style.display = 'block';
    removeButton.classList.add('hidden');
}

function processFile() {
    const fileInput = document.getElementById('file_input');
    const enhancementMethod = document.getElementById('enhancement_method').value;
    const scale = document.getElementById('scale').value;

    if (!fileInput.files.length) {
        alert("Загрузите файл!");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('method', enhancementMethod);
    formData.append('scale', scale);

    fetch('/process', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const isVideo = enhancementMethod === 'Видео';
            const processedVideo = document.getElementById('processed_video');
            const processedImage = document.getElementById('processed_image');
            const downloadResultVideo = document.getElementById('download_result_video');
            const downloadResultImage = document.getElementById('download_result_image');
            console.log('asdasdjaskjd')
            if (isVideo) {
                processedImage.classList.add('hidden');
                processedVideo.classList.remove('hidden');
                processedVideo.src = data.result_url;
                processedVideo.load();
                downloadResultVideo.href = data.result_url;  
                downloadResultVideo.classList.remove('hidden');  
                downloadResultVideo.download = 'processed_video.mp4'; 
                downloadResultImage.classList.add('hidden');
            } else {
                processedVideo.classList.add('hidden');
                processedImage.classList.remove('hidden');
                processedImage.src = data.result_url;
                downloadResultImage.href = data.result_url;  
                downloadResultImage.classList.remove('hidden');
                downloadResultImage.download = 'processed_image.png'; 
                downloadResultVideo.classList.add('hidden');
            }

        } else {
            alert(data.message || 'Ошибка обработки файла');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Произошла ошибка при обработке файла!');
    });
}
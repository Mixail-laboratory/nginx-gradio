const form = document.getElementById('uploadForm');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const messageDiv = document.getElementById('message');
const downloadLink = document.getElementById('download-link');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Остановить стандартное поведение формы

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/upload', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Начать проверку прогресса после успешной загрузки
            checkProgress();
        } else {
            alert('Ошибка загрузки. Попробуйте еще раз.');
        }
    };

    xhr.send(formData); // Отправить данные формы
});

function checkProgress() {
    progress.style.display = 'block'; // Показать прогресс-бар
    const interval = setInterval(() => {
        fetch('/progress')
            .then(response => response.json())
            .then(data => {
                progressBar.style.width = data.progress + '%'; // Обновить ширину прогресс-бара
                if (data.progress >= 100) {
                    clearInterval(interval); // Остановить проверку, когда прогресс 100%
                    messageDiv.innerHTML = 'Обработка завершена!'; // Показать сообщение
                    downloadLink.style.display = 'block'; // Показать кнопку для скачивания
                }
            });
    }, 1000); // Проверять каждую секунду
}
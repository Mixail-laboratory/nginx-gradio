from flask import Flask, request, render_template, redirect, url_for, send_from_directory, jsonify
import os
import subprocess
import threading
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Конфигурация
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'mp4', 'avi', 'mov', 'mkv'}

# Глобальная переменная для хранения прогресса
progress = 0

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def run_ffmpeg(input_file, output_file):
    global progress
    command = ['ffmpeg', '-i', input_file, '-y', output_file]
    
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    while True:
        output = process.stderr.read(1024).decode()
        if output == '' and process.poll() is not None:
            break
        if output:
            # Извлечение прогресса из вывода ffmpeg
            for line in output.splitlines():
                if "time=" in line:
                    time_str = line.split("time=")[1].split(" ")[0]
                    time_parts = time_str.split(":")
                    total_seconds = int(time_parts[0]) * 3600 + int(time_parts[1]) * 60 + float(time_parts[2])
                    # Примерное время обработки (можно заменить на реальное время)
                    total_duration = 60  # Замените на фактическую продолжительность видео
                    progress = int((total_seconds / total_duration) * 100)

    progress = 100  # Завершение обработки

@app.route('/')
def index():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload():
    global progress
    progress = 0  # Сброс прогресса

    if 'video' not in request.files:
        return redirect(url_for('index'))
    
    video_file = request.files['video']
    
    if video_file.filename == '' or not allowed_file(video_file.filename):
        return redirect(url_for('index'))

    # Создание директории, если она не существует
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    filename = secure_filename(video_file.filename)
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    video_file.save(video_path)

    # Обработка видео в отдельном потоке
    output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output.mp4')
    threading.Thread(target=run_ffmpeg, args=(video_path, output_path)).start()

    return render_template('upload.html', message='Видео загружается и обрабатывается!')

@app.route('/progress', methods=['GET'])
def get_progress():
    return jsonify({'progress': progress})

@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
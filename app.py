from flask import Flask, request, render_template, redirect, url_for, send_from_directory, jsonify
import os
import sys
import uuid
from werkzeug.utils import secure_filename
from concurrent.futures import ProcessPoolExecutor
import time
import subprocess

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'results'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)


def test_upscale(file_path, method, scale):
    unique_id = str(uuid.uuid4())
    name, ext = os.path.splitext(os.path.basename(file_path))
    output_file = os.path.join(RESULT_FOLDER, f"{name}_{unique_id}{ext}")
    print(output_file)
    cmd = f'ffmpeg -i {file_path} -y {output_file}'
    command = ['ffmpeg', '-i', file_path, '-y', output_file]
    
    os.system(cmd)
    return output_file if os.path.exists(output_file) else None   

def upscale(file_path, method, scale):
    unique_id = str(uuid.uuid4())
    name, ext = os.path.splitext(os.path.basename(file_path))
    output_file = os.path.join(RESULT_FOLDER, f"{name}_{unique_id}{ext}")

    if not is_debug:
        if method == "Видео":
            cmd = f'CUDA_VISIBLE_DEVICES=0 python inference_realesrgan_video.py -i "{file_path}" -n realesr-animevideov3 -s {scale} --suffix {unique_id} --num_process_per_gpu 2'
        else:
            cmd = f'python inference_realesrgan.py -n RealESRGAN_x4plus -i "{file_path}" --suffix {unique_id} -s {scale}'

        os.system(cmd)

    if method == "Видео":
        video_output_file = os.path.join(RESULT_FOLDER, f"{name}_{unique_id}.mp4") 
        return video_output_file if os.path.exists(video_output_file) else None
    else:
        return output_file if os.path.exists(output_file) else None

@app.route('/')
def index():
    return render_template('upload.html')

@app.route('/process', methods=['POST'])
def process_file():
    file = request.files['file']
    method = request.form['method']
    scale = request.form['scale']

    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    result = None

    # test_upscale for my test code
    # upscale for realsrgan
    with ProcessPoolExecutor(max_workers=4) as executor:
        future = executor.submit(test_upscale, file_path, method, scale)
        #future = executor.submit(upscale, file_path, method, scale)
        result = future.result()


    if result:
        result_url = url_for('download_file', filename=os.path.basename(result))
        return jsonify({
            "status": "success",
            "original_url": url_for('download_file', filename=filename),
            "result_url": result_url
        })
    return jsonify({"status": "error", "message": "Ошибка обработки файла"}), 500

@app.route('/results/<filename>')
def download_file(filename):
    print(filename)
    print(RESULT_FOLDER)
    if filename in os.listdir(RESULT_FOLDER):
        print('exist')
        return send_from_directory(RESULT_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        is_debug = True
    app.run(debug=True)
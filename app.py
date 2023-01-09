from flask import Flask, render_template, request, redirect, url_for
import os
import shutil
import pytorch_predict

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    shutil.rmtree('./static/image')
    os.mkdir('./static/image')
    if request.method == 'POST':
        file = request.files['image']
        file.save(os.path.join('./static/image', file.filename))
        return redirect(url_for('result', filename=file.filename))
    else:
        return render_template('index.html')

@app.route('/result/<string:filename>')
def result(filename):
    if pytorch_predict.predict_oyster_or_not(str(os.path.join('./static/image', filename))):
        result = 'This is oyster!'
    else:
        result = 'This is not oyster.'
    return render_template('result.html', filename=filename, result=result)


if __name__ == '__main__':
    app.run(debug=True)
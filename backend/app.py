from flask import Flask, request
from flask_cors import CORS
from functions import my_functions
from functions import pytorch_predict

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.json.get('image').split(',')[1]
        my_functions.decode_image(data)

    if pytorch_predict.predict_oyster_or_not('images/uploaded.jpg'):
        result = 'This is oyster!'
    else:
        result = 'This is not oyster.'
    return {'prediction':result}

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=8000)
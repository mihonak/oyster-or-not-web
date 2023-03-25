from flask import Flask, request
from flask_cors import CORS
from functions import my_functions
from functions import pytorch_predict
import os

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if request.json.get('image'):
            data = request.json.get('image').split(',')[1]
            my_functions.decode_image(data)

            if pytorch_predict.predict_oyster_or_not('images/uploaded.jpg'):
                result = True
            else:
                result = False
            return {'prediction':result}

        if request.json.get('greeting'):
            return {'response':True}

if __name__ == '__main__':
    port = int(os.getenv('PORT', default=8000))
    app.run(debug=True, host='0.0.0.0', port=port)
    # app.run(debug=True, host='localhost', port=port)
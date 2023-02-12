import cv2
import base64
import numpy as np

def decode_image(img_base64):
    file_path=r'backend/images/uploaded.jpg'

    img_binary = base64.b64decode(img_base64)
    jpg=np.frombuffer(img_binary,dtype=np.uint8)

    img = cv2.imdecode(jpg, cv2.IMREAD_COLOR)
    cv2.imwrite(file_path,img)

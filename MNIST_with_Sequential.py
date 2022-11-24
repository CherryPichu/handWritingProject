import cv2
import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, BatchNormalization
import tensorflow as tf


model = Sequential()
model.add(Conv2D(32, kernel_size = 3, activation='relu', input_shape = (28, 28, 1)))
model.add(BatchNormalization())
model.add(Conv2D(32, kernel_size = 3, activation='relu'))
model.add(BatchNormalization())
model.add(Conv2D(32, kernel_size = 5, strides=2, padding='same', activation='relu'))
model.add(BatchNormalization())
model.add(Dropout(0.4))

model.add(Conv2D(64, kernel_size = 3, activation='relu'))
model.add(BatchNormalization())
model.add(Conv2D(64, kernel_size = 3, activation='relu'))
model.add(BatchNormalization())
model.add(Conv2D(64, kernel_size = 5, strides=2, padding='same', activation='relu'))
model.add(BatchNormalization())
model.add(Dropout(0.4))

model.add(Conv2D(128, kernel_size = 4, activation='relu'))
model.add(BatchNormalization())
model.add(Flatten())
model.add(Dropout(0.4))
model.add(Dense(10, activation='softmax'))

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

model.load_weights('MNIST')

img = cv2.imread("res/img.jpg")
# plt.figure(figsize=(15, 12))

img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            

img_blur = cv2.GaussianBlur(img_gray, (5, 5), 0)


ret, img_th = cv2.threshold(img_blur, 127, 255, cv2.THRESH_BINARY_INV)
contours, hierachy = cv2.findContours(img_th.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

rects = [cv2.boundingRect(each) for each in contours]

rects = sorted(rects)

contour_sizes = [(cv2.contourArea(contour), contour) for contour in contours]
biggest_contour = max(contour_sizes, key=lambda x: x[0])[1]

ret, img_th = cv2.threshold(img_blur, 127, 255, cv2.THRESH_BINARY_INV)
contours, hierachy = cv2.findContours(img_th.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

rects = [cv2.boundingRect(each) for each in contours]

rects = sorted(rects)

img_cpy = img_blur.copy()

mnist_imgs=[]
margin_pixel = 15

for rect in rects:
    im = img_cpy[rect[1] - margin_pixel:rect[1] + rect[3] + margin_pixel, rect[0] - margin_pixel:rect[0] + rect[2] + margin_pixel]
    row, col = im.shape[:2]
    
    bordersize = max(row, col)
    diff = min(row, col)
    
    bottom = im[row-2:row, 0:col]
    mean = cv2.mean(bottom)[0]
    
    border = cv2.copyMakeBorder(
        im,
        top=0,
        bottom=0,
        left=int((bordersize-diff)/2),
        right=int((bordersize-diff)/2),
        borderType=cv2.BORDER_CONSTANT,
        value=[mean, mean, mean]
    )
    
    square = border
    
    resiz_img = cv2.resize(square, dsize=(28, 28), interpolation=cv2.INTER_AREA) 
    mnist_imgs.append(resiz_img)

res = []


## 허남정/Print 구문 최적화.
for i in range(len(mnist_imgs)):
    
    input_img = mnist_imgs[i]
    img = input_img.reshape(-1, 28, 28, 1)
    
    input_data = ((np.array(img) / 255) - 1) * -1
    input_data
    
    res.append(str(int(np.argmax(model.predict(input_data, verbose=0, workers=10), axis=-1)))) # workers 10 설정 , verbose =0 설정(print문 x)
    

print( ''.join(res), end="" ) # 프린터는 한번만 / 허남정
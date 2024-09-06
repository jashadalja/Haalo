import cv2
from matplotlib import pyplot as plt
import numpy as np
import imutils
import easyocr 

     
img = cv2.imread('/Sample_1.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# plt.imshow(cv2.cvtColor(gray, cv2.COLOR_BGR2RGB))

bfilter = cv2.bilateralFilter(gray, 11, 17, 17) #Noise reduction
edged = cv2.Canny(bfilter, 30, 200) #Edge detection
# plt.imshow(cv2.cvtColor(edged, cv2.COLOR_BGR2RGB))

keypoints = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(keypoints)
contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]
     

location = None
for contour in contours:
    peri = cv2.arcLength(contour, True)
    approx = cv2.approxPolyDP(contour, 0.02 * peri, True)  # Approximate the contour
    if len(approx) == 4:  # Number plates are rectangular (4 points)
        location = approx
        break
# print(location)



if location is not None:
    mask = np.zeros(gray.shape, np.uint8)
    new_image = cv2.drawContours(mask, [location], 0,255, -1)
    new_image = cv2.bitwise_and(img, img, mask=mask)
    cv2.imwrite('/saved.jpg', new_image)
    reader = easyocr.Reader(['en'])  # Use 'en' for English language
    results = reader.readtext(new_image)
    for result in results:
    # result[1] contains the detected text
         print("Detected Text:", result[1])

else:
    print("Number plate location not found")

     
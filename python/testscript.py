###############################################
# Load the user input from the parent process
###############################################
import sys

try:
    print('INPUT:\n' + str(sys.argv))
except:
    print('ERROR: Null input detected')
    sys.stderr.write('Null input detected')
    exit()


###############################################
## Define normalization/transformation procedures for user input
###############################################

def normalize(x, xmin, xmax):
    return (x - xmin) / (xmax - xmin)

def fit(data):
    data['CNT_CHILDREN'] = normalize(data['CNT_CHILDREN'], min(0, data['CNT_CHILDREN'][0]), max(19, data['CNT_CHILDREN'][0]))
    data['AMT_INCOME_TOTAL'] = normalize(data['AMT_INCOME_TOTAL'], min(26100, data['AMT_INCOME_TOTAL'][0]), max(6750000, data['AMT_INCOME_TOTAL'][0]))
    data['DAYS_BIRTH'] = normalize(data['DAYS_BIRTH'][0], min(-12005, data['DAYS_BIRTH'][0]), max(-7489, data['DAYS_BIRTH'][0]))
    data['DAYS_EMPLOYED'] = normalize(data['DAYS_EMPLOYED'][0], min(-17531, data['DAYS_EMPLOYED'][0]), max(365243, data['DAYS_EMPLOYED'][0]))
    data['months'] = normalize(data['months'][0], min(1, data['months'][0]), max(6, data['months'][0]))
    return data

###############################################
## Create a dummy sample
###############################################

'''
    I notice that the network is designed to take in one-hot-encoded tensors.
    We need to:
        - convert an input sample into the proper tensor shape
            - requires looking into CreditModelNN_v2 file
'''


###############################################
## Load the Keras Model for prediction
###############################################
import pandas as pd
from tensorflow import keras
model = keras.models.load_model('CNN_100')
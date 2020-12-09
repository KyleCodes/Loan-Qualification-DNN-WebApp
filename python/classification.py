# try:

import sys
from tensorflow import keras
from keras.models import model_from_json
from keras.utils.data_utils import get_file
# import contextlib

#
# with contextlib.redirect_stdout(None):
#     saved_ANN100_JSON = get_file(
#             'ANN100_JSON',
#             'https://drive.google.com/uc?export=download&id=1E2CZ4Ri9rxtsU4QhSVif25ylKlrkjDiE')
#
#     saved_ANN100_H5 = get_file(
#             'ANN100_H5',
#             'https://drive.google.com/uc?export=download&id=1mhKAc9pTAWLQQn8E8HlYo_aOYCIcCo6t')
#
#
# # load json and create model
# json_file = open(saved_ANN100_JSON, 'r')
# loaded_model_json = json_file.read()
# json_file.close()
# loaded_model = model_from_json(loaded_model_json)
# # load weights into new model
# loaded_model.load_weights(saved_ANN100_H5)

loaded_model = keras.models.load_model('../CNN100_model/saved_model.pb')



# helper func to normalize inputs
def normalize(x, xmin, xmax):
    return (x - xmin) / (xmax - xmin)

# init the features
gender = 1
has_car = 1
has_house = 1
num_children = float(6)
income_amount = float(5)
birthday = float(-6999)
days_emplyed = float(3650)
is_workphone = 1
is_phone = 1
is_email = 1
months = float(4)

# one hot encoding vars
income_commercial_ass = 0
income_pensioner = 0
income_state_servant = 0
income_student = 0
income_working = 1

edu_academic = 0
edu_higher = 1
edu_incomplete_higher = 0
edu_lower_sec = 0
edy_sec = 0

fam_civil = 1
fam_marr = 0
fam_sep =0
fam_single = 0
fam_wid = 0

house_coop = 0
house_house = 1
house_municipal = 0
house_office = 0
house_rented = 0
house_parents = 0

job_accountants = 0
job_cleaning = 0
job_cooking = 0
job_core = 0
job_driver = 0
job_HR = 0
job_highskill = 1
job_IT = 0
job_lab = 0
job_lowskill = 0
job_manager = 0
job_medic = 0
job_privateservice = 0
job_realty = 0
job_sales = 0
job_secratearies = 0
job_secuirty = 0
job_waiter = 0

num_children = normalize(num_children, min(0, num_children), max(19, num_children))
income_amount = normalize(income_amount, min(26100, income_amount), max(6750000, income_amount))
birthday = normalize(birthday, min(-12005, birthday), max(-7489, birthday))
days_emplyed = normalize(days_emplyed, min(-17531, days_emplyed), max(365243, days_emplyed))
months =  normalize(months, min(0, months), max(200, months))

info = [[gender, has_car, has_house, num_children, income_amount, birthday, days_emplyed,
         is_workphone, is_phone, is_email, months, income_commercial_ass,
         income_pensioner, income_state_servant, income_student, income_working, edu_academic,
         edu_higher, edu_incomplete_higher, edu_lower_sec, edy_sec, fam_civil, fam_marr,
         fam_sep, fam_single, fam_wid, house_coop, house_house, house_municipal, house_office,
         house_rented, house_parents, job_accountants, job_cleaning, job_cooking, job_core,
         job_driver, job_HR, job_highskill, job_IT, job_lab, job_lowskill, job_manager, job_medic,
         job_privateservice, job_realty, job_sales, job_secratearies, job_secuirty, job_waiter]]


result = loaded_model.predict_classes(info)
# sys.stdout.write(str(result))
print(result)

# except Exception as e:
#     sys.stderr.write(str(e))

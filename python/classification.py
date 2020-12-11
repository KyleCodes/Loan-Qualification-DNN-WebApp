import sys
from tensorflow import keras

loaded_model = keras.models.load_model('./python/CNN100_model')


# helper func to normalize inputs
def normalize(x, xmin, xmax):
    return (x - xmin) / (xmax - xmin)

# init the features
gender = int(sys.argv[1])
has_car = int(sys.argv[4])
has_house = int(sys.argv[3])
num_children = float(sys.argv[6])
income_amount = float(sys.argv[5])
birthday = float(sys.argv[2])
days_emplyed = float(sys.argv[16])
is_workphone = int(sys.argv[12])
is_phone = int(sys.argv[13])
is_email = int(sys.argv[14])
months = float(sys.argv[11])

# one hot encoding vars
income_commercial_ass = 0
income_pensioner = 0
income_state_servant = 0
income_student = 0
income_working = 0

if sys.argv[8] == "Working":
  income_working = 1
elif sys.argv[8] == "Commercial associate":
  income_commercial_ass = 1
elif sys.argv[8] == "Pensioner":
  income_pensioner = 1
elif sys.argv[8] == "State servant":
  income_state_servant = 1
elif sys.argv[8] == "Student":
  income_student = 1
else:
  pass

edu_academic = 0
edu_higher = 0
edu_incomplete_higher = 0
edu_lower_sec = 0
edu_sec = 0

if sys.argv[7] == "Higher education":
  edu_higher = 1
elif sys.argv[7] == "Secondary / secondary special":
  edu_sec = 1
elif sys.argv[7] == "Incomplete higher":
  edu_incomplete_higher = 1
elif sys.argv[7] == "Lower secondary":
  edu_lower_sec = 1
elif sys.argv[7] == "Academic degree":
  edu_academic = 1
else:
  pass

fam_civil = 0
fam_marr = 0
fam_sep = 0
fam_single = 0
fam_wid = 0

if sys.argv[10] == "Civil marriage":
  fam_civil = 1
elif sys.argv[10] == "Married":
  fam_marr = 1
elif sys.argv[10] == "Single / not married":
  fam_single = 1
elif sys.argv[10] == "Separated":
  fam_sep = 1
elif sys.argv[10] == "Widow":
  fam_wid = 1
else:
  pass

house_coop = 0
house_house = 0
house_municipal = 0
house_office = 0
house_rented = 0
house_parents = 0

if sys.argv[9] == "Rented apartment":
  house_rented = 1
elif sys.argv[9] == "House / apartment":
  house_house = 1
elif sys.argv[9] == "Municipal apartment":
  house_municipal = 1
elif sys.argv[9] == "With parents":
  house_parents = 1
elif sys.argv[9] == "Co-op apartment":
  house_coop = 1
elif sys.argv[9] == "Office apartment":
  house_office = 1
else:
  pass

job_accountants = 0
job_cleaning = 0
job_cooking = 0
job_core = 0
job_driver = 0
job_HR = 0
job_highskill = 0
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

if sys.argv[15] == "accountants":
  job_accountants = 1
elif sys.argv[15] == "cleaning":
  job_cleaning = 1
elif sys.argv[15] == "cooking":
  job_cooking = 1
elif sys.argv[15] == "core":
  job_core = 1
elif sys.argv[15] == "driver":
  job_driver = 1
elif sys.argv[15] == "HR":
  job_HR = 1
elif sys.argv[15] == "highskill":
  job_highskill = 1
elif sys.argv[15] == "IT":
  job_highskill = 1
elif sys.argv[15] == "lab":
  job_lab = 1
elif sys.argv[15] == "lowskill":
  job_lowskill = 0
elif sys.argv[15] == "manager":
  job_manager = 1
elif sys.argv[15] == "medic":
  job_medic = 1
elif sys.argv[15] == "privateservice":
  job_privateservice = 1
elif sys.argv[15] == "realty":
  job_realty = 1 
elif sys.argv[15] == "sales":
  job_sales = 1
elif sys.argv[15] == "secretaries":
  job_secratearies = 1
elif sys.argv[15] == "security":
  job_secuirty = 1
elif sys.argv[15] == "waiter":
  job_waiter = 1
else:
  pass

num_children = normalize(num_children, min(0, num_children), max(19, num_children))
income_amount = normalize(income_amount, min(26100, income_amount), max(6750000, income_amount))
birthday = normalize(birthday, min(-12005, birthday), max(-7489, birthday))
days_emplyed = normalize(days_emplyed, min(-17531, days_emplyed), max(365243, days_emplyed))
months =  normalize(months, min(0, months), max(200, months))

info = [[gender, has_car, has_house, num_children, income_amount, birthday, days_emplyed,
         is_workphone, is_phone, is_email, months, income_commercial_ass,
         income_pensioner, income_state_servant, income_student, income_working, edu_academic,
         edu_higher, edu_incomplete_higher, edu_lower_sec, edu_sec, fam_civil, fam_marr,
         fam_sep, fam_single, fam_wid, house_coop, house_house, house_municipal, house_office,
         house_rented, house_parents, job_accountants, job_cleaning, job_cooking, job_core,
         job_driver, job_HR, job_highskill, job_IT, job_lab, job_lowskill, job_manager, job_medic,
         job_privateservice, job_realty, job_sales, job_secratearies, job_secuirty, job_waiter]]


result = loaded_model.predict_classes(info)[0][0]
# sys.stdout.write(str(result))
print(result)

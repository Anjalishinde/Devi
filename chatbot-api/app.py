from flask import Flask, request, jsonify, render_template
from chatbot import FAQ
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Data

list_QandA = [["Menstrual health What is menstruation? I don’t know about menstruation. What is it?",
         " Menstruation or periods is when the uterus lining sheds, causing vaginal bleeding in women every month. The menstrual cycle is usually around 28 days but can vary from 21 to 35 days.  It is a very normal and natural occurrence."],
        ["Menstrual health What is menstruation? Why does menstruation happen?",
         "Every month, the uterus prepares for pregnancy and if no pregnancy occurs, it sheds its lining. The menstrual cycle is usually around 28 days but can vary from 21 to 35 days.  It is a very normal and natural occurrence."],
        ["Menstrual health Starting my period When will my period start",
         "Girls usually start to menstruate (menarche) during puberty or adolescence, typically between the ages of 10 and 19. If you are around the age of 16 and above and you have still not started menstruating or if you are still not experiencing any physical changes/ development of secondary sexual characteristics (eg: development of breasts, hair growth in the pubic area) it is advised that you consult a doctor."],
        ["Menstrual health Starting my period I am scared/worried about starting my periods",
         "Menstruation is a completely normal, naturally occurring, biological phenomenon. Menstruation or periods is when the uterus lining sheds, causing vaginal bleeding in women every month.  Every month, the uterus prepares for pregnancy and if no pregnancy occurs, it sheds its lining. The menstrual cycle is usually around 28 days but can vary from 21 to 35 days.There is nothing to be scared of. You can talk to your mother, a friend or someone you trust about it too if you feel scared or have any questions. "],
        ["Menstrual health Starting my period How long is my period supposed to last?",
         "Your period normally lasts for around five days but can be as short as two days or as long as seven.  If your period lasts longer than 7 days it is considered to be a long period. This could be normal under some circumstances (if you have just started menstruating, for example). However, if you have heavy bleeding or if your period lasts more than 7 days every month it could be indicative of underlying health conditions. This would mean that you need to visit your doctor."],
        ["Menstrual health Starting my period  How do I manage my periods?",
         "To manage your period effectively and stay hygienic during this time, you must use menstrual hygiene products. There are different kinds of products available in the market- both single-use (sanitary napkins, tampons) and reusable (reusable cloth pads, menstrual cups). You must choose a product that suits your needs the best based on your flow and comfort. "],
        ["Menstrual health Period Problems Painful periods",
         "Menstruation can be painful or uncomfortable. Lower abdominal cramps, pain in the legs or the lower back region and breast tenderness are some of the common symptoms experienced by women during periods. It is completely normal to experience varying levels of discomfort while menstruating. One must keep in mind that the normal range of pain varies from person to person.However, if you experience excessive and unmanageable pain during your periods, it is advised that you visit a doctor as it could be an indicator of underlying health conditions."],
        ["Menstrual health Period Problems Heavy periods",
         "Heavy bleeding or menorrhagia is when your period lasts for more than 7 days or if you need to change your menstrual hygiene product after less than 2 hours. It could be indicative of underlying health issues. Under certain circumstances, it could also be due to hormonal imbalances. If you are experiencing heavy bleeding, you should see a doctor at the earliest."],
        ["Menstrual health Period Problems Light periods",
         " Lighter periods than normal would refer to when it is relatively shorter in duration, you need fewer menstrual products than you usually would, the flow is consistent and light and the bleeding is more akin to spotting over the days. It is normal to experience relatively lighter periods during your cycle. However, if you miss your periods for more than a month you should get it checked by a doctor."],
        ["Menstrual health Period Problems Missed period",
         "The first reason for a missed period is pregnancy. However, it is a possibility only if you have engaged in sexual intercourse. If you have never engaged in sexual intercourse, you cannot become pregnant. Apart from pregnancy, there are many other possible reasons for missing your period including stress, inadequate food intake, medication, if you have just started your period, breastfeeding (lactation amenorrhea), an underlying disorder like PCOS, and menopause. If you miss your periods for more than a month you should consult a doctor."],
        ["Menstrual health Period Problems Irregular periods",
         " If you have just started your period, it is normal for your period to take to become regular. Generally, your menstrual cycle will adjust to a pattern as you grow older.However, if your period is erratic and doesn’t regularise even after 6-12 months after you get your period, it could be indicative of an underlying health condition that needs to be addressed. Also, irregular periods are sometimes caused due to physical or psychological stress and lifestyle changes."],
        ["Menstrual health Period Problems Frequent periods (more than once a month)",
         " It is okay and normal to get your period more than once a month. This happens when the menstrual cycle is shorter for a person. However, this should not happen every month. If you are frequently getting your period more than once in a month, consult a doctor."],
        ["Menstrual health Period Problems Emotional wellbeing and periods",
         "Psychological symptoms such as low mood and anxiousness are normal to experience before, during and after your periods. You can engage in activities that improve your mood such as light exercise, sports and spending time with friends and family. Nevertheless, if you continue to experience low moods, and have depressive episodes even after your period ends, you should consult your doctor or a psychologist."],
        [
            "Menstrual hygiene and period management Menstrual hygiene Taking care of your hygiene needs while menstruating",
            "You must use a menstrual hygiene product of your choice at all times and must change it frequently if need be, based on your flow. If you are using a reusable product such as a reusable cloth pad or a menstrual cup, you must wash it after each use and allow it to adequately dry before using it again. In case of a disposable product, make sure that you dispose of it in a hygienic manner in the dustbin after wrapping it in a piece of paper. You must also remember to wash your hands before and after handling your menstrual products and take a bath with soap and water every day while on your period. get enough sleep, consume nutritious food and drink at least 2 litres of water."],
        ["Menstrual hygiene and period management Menstrual hygiene Buying/ accessing menstrual hygiene products",
         "You can get menstrual hygiene products from any pharmacy/medical store, general stores and markets around you. If you have access to the internet, you can place an order for the product of your choice online as well. If you prefer using menstrual cups, you will have to order them online as they may not be available at the local store near you. Sanitary pads are the most accessible and readily available menstrual hygiene product available in India."],
        ["Menstrual hygiene and period management Menstrual hygiene  Menstrual hygiene products to be used",
         "You can use a variety of menstrual hygiene products based on your preferences, comfort and flow.  There are different kinds of products available in the market- both single-use (sanitary napkins, tampons) and reusable (reusable cloth pads, menstrual cups). You must not reuse the disposable sanitary products more than once whether or not it is noticeably soiled."],
        ["Menstrual hygiene and period management Menstrual hygiene  Disposal/ cleaning of menstrual hygiene products",
         "Different types of menstrual hygiene products are disposed of in different ways depending on whether they are disposable or reusable. Ways of disposing of/cleaning different types of menstrual hygiene products are: Disposable sanitary pads: Wrap the pad in a wrapper/ newspaper/ paper/ polythene after using it and then throw it in the dustbin. Always wash your hands thoroughly after this. Do not flush the pads. Reusable cotton pads:  Soak the pad in cold water for about 40 minutes to remove the blood from the material. If the pad is extremely stained, you can rinse the pad in some water, and soak it again in water. Rinse the pads completely to remove blood before washing it with soap or detergent. Use warm water and rinse until the water comes out clean and clear. You can either hand wash or machine wash your rinsed out cloth pads. Dry them in natural sunlight as the UV rays in the sunlight is an excellent natural disinfectant. After drying, store them flat. Tampons: take the tampon out by gently pulling the string. Wrap used tampons in toilet paper and throw them away in the dustbin. Do not flush them. Menstrual cup: Remove the menstrual cup by gently pulling it out of your vagina then, empty it out in the toilet. Wash the cup thoroughly with soap and water and let it dry. Use it only once it is completely dry. The menstrual cups are reusable for up to 10 years and after 10 years they can be disposed of properly in a dustbin."],
        [
            " Menstrual hygiene and period management Period management Managing periods when menstrual hygiene products are unavailable",
            " If you get your period and you do not have any menstrual hygiene product, you can do the following: Check if you have a tissue/paper napkin or a handkerchief. Take the tissue or the handkerchief and fold it in half. Place it on the crotch of your underwear. If the cloth is big enough, wrap it around the crotch of your underwear so that it stays intact and does not move around till you find a menstrual hygiene product.If you do not have a paper napkin or a handkerchief ask those around you (friends, teachers, family members)  if they have a menstrual product. If you are not able to do any of this, do not worry. Your underwear will be able to soak up the blood for a short duration of time."],
        ["Menstrual hygiene and period management Period management Managing painful periods",
         "Abdominal cramps are a commonly experienced symptom during periods. There are simple and effective methods to treat them such as: Take a warm bath. Take a walk. Foods that are high in magnesium are best to ease menstrual cramps, such as almonds, bananas, and apricots. Lie on your back with knees up and move them in small circles. Rub or massage the abdomen. Drink a hot beverage, such as tea. Place a hot water bottle on the abdomen or on the back, depending on the cramps’ location."],
        ["Menstrual hygiene and period management Is it okay to go to school while on period?",
         "You can definitely go to school while on your period. However, you must take care of your health and hygiene by using hygienic menstrual products and changing them frequently, if need be. You must also drink sufficient amounts of water and consume nutritious food."],
        ["Is white discharge normal?",
         "It is completely normal to get such a discharge. Throughout the menstrual cycle, our vaginas secrete different fluids. During ovulation (roughly days 12-15 of your cycle), the discharge is thinner, smooth, and clear. On other days, the discharge is cloudy and thick. It is important that you know that it is normal but this also means that something could be wrong. You must consult your doctor if the discharge is grey, green or yellow in colour, has a foul and fishy odour and if you experience an itchy, burning sensation during urination and have a rash, open wounds, or boils."],
        ["What is ovulation? How can I know if I am ovulating?",
         "Ovulation is when a mature egg is released from the ovary into the fallopian tube and the uterus begins to rebuild its lining. Only one egg is released in each cycle. The egg slowly travels down the fallopian tube from the ovaries towards the uterus. It usually occurs between the 8th and 14th (second phase) day of your menstrual cycle. The first day of your cycle is when you start your period for any given month. You can know if you are ovulating by tracking your period on a calendar regularly. Although it is a useful tool to track your ovulation, it is not fully accurate. If you wish to track your ovulation, there are ovulation kits available in the market."],
        ["Is it okay to engage in sexual intercourse while menstruating? Will I get pregnant if I do?",
         "Although the chance of getting pregnant at this time is less for most women, if you have short menstrual cycles (fewer than 28 days) or irregular periods, you may be able to get pregnant if you have unprotected sex during your period."],
        ["I wish to talk to a doctor about my menstrual health", "Process for consulting a doctor"],
        ["I wish to get in touch with a counsellor/ therapist", "Process for consulting a counsellor/ therapist"]

        ]

    
@app.route('/chatbot', methods=['GET', 'POST'])
def get_response():
  if request.method == "POST":
    question = request.json['question']
    faq = FAQ(list_QandA)
    faq.prepare_data()
    answer = faq.findAnswer(question)
    return jsonify({"answer": answer})
  else:
    return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)
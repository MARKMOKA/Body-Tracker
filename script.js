const startBtn = document.getElementById("startBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const startScreen = document.querySelector(".start-screen");
const infoScreen = document.querySelector(".info-screen");
const reportScreen = document.getElementById("reportScreen");
const reportName = document.getElementById("reportName");
const reportHeight = document.getElementById("reportHeight");
const reportWeight = document.getElementById("reportWeight");
const reportBMI = document.getElementById("reportBMI");
const reportStatus = document.getElementById("reportStatus");
const reportGoal = document.getElementById("reportGoal");
const reportAdvice = document.getElementById("reportAdvice");
const reportWater = document.getElementById("reportWater");
const reportCalories = document.getElementById("reportCalories");
const reportSteps = document.getElementById("reportSteps");
const reportWorkout = document.getElementById("reportWorkout");
const bmiProgress = document.getElementById("bmiProgress");
const weeklyPlan = document.getElementById("weeklyPlan");
const motivation = document.getElementById("motivation");
const clearBtn = document.getElementById("clearBtn");
const goalProgress = document.getElementById("goalProgress");
const goalPercent = document.getElementById("goalPercent");
const historyList = document.getElementById("historyList");

startBtn.addEventListener("click", () => {

    startScreen.style.display = "none";
    infoScreen.style.display = "flex";

});

function calculateBMI(weight, height) {

    const heightInMeter = height / 100;

    return (weight / (heightInMeter * heightInMeter)).toFixed(2);

}

function getAdvice(goal) {

    switch (goal) {

        case "خسارة وزن":
            return `🎯 هدفك خسارة الوزن

✔ امشِ 45 دقيقة يوميًا.
✔ اشرب 3 لتر مياه.
✔ قلل 500 سعرة حرارية.
✔ تناول بروتين في كل وجبة.`;

        case "زيادة وزن":
            return `🎯 هدفك زيادة الوزن

✔ زود 300 إلى 500 سعرة.
✔ تمرن مقاومة 4 أيام.
✔ نم 8 ساعات.
✔ كل بروتين كافي.`;

        case "تثبيت الوزن":
            return `🎯 هدفك تثبيت الوزن

✔ حافظ على نشاطك.
✔ تابع وزنك أسبوعيًا.
✔ كل وجبات متوازنة.`;

        default:
            return "⚠ اختار هدفك الأول.";
    }

}

analyzeBtn.addEventListener("click", () => {

    const user = {

        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        height: Number(document.getElementById("height").value),
        weight: Number(document.getElementById("weight").value),
        gender: document.getElementById("gender").value,
        goal: document.getElementById("goal").value,
        activity: document.getElementById("activity").value

    };
    
    localStorage.setItem("user", JSON.stringify(user));

    const bmi = calculateBMI(user.weight, user.height);

    let status = "";
    if (bmi < 18.5){

    bmiProgress.style.width = "25%";
    bmiProgress.style.background = "#00BFFF";

}
else if (bmi < 25){

    bmiProgress.style.width = "50%";
    bmiProgress.style.background = "lime";

}
else if (bmi < 30){

    bmiProgress.style.width = "75%";
    bmiProgress.style.background = "orange";

}
else{

    bmiProgress.style.width = "100%";
    bmiProgress.style.background = "red";

}

    if (bmi < 18.5) {

        status = "نحيف";

    } else if (bmi < 25) {

        status = "وزن طبيعي";

    } else if (bmi < 30) {

        status = "زيادة في الوزن";

    } else {

        status = "تخين";

    }

    const advice = getAdvice(user.goal);
    const water = getWater(user.weight);
    const calories = getCalories(user.weight, user.activity);
    const steps = getSteps(user.goal);
    const workout = getWorkout(user.goal);
    const plan = getWeeklyPlan(user.goal);
    const message = getMotivation(status);
    const progress = getGoalProgress(status);
    let history = JSON.parse(localStorage.getItem("history")) || [];

history.push({
    date: new Date().toLocaleDateString(),
    bmi: bmi,
    status: status
});

localStorage.setItem("history", JSON.stringify(history));
historyList.innerHTML = "";

history.forEach(item => {

    const li = document.createElement("li");

    li.textContent =
        `${item.date} | BMI: ${item.bmi} | ${item.status}`;

    historyList.appendChild(li);

});

    function getGoalProgress(status){

    switch(status){

        case "نحيف":
            return 30;

        case "وزن طبيعي":
            return 100;

        case "زيادة في الوزن":
            return 70;

        case "سمنة":
            return 40;

        default:
            return 0;
        

    }

}
    function getMotivation(status){

    switch(status){

        case "نحيف":
            return "💪 بداية ممتازة! ركز على الأكل الصحي وتمارين المقاومة وهتشوف فرق قريب.";

        case "وزن طبيعي":
            return "🎉 ممتاز! حافظ على مستواك الحالي واستمر على نفس النظام.";

        case "زيادة في الوزن":
            return "🔥 أنت قريب جدًا من الوزن المثالي، استمر ومتستسلمش.";

        case "سمنة":
            return "❤️ كل بداية صعبة، لكن مع الالتزام هتوصل لهدفك بإذن الله.";

        default:
            return "";
    }

}
    function getWeeklyPlan(goal) {

    switch (goal) {

        case "خسارة وزن":
            return [
                "🏃 الإثنين: مشي 45 دقيقة",
                "💪 الثلاثاء: تمارين جسم كامل",
                "🏃 الأربعاء: جري 30 دقيقة",
                "💪 الخميس: تمارين مقاومة",
                "🏃 الجمعة: مشي سريع",
                "🚴 السبت: ركوب عجلة",
                "😴 الأحد: راحة"
            ];

        case "زيادة وزن":
            return [
                "💪 الإثنين: صدر وترايسبس",
                "💪 الثلاثاء: ظهر وبايسبس",
                "😴 الأربعاء: راحة",
                "💪 الخميس: أرجل",
                "💪 الجمعة: كتف",
                "💪 السبت: جسم كامل",
                "😴 الأحد: راحة"
            ];

        case "تثبيت الوزن":
            return [
                "🏃 الإثنين: مشي 30 دقيقة",
                "💪 الثلاثاء: تمارين خفيفة",
                "😴 الأربعاء: راحة",
                "🏃 الخميس: كارديو",
                "💪 الجمعة: مقاومة",
                "🚶 السبت: 8000 خطوة",
                "😴 الأحد: راحة"
            ];

        default:
            return ["اختر هدفك أولاً"];
    }

}
    function getWorkout(goal) {

    switch (goal) {

        case "خسارة وزن":
            return "كارديو 5 أيام + مقاومة يومين";

        case "زيادة وزن":
            return "تمارين مقاومة 4 أيام";

        case "تثبيت الوزن":
            return "تمرين 3 أيام أسبوعياً";

        default:
            return "حدد هدفك";
    }

}
    function getSteps(goal) {

    switch (goal) {

        case "خسارة وزن":
            return "10000 خطوة يومياً";

        case "زيادة وزن":
            return "6000 خطوة يومياً";

        case "تثبيت الوزن":
            return "8000 خطوة يومياً";

        default:
            return "حدد هدفك";
    }

}
    function getCalories(weight, activity) {

    let calories = 0;

    if (activity === "قليل") {

        calories = weight * 30;

    }
    else if (activity === "متوسط") {

        calories = weight * 35;

    }
    else {

        calories = weight * 40;

    }

    return calories + " Cal";

}
    infoScreen.style.display = "none";
    reportScreen.style.display = "block";

    reportName.textContent = user.name;
    reportHeight.textContent = user.height + " سم";
    reportWeight.textContent = user.weight + " كجم";
    reportBMI.textContent = bmi;
    reportStatus.textContent = status;
    reportGoal.textContent = user.goal;
    reportAdvice.textContent = advice;
    reportWater.textContent = water;
    reportCalories.textContent = calories;
    reportSteps.textContent = steps;
    reportWorkout.textContent = workout;
    motivation.textContent = message;
    goalProgress.style.width = progress + "%";
    goalPercent.textContent = progress + "%";
    weeklyPlan.innerHTML = "";

plan.forEach(day => {

    const li = document.createElement("li");

    li.textContent = day;

    weeklyPlan.appendChild(li);

});
function getWater(weight) {

    const water = (weight * 35) / 1000;

    return water.toFixed(1) + " لتر";

}
});
const savedUser = JSON.parse(localStorage.getItem("user"));

console.log(savedUser);
if (savedUser) {

    document.getElementById("name").value = savedUser.name;
    document.getElementById("age").value = savedUser.age;
    document.getElementById("height").value = savedUser.height;
    document.getElementById("weight").value = savedUser.weight;
    document.getElementById("gender").value = savedUser.gender;
    document.getElementById("goal").value = savedUser.goal;
    document.getElementById("activity").value = savedUser.activity;

}
clearBtn.addEventListener("click", () => {

    localStorage.removeItem("user");

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("goal").value = "";
    document.getElementById("activity").value = "";

    alert("✅ تم مسح البيانات بنجاح");

});
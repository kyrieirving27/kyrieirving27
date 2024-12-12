const player = {
    name: "Леброн Джеймс",
    age: 38,
    height: 2.06, // Высота в метрах
    weight: 113,  // Вес в килограммах
    position: "форвард",
    gamesPlayed: 50,
    pointsScored: 1200,
    assists: 300,
    rebounds: 400,
    activityLevel: 1.55, // Уровень активности (коэффициент для спортсменов)
    goal: "улучшить физическую форму",
    trainingSessions: [
        { day: "Понедельник", duration: 90, intensity: "высокая", focus: "силовая тренировка" },
        { day: "Вторник", duration: 60, intensity: "средняя", focus: "тактическая тренировка" },
        { day: "Среда", duration: 30, intensity: "низкая", focus: "восстановление и растяжка" },
        { day: "Четверг", duration: 0, intensity: "нет", focus: "отдых" },
        { day: "Пятница", duration: 45, intensity: "средняя", focus: "работа над бросками" }, 
        { day: "Суббота", duration: 120, intensity: "высокая", focus: "командная игра" },
        { day: "Воскресенье", duration: 0, intensity: "нет", focus: "отдых" }
    ]
};

// Функция для расчета ИМТ (индекса массы тела)
function calculateBMI(weight, height) {
    return weight / (height ** 2);
}

// Функция для расчета базального метаболизма (BMR)
function calculateBMR(weight, height, age) {
    return 88.362 + (13.397 * weight) + (4.799 * (height * 100)) - (5.677 * age);
}

// Функция для расчета общего расхода энергии (TDEE)
function calculateTDEE(BMR, activityLevel) {
    return BMR * activityLevel;
}

// Функция для расчета необходимого количества калорий
function calculateCaloricIntake(TDEE, goal) {
    switch (goal) {
        case "улучшить физическую форму":
            return TDEE - 200; // Легкое снижение калорий для улучшения физической формы
        case "нарастить мышечную массу":
            return TDEE + 500; // Увеличение калорий для наращивания мышц
        case "поддерживать форму":
            return TDEE; // Поддержание текущей калорийности
        default:
            return TDEE; // По умолчанию возвращаем TDEE
    }
}

// Функция для анализа тренировок баскетболиста
function analyzeWeeklyTraining(trainingSessions) {
    let totalDuration = 0;
    let missedDays = 0;
    let highIntensityCount = 0;

    for (let i = 0; i < trainingSessions.length; i++) {
        const session = trainingSessions[i];
        if (session.duration === 0) {
            missedDays++;
        } else {
            totalDuration += session.duration;
            if (session.intensity === "высокая") {
                highIntensityCount++;
                console.log(`Тренировка с высокой интенсивностью: ${session.day}, Продолжительность: ${session.duration} минут, Фокус: ${session.focus}`);
            }
        }
        if (missedDays >= 2) {
            console.log("Вы пропустили 2 или более тренировок. Это может сказаться на вашем уровне игры.");
            break;
        }
    }
    console.log(`Общее время тренировок за неделю: ${totalDuration} минут`);
}

// Функция для нахождения самой длительной тренировки
function findLongestTraining(trainingSessions) {
    let longestSession = trainingSessions[0]; // Изначально принимаем первую тренировку за самую длительную
    
    trainingSessions.forEach(session => {
        if (session.duration > longestSession.duration) {
            longestSession = session; // Обновляем самую длительную тренировку
        }
    });
    
    console.log(`Самая длительная тренировка: ${longestSession.day}, Продолжительность: ${longestSession.duration} минут, Фокус: ${longestSession.focus}`);
}

// Вызов функции для поиска самой длительной тренировки
findLongestTraining(player.trainingSessions);

// Функция для предоставления рекомендаций по физической форме
function recommend(BMI, caloricIntake, playerStats) {
    let recommendations = `Индекс массы тела Леброна Джеймса (BMI): ${BMI.toFixed(2)}\n`;

    if (BMI < 18.5) {
        recommendations += "Недостаток веса. Необходимо увеличить потребление калорий для улучшения игровой формы.\n";
    } else if (BMI >= 18.5 && BMI < 24.9) {
        recommendations += "Нормальный вес. Продолжайте следить за сбалансированным питанием и регулярными тренировками.\n";
    } else if (BMI >= 25 && BMI < 29.9) {
        recommendations += "Избыточный вес. Рекомендуется скорректировать диету и усилить тренировки.\n";
    } else {
        recommendations += "Ожирение. Необходимо значительное уменьшение калорий и увеличение физической активности.\n";
    }

    recommendations += `Рекомендуемое количество калорий для достижения цели: ${caloricIntake.toFixed(2)} калорий в день.\n`;
    recommendations += `Статистика: ${playerStats.gamesPlayed} игр, ${playerStats.pointsScored} очков, ${playerStats.assists} ассистов, ${playerStats.rebounds} подборов\n`;
    analyzeWeeklyTraining(player.trainingSessions);
    return recommendations;
}

// Расчеты
const BMI = calculateBMI(player.weight, player.height);
const BMR = calculateBMR(player.weight, player.height, player.age);
const TDEE = calculateTDEE(BMR, player.activityLevel);
const caloricIntake = calculateCaloricIntake(TDEE, player.goal);

// Вывод рекомендаций
function showRecommendations() {
    const output = document.getElementById('js-output');
    output.innerHTML = recommend(BMI, caloricIntake, player);
}

let activities = [
    { id: 1, title: "Благоустрій парків", department: "Відділ ЖКГ", govRelation: "Тісна співпраця з Міндовкілля", viewsDay1: 450, viewsDay2: 500, termMonths: 12 },
    { id: 2, title: "Цифровізація послуг", department: "Відділ IT", govRelation: "Інтеграція з Дія", viewsDay1: 1200, viewsDay2: 1100, termMonths: 6 },
    { id: 3, title: "Ремонт доріг", department: "Відділ інфраструктури", govRelation: "Погодження з Державтодором", viewsDay1: 850, viewsDay2: 900, termMonths: 24 },
    { id: 4, title: "Соціальна підтримка", department: "Відділ соцзахисту", govRelation: "Співпраця з Мінсоцполітики", viewsDay1: 600, viewsDay2: 650, termMonths: 12 },
    { id: 5, title: "Культурні заходи", department: "Відділ культури", govRelation: "Співпраця з Мінкультом", viewsDay1: 300, viewsDay2: 400, termMonths: 6 },
    { id: 6, title: "Озеленення району", department: "Відділ ЖКГ", govRelation: "Звітність у Держекоекологію", viewsDay1: 500, viewsDay2: 520, termMonths: 12 },
    { id: 7, title: "Молодіжні ґранти", department: "Відділ молоді", govRelation: "Співпраця з Мінмолодьспорт", viewsDay1: 950, viewsDay2: 980, termMonths: 18 },
    { id: 8, title: "Модернізація шкіл", department: "Відділ освіти", govRelation: "Погодження з МОН", viewsDay1: 1100, viewsDay2: 1050, termMonths: 24 },
    { id: 9, title: "Енергоефективність", department: "Відділ енергетики", govRelation: "Звітність у Держенергоефективності", viewsDay1: 400, viewsDay2: 420, termMonths: 36 },
    { id: 10, title: "Безпечне місто", department: "Відділ безпеки", govRelation: "Співпраця з Нацполіцією", viewsDay1: 1350, viewsDay2: 1400, termMonths: 18 }
];

function proccessSortandAverage(array){
    let sortedActivities = array.sort((a, b) => a.termMonths - b.termMonths);

    let termGroups = {};
    sortedActivities.forEach(item => {
        let avgViews = (item.viewsDay1 + item.viewsDay2) / 2;
        if(!termGroups[item.termMonths]){
            termGroups[item.termMonths] = { totalViews: 0, count: 0 };
        }
        termGroups[item.termMonths].totalViews += avgViews;
        termGroups[item.termMonths].count++;
    });

    console.log("1. Відсортований масив напрямів", sortedActivities);
    console.log("Середня кількість читачів для напрямів з однаковим терміном (місяців)");
    for (let term in termGroups) {
        let avg = termGroups[term].totalViews / termGroups[term].count;
        console.log(`Термін ${term} міс.: середнє охоплення = ${avg.toFixed(1)} користувачів`);
    }
}

function findMaxViewsDay1(array){
    let maxItem = array[0];

    array.forEach(item => {
        if (item.viewsDay1 > maxItem.viewsDay1) {
            maxItem = item;
        }
    });

    console.log(`\n2. Максимум переглядів за добу_1 (${maxItem.viewsDay1}): Напрям "${maxItem.title}", Відділ: "${maxItem.department}"`);
}

function addNewActivity(array, newActivity){
    let isComplete = newActivity.id && newActivity.title && newActivity.department && newActivity.govRelation &&
    newActivity.viewsDay1 !== undefined && newActivity.viewsDay2 !== undefined && newActivity.termMonths;

    if(isComplete){
        array.unshift(newActivity);
        console.log("\n3. Новий напрям успішно додано на початок списку");
    } else {
        array.push(newActivity);
        console.log("\n3. Новий напрям додано в кінець списку (неповна інформація)");
    }
}

function calculateDepartmentDuration(array, departmentName){
    let deptActivities = array.filter(item => item.department === departmentName);

    if (deptActivities.length === 0) {
        return 0;
    }

    let totalDuration = 0;

    deptActivities.forEach((item, index) => {
        if (index === 0) {
            totalDuration += item.termMonths;
        } else {
            totalDuration += item.termMonths * 1.1;
        }
    });

    console.log(`\n4. Загальна тривалість "${departmentName}" (${deptActivities.length} напрями/-ів): ${totalDuration.toFixed(1)} міс.`);
    return totalDuration;
}

console.log("=== Завдання 1 ===");
proccessSortandAverage(activities);
findMaxViewsDay1(activities);
addNewActivity(activities, { id: 11, title: "Інклюзивні майданчики", department: "Відділ ЖКГ", govRelation: "Погодження з Мінрегіоном", viewsDay1: 700, viewsDay2: 750, termMonths: 6 });
calculateDepartmentDuration(activities, "Відділ ЖКГ");

class User {
    constructor(lastName, firstName, age, education, goal, dateStr, timeStr) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.education = education;
        this.goal = goal;
        this.dateStr = new Date(dateStr);
        this.timeStr = timeStr;
    }

    isWorkingHours() {
        let [hours, minutes] = this.timeStr.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;
        return totalMinutes >= 9 * 60 && totalMinutes <= 17 * 60;
    }
}

function filterbyMonthTime(usersArr, month, timeStr) {
    let result = usersArr.filter(user => (user.dateStr.getMonth() + 1) === month && user.timeStr === timeStr);

    let monthName;
    switch (month) {
        case 1: monthName = "Січні"; break;
        case 2: monthName = "Лютому"; break;
        case 3: monthName = "Березні"; break;
        case 4: monthName = "Квітні"; break;
        case 5: monthName = "Травні"; break;
        case 6: monthName = "Червні"; break;
        case 7: monthName = "Липні"; break;
        case 8: monthName = "Серпні"; break;
        case 9: monthName = "Вересні"; break;
        case 10: monthName = "Жовтні"; break;
        case 11: monthName = "Листопаді"; break;
        case 12: monthName = "Грудні"; break;
        default: monthName = "Неправильне значення";
    }

    console.log(`\n1. Користувачі, що звернулися у ${monthName} о ${timeStr}:`, result);
    return result;
}

function getMinAgeUserEducation(usersArr) {
    let minAgeUser = users[0];

    usersArr.forEach(user => {
        if (user.age < minAgeUser.age) {
            minAgeUser = user;
        }
    });

    console.log(`\n2. Наймолодший користувач: ${minAgeUser.firstName} ${minAgeUser.lastName} (${minAgeUser.age}), Освіта: "${minAgeUser.education}"`);
    return minAgeUser;
}

function classifyUsers(usersArr) {
    let class1 = []; // вища освіта + робочий час
    let class2 = []; // без освіти + неробочий час
    let class3 = []; // інші

    usersArr.forEach(user => {
        let isWorkTime = user.isWorkingHours();
        let isHigherEdu = user.education.toLowerCase() === "вища";
        let isNoEdu = user.education.toLowerCase() === "без освіти";

        if(isHigherEdu && isWorkTime) {
            class1.push(user);
        } else if (isNoEdu && !isWorkTime) {
            class2.push(user);
        } else {
            class3.push(user);
        }
    });

    console.log("\n3. Розподіл користувачів по класах");
    console.log(`- З вищою освітою у робочий час (09:00-17:00): ${class1.length} осіб`);
    console.log(`- Без освіти у неробочий час: ${class2.length} осіб`);
    console.log(`- Інші: ${class3.length} осіб`);
}

function sortAlphabetically(usersArr) {
    let sorted = usersArr.sort((a, b) =>
        a.lastName.localeCompare(b.lastName, 'uk') ||
        a.firstName.localeCompare(b.firstName, 'uk'));

    console.log("\n4. Користувачі за алфавітом та їх мета звернення");
    sorted.forEach(u => {
    console.log(`${u.lastName} ${u.firstName} | Мета: "${u.goal}"`);
    });
}

let users = [
    new User("Коваленко", "Олена", 25, "вища", "Співпраця", "2024-03-15", "10:30"),
    new User("Петренко", "Іван", 19, "без освіти", "Скарга", "2024-03-15", "18:20"),
    new User("Шевченко", "Марія", 34, "вища", "Пропозиція", "2024-03-10", "14:00"),
    new User("Бондаренко", "Олег", 22, "професійна", "Консультація", "2024-04-01", "10:30"),
    new User("Ткаченко", "Анна", 18, "без освіти", "Скарга", "2024-03-20", "20:00"),
    new User("Кравченко", "Дмитро", 40, "вища", "Співпраця", "2024-03-12", "09:15"),
    new User("Мороз", "Софія", 29, "неповна", "Пропозиція", "2024-03-15", "10:30"),
    new User("Лисенко", "Андрій", 45, "вища", "Запит інформації", "2024-03-05", "16:45"),
    new User("Захарченко", "Юлія", 21, "без освіти", "Скарга", "2024-03-18", "08:30"),
    new User("Мельник", "Артем", 30, "вища", "Співпраця", "2024-03-25", "11:00")
];

console.log("");
console.log("=== Завдання 2 ===");
filterbyMonthTime(users, 3, "10:30");
getMinAgeUserEducation(users);
classifyUsers(users);
sortAlphabetically(users);
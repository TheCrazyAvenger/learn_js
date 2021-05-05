let money = 132,
    income = "Стипендия",
    addExpenses = "Еда, автобус, универ",
    deposit = false,
    mission = 600,
    period = 12,
    budgetDay = money / 30;

console.log (typeof money);
console.log (typeof income);
console.log (typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + money + " рублей");

console.log(addExpenses.toLowerCase().split(", "));

console.log ("Дневной бюджет: ", budgetDay);
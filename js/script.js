'use strict'

const money = 132;
const income = "Стипендия";
const addExpenses = "Еда, автобус, универ";
const deposit = false;
const mission = 600;
const period = 12;

console.log (typeof money);
console.log (typeof income);
console.log (typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + money + " рублей");

console.log(addExpenses.toLowerCase().split(", "));

const budgetDay = money / 30;
console.log ("Дневной бюджет: ", budgetDay);
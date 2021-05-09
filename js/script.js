'use strict'

const mission = 150000;
const income = 'Стипендия';
const money = +prompt('Сколько ты зарабатываешь?');
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?');

const showTypeOf = (data) => {
    console.log(data, typeof data);
}
showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);

console.log(addExpenses.length);

const budgetMonth = money - amount1 - amount2;
const budgetDay = Math.floor(budgetMonth / 30);
console.log('Дневной бюджет: ', budgetDay);
console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель заработать ' + mission + ' рублей');
const period = Math.ceil(mission / budgetMonth);
console.log('Период равен ' + period + ' месяцев');

const showMoneyStatus = () => {
		if (budgetDay >= 1200)
			return('У вас высокий уровень дохода');
		else if (budgetDay >= 600 && budgetDay <= 1200)
			return('У вас средний уровень дохода');
		else if(budgetDay >= 0 && budgetDay <= 600)
			return('К сожалению у вас уровень дохода ниже среднего');
		else
			return('Что то пошло не так');
}

console.log(showMoneyStatus());

'use strict'

let money = +prompt('Сколько ты зарабатываешь?'),
    income = 'Стипендия',
	addExpenses = prompt(
		'Перечислите возможные расходы за рассчитываемый период через запятую'
	),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 150000,
	expenses1 = prompt('Введите обязательную статью расходов?'),
	amount1 = +prompt('Во сколько это обойдется?'),
	expenses2 = prompt('Введите обязательную статью расходов?'),
	amount2 = +prompt('Во сколько это обойдется?'),
	budgetMonth = money - amount1 - amount2,
	period = Math.ceil(mission / budgetMonth),
	budgetDay = Math.floor(budgetMonth / 30);

const showTypeOf = function (data) {
    console.log(data, typeof data);
}
showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);

console.log(addExpenses.length);

console.log('Дневной бюджет: ', budgetDay);
console.log('Бюджет на месяц: ', budgetMonth);

console.log('Цель заработать ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев');

const showMoneyStatus = function () {
	switch (true) {
		case budgetDay >= 1200:
			return('У вас высокий уровень дохода');
			break;
		case budgetDay >= 600 && budgetDay <= 1200:
			return('У вас средний уровень дохода');
			break;
		case budgetDay >= 0 && budgetDay <= 600:
			return('К сожалению у вас уровень дохода ниже среднего');
			break;
		default:
			return('Что то пошло не так');
			break;
	}
}

console.log(showMoneyStatus());

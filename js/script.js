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
	amount2 = +prompt('Во сколько это обойдется?');
	
const showTypeOf = (data) => {
    console.log(data, typeof data);
}
showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);
console.log(addExpenses.split(', '));

const getExpensesMonth = () => {
    return amount1 + amount2;
}

const getAccumulatedMonth = () => {
    return money - amount1 - amount2;
}

const getTargetMonth = () => {
    return mission / accumulatedMonth;
}

let accumulatedMonth = getAccumulatedMonth(),
    period = Math.ceil(getTargetMonth()),
    budgetDay = Math.floor(accumulatedMonth / 30);

console.log ('Сумма всех обязательных расходов: ', getExpensesMonth());
console.log('Дневной бюджет: ', budgetDay);
console.log('Бюджет на месяц: ', accumulatedMonth);

console.log('Цель заработать ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев');

const showStatusIncome = () => {
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
console.log(showStatusIncome());
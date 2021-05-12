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
	
const showTypeOf = (data) => console.log(data, typeof data);
showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);
console.log(addExpenses.split(', '));

const getExpensesMonth = () => { return amount1 + amount2; }

const getAccumulatedMonth = () => { return money - amount1 - amount2; }

const getTargetMonth = () => { return mission / accumulatedMonth; }

console.log ('Сумма всех обязательных расходов: ', getExpensesMonth());

const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Дневной бюджет: ', budgetDay);
console.log('Бюджет на месяц: ', accumulatedMonth);

console.log('Цель заработать ' + mission + ' рублей');
const period = Math.ceil(getTargetMonth());
console.log('Период равен ' + period + ' месяцев');

const showStatusIncome = () => {
	if(budgetDay >= 1200)
			return('У вас высокий уровень дохода');
	else if(budgetDay >= 600 && budgetDay <= 1200)
			return('У вас средний уровень дохода');
	else if(budgetDay >= 0 && budgetDay <= 600)
			return('К сожалению у вас уровень дохода ниже среднего');
	else
		return('Что то пошло не так');
}
console.log(showStatusIncome());
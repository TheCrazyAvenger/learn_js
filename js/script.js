'use strict'

const isNumber = (n) => { return !isNaN(parseFloat(n)) && isFinite(n); }

const income = 'Стипендия';
const mission = 150000;
const expences = [];
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
	
let money;
const start = () => {
	do{
		money = prompt('Сколько ты зарабатываешь?');
	} while (!isNumber(money));
}
start();

const showTypeOf = (data) => console.log(data, typeof data);
showTypeOf(money);
showTypeOf(deposit);
showTypeOf(income);

console.log(addExpenses.split(', '));

const getExpensesMonth = () => {
    let sum = 0;
	let amount;

	for(let i = 0; i < 2; i++){
		expences[i] = prompt('Введите обязательную статью расходов?');

		do{
			amount = prompt('Во сколько это обойдется?');
		} while (!isNumber(amount));
		sum += Number(amount);
	}

	return sum;
}
const expencesAmount = getExpensesMonth();

const getAccumulatedMonth = () => { return money - expencesAmount; }

const getTargetMonth = () => { return mission / accumulatedMonth; }

console.log ('Сумма всех обязательных расходов: ', expencesAmount);

const accumulatedMonth = getAccumulatedMonth();
const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Дневной бюджет: ', budgetDay);
console.log('Бюджет на месяц: ', accumulatedMonth);

const period = getTargetMonth();
console.log('Цель заработать ' + mission + ' рублей');
budgetDay <= 0 && console.log('Цель не будет достигнута');
budgetDay > 0 && console.log('Цель будет достигнута за ' +  Math.ceil(period) + ' месяцев');

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
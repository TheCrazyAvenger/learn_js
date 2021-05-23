'use strict'

const isNumber = (n) => { return !isNaN(parseFloat(n)) && isFinite(n); }

let money;
const start = () => {
	do{
		money = prompt('Сколько ты зарабатываешь?');
	} while (!isNumber(money));
}
start();

let appData = {
    income: {},
    addIncome: [],
    expences: {},
    addExpenses: [],
    deposit: false,
    mission: 150000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expencesMonth: 0,
    asking: () => {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for(let i = 0; i < 2; i++){
            let amount, expence;
            expence = prompt('Введите обязательную статью расходов?');
            do{
                amount = prompt('Во сколько это обойдется?');
            } while (!isNumber(amount));
            appData.expences[expence] = amount;
        }    
    },
    getExpensesMonth: () => {
        let sum = 0; 
        for(let am of Object.values(appData.expences)) {
            sum += Number(am);
       }
       return sum;
    },
    getBudget: () => { 
        appData.budgetMonth = money - appData.getExpensesMonth();
        appData.budgetDay = appData.budgetMonth / 30; 
    },
    getTargetMonth: () => { return appData.mission / appData.getExpensesMonth(); },
    showStatusIncome: () => {
        if(appData.budgetDay >= 1200)
                return('У вас высокий уровень дохода');
        else if(appData.budgetDay >= 600 && appData.budgetDay <= 1200)
                return('У вас средний уровень дохода');
        else if(appData.budgetDay >= 0 && appData.budgetDay <= 600)
                return('К сожалению у вас уровень дохода ниже среднего');
        else
            return('Что то пошло не так');
    }
};

appData.asking();
console.log(appData);

console.log ('Сумма всех обязательных расходов: ', appData.getExpensesMonth());
appData.getBudget();
console.log('Дневной бюджет: ', Math.floor(appData.budgetDay));
console.log('Бюджет на месяц: ', Math.floor(appData.budgetMonth));

console.log('Цель заработать ' + appData.mission + ' рублей');
appData.budgetDay <= 0 && console.log('Цель не будет достигнута');
appData.budgetDay > 0 && console.log('Цель будет достигнута за ' +  Math.ceil(appData.getTargetMonth()) + ' месяцев');

console.log(appData.showStatusIncome());
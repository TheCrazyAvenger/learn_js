'use strict'

const isNumber = (n) => { return !isNaN(parseFloat(n)) && isFinite(n); }
const calculate = document.getElementById('start');
const plusButton = document.getElementsByTagName('button')[0];
const plusButton1 = document.getElementsByTagName('button')[1];
const checkBoxDeposit = document.querySelector('#deposit-check');
const possibleIncome = document.querySelectorAll('.additional_income-item');
const dataOutput = document.querySelectorAll('.result-total');
const monthIncome = document.querySelector('.salary-amount');
const additionalIncomeTitle = document.querySelector('.income-title');
const additionalIncomeAmount = document.querySelector('.income-amount');
const obligatoryExpensesTitle = document.querySelector('.expenses-title');
const obligatoryExpensesAmount = document.querySelector('.expenses-amount');
const missionInput = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

let money;
const start = () => {
	do{
		money = prompt('Сколько ты зарабатываешь?', 120000);
	} while (!isNumber(money));
}
//start();

let appData = {
    income: {},
    addIncome: [],
    expences: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 150000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expencesMonth: 0,
    getInfoDeposit: () => {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }while(!isNumber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while(!isNumber(appData.moneyDeposit));
        }
    },
    asking: () => {
        let cashIncome, itemIncome;
        let addExpenses;
        
        if(confirm('Есть ли у вас дополнительный заработок?')) {
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксист');
            }while(isNumber(itemIncome));
            do{
                cashIncome = prompt('Сколько он приносит денег?', 20000);
            } while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Пиво, шаурма');
            
        }while(isNumber(addExpenses));
        appData.addExpenses = addExpenses.toLocaleLowerCase().split(', ').map(item => {
            return item.charAt(0).toUpperCase() + item.substring(1);
        }).join(', ');

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.getInfoDeposit();

        for(let i = 0; i < 2; i++){
            let amount, expence;
            do {
            expence = prompt('Введите обязательную статью расходов?', 'Дом');
            }while(isNumber(expence));
            do{
                amount = prompt('Во сколько это обойдется?', 20000);
            } while (!isNumber(amount));
            appData.expences[expence] = amount;
        }    
    },
    getExpensesMonth: () => {
        for(let am of Object.values(appData.expences)) {
            appData.expencesMonth += Number(am);
       }
    },
    getBudget: () => { 
        appData.budgetMonth = money - appData.expencesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); 
    },
    getTargetMonth: () => { appData.period = Math.ceil(appData.mission / appData.budgetMonth); },
    showStatusIncome: () => {
        if(appData.budgetDay >= 1200)
                return('У вас высокий уровень дохода');
        else if(appData.budgetDay >= 600 && appData.budgetDay <= 1200)
                return('У вас средний уровень дохода');
        else if(appData.budgetDay >= 0 && appData.budgetDay <= 600)
                return('К сожалению у вас уровень дохода ниже среднего');
        else
            return('Что то пошло не так');
    },
    calcSavedMoney: () => {
        return appData.budgetMonth * appData.period;
    }
};

// appData.asking();
// appData.getBudget();
// appData.getExpensesMonth();
// appData.getTargetMonth();
// console.log(appData);

console.log ('Сумма всех обязательных расходов: ', appData.expencesMonth);
console.log('Дневной бюджет: ', appData.budgetDay);
console.log('Бюджет на месяц: ', appData.budgetMonth);

console.log('Цель заработать ' + appData.mission + ' рублей');
appData.budgetDay <= 0 && console.log('Цель не будет достигнута');
appData.budgetDay > 0 && console.log('Цель будет достигнута за ' +  appData.period + ' месяцев');

//console.log(appData.showStatusIncome());
console.log(appData.addExpenses);
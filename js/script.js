'use strict';

const checkInput = item => {
    if(item.value === ''){
        alert('Ошибка, поле "Месячный доход" должно быть заполнено');
        return;
    }
}

const isNumber = (n) => { return !isNaN(parseFloat(n)) && isFinite(n); }
const calculate = document.getElementById('start');
const incomePlus = document.getElementsByTagName('button')[0];
const expensesPlus = document.getElementsByTagName('button')[1];
const checkBoxDeposit = document.querySelector('#deposit-check');
const possibleIncome = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const monthIncome = document.querySelector('.salary-amount');
const additionalIncomeTitle = document.querySelector('.income-title');
const obligatoryExpensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const missionInput = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');

let appData = {
    income: {},
    addIncome: [],
    expences: {},
    addExpenses: [],
    deposit: false,
    incomeMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expencesMonth: 0,
    start: () => {
        checkInput(monthIncome);
        appData.budget = +monthIncome.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcSavedMoney();
        });

        appData.showResult();
    },
    showResult: () => {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expencesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    addExpensesBlock: () => {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes.forEach(item => {
            item.value = '';
        })
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: () => {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expences[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: () => {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes.forEach(item => {
            item.value = '';
        })
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 2) {
            incomePlus.style.display = 'none';
        }
    },
    getIncome: () => {
        incomeItems.forEach(item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
       });
        for (let key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }
    },
    getAddExpenses: () => {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(item => {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: () => {
        possibleIncome.forEach(item => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
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
    getExpensesMonth: () => {
        for(let am of Object.values(appData.expences)) {
            appData.expencesMonth += Number(am);
       }
    },
    getBudget: () => { 
        appData.budgetMonth = appData.budget + +appData.incomeMonth - appData.expencesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); 
    },
    getTargetMonth: () => { return missionInput.value / appData.budgetMonth; },
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
        return appData.budgetMonth * periodSelect.value;
    }
};

calculate.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
});

// console.log ('Сумма всех обязательных расходов: ', appData.expencesMonth);
// console.log('Дневной бюджет: ', appData.budgetDay);
// console.log('Бюджет на месяц: ', appData.budgetMonth);

// console.log('Цель заработать ' + appData.mission + ' рублей');
// appData.budgetDay <= 0 && console.log('Цель не будет достигнута');
// appData.budgetDay > 0 && console.log('Цель будет достигнута за ' +  appData.period + ' месяцев');

// //console.log(appData.showStatusIncome());
// console.log(appData.addExpenses);
'use strict';

let inputs = document.querySelectorAll('input');
const sumInputs = document.querySelectorAll('[data-sum]');
const nameInputs = document.querySelectorAll('[data-name]');
const calculate = document.getElementById('start');
const cancelButton = document.getElementById('cancel');
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

const validSum =/^[0-9]+$/;
const validName = /^[?!,.а-яА-ЯёЁ\s]+$/;

const AppData = function () {
   this.income = {},
   this.addIncome = [],
   this.expences = {},
   this.addExpenses = [],
   this.deposit = false,
   this.incomeMonth = 0,
   this.percentDeposit = 0,
   this.moneyDeposit = 0,
   this.budget = 0,
   this.budgetDay = 0,
   this.budgetMonth = 0,
   this.expencesMonth = 0
}

AppData.prototype.blockInput = () => {
    inputs.forEach(item => {
        item.setAttribute('readonly', 'readonly');
    });
}

AppData.prototype.reset = () => {
    inputs = document.querySelectorAll('input');
    inputs.forEach(item => {
        item.removeAttribute('readonly', 'readonly');
        item.value = '';
    });
    calculate.style.display = 'block';
    cancelButton.style.display = 'none';
}

AppData.prototype.changeButton = () => {
    calculate.style.display = 'none';
    cancelButton.style.display = 'block';
}

AppData.prototype.checkSumInput = (item) => {
    if(validSum.test(item.value) === false) item.classList.add('invalid');
    if(validSum.test(item.value) === true) item.classList.remove('invalid');
}

AppData.prototype.checkNameInput = (item) => {
    if(validName.test(item.value) === false) item.classList.add('invalid');
    if(validName.test(item.value) === true) item.classList.remove('invalid');
}

AppData.prototype.checkInput = function() {
    const sumInputs = document.querySelectorAll('[data-sum]');
    const nameInputs = document.querySelectorAll('[data-name]');
    const arrSum = Array.prototype.slice.call(sumInputs);
    const arrName = Array.prototype.slice.call(nameInputs);

    arrSum.map(item => this.checkSumInput(item));
    arrName.map(item => this.checkNameInput(item));

    const checkNameInput = arrName.every((item) => { return validName.test(item.value) })
    const checkSumInput = arrSum.every((item) => { return validSum.test(item.value) })

    if(checkSumInput === true && checkNameInput === true) return true;
}

AppData.prototype.start = function () {
    if(this.checkInput()) {
        const _this = this;
        this.budget = +monthIncome.value;
        this.blockInput();
        this.changeButton();

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = _this.calcSavedMoney();
        });

    this.showResult();
    }
}

AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expencesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
}
AppData.prototype.addExpensesBlock = function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.childNodes.forEach(item => {
        item.value = '';
    })
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
    appData.addCheckInputs();
}
AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expences[itemExpenses] = cashExpenses;
        }
    });
}
AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.childNodes.forEach(item => {
        item.value = '';
    })
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 2) {
        incomePlus.style.display = 'none';
    }
    appData.addCheckInputs();
}
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(item => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }
   });
    for (let key in this.income) {
        this.incomeMonth += this.income[key];
    }
}
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(', ');
    const _this = this;
    addExpenses.forEach(item => {
        item = item.trim();
        if(item !== '') {
            _this.addExpenses.push(item);
        }
    })
}
AppData.prototype.getAddIncome = function() {
    const _this = this;
    possibleIncome.forEach(item => {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
}
AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        }while(!isNumber(this.percentDeposit));
        do{
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while(!isNumber(this.moneyDeposit));
    }
}
AppData.prototype.getExpensesMonth = function() {
    for(let am of Object.values(this.expences)) {
        this.expencesMonth += Number(am);
   }
}
AppData.prototype.getBudget = function() { 
    this.budgetMonth = this.budget + +this.incomeMonth - this.expencesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30); 
}
AppData.prototype.getTargetMonth = function() { return missionInput.value / this.budgetMonth; },
AppData.prototype.showStatusIncome = function() {
    if(this.budgetDay >= 1200)
            return('У вас высокий уровень дохода');
    else if(this.budgetDay >= 600 && this.budgetDay <= 1200)
            return('У вас средний уровень дохода');
    else if(this.budgetDay >= 0 && this.budgetDay <= 600)
            return('К сожалению у вас уровень дохода ниже среднего');
    else
        return('Что то пошло не так');
}
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
}

AppData.prototype.addEventListeners = function () {
    const _this = this;
    calculate.addEventListener('click', _this.start.bind(_this));
    expensesPlus.addEventListener('click', _this.addExpensesBlock);
    incomePlus.addEventListener('click', _this.addIncomeBlock);
    cancelButton.addEventListener('click', _this.reset);
    periodSelect.addEventListener('input', () => {
        periodAmount.textContent = periodSelect.value;
    }); 
    
}

AppData.prototype.addCheckInputs = function() {
    const _this = this;
    const sumInputs = document.querySelectorAll('[data-sum]');
    const nameInputs = document.querySelectorAll('[data-name]');

    sumInputs.forEach(item => {
        item.addEventListener('input', () => {
            _this.checkSumInput(item);
        });
    });
    nameInputs.forEach(item => {
        item.addEventListener('input', () => {
            _this.checkNameInput(item);
        });
    });
}

const appData = new AppData();

appData.addEventListeners();
appData.addCheckInputs();
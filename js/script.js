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
const additionalIncome = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');

const validSum =/^[0-9]+$/;
const validName = /^[?!,.а-яА-ЯёЁ\s]+$/;

class AppData {
    constructor() {
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

    blockUnBlockInput() {
        inputs.forEach(item => {
            if(item.hasAttribute('readonly')) item.value = '';
            item.toggleAttribute('readonly');
        });
        calculate.classList.toggle('visible');
        cancelButton.classList.toggle('visible');
    }

    checkRegExpInput(item, regExp) {
        if(regExp.test(item.value) === false) item.classList.add('invalid');
        if(regExp.test(item.value) === true) item.classList.remove('invalid');
    }

    checkInput = function() {
        const sumInputs = document.querySelectorAll('[data-sum]');
        const nameInputs = document.querySelectorAll('[data-name]');
        const arrSum = [...sumInputs];
        const arrName = [...nameInputs];

        arrSum.map(item => this.checkRegExpInput(item, validSum));
        arrName.map(item => this.checkRegExpInput(item, validName));

        const checkNameInput = arrName.every((item) => { return validName.test(item.value) })
        const checkSumInput = arrSum.every((item) => { return validSum.test(item.value) })

        if(checkSumInput === true && checkNameInput === true) return true;
    }

    start = function () {
        if(this.checkInput()) {
            this.budget = +monthIncome.value;
            this.blockUnBlockInput();

            this.getExpInc();
            this.getExpensesMonth();
            this.getAddExpInc();
            this.getBudget();
            periodSelect.addEventListener('input', () => {
                incomePeriodValue.value = this.calcSavedMoney();
            });

        this.showResult();
        }
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expencesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
    }

    addBlocks(item) {
        const parent = item.parentNode;
        const cloneItem = parent.childNodes[3].cloneNode(true);
        const addName = item.parentNode.className;

        cloneItem.childNodes.forEach(item => {
            item.value = '';
        })

        parent.childNodes[3].parentNode.insertBefore(cloneItem, item);
        
        const numberOfItems = parent.querySelectorAll(`.${addName}-items`);
        if (numberOfItems.length === 3) item.style.display = 'none';
        appData.addCheckInputs();
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;        
        
            if(itemAmount !== '' && itemTitle !== '') {
                if(startStr === 'expenses')
                    this.expences[itemTitle] = itemAmount;
                if(startStr === 'income')
                    this.income[itemTitle] = itemAmount;
            }
        }

        expensesItems.forEach(count);

        incomeItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpInc() {
        const add = (item, incomeItem) => {
                if(item instanceof Array === false) item.forEach(inputItem => incomeItem.push(inputItem.value.trim()));
                else item.forEach(inputItem => incomeItem.push(inputItem.trim()));
        }

        add(additionalIncome.value.split(','), this.addExpenses);
        add(possibleIncome, this.addIncome);
    }

    getInfoDeposit() {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }while(!isNumber(this.percentDeposit));
            do{
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while(!isNumber(this.moneyDeposit));
        }
    }
    getExpensesMonth() {
        for(let am of Object.values(this.expences)) {
            this.expencesMonth += Number(am);
        }
    }
    getBudget() { 
        this.budgetMonth = this.budget + +this.incomeMonth - this.expencesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30); 
    }
    getTargetMonth() { return missionInput.value / this.budgetMonth; }
    showStatusIncome() {
        if(this.budgetDay >= 1200)
                return('У вас высокий уровень дохода');
        else if(this.budgetDay >= 600 && this.budgetDay <= 1200)
                return('У вас средний уровень дохода');
        else if(this.budgetDay >= 0 && this.budgetDay <= 600)
                return('К сожалению у вас уровень дохода ниже среднего');
        else
            return('Что то пошло не так');
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    addEventListeners() {
        calculate.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', event => {
            this.addBlocks(event.target);
        });
        incomePlus.addEventListener('click', event => {
            this.addBlocks(event.target);
        });
        cancelButton.addEventListener('click', this.blockUnBlockInput);
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        }); 
        
    }

    addCheckInputs() {
        const sumInputs = document.querySelectorAll('[data-sum]');
        const nameInputs = document.querySelectorAll('[data-name]');

        sumInputs.forEach(item => {
            item.addEventListener('input', () => {
                this.checkRegExpInput(item, validSum);
            });
        });
        nameInputs.forEach(item => {
            item.addEventListener('input', () => {
                this.checkRegExpInput(item, validName);
            });
        });
    }
}

const appData = new AppData();

appData.addEventListeners();
appData.addCheckInputs();
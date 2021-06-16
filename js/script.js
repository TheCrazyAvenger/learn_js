'use strict'

let inputs = document.querySelectorAll('input')
let sumInputs = document.querySelectorAll('[data-sum]')
let nameInputs = document.querySelectorAll('[data-name]')
const calculate = document.getElementById('start')
const cancelButton = document.getElementById('cancel')
const incomePlus = document.getElementsByTagName('button')[0]
const expensesPlus = document.getElementsByTagName('button')[1]
const checkBoxDeposit = document.querySelector('#deposit-check')
const possibleIncome = document.querySelectorAll('.additional_income-item')
const budgetMonthValue = document.querySelector('.budget_month-value')
const budgetDayValue = document.querySelector('.budget_day-value')
const expensesMonthValue = document.querySelector('.expenses_month-value')
const additionalIncomeValue = document.querySelector('.additional_income-value')
const additionalExpensesValue = document.querySelector(
	'.additional_expenses-value'
)
const incomePeriodValue = document.querySelector('.income_period-value')
const targetMonthValue = document.querySelector('.target_month-value')
const monthIncome = document.querySelector('.salary-amount')
const additionalIncomeTitle = document.querySelector('.income-title')
const obligatoryExpensesTitle = document.querySelector('.expenses-title')
let expensesItems = document.querySelectorAll('.expenses-items')
let incomeItems = document.querySelectorAll('.income-items')
const missionInput = document.querySelector('.target-amount')
const periodSelect = document.querySelector('.period-select')
let periodAmount = document.querySelector('.period-amount')
const additionalIncome = document.querySelector('.additional_expenses-item')
const depositBank = document.querySelector('.deposit-bank')
const depositAmount = document.querySelector('.deposit-amount')
const depositPercent = document.querySelector('.deposit-percent')
const saveInputs = document.querySelectorAll('[data-result]')

const validSum = /^[0-9]+$/
const validName = /^[?!,.а-яА-ЯёЁ\s]+$/

class AppData {
	constructor() {
		;(this.income = []),
			(this.addIncome = []),
			(this.expenses = []),
			(this.addExpenses = []),
			(this.deposit = false),
			(this.incomeMonth = 0),
			(this.percentDeposit = 0),
			(this.moneyDeposit = 0),
			(this.budget = 0),
			(this.budgetDay = 0),
			(this.budgetMonth = 0),
			(this.expencesMonth = 0)
	}

	set setIncome(value) {
		return this.income.push(value)
	}

	set setExpenses(value) {
		return this.expenses.push(value)
	}

	set setAddExpenses(value) {
		return this.addExpenses.push(value)
	}

	set setAddIncome(value) {
		return this.addIncome.push(value)
	}

	set setExpencesMonth(value) {
		return (this.expencesMonth = value)
	}

	set setIncomeMonth(value) {
		return (this.incomeMonth = value)
	}

	set setPercentDeposit(value) {
		return (this.percentDeposit = value)
	}

	set setMoneyDeposit(value) {
		return (this.moneyDeposit = value)
	}

	set setBudget(value) {
		return (this.budget = value)
	}

	set setBudgetMonth(value) {
		return (this.budgetMonth = value)
	}

	set setBudgetDay(value) {
		return (this.budgetDay = value)
	}

	clearFields() {
		this.income = []
		this.addIncome = []
		this.expences = []
		this.addExpenses = []
		this.deposit = false
		this.incomeMonth = 0
		this.percentDeposit = 0
		this.moneyDeposit = 0
		this.budget = 0
		this.budgetDay = 0
		this.budgetMonth = 0
		this.expencesMonth = 0
	}

	setCookie(name, value, options = {}) {
		options = {
			path: '/',
			...options,
		}

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString()
		}

		let updatedCookie =
			encodeURIComponent(name) + '=' + encodeURIComponent(value)

		Object.keys(options).map((optionKey) => {
			updatedCookie += '; ' + optionKey
			let optionValue = options[optionKey]
			if (optionValue !== true) {
				updatedCookie += '=' + optionValue
			}
		})

		document.cookie = updatedCookie
	}

	getCookie(name) {
		var value = '; ' + document.cookie
		var parts = value.split('; ' + name + '=')
		if (parts.length == 2)
			return decodeURIComponent(parts.pop().split(';').shift())
	}

	deleteCookie(name) {
		this.setCookie(name, '', {
			'max-age': -1,
		})
	}

	checkCookie() {
		const url = new URL(window.location.href).origin

		if (url.substr(0, 4) === 'http') {
			const saveInputsArr = [...saveInputs]
			const hasAllCookies = saveInputsArr.every(
				(_, i) => this.getCookie(`resultItem${i + 1}`) !== undefined
			)
			if (hasAllCookies === true) return true
			else return false
		}
		return true
	}

	blockUnBlockInput() {
		inputs = document.querySelectorAll('input')

		depositBank.toggleAttribute('disabled')

		inputs.forEach((item) => {
			if (item.hasAttribute('disabled')) item.value = ''
			item.toggleAttribute('disabled')
		})

		calculate.classList.toggle('visible')
		cancelButton.classList.toggle('visible')
	}

	saveRemoveData(removeButton) {
		const url = new URL(window.location.href).origin

		if (removeButton === undefined) {
			saveInputs.forEach((item, i) => {
				if (item.value !== '') {
					if (url.substr(0, 4) === 'http') {
						this.setCookie(`resultItem${i + 1}`, `${item.value}`, {
							'max-age': 50000,
						})
					}
					localStorage.setItem(`resultItem${i + 1}`, item.value)
				} else {
					if (
						localStorage.getItem(`resultItem${i + 1}`) === null &&
						this.getCookie(`resultItem${i + 1}`) !== undefined
					)
						item.value = this.getCookie(`resultItem${i + 1}`)
					if (localStorage.getItem(`resultItem${i + 1}`) !== null)
						item.value = localStorage.getItem(`resultItem${i + 1}`)
				}
			})
		} else
			saveInputs.forEach((_, i) =>
				localStorage.removeItem(`resultItem${i + 1}`)
			)
	}

	removeExpIncDepFields() {
		const incomeBlock = document.querySelector('.income')
		const expensesBlock = document.querySelector('.expenses')

		const removeItem = (block, button) => {
			const className = block.className
			let removedBlock = document.querySelector(`.${className}-items`)
			block.childNodes.forEach((item) => {
				if (item.className === `${className}-items`) block.removeChild(item)
			})
			const numberOfItems = block.querySelectorAll(`.${className}-items`)
			if (numberOfItems.length === 0) block.insertBefore(removedBlock, button)
		}

		removeItem(incomeBlock, incomePlus)
		removeItem(expensesBlock, expensesPlus)

		incomePlus.style.display = 'block'
		expensesPlus.style.display = 'block'

		checkBoxDeposit.checked = false
		this.depositHandler()
	}

	checkRegExpInput(item, regExp) {
		if (regExp.test(item.value) === false) item.classList.add('invalid')
		if (regExp.test(item.value) === true) item.classList.remove('invalid')
	}

	checkInput() {
		const sumInputs = document.querySelectorAll('[data-sum]')
		const nameInputs = document.querySelectorAll('[data-name]')
		const arrSum = [...sumInputs]
		const arrName = [...nameInputs]

		arrSum.map((item) => this.checkRegExpInput(item, validSum))
		arrName.map((item) => this.checkRegExpInput(item, validName))

		if (
			arrName.every((item) => {
				return validName.test(item.value)
			}) === true &&
			arrSum.every((item) => {
				return validSum.test(item.value)
			}) === true
		)
			return true
	}

	checkDeposit() {
		if (checkBoxDeposit.checked) {
			if (+depositPercent.value > 100 || +depositPercent.value <= 0) {
				depositPercent.classList.add('invalid')
				return false
			} else {
				depositPercent.classList.remove('invalid')
				return true
			}
		} else return true
	}

	start = function () {
		if (this.checkInput() && this.checkDeposit()) {
			this.setBudget = +monthIncome.value
			this.blockUnBlockInput()

			this.getExpInc()
			this.getExpIncMonth()
			this.getAddExpInc()
			this.getInfoDeposit()
			this.getBudget()
			periodSelect.addEventListener('input', () => {
				incomePeriodValue.value = this.calcSavedMoney()
			})

			this.showResult()
			this.saveRemoveData()
			this.clearFields()
		}
	}

	showResult() {
		budgetMonthValue.value = this.budgetMonth
		budgetDayValue.value = this.budgetDay
		expensesMonthValue.value = this.expencesMonth
		additionalExpensesValue.value = this.addExpenses.join(', ')
		additionalIncomeValue.value = this.addIncome.join(', ')
		targetMonthValue.value = Math.ceil(this.getTargetMonth())
		incomePeriodValue.value = this.calcSavedMoney()
	}

	addBlocks(item) {
		const parent = item.parentNode
		const startStr = parent.className
		const childItem = document.querySelector(`.${startStr}-items`)
		const cloneItem = childItem.cloneNode(true)
		const addName = item.parentNode.className

		cloneItem.childNodes.forEach((item) => {
			item.value = ''
		})

		parent.childNodes[3].parentNode.insertBefore(cloneItem, item)

		const numberOfItems = parent.querySelectorAll(`.${addName}-items`)
		if (numberOfItems.length === 2) item.style.display = 'none'
		appData.addCheckInputs()
	}

	getExpInc() {
		const count = (item) => {
			const startStr = item.className.split('-')[0]
			const itemAmount = item.querySelector(`.${startStr}-amount`).value

			if (startStr === 'expenses') this.setExpenses = +itemAmount
			if (startStr === 'income') this.setIncome = +itemAmount
		}

		expensesItems = document.querySelectorAll('.expenses-items')
		incomeItems = document.querySelectorAll('.income-items')

		expensesItems.forEach(count)
		incomeItems.forEach(count)
	}

	getAddExpInc() {
		const add = (item) => {
			if (!Array.isArray(item)) {
				item.forEach(
					(inputItem) => (this.setAddIncome = inputItem.value.trim())
				)
			} else item.map((inputItem) => (this.setAddExpenses = inputItem.trim()))
		}

		add(possibleIncome)
		add(additionalIncome.value.split(','))
	}

	getExpIncMonth() {
		this.setExpencesMonth = this.expenses.reduce((acc, num) => acc + num)
		this.setIncomeMonth = this.income.reduce((acc, num) => acc + num)
	}
	getBudget() {
		const monthDeposit = Math.floor(
			this.moneyDeposit * (this.percentDeposit / 100)
		)
		this.setBudgetMonth =
			this.budget + +this.incomeMonth - this.expencesMonth + monthDeposit
		this.setBudgetDay = Math.floor(this.budgetMonth / 30)
	}
	getTargetMonth() {
		return missionInput.value / this.budgetMonth
	}

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value
	}

	getInfoDeposit() {
		if (this.deposit) {
			this.setPercentDeposit = +depositPercent.value
			this.setMoneyDeposit = +depositAmount.value
		}
	}

	changePersent() {
		const valueSelect = this.value
		if (valueSelect === '0') {
			depositPercent.value = ''
			depositPercent.classList.add('visible_inline')
		} else {
			depositPercent.classList.remove('visible_inline')
			depositPercent.value = valueSelect
		}
	}

	depositHandler() {
		if (checkBoxDeposit.checked) {
			depositBank.classList.add('visible_inline')
			depositAmount.classList.add('visible_inline')
			depositPercent.classList.add('visible_inline')
			depositAmount.setAttribute('data-sum', '')
			depositPercent.setAttribute('data-sum', '')
			this.deposit = true
			this.checkDepositInput()
			depositBank.addEventListener('change', this.changePersent)
		} else {
			depositBank.value = ''
			depositAmount.value = ''
			depositBank.classList.remove('visible_inline')
			depositAmount.classList.remove('visible_inline')
			depositPercent.classList.remove('visible_inline')
			depositAmount.removeAttribute('data-sum', '')
			depositPercent.removeAttribute('data-sum', '')
			this.deposit = false
			depositBank.removeEventListener('change', this.changePersent)
		}
	}

	addEventListeners() {
		document.addEventListener('DOMContentLoaded', () => {
			this.checkCookie.bind(this)
			if (!this.checkCookie()) {
				this.deleteCookie.bind(this)
				saveInputs.forEach((_, i) => {
					this.deleteCookie(`resultItem${i + 1}`)
					localStorage.removeItem(`resultItem${i + 1}`)
				})
			} else {
				if (
					localStorage.getItem('resultItem1') !== null ||
					this.getCookie('resultItem1') !== undefined
				)
					this.blockUnBlockInput()
				this.saveRemoveData.bind(this)
				this.saveRemoveData()
			}
		})

		calculate.addEventListener('click', this.start.bind(this))

		expensesPlus.addEventListener('click', (event) => {
			this.addBlocks(event.target)
		})

		incomePlus.addEventListener('click', (event) => {
			this.addBlocks(event.target)
		})

		cancelButton.addEventListener('click', () => {
			this.blockUnBlockInput.bind(this)
			this.blockUnBlockInput()
			this.removeExpIncDepFields.bind(this)
			this.removeExpIncDepFields()
			this.saveRemoveData(cancelButton)
		})

		periodSelect.addEventListener('input', () => {
			periodAmount.textContent = periodSelect.value
		})

		checkBoxDeposit.addEventListener('change', this.depositHandler.bind(this))
	}

	addCheckInputs() {
		const sumInputs = document.querySelectorAll('[data-sum]')
		const nameInputs = document.querySelectorAll('[data-name]')

		sumInputs.forEach((item) => {
			item.addEventListener('input', () => {
				this.checkRegExpInput(item, validSum)
			})
		})
		nameInputs.forEach((item) => {
			item.addEventListener('input', () => {
				this.checkRegExpInput(item, validName)
			})
		})
	}

	checkDepositInput() {
		depositAmount.addEventListener('input', () => {
			this.checkRegExpInput(depositAmount, validSum)
		})
		depositPercent.addEventListener('input', () => {
			if (
				validSum.test(depositPercent.value) === false ||
				+depositPercent.value > 100 ||
				+depositPercent.value <= 0
			) {
				depositPercent.classList.add('invalid')
			} else depositPercent.classList.remove('invalid')
		})
	}
}

const appData = new AppData()

appData.addEventListeners()
appData.addCheckInputs()

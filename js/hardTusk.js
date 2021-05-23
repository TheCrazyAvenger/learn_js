const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const today = new Date();
const daysDiv = document.getElementById('days');

week.forEach((item, i) => {
    const createDiv = document.createElement('div');
    if (item == 'Суббота' || item == 'Воскресенье'){
        createDiv.classList.add('italic');
    }
    if (i == today.getDay()-1) {
        createDiv.classList.add('today');
    }
    createDiv.textContent = week[i];
    daysDiv.appendChild(createDiv);
})
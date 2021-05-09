'use strict';

const lang = prompt("Введите язык ru или en");
let arr;
const namePerson = prompt("Введите имя");

//Оператор if
if (lang == "ru") {
    arr = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
}
else if (lang == "en") {
	arr = ["mn", "tu", "wn", "th", "fr", "st", "sn"];
}
console.log ("Месяцы: ", arr);

//Оператор switch

switch (lang) {
    case "ru":
        arr = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    break;
    case "en":
	    arr = ["mn", "tu", "wn", "th", "fr", "st", "sn"];
    break;
}
console.log ("Месяцы: ", arr);

//Многомерный массив

arr = {
	"ru":["пн", "вт", "ср","чт", "пт", "сб", "вс"],
	"en":["mn", "tu", "wn", "th", "fr", "st", "sn"],
};

console.log ("Месяцы: ", arr[lang]);

const result = namePerson === "Артем" ? "директор" : namePerson === "Максим" ? "преподаватель" : "студент";

console.log (result);
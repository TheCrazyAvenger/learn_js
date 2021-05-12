let str = "             dafkljafkdjklafjkldjklfjakljfdkljaklfjkldjalfjdajfl         ";

const editString = function(a) {
    if(typeof a !== 'string'){ return('Не строка'); }

    a = a.trim().slice(0, 30) + '...';
    return a;
}

console.log(editString(str));
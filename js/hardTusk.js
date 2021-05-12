let str = '             dafkljafkdjklafjkldjklfjakljfdkljaklfjkldjalfjdajfl         ';

const editString = function(a) {
    if(typeof a === 'number'){
        return('Не строка');
    }
    
    a = a.replace(/(^\s*)|(\s*)$/g, '');

    if(a.length >= 30) {
        a= a.slice(0, 30) + '...';
    }

    return a;
}

console.log(editString(str));
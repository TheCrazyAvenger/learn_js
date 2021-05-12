const arr = ['1000', '2000', '3000', '4000'];

arr.forEach(num => {
    if(num.charAt(0) === '2' || num.charAt(0) === '4') console.log(num);
})

const arr1 = Array.from({length: 100}, (_, index) => index + 1);

const checkNumbers = (number) => {
    if(number === 1) return false;

    for (let i = 2; i < number; i++){
        if (number % i === 0) return false;
    }

    return true;
}

const result = arr1.filter(checkNumbers);

console.log(result);
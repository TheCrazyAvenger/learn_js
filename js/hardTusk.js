const num = 266219;
    
const sumNumber = Math.pow (
    num
    .toString()
    .split("")
    .reduce((prev, next) => prev * Number(next), 1),
    3
)
.toString()
.slice(0, 2);

console.log("result: ", sumNumber);
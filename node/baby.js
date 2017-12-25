const sum = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);

console.log(process.argv.slice(2).reduce(sum));

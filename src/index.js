function primeNumbers(maxNumber) {
  const isPrime = new Array (maxNumber + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  const primes = [];

  for (let number = 2; number <= maxNumber; number ++){
      if (isPrime[number] === true){
          primes.push(number);
      
          let nextNumber = number * number;

          while(nextNumber <= maxNumber) {
              isPrime[nextNumber] = false;
              nextNumber += number;
          }
      }
  }
  return primes;
}


function basePrimeDev(base) {
  const primes = primeNumbers(base);
  const primesCount = {};
  for (let i = 0; i <= primes.length; i++) {
      let dividend = base;
      let divisor = primes[i];
      primesCount[divisor] = 0;
      while (dividend > 1) {
          if (dividend % divisor === 0) {
              primesCount[divisor]++;
              dividend = dividend / divisor; 
          } else {
              break;
          } 
      }
      if (primesCount[divisor] === 0) {
          delete primesCount[divisor];
      }
  }
  return primesCount;
}

module.exports = function getZerosCount(number, base) {
  const primesBaseCount = basePrimeDev(base);
  let numberCount = {};
    for (let i in primesBaseCount) {
      numberCount[i] = 0;
      let pow = 1;
      while (number > Math.pow(i, pow)) {
        numberCount[i] += Math.floor(number / Math.pow(i, pow));
        pow++;
      }
    }
  
  let countZeroes = Number.MAX_SAFE_INTEGER;
  for (let i in primesBaseCount) {
      let result = Math.floor(numberCount[i] / primesBaseCount[i]);
      countZeroes = Math.min(countZeroes, result);
  }
  return countZeroes;
}

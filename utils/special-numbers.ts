export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export function findPrimesInRange(start: number, end: number): number[] {
  let primes: number[] = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

export function findTriangularNumbersInRange(min: number, max: number): number[] {
  const triangularNumbers: number[] = [];
  let n = 1;

  while (n * (n + 1) / 2 <= max) {
    const triangularNumber = n * (n + 1) / 2;
    if (triangularNumber >= min) {
      triangularNumbers.push(triangularNumber);
    }
    n++;
  }

  return triangularNumbers;
}

export function isMultipleOf(value: number, multiple: number): boolean {
  return value % multiple === 0;
}


export function findPalindromicNumbers(min: number, max: number): number[] {
  const palindromicNumbers: number[] = [];

  for (let num = min; num <= max; num++) {
    const numStr = num.toString();
    const reversedStr = numStr.split('').reverse().join('');

    if (numStr === reversedStr) {
      palindromicNumbers.push(num);
    }
  }

  return palindromicNumbers;
}

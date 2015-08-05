// Fibonachi
// 1 1 2 3 5 8 13 ...

var rls = require('readline-sync');

var ans = rls.question("Input fibo number : ");
ans = ParseInt(ans, 10);

function fibo(n) {
  if(n == 1 || n == 2) {
    return 1;
  } else {
    return fibo(n-1) + fibo(n-2);
  }
}

console.log("result : " + fibo(ans));

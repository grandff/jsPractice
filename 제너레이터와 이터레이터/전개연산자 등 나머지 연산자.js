const log = console.log;
const line = console.log("===============");

// for of, 전개 연산자, 구조 분해, 나머지 연산자 등
// 함수는 odds에서 썼던 함수들임
log(...odds3(10));
log([...odds3(10)])


const [head, ...tail] = odds3(5);
log(head);
log(tail);


const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);
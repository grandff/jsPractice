const log = console.log;

const products = [
    {name : '반팔티', price : 15000},
    {name : '긴팔티', price : 20000},
    {name : '핸드폰케이스', price : 15000},
    {name : '후드티', price : 30000},
    {name : '바지', price : 25000}
];

/* reduce */
const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums){
    total = total + n;
}

log(total);
console.log("==================================");
// reduce 함수 예
const reduce = (f, acc, iter) => {
    if (!iter){
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }

    for (const a of iter){
        acc = f(acc, a);
    }

    return acc;
};

const add = (a, b) => a+ b;
log(reduce(add, 0, [1,2,3,4,5]));               // return 15
log(add(add(add(add(add(0,1),2),3),4),5));      // 위의 reduce를 풀어씀
log(reduce(add, [1, 2, 3, 4, 5]));


// products의 값을 모두 더하는 reduce 함수
log("=====================================");
log(reduce((total_price, products) => total_price + products.price, 0 , products));
const log = console.log;



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

// reduce 함수를 통해 누적시키는 예제
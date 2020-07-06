const log = console.log;

const go = (...args) => reduce((a, f) => f(a), args);

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) =>  f(a, ..._);

const products = [
    {name : '반팔티', price : 15000},
    {name : '긴팔티', price : 20000},
    {name : '핸드폰케이스', price : 15000},
    {name : '후드티', price : 30000},
    {name : '바지', price : 25000}
];

const add = (a, b) => a+ b;

const map = curry((f, iter) =>{
    let res = [];
    for (const a of iter){
        res.push(f(a));       // 직접 명시하지하고 추상화를 함
    }
    return res;
});

const filter = curry((f, iter) => {
    let res = [];
    for (const a of iter){
        if (f(a)) res.push(a);
    }

    return res;
});

const reduce = curry((f, acc, iter) => {
    if (!iter){
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }

    for (const a of iter){
        acc = f(acc, a);
    }

    return acc;
});


// map, filter, reduce에 curry로 감싸서 원하는 인자가 들어와야지만 값을 리턴하도록 함
// go를 사용해 코드를 읽기 좋게 변경
// products만 받는다는걸 알 수 있게 한다 함....
go(
    products,
    filter(p => p.price < 20000),
    map(p => p.price),
    reduce(add),
    log
);

// 함수 조합으로 함수 만들기
const total_price = pipe(
    map(p => p.price),
    reduce(add),
    log
);

const base_total_price = predi => pipe(
    filter(predi),
    total_price
);

go(
    products,
    base_total_price(p => p.price < 20000),
    log
);

go(
    products,
    base_total_price(p => p.price > 20000),
    log
);
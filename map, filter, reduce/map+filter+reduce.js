const log = console.log;

const map = (f, iter) =>{
    let res = [];
    for (const a of iter){
        res.push(f(a));       // 직접 명시하지하고 추상화를 함
    }
    return res;
};

const filter = (f, iter) => {
    let res = [];
    for (const a of iter){
        if (f(a)) res.push(a);
    }

    return res;
};

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

const products = [
    {name : '반팔티', price : 15000},
    {name : '긴팔티', price : 20000},
    {name : '핸드폰케이스', price : 15000},
    {name : '후드티', price : 30000},
    {name : '바지', price : 25000}
];

// 가격을 가져오는 map 
log(map(p => p.price, products));

// 2만원 이하의 상품들만 가져오는 map
log(map(p => p.price, filter(p => p.price < 20000, products)));

// 2만원 이하의 상품들의 가격을 모두 합친 map
log(reduce(add, map(p => p.price, filter(p => p.price < 20000, products))));

// 위의 또다른 방법 undefined..??
log(reduce(add, filter(n => n >= 20000, map(p => p.price, products))));



// 함수형 사고를 가지는 것! reduce(add, ) 까지는 작성하고 그 이후 들어올 값은 다 숫자(혹은 결과값이 있는) 상태라는 걸 예측 하고 함수를 사용함.. 뭐 대충 그런
log(reduce(add, [10, 20, 30, 40]));

log("=================================")


/* 코드를 값으로 다루어 표현력 높이기(함수형 사고의 연결점) */
// go 함수 예제
// 함수의 인자를 결과로 넘기고 그 결과를 다음 결과에 넘기는... 하나의 값으로 만드는 함수
const go = (...args) => reduce((a, f) => f(a), args);

go(
    add(0,1),
    a => a + 1,
    a => a + 10,
    a => a+ 100,
    log
);

// pipe 함수 예제
// go 처럼 값을 넘기는 게 아닌 함수를 넘기는 함수
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const f = pipe(
    (a,b) => a+b,
    a => a + 10,
    a => a + 100
);
log(f(0, 1));

log("=================================");
// go를 사용해서 읽기 좋은 코드로 만들기
go(
    products,                                               // products로 시작해서
    products => filter(p => p.price < 20000, products),     // 2만원 이하의 상품을 가져오고
    products => map(p => p.price, products),                // 가격만 가져온다음에
    prices => reduce(add, prices),                          // 전체 합을 구함
    log
);

log("=================================");
// curry 함수 예제
// 함수를 받아서 함수를 리턴하고, 인자를 받아서 원하는 갯수일 경우 리턴한 함수를 실행하는.. 뭐 그런거임
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) =>  f(a, ..._);
const mult = curry((a, b) => a * b);
log(mult);          // 2개가 아니므로 함수만 리턴
log(mult(1));       // 2개가 아니므로 함수만 리턴
log(mult(1)(2));    // 2개를 리턴했으므로 값을 리턴

const mult3 = mult(3);
log(mult3(10));
log(mult3(5));



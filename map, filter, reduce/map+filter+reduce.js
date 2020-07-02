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

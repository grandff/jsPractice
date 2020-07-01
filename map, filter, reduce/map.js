const log = console.log;
const line1 = console.log("===================");


const products = [
    {name : '반팔티', price : 15000},
    {name : '긴팔티', price : 20000},
    {name : '핸드폰케이스', price : 15000},
    {name : '후드티', price : 30000},
    {name : '바지', price : 25000}
];

/* map */
// map을 사용하지 않고 products에서 값을 가져오는 예시
let names = [];
for (const p of products){
    names.push(p.name);
}
log(names);

line1;

let prices = [];
for (const p of products){
    prices.push(p.price);
}
log(prices);

line1;

// map 함수 예시
const map = (f, iter) =>{
    let res = [];
    for (const a of iter){
        res.push(f(a));       // 직접 명시하지하고 추상화를 함
    }
    return res;
}

// map을 사용해서 값을 가져오는 예시
log(map(p => p.name, products));


/* 이터러블 프로토콜을 따른 map의 다형성 */
log([1, 2, 3].map(a => a+1));

// document.queryselectorall을 사용해 map을 사용하면 오류가 남
// queryselectorall은 array iterator를 사용하기 때문임
function *gen(){
    yield 2;
    yield 3;
    yield 4;
}
log(map(a => a* a, gen()));


/* 다형성 2 */
let m = new Map();
m.set('a', 10);
m.set('b', 20);
const it = m[Symbol.iterator]();
line1;
log(it.next());
log(it.next());
log(it.next());
log(new Map(map(([k, a]) => [k, a * 2], m)));    // 이렇게도 응용해서 새로운 맵 객체를 만들 수 있음
const log = console.log;

/*
    기존과 달라진 ES6에서의 리스트 순회
    - for i++
    - for of

    es6가 되면서 리스트 순회가 많이 달라짐.
*/
// es5
const list = [1,2,3];
for (var i =0; i<list.length; i++){
    log("es5 list :: " + list[i]);
}

const str = 'abc';
for(var i=0; i<str.length; i++){
    log("es5 list2 :: " + str[i]);
}

// es6
for (const a of list){
    log("es6 list :: " + a);
}

for(const a of str){
    log("es6 list2 :: " + a);
}

/*
    Array를 통해 알아보기
    - 키로 접근해서 값을 조회함
*/
log('Arr -------');
const arr = [1, 2, 3];
for (const a of arr) log(a);

log("symbol :: " + arr[Symbol.iterator]);
// arr[Symbol.iterator] = null 로 할 경우 순회가 안됨

/*
    Set을 통해 알아보기    
    - array처럼 조회는 안됨
    - Symbol.iterator로 접근할 수 있음
        - 어떤 객체의 키로 사용될 수 있음    
*/
log('Set -------');
const set = new Set([1,2,3]);
for (const a of set) log(a);


/*
    Map을 통해 알아보기
    - array처럼 조회는 안됨
    - Symbol.iterator로 접근할 수 있음
        - 어떤 객체의 키로 사용될 수 있음
    - Set과는 다르게 value에 또다른 array가 담겨져 있음
    - keys를 통해 접근하면 key 값을 확인할 수 있음
    - values, entries도 있음. values는 value만, entries는 key, value 전체를 리턴.
*/
log('Map -------');
const map = new Map([['a', 1], ['b',2], ['c',3]])
for (const a of map) log(a);


/*
    이터러블 / 이터레이터 프로토콜
    - 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
    - 이터레이터 : {value, done} 객체를 리턴하는 next()를 가진 값
    - 이터러블 / 이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약
*/

// arr ex
let iterator = arr[Symbol.iterator]();
log("array iterator :: " + iterator.next().value);    // 1
log("array iterator :: " + iterator.next().value);    // 2
log("array iterator :: " + iterator.next().value);    // 3
log("array iterator :: " + iterator.next().value + " , " + iterator.next().done);    // undefined, done is true

// next를 호출하고 나면 for 루프를 돌려도 이전 값은 나오질 않음(array, set, map 동일)
let iter1 = arr[Symbol.iterator]();
iter1.next();
for(const a of iter1) log("iter1 :: " + a);

// set ex
let a = set[Symbol.iterator]();
log("set iterator :: " + a.next().value);           // 1
log("set iterator :: " + a.next().value);           // 2
log("set iterator :: " + a.next().value);           // 3
log("set iterator :: " + a.next().value + ", " + a.next().done);        // undefined, done is true

// map keys
let b = map.keys();
log("map keys :: " + b.next().value);

// 자기자신을 리턴할 수 있음
let it = map.values();                          // {1, 2, 3}
let it2 = it[Symbol.iterator]();
log("self iter :: " + it2.next().value);
const log = console.log;

// 사용자 정의 이터러블
const iterable = {
    [Symbol.iterator](){
        // 3으로 시작해서 1씩 줄어듬
        let i = 3;
        return{
            next(){
                return i ==0 ? {done : true} : {value : i-- , done : false}
            },
            [Symbol.iterator]() {return this;}      // well formed iterator.. ?? 개념이 어려운데엽..
        }
    }
};

// iterable 조회
//let iterator = iterable[Symbol.interator]();
//for (const a of iterable) log(a);

// iterator 확인 2
const arr2 = [1,2,3];
for (const a of arr2) log(a);
log('===============');
let iter2 = arr2[Symbol.iterator]();
iter2.next();
for (const a of iter2) log(a);      // next로 한번 진행했으므로 이후부터 출력하게 됨(1,2,3 ==> 2,3)


// 순회를 통해 querySelectorAll 등의 데이터를 전부 확인 가능함
// 나 혼자 연습에선 node로 해서 document에서 에러남ㅋ
/*
log('===============');
for(const a of document.querySelectorAll('*')) log(a);

log('===============');
const all = document.querySelectorAll('*');
let iter3 = all[Symbol.iterator]();
*/


/// 전개연산자 ///
// 전개연산자도 iterator 프로토콜을 따르는 데이터를 펼쳐서 확인 가능함
// array, map, set도 다 확인 가능함
log('===============');
const a = [1,2];
log([...a, ...[3,4]]);
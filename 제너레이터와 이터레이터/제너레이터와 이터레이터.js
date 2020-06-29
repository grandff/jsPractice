const log = console.log;

/*
    - 제너레이터 : 이터레이터이자 이터러블을 생성하는 함수
*/

// 함수 앞에 *이 붙음
function *gen(){
    yield 1;
    yield 2;
    if(false) yield 3;      // 조건을 줄수도 있음
    yield 4;    
    return 100;     // return 값을 설정할 수 있음. done 항목이 true가 됨.
}

let iter = gen();
log(iter[Symbol.iterator]() == iter);       // 실행 결과는 자기 자신임
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

// 이터러블 이기 때문에 순회가 아래처럼 가능함
log("===============");
for(const a of gen()) log(a);
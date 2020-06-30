const log = console.log;

// 무한으로 증가하는 제너레이터
function *infinity(i=0){
    while(true) yield i++;
}

// 무한으로 증가하면서 홀수만 생성 제너레이터
function *odds(l){    
    for(const a of infinity(1)){
        if (a % 2) yield a;
        if (a == l) return;
    }
}

// 홀수만 생성하는 제너레이터
function *odds2(l){
    for(let i =0; i < l; i++){
        if(i % 2) yield i;          // l 보다 작은 홀수만 뽑음
    }
}

// limit까지만 무한 생성
function *limit(l, iter){
    for (const a of iter){
        yield a;
        if (a==l) return;
    }
}

// 위에서 생성한 limit을 응용해서 홀수 생성 제너레이터
function *odds3(l){
    for (const a of limit(l, infinity(1))){
        if (a % 2) yield a;
    }
}

let iter2 = odds(10);
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log("============");

let iter4 = limit(5, [1,2,3,4,5,6,7]);
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());
log("============");


for (const a of odds3(40)) log(a);
log("============");
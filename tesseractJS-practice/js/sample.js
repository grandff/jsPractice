// 다시 복습해볼겸 es5와 es6 문법을 같이 사용해서 해보긔
// 크롬, ie 구분자도 처리해야함.

/* es5 */
let imageLoader;
let canvas;
let ctx;
let progress;
let textarea;
let worker;

$(document).ready(function(){
    imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    canvas = document.getElementById('imageCanvas');
    ctx = canvas.getContext('2d');

    progress = document.getElementById('progress');
    textarea = document.getElementById('textarea');

    // load tesseract
    worker = Tesseract.createWorker({
        logger: m => console.log(m),
        langPath : '../lang/kor'
    });
});

// show image to canvas
function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.crossOrigin = "Anonymous";      // cross domain 오류 해결용 테스트
        img.onload = function(){
            canvas.width = img.width;
            //canvas.height = img.height;
            canvas.height = 300;        // 여기에 변수 넣어서 만약 등록번호를 못 읽은 경우 추가 처리 해주기.
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);

    const readImage = ctx.getImageData(0, 0, canvas.width, canvas.height);    
    
    (async () => {
        await worker.load();
        await worker.loadLanguage('kor');
        await worker.initialize('kor');
        const {data : {text}} = await worker.recognize(readImage);
        textarea.value = text;
        await worker.terminate();
    })();
}

function readTextFromImage(){
    
}


/* // es5 */
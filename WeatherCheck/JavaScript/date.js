// 날짜 & 현재시각 구하기 (어제/오늘/내일)

// 날짜 20240101 형식으로 반환
function countDate(date){
    let year = date.getFullYear(); // 년도
    let month = date.getMonth() + 1;  // 월
    let day = date.getDate();  // 날짜

    if (month < 10){ // 월이 한자리수 일때, 1 -> 01로 바꾸기
        month = "0" + month.toString();
    }
    if (day < 10){ // 날짜가 한자리수 일때, 1 -> 01로 바꾸기
        day = "0" + day.toString();
    }

    let ymd = year.toString()+month.toString()+day.toString(); // 연결하기

    return parseInt(ymd); // 정수로 반환
}

// 현재 시각 구하기
let date = new Date();
let hour = date.getHours(); // 현재 몇시

// 오늘, 어제, 내일
let today = new Date();
date = new Date();
let yesterday = new Date(date.setDate(date.getDate()-1));
date = new Date();
let tommorrow = new Date(date.setDate(date.getDate()+1));

today = countDate(today); // 오늘
yesterday = countDate(yesterday); // 어제
tommorrow = countDate(tommorrow); // 내일
// console.log(yesterday, today, tommorrow);

console.log("오늘 날짜 :", today, hour, "시");
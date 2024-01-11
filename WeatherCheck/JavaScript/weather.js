// 날씨 (현재위치 & 검색위치) & 아이콘

// 날씨 API Key
const EncodingKey = "날씨 API Key";

// 현재 위치 날씨
function getCurrentWeather(lng,lat){
    console.log("날씨 호출 좌표", lng, lat);

    // 어제 날짜로 날씨 데이터 가져오기
    fetch(
        `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${EncodingKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${yesterday}&base_time=0500&nx=${lat}&ny=${lng}`
    )
    .then(response => response.json()) // 데이터 json으로 변환
    // json - data 불러오기
    .then((json) => {
        // console.log(json.response.body.items.item);
        console.log("날씨 데이터 불러오기");
        let items = json.response.body.items.item;

        let temp = [];
        let card_weather = [];
        let low = 0; // 최저기온
        let high = 0; // 최고기온
        let tmp = 0; // 기온
        let pcp = 0; // 강수량
        let pop = 0; // 강수확률

        $.each(items, function(index, item){
            let date = item.fcstDate;
            let time = item.fcstTime.substr(0,2);
            let category = item.category;
            let value = item.fcstValue;
            // console.log(category, value);

            // 오늘/내일 최저/최고 기온
            if(date == today){ // 오늘
                if(category == "TMN"){ // TMN = 일 최저기온
                    low = value;
                }
                if(category == "TMX"){ // TMX = 일 최고기온
                    high = value;
                    temp.push(`
                        <p>
                            <span class="day"> 오늘 </span>
                            <span class="daydate"> (${date.substr(4,2)}/${date.substr(6,2)}) </span>
                            <span class="daylow"> ${low}&#x2103 </span>
                            <span> / </span>
                            <span class="dayhigh"> ${high}&#x2103 </span>
                        </p>
                    `);
                }
            }
            if(date == tommorrow){ // 내일
                if(category == "TMN"){ // TMN = 일 최저기온
                    low = value;
                }
                if(category == "TMX"){ // TMX = 일 최고기온
                    high = value;
                    temp.push(`
                        <p>
                            <span class="day"> 내일 </span>
                            <span class="daydate"> (${date.substr(4,2)}/${date.substr(6,2)}) </span>
                            <span class="daylow"> ${low}&#x2103 </span>
                            <span> / </span>
                            <span class="dayhigh"> ${high}&#x2103 </span>
                        </p>
                    `);
                }
            }

            // 오늘 현재시간부터 1시간별 기온 - rowscroll(card&icon)
            if(date==today && time>=hour){ // 현재 시간부터
                if(category == "PCP"){ // PCP = 1시간 강수량
                    if(value == "강수없음"){ value = 0; }
                    pcp = value;
                }
                if(category == "POP"){ // POP = 1시간 강수확률
                    pop = value;
                }
                if(category == "TMP"){ // TMP = 1시간 기온
                    tmp = value;

                    let src = weatherIcon(tmp, pcp, pop, time); // 아이콘 가져오기
                    card_weather.push(`
                        <div class="card" style="width:6rem; height:8rem;">
                            <img src=${src} class="card-img-top" id="weatherIcon" alt="...">
                            <p class="card-text"> ${time}시 ${value}&#x2103 </p>
                        </div>
                    `);
                }
            }

        });
        $('#CurrentTemperature').html(`<ul class="list-group"> ${temp.join('')} </ul>`); // 오늘/내일 최저/최고 기온
        $('#CurrentRowScroll').html(`${card_weather.join('')}`); // 날씨 카드 - 오늘 현시간부터 시간별 기온

        console.log("날씨 불러오기 완료");
    });
}

// 검색한 위치 날씨
function getSearchWeather(lng,lat){
    console.log("날씨 호출 좌표", lng, lat);

    // 어제 날짜로 날씨 데이터 가져오기
    fetch(
        `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${EncodingKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${yesterday}&base_time=0500&nx=${lat}&ny=${lng}`
    )
    .then(response => response.json()) // 데이터 json으로 변환
    // json - data 불러오기
    .then((json) => {
        // console.log(json.response.body.items.item);
        console.log("날씨 데이터 불러오기");
        let items = json.response.body.items.item;

        let temp = [];
        let card_weather = [];
        let low = 0; // 최저기온
        let high = 0; // 최고기온
        let tmp = 0; // 기온
        let pcp = 0; // 강수량
        let pop = 0; // 강수확률

        $.each(items, function(index, item){
            let date = item.fcstDate;
            let time = item.fcstTime.substr(0,2);
            let category = item.category;
            let value = item.fcstValue;
            // console.log(category, value);

            // 오늘/내일 최저/최고 기온
            if(date == today){ // 오늘
                if(category == "TMN"){ // TMN = 일 최저기온
                    low = value;
                }
                if(category == "TMX"){ // TMX = 일 최고기온
                    high = value;
                    temp.push(`
                        <p>
                            <span class="day"> 오늘 </span>
                            <span class="daydate"> (${date.substr(4,2)}/${date.substr(6,2)}) </span>
                            <span class="daylow"> ${low}&#x2103 </span>
                            <span> / </span>
                            <span class="dayhigh"> ${high}&#x2103 </span>
                        </p>
                    `);
                }
            }
            if(date == tommorrow){ // 내일
                if(category == "TMN"){ // TMN = 일 최저기온
                    low = value;
                }
                if(category == "TMX"){ // TMX = 일 최고기온
                    high = value;
                    temp.push(`
                        <p>
                            <span class="day"> 내일 </span>
                            <span class="daydate"> (${date.substr(4,2)}/${date.substr(6,2)}) </span>
                            <span class="daylow"> ${low}&#x2103 </span>
                            <span> / </span>
                            <span class="dayhigh"> ${high}&#x2103 </span>
                        </p>
                    `);
                }
            }

            // 오늘 현재시간부터 1시간별 기온 - rowscroll (card&icon)
            if(date==today && time>=hour){
                if(category == "PCP"){ // PCP = 1시간 강수량
                    if(value == "강수없음"){ value = 0; }
                    pcp = value;
                }
                if(category == "POP"){ // POP = 1시간 강수확률
                    pop = value;
                }
                if(category == "TMP"){ // TMP = 1시간 기온
                    tmp = value;

                    let src = weatherIcon(tmp, pcp, pop, time); // 아이콘 가져오기
                    card_weather.push(`
                        <div class="card" style="width:6rem; height:8rem;">
                            <img src=${src} class="card-img-top" id="weatherIcon" alt="...">
                            <p class="card-text"> 
                                <span style="padding-right:0.3rem"> ${time}시 </span>
                                <span> ${value}&#x2103 </span>
                            </p>
                        </div>
                    `);
                }
            }

        });
        $('#SearchTemperature').html(`${temp.join('')}`); // 오늘/내일 최저/최고 기온
        $('#SearchRowScroll').html(`${card_weather.join('')}`); // 날씨 카드 - 오늘 현시간부터 시간별 기온

        console.log("날씨 불러오기 완료");
    });
}

// 시간과 날씨에 따라 아이콘 설정
function weatherIcon(tmp, pcp, pop, time){
    let src = "";

    if(time >= 8 && time <= 17){ // 낮
        if(pop == 0 || pop <= 10){
            // 맑음
            src = "https://img.icons8.com/emoji/48/sun-emoji.png";
        }
        if(pop > 10 || pop <= 20){
            // 구름 조금
            src = "https://img.icons8.com/emoji/48/sun-behind-small-cloud.png";
        }
        if(pop > 20 || pop <= 30){
            // 구름 많이
            src = "https://img.icons8.com/emoji/48/sun-behind-cloud.png";
        }
        if(pop >= 40 || pcp >= 3 ){
            // 비
            src = "https://img.icons8.com/emoji/48/cloud-with-rain-emoji.png";
        }
        if((pop >= 40 || pcp >= 1) && tmp <= 2){
            // 눈
            src = "https://img.icons8.com/emoji/48/cloud-with-snow-emoji.png";
        }
    }
    else { // 밤
        if(pop == 0 || pop <= 10){
            // 초승달
            src = "https://img.icons8.com/emoji/48/crescent-moon-emoji.png";
        }
        if(pop > 10 || pop <= 30){
            // 흐림
            src = "https://img.icons8.com/emoji/48/cloud-emoji.png";
        }
        if(pop >= 40 || pcp >= 3 ){
            // 비
            src = "https://img.icons8.com/emoji/48/cloud-with-rain-emoji.png";
        }
        if((pop >= 40 || pcp >= 1) && tmp <= 2){
            // 눈
            src = "https://img.icons8.com/emoji/48/cloud-with-snow-emoji.png";
        }
    }
    
    return src;
}

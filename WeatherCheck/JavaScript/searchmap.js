// 키워드 검색 처리 - 검색 오류처리 &거리가 먼 주소 제외 & 지도 범위 재설정 & 검색어 출력

// 장소 검색을 요청
function searchPlaces() {
    let keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출 - 검색어 출력&거리가 먼 결과 제외
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        console.log(data);

        // 검색어 출력
        placeName();

        // 거리가 먼 결과 제외 -> 지도 범위 재설정 & 날씨 요청
        exceptFar(data);

        // 검색결과로 지도 위치 변경
        // displayMap(data);

        // 해당 좌표로 날씨정보 요청
        // getSearchWeather(lng,lat);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

// 거리가 먼 주소를 제외하기 -> 지도 범위 재설정 & 날씨 요청
function exceptFar(data){
    // console.log(data);
    let sumx = 0;
    let sumy = 0;
    let place = [];
    let meanx = 0;
    let meany = 0;

    // 좌표 평균 구하기
    for ( let i=0; i<data.length; i++ ) {
        sumx += parseFloat(data[i].x);
        sumy += parseFloat(data[i].y);
    }
    meanx = sumx/data.length;
    meany = sumy/data.length;
    // console.log("1 평균 좌표", meanx, meany);

    // 평균좌표 에서 0.1이상 벗어나는 목록 제외
    for ( let i=0; i<data.length; i++ ) {
        if((Math.abs(meanx-data[i].x)>=0.1)&&(Math.abs(meanx-data[i].y)>=0.1)){
        }else{
            place.push(data[i]);
        }
    }
    //모두가 평균을 벗어나면 첫번째 장소만 추가
    if(place.length == 0){
        place.push(data[0]);
    }
    // console.log(place);

    // 변수 초기화
    sumx = 0;
    sumy = 0;

    // 거리가 먼 장소가 제외된 장소 리스트에서 좌표 평균 구하기
    for ( let i=0; i<place.length; i++ ) {
        sumx += parseFloat(place[i].x);
        sumy += parseFloat(place[i].y);
    }
    meanx = parseInt(sumx/place.length);
    meany = parseInt(sumy/place.length);
    // console.log("2 평균 좌표 : ", meanx, meany);

    // 지도 범위 재설정
    displayMap(place);
    // 평균좌표로 날씨 요청
    getSearchWeather(meanx,meany);
}

// 검색 결과 목록을 범위로 지도 범위 재설정
function displayMap(places) {
    let bounds = new kakao.maps.LatLngBounds();

    for ( let i=0; i<places.length; i++ ) {
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
    map.setLevel(3);
}

// 검색어 출력
function placeName(){
    // 검색어
    let keyword = document.getElementById('keyword').value;

    // 검색 위치 날씨 박스에 제목으로 출력
    const searchName = document.querySelector('#searchName');
    searchName.innerHTML = keyword;
}
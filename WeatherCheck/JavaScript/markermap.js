// 지도 중심 마커 생성

// 마커 저장 리스트 - 지도 이동시 마커 초기화
let markers = [];

// 지도 중심에 마커 생성
function setMarker(coords){
    // console.log(coords);
    const lat = coords.getLat(); // 위도
    const lng = coords.getLng(); // 경도
    console.log("지도 이동, 현재 중심 좌표", lng, lat);

    for(let marker of markers){
        marker.setMap(null);
    }
    markers = []; // 마커 초기화

    let center = new kakao.maps.LatLng(lat, lng);
    let marker = new kakao.maps.Marker({ // 마커 생성
        map: map,
        position: center
    });
    markers.push(marker);
}
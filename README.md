# ☃️ 날씨 비교 웹
- Open API를 활용한 날씨를 확인하고 비교할 수 있는 웹사이트
- 평소 외출하기 전, 현재 위치와 외출할 장소의 날씨를 검색하여 비교하고 외출하는 습관이 있다. 바쁜 아침에 여러 번 검색해야 하고 비교가 어렵다는 점이 아쉬워 직접 '여러 지역의 날씨를 비교할 수 있는 웹사이트'를 제작하고자 함.

<br />

## 개발 기간
> 2023.11.16 - 2023.12.20
<br />

## 개발 환경
- JavaScript
- HTML
- CSS
- Library
  - jQuery
  - Bootstrap
- Open API
  - Kakao Maps API
  - 기상청 날씨 API

<br />

## 구현 기능 및 기여도
> 개인 프로젝트 100%
- 현재 위치
  - 웹 실행 시, 검색 없이 바로 확인
  - 현재 위치 중심 지도
  - 현재 위치 날씨
- 검색 위치
  - 원하는 장소 검색 시, 확인
  - 검색 위치 중심 지도
  - 검색 위치 날씨
- 날씨
  - 오늘&현재시각부터 1시간 별 기온&아이콘 확인
  - 오늘/내일의 최저/최고기온 확인
- 지도
  - 현재 위치 가져오기
  - 장소 검색 시, 관련 위치 리스트 15개 반환 -> 거리가 먼 결과 제외 -> 지도 범위 재설정
  - 지도 중심 마커 새성
  - 지도 중심 좌표 주소 출력
- 날짜/시각
  - 어제/오늘/내일 날짜 구하기
  - 현재 시각 구하기
  - 2024년1월1일 -> 20240101 으로 형식 변경
- UI 제작
  - 현재 위치 날씨와 검색한 위치 날씨를 비교할 수 있도록 출력 박스 구분
  - 시간별 날씨를 빠르게 확인할 수 있도록 가로스크롤 생성
  - 날씨를 시각적으로 쉽게 이해할 수 있도록 날씨마다 변경되는 아이콘 추가
  - 최저/최고기온을 한 눈에 확인할 수 있도록 글씨색 구분

<br />

## 결과
<img width="1280" alt="검색위치5" src="https://github.com/na-kyoung/WeatherCheck_JS/assets/137421820/60dff79f-3458-455c-bf61-2f42a6cc66a6">

<br />

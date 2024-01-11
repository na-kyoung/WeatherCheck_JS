// 가로 스크롤

// 날씨 가로 스크롤
function row_scoll(){
    $('.rowScroll').on('mousewheel', function(e){
        let wheelDelta = e.originalEvent.wheelDelta;
        if(wheelDelta>0){
            $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
        } else{
            $(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
        }
    });
}
// row_scoll();
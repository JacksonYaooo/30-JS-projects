const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI()
// 更新座位数及总票价
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    // ES6展开运算符
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    const ticketPrice2 = localStorage.getItem('selectedMoviePrice');
    total.innerText = selectedSeatsCount * ticketPrice2;
}

// 保存电影索引值与票价
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

// 获取本地数据并渲染样式
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// 电影下拉框事件监听
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});

// 座位点击事件
container.addEventListener("click",e => {
    if(
        e.target.classList.contains("seat") && 
        !e.target.classList.contains("occupied")
    ){
        e.target.classList.toggle("selected");
        // 有selected类名就添加，没有就移除，来实现点击座位可选和已选的切换

        updateSelectedCount();
    }
});

// 设置初始座位和总票价
updateSelectedCount();
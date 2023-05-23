const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI()

let ticketPrice = +movieSelect.value;

console.log(ticketPrice);
// value值是string类型，+使其变成可用于计算的num类型

// 更新座位数及总票价
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // ES6展开运算符 (?) ————
    // [...selectedSeats]是使用展开运算符将selectedSeats数组中的元素复制到一个新数组中。
    // 这样做是为了确保对原始数组的操作不会影响到原始数据
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // indexOf()方法返回值在字符串中第一次出现的位置，map遍历数组
    // 将selectedSeats在数组seats中出现的索引值存进seatsIndex

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    // JSON.stringify()将一个JavaScript对象或值转换为 JSON 字符串,localStorage.setItem(key,value)：将value存储到key字段

    const selectedSeatsCount = selectedSeats.length;  // 选中的座位数
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// 保存电影索引值与票价
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

// 获取本地数据并渲染样式
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // JSON.parse() 方法将数据转换为 JavaScript 对象，相对于JSON.stringify()
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
                // 添加新的类名，如已经存在，取消添加。这里添加类名以获取相应的样式
            }
        })  // 渲染样式
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// 电影下拉框事件监听
movieSelect.addEventListener('change', e => {
    // addEventListener(‘a’,b)如果发生事件a，就执行b函数
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
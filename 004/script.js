// 获取节点
const currencyEl_one = document.getElementById('currency-one');// JS变量命名不能用-只能用_ 
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');

// 通过fetch获取汇率并实现dom更新
function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    // 调用API
    fetch(`https://api.exchangerate.host/convert?from=${currency_one}&to=${currency_two}`)
        // then即无需调用，直接将上一步函数所获取的内容作为实参传进then里
        .then(res => res.json())
         // 将结果转换为json格式返回，否则无法读取
        .then(data => {
            const rate = data.result;
            rateEl.innerText = `1${currency_one} = ${rate}${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
            // toFixed()将数字转换为字符串，四舍五入到指定的小数位数
        });
}

// 事件监听
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener('click',() => {
    const temp = currencyEl_one.value; // 用一个变量作为暂存容器来实现另外两个变量内容的交换
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();
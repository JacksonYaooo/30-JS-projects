// 获取节点
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const container = document.getElementById('container');

let data = [];  // 声明

getRandomUser();
// 获取随机用户和财富值
getRandomUser();
getRandomUser();

// Fetch random user and money

async function getRandomUser() {
    // async 异步，与await一起使用，详细看  promise视频教程！！！
    const res = await fetch('https://randomuser.me/api');
    // https 和 http 是不同的
    const data = await res.json();
    // 获取到API返回的可用的json格式数据

    const user = data.results[0];
    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
        // 生成10万到100万的数额（包括10万不包括100万）
    }
    addData(newUser);
}

// 添加随机生成对象到data数组
function addData(obj) {
    data.push(obj);
    // 相当于把newUser添加进data
    updateDOM();
}

// doubleMoney
function doubleMoney(){
    data = data.map(users => {
        return{...users, money:users.money * 2}
    });
    // map是深拷贝，不影响原数组
    updateDOM();
}

// sortByRichest 冒泡排序
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);
    // 从大到小排，比较相邻的元素。如果b比a大（b-a>0），就交换他们两个。
    // 从小到大应写为：((a,b) => a.money - b.money)

    updateDOM();
}

// showMillionaires
function showMillionaires(){
    data = data.filter(users => users.money > 1000000);
    // filter 过滤
    updateDOM();
}

// calculateWealth
function calculateWealth(){
    const wealth = data.reduce((acc,users) => (acc += users.money), 0);
    // reduce 累加器 ，0是默认值
    
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>TotalWealth:<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
    // js创建div并规定其继承于类名为main的div
}


// updateDOM
function updateDOM(providedData = data) {  
    // data作为初始值传给providedData，给定形参+初始值是比较完整的函数格式，这样既方便调用时传其他实参，又避免了调用时没有传参而失败

    // 清除 main div，重新写入新的数组
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'; // 覆盖
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        // 为element div添加类名
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        // 写入
        main.appendChild(element);
    })
}

// 转换为货币格式
function formatMoney(number){
    return "$ " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    // 货币的正则表达式（需要时上网查很方便，但是自己还是要理解）
}

// 事件监听
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);
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
    // 相当于把obj添加进data
    updataDOM();
}

// doubleMoney
function doubleMoney(){
    data = data.map(user => {
        return{...user, money:user.money * 2}
    });
    // map是深拷贝，不影响原数组
    updataDOM();
}

// sortByRichest 冒泡排序
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);

    updataDOM();
}

// showMillionaires
function showMillionaires(){
    data = data.filter(user => user.money > 1000000);
    updataDOM();
}

// calculateWealth
function calculateWealth(){
    const wealth = data.reduce((acc,user) => (acc += user.money), 0);
    
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>TotalWealth:<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}


// updateDOM
function updataDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

// 转换为货币格式
function formatMoney(number){
    return "$ " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// 事件监听
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);
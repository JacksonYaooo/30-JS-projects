// get element（获取dom节点）  获取类名为变量名,这里的变量都指的是input标签
const form = document.getElementById('form');
const usrname = document.getElementById('usrname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message 
function showError(input, message){
    const formControl = input.parentElement;
    // 返回input的父元素-formControl，仍然是获取类名为变量名，这个变量是div标签
    formControl.className = 'form-control error';
    // 给div加类名，赋相应类名的样式
    const small = formControl.querySelector('small');
    // 获取文档中第一个 <small> 元素
    small.innerText = message;
    // 改变small的内容为定义的message
}

//show success
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
    // 邮箱的正则表达式
    const re = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(re.test(input.value.trim())){
        // trim() 函数的功能是去掉首尾空格
        showSuccess(input);
    } else {
        showError(input, "邮箱格式错误");
    }
}

//checkRequired input  检查是否输入值
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim()===""){
            showError(input,`${getKeyWords(input)}为必填项`); // ===getKeyWords(input)+"为必填项"
            // ``是ES6模板字符串的写法，在这里用${}省去了+""，两种写法
            // getKeyWords()是我自己定义的函数 ↓
        }else{
            showSuccess(input);
        }
    });
    // 遍历数组，为每一个input都执行一遍function
}

//getkeyoWrds函数
function getKeyWords(input){
    return input.placeholder.slice(3);
    // slice用法：两个参数（索引值）slice(开始位置，结束位置但不包括)，这里是从第四个字（索引为3）开始到最后
    // 获取的是input标签的placeholder属性里的除“请输入”以外的值
}

//check length
function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input,`${getKeyWords(input)}至少需要${min}个字符`);
    }else if(input.value.length > max){
        showError(input,`${getKeyWords(input)}不能超过${max}个字符`);
    }else{
        showSuccess(input);
    }
}

//check Password Match 检查密码匹配
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2,"密码不匹配");
    }
}

//event listener（事件监听）绑定事件
form.addEventListener('submit',function(e) {
    e.preventDefault();  //阻止默认操作的函数（记得给function加上e），使提交表单后页面不刷新
    // if(usrname.value === "") {
    //     showError(usrname,"用户名为必填项")
            // 给函数传参（input，message）
    // }else{
    //     showSuccess(usrname);
    // }
    // if(email.value === "") {
    //     showError(email,"邮箱为必填项")
    // }else if(!isValidEmail(email.value)) {
    //     showError(email,"邮箱格式错误")
    // }else{
    //     showSuccess(email);
    // }
    // if(password.value === "") {
    //     showError(password,"密码为必填项")
    // }else{
    //     showSuccess(password);
    // }
    // if(password2.value === "") {
    //     showError(password2,"确认密码为必填项")
    // }else{
    //     showSuccess(password2);
    // }
    // 麻烦方法 ↑  优化方法 ↓
    checkRequired([usrname,email,password,password2]);

    checkLength(usrname, 3, 15);
    checkLength(password, 6, 12);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
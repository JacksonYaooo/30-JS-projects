const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

toggle.addEventListener('click', () => document.body.classList.toggle("show-nav"));
// 点击添加类名，再次点击移除类名

open.addEventListener('click',() => modal.classList.add("show-modal"));

close.addEventListener('click',() => modal.classList.remove("show-modal"));
// 移除类名

window.addEventListener('click', e => 
    e.target == modal ? modal.classList.remove("show-modal") : false);
    // 三元表达式：相当于if else，  格式为：条件句 ？ 成立执行语句 ：不成立执行语句 
// 获取节点
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// 点击播放或者暂停
function toggleVideoStatus(){
    if (video.paused){
        video.play();
    }else{
        video.pause();
    }
}

// 点击video时图标的更新
function updatePlayIcon(){
    if (video.paused){
        play.innerHTML  = '<i class="fa fa-play fa-2x"></i>';
    }else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// 点击video时更新进度条和时间戳
function updateProgress(){
    // console.log(vedio.currentTime);// 视频播放时长
    // console.log(video.duration);// 视频总时长
    progress.value = video.currentTime / video.duration * 100; // 进度条，*100是因为规定进度条的value值为0-100

    // 获取分钟数
    let mins = Math.floor(video.currentTime / 60)// 向下取整
    if(mins < 10){
        mins = "0" + String(mins);
    }
    // 获取秒数
    let secs = Math.floor(video.currentTime % 60)// 向下取整
    if(secs < 10){
        secs = "0" + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;// 时间戳
}

// 重置并停止视频
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

// 拖放进度条时改变播放内容和时间戳
function setVideoProgress(){
    video.currentTime = +progress.value * video.duration / 100;
}

// 添加事件监听
video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);

play.addEventListener('click',toggleVideoStatus);
stop.addEventListener('click',stopVideo);
progress.addEventListener('change',setVideoProgress);
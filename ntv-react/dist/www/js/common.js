// 游戏数据
var game_result = false;  // 游戏是否结束，是否通关
var selectOrderIndex = 1; // 游戏手指的下表
var orders = [];          // 命令栈的长度
var loops = [];           // 循环栈的长度
var loopItems = []        // 循环中的死循环
var mingLingIndex = 1;    // 默认是1，1-order框 2-loop框 这里不用boolean值，防止以后增加业务
var speed = 50;           // 每步移动的px
var playerRota = "right"; // 人物默认面对的方向
var playerFlag;           // 人物 stop 时的方向

var playerImg = document.querySelector("#playerImg")
var i = 0;                // 人物图片切换的 初始
var clc = null;           // 人物行走定时

var map1info = {
  gameMap:[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 9, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  coorX:6,   // 地图 1 X 的信息
  coorY:1    // 地图 1 Y 的信息
}
var cx = map1info.coorX;  // 原始坐标 cx 由地图json 传递
var cy = map1info.coorY;  // 原始坐标 cy 由地图json 传递
var coordinate = {cx, cy};// 使用DOM地图，假设人物原始坐标(cx, cy);

var over_focus = "next";  // 游戏结束，默认选中的是 next

var overSelect = document.querySelector('#over_select');
var ordersLi = document.querySelectorAll('#orders li');
var loopLi = document.querySelectorAll('#xun_orders li');
var btnFocus = document.querySelector("#btn_select");
var ordersFocus = document.querySelector("#order_select");
var playFocus = document.querySelector("#playFocus");
var footFocus = document.querySelector("#footFocus");
var preview_walk = document.querySelector("#order_view_walk");
var preview_left = document.querySelector("#order_view_left");
var preview_right = document.querySelector("#order_view_right");


// DOM 操作
function gameOver() {
  // 游戏结束，选项框默认下标，这里不用 booelan ,防止以后有坑
  if (game_result === false) {
    console.log('该关卡还没结束');
  } else {
    console.log('该关卡已经通关,显示蒙版');
    playerRota = "right";
    btnFocus.style.visibility = "hidden";
    ordersFocus.style.display = "none";
    footFocus.style.display = "none";
    playFocus.style.display = "none";
    preview_walk.style.display = "none";
    preview_left.style.display = "none";
    preview_right.style.display = "none";
    document.querySelector('#canvas').style.display = "none";
    document.querySelector('#mask').style.display = 'block';
    window.overFocus();
  }
}

function overFocus(over_index){
  console.log('即将进行选择')
  //  overSelect 默认选中继续下一关
  var over_index = 1;  
　$(document).keydown(function(event){
  // 这里用 三目 运算符 失效
  switch(event.keyCode){
    case 13:
      switch(over_index){
        case 1:
          console.log('选中的是继续下一关',game_result)
          setTimeout(() => {
            window.location.reload() 
          }, 1000)
          break;
        case 2: 
          console.log('选中的是重新开始')
          setTimeout(() => {
            window.location.reload() 
          }, 1000)
          break;
        case 3:
          // 如果 gameOver 时增加了第三个选项，那么就这里加
          break;
        default:
          break;
      }
      break;
    case 37:
      // 以下 做法不用 双目、三目，是担心以后还会增加新的按钮
      if(over_index == 1){
        over_index = 2;
      } else {
        over_index--;
      }
      window.overSelectFocus(over_index);
      break;
    case 38:
      if(over_index == 2){
        over_index = 1;
      } else {
        over_index++;
      }
      window.overSelectFocus(over_index);
      break;
    case 39:
      if(over_index == 2){
        over_index = 1;
      } else {
        over_index++;
      }
      window.overSelectFocus(over_index);
      break;
    case 40:
      if(over_index == 1){
        over_index = 2;
      } else {
        over_index--;
      }
      window.overSelectFocus(over_index);
      break;
    }  
　});
}

// 
function overSelectFocus(over_index){
  switch(over_index){
    case 1:
      overSelect.style.left = "34%";
      overSelect.style.top = "60.8%";
      break;
    case 2:
      overSelect.style.left = "51%";
      overSelect.style.top = "60.8%";
      break;
    case 3:
      // 冗余
      break;
    default:
      break;
  }
}

// 游戏开始时的 手指 移动
function startDom() {
  // 1-order 2-xunhuan 3-play 4-reset 5-toback
  // 没有 6
  // 7-walk 8-left 9-right 10-cancel
  // 11-loop  循环
  console.log('初始化 DOM 操作');
  console.time;
  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 13:
        switch (selectOrderIndex) {
          case 1:
            // console.log('选中:命令栈');
            // mingLingIndex = 1;

            break;
          case 2:
            // console.log('选中:循环框');
            // mingLingIndex = 2;

            break;
          case 3:
            // console.log('选中:运行命令');
            window.play()

            break;
          case 4:
            // console.log('选中:重置');
            window.location.reload() 
            break;
          case 5:
            // console.log('选中:回到上个界面');
            window.history.go(-1)
            break;
          case 7:
            // console.log(mingLingIndex);
            switch (mingLingIndex) {
              case 1:
                window.addOrder('walk');
                break;
              case 2:
                window.addLoop('walk');
                break;
              default:
                // 谁知道以后会改变成什么样子，绝对不能写boolean，不能写死
                break;
            }
            break;
          case 8:
            switch (mingLingIndex) {
              case 1:
                window.addOrder('left');
                break;
              case 2:
                window.addLoop('left');
                break;
              default:
                break;
            }

            break;
          case 9:
            switch (mingLingIndex) {
              case 1:
                window.addOrder('right');
                break;
              case 2:
                window.addLoop('right');
                break;
              default:
                break;
            }

            break;
          case 10:
            switch (mingLingIndex) {
              case 1:
                window.addOrder('loop');
                break;
              case 2:
                window.addLoop('loop');
                break;
              default:
                break;
            }

            break;
          case 11:
            switch (mingLingIndex) {
              case 1:
                window.addOrder('cancel');
                break;
              case 2:
                window.addLoop('cancel');
                break;
              default:
                break;
            }

            break;
          default:
            break;
        }
        break;
      case 37:
        if (selectOrderIndex <= 7 && selectOrderIndex > 5) {
          selectOrderIndex = 11;
        } else if (selectOrderIndex <= 5) {
          selectOrderIndex = 7;
        } else {
          selectOrderIndex--;
        }
        window.startSelect(selectOrderIndex);
        break;
      case 38:
        if (selectOrderIndex <= 1) {
          selectOrderIndex = 5;
        } else if (selectOrderIndex >= 7) {
          selectOrderIndex = 1;
        } else {
          selectOrderIndex--;
        }
        window.startSelect(selectOrderIndex);
        break;
      case 39:
        if (selectOrderIndex == 11) {
          selectOrderIndex = 7;
        } else if (selectOrderIndex < 7) {
          selectOrderIndex = 7;
        } else {
          selectOrderIndex++;
        }
        window.startSelect(selectOrderIndex);
        break;
      case 40:
        if (selectOrderIndex >= 5 && selectOrderIndex < 7) {
          selectOrderIndex = 1;
        } else if (selectOrderIndex >= 7) {
          selectOrderIndex = 2;
        } else {
          selectOrderIndex++;
        }
        window.startSelect(selectOrderIndex);
        break;
      default:
        break;
    }
  });
}

// 手指按下的命令
function startSelect(selectOrderIndex) {
  var startGo;
  switch (selectOrderIndex) {
    case 1:
      // console.log('目前选中的是:命令栈');
      mingLingIndex = 1;
      ordersFocus.style.visibility = "visible";
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      
      ordersFocus.style.left = "952px"; ordersFocus.style.top = "-14px";

      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";
      break;
    case 2:
      // console.log('目前选中的是:循环框');
      mingLingIndex = 2;
      ordersFocus.style.visibility = "visible";
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      ordersFocus.style.left = "952px"; ordersFocus.style.top = "293px";

      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    case 3:
      // console.log('目前选中的是:运行指令');
      ordersFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      playFocus.style.visibility = "visible";

      break;
    case 4:
      // console.log('目前选中的是:重玩指令');
      playFocus.style.visibility = "hidden";
      ordersFocus.style.visibility = "hidden";
      footFocus.style.visibility = "visible";
      footFocus.style.left = "1040px";
      

      break;
    case 5:
      // console.log('目前选中的是:回到上个页面');
      playFocus.style.visibility = "hidden";
      ordersFocus.style.visibility = "hidden";
      footFocus.style.visibility = "visible";
      footFocus.style.left = "1132px";

      break;
    case 7:
      // console.log('目前选中的是:指令-前进');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "937px";
      btnFocus.style.top = "228px";
      preview_walk.style.visibility = "visible";
      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";

      break;
    case 8:
      // console.log('目前选中的是:指令-左转');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "997px";
      btnFocus.style.top = "228px";
      preview_left.style.visibility = "visible";
      preview_walk.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";

      break;
    case 9:
      // console.log('目前选中的是:指令-右转');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "1057px";
      btnFocus.style.top = "228px";
      preview_right.style.visibility = "visible";
      preview_left.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    case 10:
      // console.log('目前选中的是:指令-循环');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "1117px";
      btnFocus.style.top = "228px";
      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    case 11:
      // console.log('目前选中的是:指令-取消指令');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "1173px";
      btnFocus.style.top = "228px";
      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    default:
      break;
  }
}



function addOrder(item) {
  if (item != 'cancel') {
    if (orders.length < 8) {
      orders.push(item);
    } else {
      console.log('栈满了');
    }
  } else {
    if (orders.length <= 0) {
      console.log('栈已经清空了，不能再删了');
    } else {
      orders.pop();
      window.updateOrder();
    }
  }
  // console.log(orders);
  // 更新渲染
  window.updateOrder();
}

function updateOrder() {
  for (var i = 0; i <= orders.length; i++) {
    switch (orders[i]) {
      case 'walk':
        ordersLi[i].className = 'order_walk';

        break;
      case 'left':
        ordersLi[i].className = 'order_left';

        break;
      case 'right':
        ordersLi[i].className = 'order_right';

        break;
      case 'loop':
        ordersLi[i].className = 'order_loop';

        break;
      default:
        if (ordersLi[i]) {
          ordersLi[i].className = '';
        } else {
          //
        }
        break;
    }
  }
}

function addLoop(item) {
  if (item != 'cancel') {
    if (loops.length < 8) {
      loops.push(item);
    } else {
      console.log('栈满了');
    }
  } else {
    if (loops.length <= 0) {
      console.log('栈已经清空了，不能再删了');
    } else {
      loops.pop();
      window.updateLoop();
    }
  }
  // console.log(loops);
  // 更新渲染
  window.updateLoop();
}

function updateLoop() {
  for (var i = 0; i <= loops.length; i++) {
    switch (loops[i]) {
      case 'walk':
        loopLi[i].className = 'loop_walk';

        break;
      case 'left':
        loopLi[i].className = 'loop_left';

        break;
      case 'right':
        loopLi[i].className = 'loop_right';

        break;
      case 'loop':
        loopLi[i].className = 'loop_loop';

        break;
      default:
        if (loopLi[i]) {
          loopLi[i].className = '';
        } else {
          //
        }
        break;
    }
  }
}

function showPreview(selectOrderIndex) {
  console.log(selectOrderIndex);
  switch (selectOrderIndex) {
    case 7:
      break;
    case 8:
      break;
    case 9:
      break;
    default:
      break;
  }
} 

function showSelect(selectOrderIndex) {
  // console.log('点击了外部指令')
  

}

function runLoop(loops){
  console.log("查看栈中的情况",loops);
  for(var i = 0; i < loops.length; i++){
    switch(loops[i]){
      case "walk":
        window.runWalk()
        break;
      case "left":
        window.runLeft()
        break;
      case "right":
        window.runRight()
        break;
      case "loop":
        window.runLoop()
        break;
      default:
        break;
    }
  }
}

function walk(ele, target){
  // target = parseInt(ip.style.left) + speed;
  // animate(ip, target)
  console.log("人物的方向", playerRota)

}

function animate(ele, target){
  clearInterval(ele.timer)
  var aniamteSpeed = 1;
  ele.timer = setInterval(function () {
    var val = target - parseInt(ele.style.left)
    ele.style.left = parseInt(ele.style.left) + speed + "px";
    if(val == 0){
      ele.style.left = targer + "px";
      clearInterval(ele.timer);
    }
  },10)
}

function play(){
  console.log("即将执行命令框里的指令：",orders)
  for(var i = 0; i < orders.length; i++) {
    (function(i) {
      setTimeout(function() {
        switch(orders[i]){
          case "walk":
            window.runWalk(playerRota)
            break;
          case "left":
            window.runLeft()
            break;
          case "right":
            window.runRight()
            break;
          default:
            break;
        }
        // window.walk()
        console.log("第"+(i+1)+"个命令后 人物的方向:",playerRota)
      }, i * 800)
    })(i);
  }
}

function runWalk(playerRota){
  console.log("向" + playerRota + '方向前进一格')
  switch(playerRota){
    case "right":
      coordinate.cx += 1;
      break;
    case "down":
      coordinate.cy += 1;
      break;
    case "left":
      coordinate.cx -= 1;
      break;
    case "up":
      coordinate.cy -= 1;
      break;
    default:
      break;
  }
  console.log("移动后人物的坐标:", coordinate)
}

function runLeft(){
  // 左转指令已修复， 函数中不要传值，每次都从 store 拿最新的
  switch(playerRota){
    case "right":
      playerRota = "up";
      break;
    case "down":
      playerRota = "right";
      break;
    case "up":
      playerRota = "left";
      break;
    case "left":
      playerRota = "down"
      break;
    default:
      break;
  }
}

function runRight(){
  // 右转指令没有问题，已确认 20190316
  switch(playerRota){
    case "right":
      playerRota = "down";
      break;
    case "down":
      playerRota = "left";
      break;
    case "up":
      playerRota = "right";
      break;
    case "left":
      playerRota = "up"
      break;
    default:
      break;
  }
}

function runLoop(){
  console.log('执行循环')

}

function runStop(){
  switch(playerFlag){
    case "left":

      break;
    case "right":

      break;
    case "up":
      playerImg.src = "./../assets/img/up-0.png"

      break;
    case "down":
      playerImg.src = "./../assets/img/down-0.png"

      break;
    default:
      break;
  }
}

function runGoUp(){
  // 向上走
  i = i % 4;
  var name = "img/up-" + i + "." + "png";
  playerImg.src = name;
  playerImg.style.top = parseInt(playerImg.style.top) - 10 + 'px';
  playerFlag = "up";

}

function runGoRight(){
  // 向右走
  i = i % 4;
  var name = "./../assets/img/right-" + i + "." + "png";
  playerImg.src = name;
  playerImg.style.left = parseInt(playerImg.style.left) + 10 +'px';
  playerFlag = "right";

}

function runGoDown(){
  // 向下走
  i = i % 4;
  var name = "./../assets/img/down-" + i + "." + "png";
  playerImg.src = name;
  playerImg.style.top = parseInt(playerImg.style.top) + 10 + 'px';
  playerFlag = "down";

}

function runGoLeft(){
  // 向左走
  i = i % 4;
  var name = "./../assets/img/left-" + i + "." + "png";
  playerImg.src = name;
  playerImg.style.left = parseInt(playerImg.style.left) - 10 + 'px';
  playerFlag = "left";

}


/**
 * 动作缩略图
 */



/**
 * 选项框
 */


 
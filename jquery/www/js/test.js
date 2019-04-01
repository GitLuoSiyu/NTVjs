/* 特别注意, common.js 必须在</body>之前，且在store.js之后 */
/* ******************************************************************* */
/* 本文件目录
/* 
/* 
/* 
/* 
/* 
/* ******************************************************************* */



// 属性数据
var game_result = false;                     // 游戏是否结束，是否通关
var selectOrderIndex = 1;                    // 游戏手指的下表
var selectBtnIndex;                          // btn选项卡
var selectOverIndex;                         // 下面
var orders = [];                             // 命令栈的长度
var loops = [];                              // 循环栈的长度
var loopItems = []                           // 循环中的死循环
var mingLingIndex = 1;                       // 默认是1，1-order框 2-loop框 这里不用boolean值，防止以后增加业务
var speed = 50;                              // 每步移动的rem,暂时没使用，因为rem坐标不稳定
var playerRota = "right";                    // 人物默认面对的方向
var playerFlag;                              // 人物 stop 时的方向
var nextCoorKey;                             // 下个运动坐标的下标值 0-空白区 1-运行路块 2-宝箱 3-香蕉 4-boss
var cx = mapinfo.coorX;                      // 原始坐标 cx 由地图json 传递
var cy = mapinfo.coorY;                      // 原始坐标 cy 由地图json 传递
var coordinate = {cx, cy};                   // 使用DOM地图，假设人物原始坐标(cx, cy);
var over_focus = "next";                     // 游戏结束，默认选中的是 next
var i = 0;                                   // 人物图片切换的 初始
var clc = null;                              // 人物行走定时
var orderThrottle = 0;                       // 命令栈的节流阀
var playThrottle = false;                    // 运行按钮的节流阀
var btnPlayThrottle = true;                  // 运行 按钮的 状态 true 为橙色可运行状态，红色是 点击重置
var faileCounts = 0;                         // 本关卡 失败次数统计
var failePrompt = "";                        // 失败后的提示信息 


// DOM 属性
var overSelect = document.querySelector('#over_select');              // 游戏结束时的 底部选择框
var ordersLi = document.querySelectorAll('#orders li');               // 命令栈里的 每个子 order
var loopLi = document.querySelectorAll('#xun_orders li');             // 循环栈里的 每个子 order
var btnFocus = document.querySelector("#btn_select");                 // 前进、左转、右转、循环、取消 选择框
var ordersFocus = document.querySelector("#order_select");            // 命令栈、循环栈 切换时的选择框
var playFocus = document.querySelector("#playFocus");                 // play 按钮的框
var footFocus = document.querySelector("#footFocus");                 // 底部 重玩 和 返回上一关的选择框
var preview_walk = document.querySelector("#order_view_walk");        // 前进的略览图
var preview_left = document.querySelector("#order_view_left");        // 左转的略览图
var preview_right = document.querySelector("#order_view_right");      // 右转的略览图
var playerImg = document.querySelector("#hero");                      // 主角：猴子
    playerImg.style.top = mapinfo.playerTop;                          // 主角的初始坐标 top
    playerImg.style.left = mapinfo.playerLeft;                        // 主角的初始坐标 left
var goldBox = document.querySelector("#gold_box");                    // 宝箱
    goldBox.style.top = mapinfo.goldTop;                              // 宝箱的 top 值
    goldBox.style.left = mapinfo.goldLeft;                            // 宝箱的 left 值


/* ******************************************************************* */
// 游戏结束的判断
/* ******************************************************************* */
function gameOver() {
  // 游戏结束，选项框默认下标，这里不用 booelan ,防止以后有坑
  if (game_result === false) {
    console.log('该关卡还没结束');
  } else {
    playerRota = "right";
    btnFocus.style.visibility = "hidden";
    ordersFocus.style.display = "none";
    footFocus.style.display = "none";
    playFocus.style.display = "none";
    preview_walk.style.display = "none";
    preview_left.style.display = "none";
    preview_right.style.display = "none";
    goldBox.style.visibility = "hidden"
    playerImg.style.visibility = "hidden"
    document.querySelector('#mask').style.display = 'block';
    // 更新 store
    var getPlayerInfo = window.localStorage.getItem("playerInfo")
    window.overFocus();
  }
}
function gameThrottle(){
  // 命令执行完后的判断
  // console.log('命令执行完，是否完成任务：',game_result)
  if(!game_result){
    // console.log('没完成，点击按钮重新开始，并递增失败次数')
    if(faileCounts < 4){
      faileCounts++;
    } else {
      console.log('失败次数达到上限:',faileCounts)
      document.querySelector("#map_title").innerHTML = mapinfo.faile;
    }
    // console.log(faileCounts);
    // console.log(orders)
    playerImg.style.top = mapinfo.playerTop;
    playerImg.style.left = mapinfo.playerLeft;
    playerRota = "right";  
    playerImg.src = "./../assets/img/hero-right.png"
    cx = mapinfo.coorX; 
    cy = mapinfo.coorY;
    coordinate = {cx, cy}; 
    document.querySelector("#play img").src = "./../assets/img/btn-play.png"
  } else {
    // console.log('任务完成，不进行操作')
  }
}



/* ******************************************************************* */
// 添加、运行指令 
/* ******************************************************************* */
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
      console.log('循环框里的命令满了');
    }
  } else {
    if (loops.length <= 0) {
      console.log('循环框里的命令已经清空了，不能再删了');
    } else {
      loops.pop();
      window.updateLoop();
    }
  }
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

function runLoop(){
  console.log("查看循环中的情况",loops);
  for(var i = 0; i < loops.length; i++){
    (function(i) {
      setTimeout(function() {
        switch(loops[i]){
          case "walk":
            window.runWalk(playerRota)
            break;
          case "left":
            window.runLeft()
            break;
          case "right":
            window.runRight()
            break;
          case "loop":
            if(orderThrottle < 8){
              orderThrottle++;
              window.runLoop()
            } else {
              // not to do
            }
            break;
          default:
            break;
        }
      }, i * 600)
    })(i);
  }
}

function play(){
  // 执行命令，判断开关阀门
  if(btnPlayThrottle === true){
    if(playThrottle === false){
      playThrottle = true;
      document.querySelector("#play img").src = "./../assets/img/btn-play-pause.png"
      // console.log('阀门是开着的')
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
              case "loop":
                window.runLoop()
                break;
              default:
                break;
            }
            // console.log("第"+(i+1)+"个命令后 人物的方向:",playerRota)
          }, i * 600)
        })(i);
      }
      // 开关阀门
      setTimeout(function(){
        playThrottle = false;
        btnPlayThrottle = false;
        
        document.querySelector("#play img").src = "./../assets/img/btn-play-back.png"
      }, i * 600)
    } else {
      console.log('命令正在执行中，不能再次点击 play 按钮')
    }
  } else if(btnPlayThrottle === false) {
    // 红色状态
    btnPlayThrottle = true
    window.gameThrottle()
  } else {
    // 万一后期增加了状态
  }
}

/* ******************************************************************* */
// 读地图、坐标判断 
/* ******************************************************************* */
function runRotation(){
  switch(playerRota){
    case "right":
      coordinate.cy += 1;
      break;
    case "down":
      coordinate.cx += 1;
      break;
    case "left":
      coordinate.cy -= 1;
      break;
    case "up":
      coordinate.cx -= 1;
      break;
    default:
      break;
  }
}
function runCoorPlayer(){
  // console.log('目前的人物方向是：',playerRota)
  switch(playerRota){
    case "left":
      window.runGoLeft()
      break;
    case "right":
      window.runGoRight()
      break;
    case "up":
      window.runGoUp()
      break;
    case "down":
        window.runGoDown()
      break;
    default:
      break;
  }
}
function getCoorInfo(item){
  // 获取地图中 下个坐标是否可以走动，是否非0，非0都能走
  switch(item){
    case 0:
      // console.log('前方的坐标是0，不能走')
      break;
    case 1:
      window.runRotation()
      window.runCoorPlayer()
      break;
    case 2:
      // console.log('前面的坐标是宝箱，即将进行碰撞检测')
      window.runRotation()
      window.runCoorPlayer()      
      break;
    case 3:
      // console.log('前面的坐标是 其他物品 ，即将进行碰撞检测')
      window.runRotation()
      window.runCoorPlayer()
      break;
    default:
      break;
  }
}
function runWalk(playerRota){
  // console.log("向" + playerRota + '方向')
  switch(playerRota){
    case "right":
      if(coordinate.cx > 9){
        console.log('超出 map 边界')
      } else {
        window.getCoorInfo(mapinfo.gameMap[coordinate.cx][coordinate.cy+1])
      }
      break;
    case "down":
      if(coordinate.cy > 9){
        console.log('超出 map 边界')
      } else {
        window.getCoorInfo(mapinfo.gameMap[coordinate.cx+1][coordinate.cy])
      }
      break;
    case "left":
      if(coordinate.cx > 9){
        console.log('超出 map 边界')
      } else {
        window.getCoorInfo(mapinfo.gameMap[coordinate.cx][coordinate.cy-1])
      }
      break;
    case "up":
      if(coordinate.cy > 9){
        console.log('超出 map 边界')
      } else {
        window.getCoorInfo(mapinfo.gameMap[coordinate.cx-1][coordinate.cy])
      }
      break;
    default:
      break;
  }
  // console.log("运动后的坐标(横y竖x):\n", coordinate)
  if(coordinate.cx == mapinfo.goldX && coordinate.cy == mapinfo.goldY){
    // console.log('到达终点，游戏即将结束')
    setTimeout(() => {
      // 这里的宝箱状态 存一个精灵图 中，移动焦点
      goldBox.style.backgroundPosition = "-30px 0px"
      game_result = true
    }, 600);
    setTimeout(() => {
      window.gameOver()
    }, 1300);
  }
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
  playerImg.src = "./../assets/img/hero-" + playerRota + "." + "png";
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
      playerRota = "up";

      break;
    default:
      break;
  }
  playerImg.src = "./../assets/img/hero-" + playerRota + "." + "png";
}
function runStop(){
  switch(playerFlag){
    case "left":
      playerImg.src = "./../assets/img/hero-left.png"

      break;
    case "right":
      playerImg.src = "./../assets/img/hero-right.png"

      break;
    case "up":
      playerImg.src = "./../assets/img/hero-up.png"

      break;
    case "down":
      playerImg.src = "./../assets/img/hero-down.png"

      break;
    default:
      break;
  }
  clearInterval(clc)
}

/* ******************************************************************* */
// 运动时的 坐标移动
/* ******************************************************************* */
function runGoUp(){
  // 向上走
  // i = i % 4;
  var name = "./../assets/img/hero-up.png";
  playerImg.src = name;
  playerImg.style.top = parseFloat(playerImg.style.top) - 0.60 + 'rem';
  playerFlag = "up";
}

function runGoRight(){
  // 向右走
  // i = i % 4;
  var name = "./../assets/img/hero-right.png";
  playerImg.src = name;
  playerImg.style.left = parseFloat(playerImg.style.left) + 0.56 +'rem';
  playerFlag = "right";
}

function runGoDown(){
  // 向下走
  // i = i % 4;
  var name = "./../assets/img/hero-down.png";
  playerImg.src = name;
  playerImg.style.top = parseFloat(playerImg.style.top) + 0.60 + 'rem';
  playerFlag = "down";
}

function runGoLeft(){
  // 向左走
  // i = i % 4;
  var name = "./../assets/img/hero-left.png";
  playerImg.src = name;
  playerImg.style.left = parseFloat(playerImg.style.left) - 0.56 + 'rem';
  playerFlag = "left";
}


/* ******************************************************************* */
// 游戏结束时的选框切换，用switch的原因担心 后期会增加新按钮
/* ******************************************************************* */
function overFocus(over_index){
  // console.log('即将进行选择')
  //  overSelect 默认选中继续下一关
  var over_index = 1;  
　document.onkeydown = function(e){
  event = e || event;
  // 这里用 三目 运算符 失效
  switch(event.keyCode){
    case 13:
      switch(over_index){
        case 1:
          console.log('选中的是继续下一关',game_result)
          setTimeout(() => {
            // 如果是 20 关，跳入 success 页面，如果不是直接进入下一关
            var nowLevel = Number(window.localStorage.getItem("nowLevel"))
            if(nowLevel < 20) {
              self.location.href = "./map" + (nowLevel+1) + ".html"
            } else {
              self.location.href = "./success.html"
            }
          }, 100)
          break;
        case 2: 
          console.log('选中的是重新开始')
          setTimeout(() => {
            window.location.reload() 
          }, 300)
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
　};
}

function overSelectFocus(over_index){
  switch(over_index){
    case 1:
      overSelect.style.left = "33.9%";
      overSelect.style.top = "68.1%";
      break;
    case 2:
      overSelect.style.left = "50.9%";
      overSelect.style.top = "68.1%";
      break;
    case 3:
      // 冗余
      break;
    default:
      break;
  }
}


/* ******************************************************************* */
// 游戏右侧的 选框切换和点击效果
/* ******************************************************************* */
// 游戏开始时的 手指 移动
function startDom() {
  // 1-order 2-xunhuan 3-play 4-reset 5-toback
  // 没有 6
  // 7-walk 8-left 9-right 10-cancel
  // 11-loop  循环
  document.onkeydown = function(e){
    event = e || event;
    switch (event.keyCode) {
      case 8:
        window.history.go(-1)
        break;
      case 13:
        window.enterKeyCode(selectOrderIndex)
        break;
      case 37:
        window.caseSelectLeft(selectOrderIndex)
        // if (selectOrderIndex <= 7 && selectOrderIndex > 5) {
        //   selectOrderIndex = 11;
        // } else if (selectOrderIndex <= 5) {
        //   selectOrderIndex = 7;
        // } else {
        //   selectOrderIndex--;
        // }
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
  };
}

function enterKeyCode(selectOrderIndex){
  // 点击对应的框，执行不同的命令
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

}


// 手指按下的命令
function startSelect(selectOrderIndex) {
  switch (selectOrderIndex) {
    case 1:
      console.log('目前选中的是:命令栈');
      mingLingIndex = 1;
      ordersFocus.style.visibility = "visible";
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      
      ordersFocus.style.left = "0.15rem"; ordersFocus.style.top = "-0.14rem";

      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";
      break;
    case 2:
      console.log('目前选中的是:循环框');
      mingLingIndex = 2;
      ordersFocus.style.visibility = "visible";
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      ordersFocus.style.left = "0.17rem"; ordersFocus.style.top = "2.94rem";

      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    case 3:
      console.log('目前选中的是:运行指令');
      ordersFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      playFocus.style.visibility = "visible";

      break;
    case 4:
      console.log('目前选中的是:重玩指令');
      playFocus.style.visibility = "hidden";
      ordersFocus.style.visibility = "hidden";
      footFocus.style.visibility = "visible";
      footFocus.style.left = "2.2rem";
      

      break;
    case 5:
      console.log('目前选中的是:回到上个页面');
      playFocus.style.visibility = "hidden";
      ordersFocus.style.visibility = "hidden";
      footFocus.style.visibility = "visible";
      footFocus.style.left = "3.12rem";

      break;
    case 7:
      console.log('目前选中的是:指令-前进');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "1.25rem";
      btnFocus.style.top = "0.68rem";
      preview_walk.style.visibility = "visible";
      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";

      break;
    case 8:
      console.log('目前选中的是:指令-左转');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "1.81rem";
      btnFocus.style.top = "0.69rem";
      preview_left.style.visibility = "visible";
      preview_walk.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";

      break;
    case 9:
      console.log('目前选中的是:指令-右转');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "2.38rem";
      btnFocus.style.top = "0.69rem";
      preview_right.style.visibility = "visible";
      preview_left.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    case 10:
      console.log('目前选中的是:指令-循环');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "2.93rem";
      btnFocus.style.top = "0.69rem";
      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    case 11:
      console.log('目前选中的是:指令-取消指令');
      playFocus.style.visibility = "hidden";
      footFocus.style.visibility = "hidden";
      btnFocus.style.left = "3.48rem";
      btnFocus.style.top = "0.69rem";
      preview_left.style.visibility = "hidden";
      preview_right.style.visibility = "hidden";
      preview_walk.style.visibility = "hidden";

      break;
    default:
      break;
  }
}

// 逐一判断，对每一个 按钮都做 上下左右的判断，不分模块了！！！！
function caseSelectLeft(selectOrderIndex){
  switch(selectOrderIndex) {
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
    case 5:

      break;
    case 6:

      break;
    case 7:

      break;
    case 8:
    
      break;
    case 9:

      break;
    case 10:

      break;
    case 11:
      
      break;
    default:
      break;
  }
}
function caseSelectUp(selectOrderIndex){
  switch(selectOrderIndex) {
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
    case 5:

      break;
    case 6:

      break;
    case 7:

      break;
    case 8:
    
      break;
    case 9:

      break;
    case 10:

      break;
    case 11:
      
      break;
    default:
      break;
  }
}
function caseSelectRight(selectOrderIndex){
  switch(selectOrderIndex) {
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
    case 5:

      break;
    case 6:

      break;
    case 7:

      break;
    case 8:
    
      break;
    case 9:

      break;
    case 10:

      break;
    case 11:
      
      break;
    default:
      break;
  }
}
function caseSelectDown(selectOrderIndex){
  switch(selectOrderIndex) {
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
    case 5:

      break;
    case 6:

      break;
    case 7:

      break;
    case 8:
    
      break;
    case 9:

      break;
    case 10:

      break;
    case 11:
      
      break;
    default:
      break;
  }
}
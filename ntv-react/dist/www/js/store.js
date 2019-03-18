/**
 * 公用属性
 */

var playerInfo = {
  name: '',          // 用户名称
  playerLevel: 1,    // 用户英雄等级，无意义
  nowLevel: 1,       // 目前已通关的等级 
  maxLevel: 1,       // 可玩的最大等级
  vip: false,        // 是否是付费用户
  score: 0,          // 玩家积分
  package: [],       // 背包物品
  shopPags: [],      // 商城已开放的商品
  payContent: false, // 是否显示 付费窗口
}

// 首次加载存入 localStorage
var playerInfoJson = JSON.stringify(playerInfo)
window.localStorage.setItem("playerInfo", playerInfoJson)




/**
 * 公共方法
 */






/**
 * 地图属性 
 */
var map1info = {
  gameMap:[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],          // 注意 x 轴 和 y 轴, 竖轴 是x，横轴是y
  coorX:1,    // 地图 1 X 的信息
  coorY:1,    // 地图 1 Y 的信息
  goldX:3,
  goldY:3,
  goldTop:"190px",
  goldLeft:"166px"
}

var map2info = {
  gameMap:[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],          // 注意 x 轴 和 y 轴, 竖轴 是x，横轴是y
  coorX:1,    // 地图 1 X 的信息
  coorY:1,    // 地图 1 Y 的信息
  goldX:3,
  goldY:3,
  goldTop:"190px",
  goldLeft:"166px"
}




/**
 * 数据存储与更新
 */

function checkPay(){
  // 检查是否 付费

}

function updatePay(){
  // 更新是否付费

}

function getPlayerData(){
  // 获取用户信息

}

function updatePlayerData(){
  // 更新用户信息

}

function getLocalData(){
  // 获取 localStorage 里面信息

}

function updateLocalData(){
  // 更新 localStorage 里面信息

}



/**
 * redux 方法
 */
class redux {
  

}

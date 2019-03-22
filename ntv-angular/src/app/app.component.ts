// 引入核心模块里面的Component,
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ntv-angular';  /* 定义属性 */

  constructor(){
    // 构造函数
  }
}

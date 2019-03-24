// 这个文件是 NG 的根模块，告诉Angular如何组装应用

import { BrowserModule } from '@angular/platform-browser';
// 浏览器解析的模块

import { NgModule } from '@angular/core';
// Angular 核心模块

import { AppRoutingModule } from './app-routing.module';
// 根组件

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
// 装饰器，接收一个元数据对，告诉Angular如何编译和启动应用

@NgModule({
  declarations: [    /* 配置当前项目运行的组件 */
    AppComponent, 
    HomeComponent, 
    BlogsComponent, 
    LoginComponent, RegisterComponent, HeaderComponent
  ],
  imports: [         /* 配置当前模块运行依赖的其他模块 */
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],     /* 配置项目所需要的服务 */
  bootstrap: [AppComponent]   /* 指定应用的主视图（称为根组件） 通过引导根AppModules来启动应用，一般写根组件 */
})

// 根模块不需要导出任何东西，因为其他组件不需要导入根模块
export class AppModule { }

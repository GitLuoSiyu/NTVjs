import React, { Component } from 'react';
import './index.css'

export default class Menu extends Component {
  constructor(props){
    super(props) 

    this.state = {
      imgsBgSrc:[],
    }
  }

  componentWillMount(){
    // 请求用户数据接口

  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyDown)

  }

  handleKeyDown = ( keyEvent ) => {
    var selectIndex = 2;
    switch(keyEvent && keyEvent.which){
      case 13:
        switch(selectIndex){
          case 1:
            console.log(selectIndex)
            this.props.history.push('/game');
            break;
          case 2:
            console.log(selectIndex)
            this.props.history.push('/game');
            break;
          case 3:
            console.log(selectIndex)
            this.props.history.push('/game');
            break;
          case 4:
            console.log(selectIndex)
            this.props.history.push('/game');
            break;
          case 5:

            break;
          case 6:

            break;
          default:
            break;
        }
        break;
        case 37:
        if(selectIndex === 1){
          selectIndex = 4;
        } else {
          selectIndex = selectIndex - 1;
        }
        this.keyBoard(selectIndex);
        break;
      case 38:
        if(selectIndex === 4){
          selectIndex = 1;
        } else {
          selectIndex = selectIndex + 1;
        }
        this.keyBoard(selectIndex);
        break;
      case 39:
        if(selectIndex === 4){
          selectIndex = 1;
        } else {
          selectIndex = selectIndex + 1;
        }
        this.keyBoard(selectIndex);
        break;
      case 40:
        if(selectIndex === 1){
          selectIndex = 4;
        } else {
          selectIndex = selectIndex - 1;
        }
        this.keyBoard(selectIndex);
        break;
      default:
        break;
    }
  }

  keyBoard = (selectIndex) => {
    console.log(selectIndex)
    var go = document.querySelector(".shouzhi");
    switch(selectIndex){
      case 1:
        go.style.left = "17%";
        go.style.top = "52%";
        break;
      case 2:
        go.style.left = "48%";
        go.style.top = "52%";
        break;
      case 3:
        go.style.left = "82%";
        go.style.top = "52%";
        break;
      case 4:
        go.style.left = "90%";
        go.style.top = "85%";
        break;
      default:
        break;
    }
  }

  render() {
    const {
      imgsBgSrc
    } = this.state;
    return (
      <div className="game">
        <ul className="menu_maps">
          <li className="map1"><img src={require('./../../assets/img/map1.png')} alt=""/></li>
          <li className="map2"><img src={require('./../../assets/img/map3.png')} alt=""/></li>
          <li className="map3"><img src={require('./../../assets/img/map2.png')} alt=""/></li>
          <li className="payOff"><img src={require('./../../assets/img/payOff.png')} alt=""/></li>
        </ul>
        <div className="shouzhi"><img src={require('./../../assets/img/select.png')} alt="" /></div>
      </div>
    );
  }

  componentWillReceiveProps(){


  }

  componentDidUpdate(){


  }

  componentWillUnmount(){

    
  }

}
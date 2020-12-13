
import React from 'react'
import ReactDOM from 'react-dom'

import { DatePicker } from 'antd';

// import './index.css'

import 'antd/dist/antd.css';

/**
 * calling this.setState will call render(),children component will also be rerender
 */


class Square extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            value:null
        }

    }
    render() {
      return (
        <button className="square" onClick={()=>this.setState({value:"X"})}>
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    // returns a react element
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info bb">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  


class Parent extends React.Component{

  constructor(props){
    super(props)
    props = {};

    this.state = {
      username:"kevin",
      cntTimes:0
    };

    // あるいはエローファンクションで定義する
    this.btnClick = this.btnClick.bind(this);

  }

  componentDidMount() {
    console.log(`componentDidMount...`)
  }

  componentWillUnmount() {
    console.log(`componentWillUnmount...`)
  }
  
  btnClick(){
    var c = this.state.cntTimes;
    c++;
    this.setState({cntTimes:c})
    console.log(`btnClick...`)
  }

  render(){

    return (

      <div>hello:{this.state.username},ClickedTimes:{this.state.cntTimes}
      
        <button onClick={this.btnClick}>BtnClick</button>
      
       </div>
    );

  }
}



  ReactDOM.render(
    <Parent name='handsome' />,
    document.getElementById('root')
  );
  
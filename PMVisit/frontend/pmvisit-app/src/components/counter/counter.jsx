import React, { Component } from 'react';
import './Counter.css'



export default class Counter extends Component{

  constructor(){
    super();
    this.state = {
      counter:0
    }
    //this.increment = this.increment.bind(this);
  }

  render() {
    return (
      <div className = "Counter">
        <CounterButton by={1} incrementMethod={this.increment}/>
        <CounterButton by={5} incrementMethod={this.increment}/>
        <CounterButton by={10} incrementMethod={this.increment}/>
        <button className="reset" onClick={this.reset}
        style ={{fontSize:"10px"}}
        >{"CLEAR"}</button>
        <span className="count"
        style = {{fontSize : "50px",padding: "15px 30px"}}
        >{this.state.counter}</span>
      </div>
    );
  }
  
  reset= () =>{
    this.setState({
      counter:0
    })
  }

  increment= (by) =>{
    console.log('increment from parent');
    //this.state.counter++
    this.setState({
      counter: this.state.counter+by
    })
  }
}

class CounterButton extends Component {
    
    render(){
      return(
        <div className="CounterButton">
        <button onClick={this.increment}>+{this.props.by}</button>
        <button onClick={this.decrement}>-{this.props.by}</button>
        </div>
      );

    }
    
    increment= () =>{
      //console.log('increment');
      //this.state.counter++
      /*this.setState({
        counter: this.state.counter+this.props.by
      })*/

      this.props.incrementMethod(this.props.by);
    }

    decrement= () =>{
      this.props.incrementMethod(-1*this.props.by);
    }
    

}

CounterButton.defaultProps = {
  by : 1
}



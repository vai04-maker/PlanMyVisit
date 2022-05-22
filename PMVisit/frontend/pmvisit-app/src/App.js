import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import FirstComponent from './components/learning-examples/FirstComponent.jsx';
import SecondComponent from './components/learning-examples/SecondComponent.jsx';
import ThirdComponent from './components/learning-examples/ThirdComponent.jsx';
import Counter from './components/counter/counter.jsx';
import TodoApp from './components/todo/TodoApp.jsx';

class App extends Component {
  render() {
    return (
      <div className = "App">
        {/*<Counter/>*/}
        <TodoApp/>
      </div>
    );
  }
}

class Learning extends Component{
  render(){
    return (
      <div className="Learning">
        My Hello World
        <FirstComponent/>
        <SecondComponent/>
        <ThirdComponent/>
    </div>
    );
  }
}


export default App;

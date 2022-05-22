import React , {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'



class ListTodosComponent extends Component {
    constructor(props){
        super(props)    
        this.state = {
            todos: 
            [
                //{id: 1, description: 'Learn React', done: false , targetDate: new Date()},
             //{id: 2, description: 'Learn Dance', done: false , targetDate: new Date()}
            ],
            message : null
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount(){
        this.refreshTodos();
    }

    refreshTodos= () => {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({todos: response.data})
            }
        )
        console.log(this.state)
    }

    deleteTodoClicked= (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
        .then(
            response =>{
                this.setState({message: `Delete of todo ${id} successful`})
                this.refreshTodos();
            }
        )
    }

    updateTodoClicked= (id) => {
        this.props.navigate(`/todos/${id}`)
    }

    addTodoClicked= (id) => {
        this.props.navigate(`/todos/-1`)
    }

    planTodoClicked = () => {
        this.props.navigate(`/plan`)
    }

    render(){
        return( <div>
                    <h1> My Work</h1>
                    <div className="alert alert-succes">{this.state.message}</div>
                    <div className="container">
                           <table className="table">
                            <thead>
                                <tr>
                                    <th>description</th>
                                    <th>Is completed?</th>
                                    <th>TargetDate</th>
                                    <th>Place</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.todos.map (
                                    todo=> 
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>{todo.place}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <div className="row">
                            <button className="btn btn-success" onClick={() => this.addTodoClicked()}>Add</button>
                        </div>
                        <div className="row" >
                            <button className="btn" onClick={() => this.planTodoClicked()}>Plan</button>
                        </div>
                    </div>
                 </div>
        )
    }
}

export default ListTodosComponent;
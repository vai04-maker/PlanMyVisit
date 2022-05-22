import React , {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import OptimisationService from '../../api/map/OptimisationService.js'
import moment from 'moment'

class PlanComponent extends Component{
    constructor(props){
        super(props)    
        this.state = {
            todos: 
            [
                //{id: 1, description: 'Learn React', done: false , targetDate: new Date()},
             //{id: 2, description: 'Learn Dance', done: false , targetDate: new Date()}
            ],
            routes:
            [

            ],
            message : null
        }
    }

    componentDidMount(){
        console.log('Component did mount')
        this.refreshTodos();
    }

    refreshTodos= async () => {
        let username = AuthenticationService.getLoggedInUserName();
        console.log(username)
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({todos: response.data})
                console.log(this.state)
            }
        ).then(
            response =>{
            this.findRoutes()
            }
        )

        
            
    }

    findRoutes= async () =>{
        await OptimisationService.findRoutes(this.state.todos)
        .then(
            response =>{
                //this.setState({routes: response.data})
                    let todos= this.state.todos
                    console.log(response)
                    let paths=[]
    
                    for(let i=0;i<todos.length-1;i++){
                            paths[i]={}
                    }
                    for(let i=0;i<todos.length;i++){
                            if(!response.data['waypoints'][i]['waypoint_index']){
                                    console.log(response.data['waypoints'][i]['waypoint_index'])
                                    paths[response.data['waypoints'][i]['waypoint_index']]['From']=todos[i]['place'];
                            }
                            else if(response.data['waypoints'][i]['waypoint_index']==todos.length-1){
                                    console.log(response.data['waypoints'][i]['waypoint_index'])
                                    paths[response.data['waypoints'][i]['waypoint_index']-1]['To']=todos[i]['place'];
                            }
                            else{
                                    console.log(response.data['waypoints'][i]['waypoint_index'])
                                    paths[response.data['waypoints'][i]['waypoint_index']]['From']=todos[i]['place'];
                                    paths[response.data['waypoints'][i]['waypoint_index']-1]['To']=todos[i]['place'];
                            }
                            if(i<todos.length-1){
                            paths[i]['Time']=Math.floor(response.data['trips'][0]['legs'][i]['duration']/60);
                            }
                    }
                    console.log(paths)
                    this.setState({routes: paths})
            }
        )
    }

    render(){
        return(
            <div>
                <div className="container">
                           <table className="table">
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Time(In minutes)</th>
                                    {/*
                                    <th>Place</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                    */}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.routes.map (
                                    route=> 
                                <tr key={route.Time}>
                                    <td>{route.From}</td>
                                    <td>{route.To}</td>
                                    <td>{route.Time}</td>
                                    {/*
                                    <td>{todo.place}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    */}
                                </tr>
                                )
                            }
                            </tbody>
                        </table>
                        </div>
            </div>
        )
    }


}

export default PlanComponent;

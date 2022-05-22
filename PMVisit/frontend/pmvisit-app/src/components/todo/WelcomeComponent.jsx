import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'




class WelcomeComponent extends Component {
    constructor(props){
        super(props);
            this.state={
                welcomeMessage : ''
            }
        }
        
    render() {
        return (
        <>
        <h1>Welcome!</h1>
        <div className="container"> 
        welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link> 
        </div>
        <div className="container"> 
        Click here to get a customized welcome message.
        <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">
            Get Welcome Message
        </button>
        </div>
        <div className="container"> 
        {this.state.welcomeMessage} 
        </div>
        </>
        )
    }

    retrieveWelcomeMessage = (event) => {
        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
        //.catch()
    }

    handleSuccessfulResponse(response){
        console.log(response)
        this.setState({welcomeMessage: response.data})
    }

    handleError = (error) =>{
        console.log(error.response)
        let errorMessage=''
        if(error.message)
            errorMessage+= error.message
        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }

        this.setState({welcomeMessage: errorMessage})
    }
}

export default WelcomeComponent;
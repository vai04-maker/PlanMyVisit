import React , {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
    }


    handleChange= (event) => {
        console.log(event.target.value);
        this.setState(
            {
                [event.target.name]:event.target.value
            }
            )
    }

    loginClicked = (event) =>{
        //if(this.state.username ==='in28minutes' && this.state.password==='dummy'){
        //    AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //    this.props.navigate(`/welcome/${this.state.username}`)
        //    //this.setState({showSuccessMessage: true});
        //    //this.setState({hasLoginFailed: false});
        //}
        //else{
        //    this.setState({showSuccessMessage: false});
        //    this.setState({hasLoginFailed: true});
        //x}

        AuthenticationService
        .executeJwtAuthenticationService(this.state.username, this.state.password)
        .then((response) =>{
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
            this.props.navigate(`/welcome/${this.state.username}`)
        }).catch( () =>{
            this.setState({showSuccessMessage: false});
                this.setState({hasLoginFailed: true});
        })
    }

  

    // handlePasswordChange= (event) => {
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value})
    // }

    render(){
        return(
        <div>
            <h1>Login</h1>
            <div className="container">
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {this.state.hasLoginFailed && <div className="alert alert-warning"> Invalid Credentials</div>}
                {/*<ShowLoginSuccessful showSuccessMessage={this.state.showSuccessMessage}/>*/}
                {this.state.showSuccessMessage && <div> Login Successful</div>}
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button className="btn" onClick={this.loginClicked}>Login</button>
            </div>
        </div>
        )
    }


}


export default LoginComponent;
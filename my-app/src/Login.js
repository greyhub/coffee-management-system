import React, {Component} from 'react';
import './Login.css'
class Login extends Component {
    constructor(props){
        super(props);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this)
        this.state = {
            account:'',
            password:''
          };
    }
    handleAccountChange(e){
        this.setState({account:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    signIn(){
        alert('Accout address is ' + this.state.account + ' \nPassword is ' + this.state.password);            
    }
    render(){
        return(
            <div class="container_form_sign_in">    
                <form className="form-signin" method='post'>
                    <h2 className="form-signin-heading"> Cafe For Your Life </h2>
                    <br/>
                    <input type="account" id="inputAccount" onChange={this.handleAccountChange} className="form-control" placeholder="Account" required autofocus />
                    <br/>                
                    <input type="password" id="inputPassword" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required  autofocus/>
                    <br/>
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.signIn}> Sign in </button>
                </form>
            </div>
        );
    }
}

export default Login;
import React , { Component } from "react";
import fire from "../contact/firebaselogin";
import { Link } from "react-router-dom";
import "./Login.css";
import { auth } from "../contact/firebase";
class Login extends Component{
   
constructor(props)
{
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : ""

    }
}
login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err.message);
        alert("Password is wrong");
    })
  
}
signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}
handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}

render()
{
    return(
        <div className="login">
            <div className="d-flex justify-content-center align-items-center">
                
            <form className="card_login">
            <h1>Login page</h1>
               <label>E-mail</label> <br/><input
                type="email"
                id="email"
                name="email"
                placeholder="enter email address"
                onChange={this.handleChange}
                value={this.state.email}
                required
                /><br/>
               <label>password</label> <br/><input
                name="password"
                type= "password"
                onChange={this.handleChange}
                id="password"
                placeholder="enter password"
                value={this.state.password}
                /><br/>
                <input onClick={this.login} type="submit" value="Login" className="btn_login"></input>
                <label>Create new account</label><Link to="/signup">signup</Link>
            </form>
            </div>
        </div>
    )
}
}
export default Login;
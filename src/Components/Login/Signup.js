import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import fire from "../contact/firebaselogin";
export default class Signup extends Component {
    constructor(props)
{
    super(props);
   
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : ""
    }
}

signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
        alert("your successfully signup")
    }).catch((err)=>{
        console.log(err);
    })
}
handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}
  render() {
    return (
      <div>
           <div className="d-flex justify-content-center align-items-center">
          <form className="card_login">
              <h1>Signup page</h1>
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
                <button onClick={this.signup}  className="btn_login">Signup</button>
                <label>Already have account</label><Link to="/">Login</Link>
            </form>
            </div>
      </div>
    )
  }
}

import React , { Component } from "react";
import { Link } from "react-router-dom";
import fire from "../contact/firebaselogin";
import "./Login.css";
class Home extends Component{
constructor(props)
{
    super(props)
    this.state={
        
    }
}
logout(){
    fire.auth().signOut();
}
render()
{
    return(
        <div className="Login_home">
            <div className="d-flex justify-content-center align-items-center">
           <h1>You are login successfully!!!</h1>
           <br/>
           
           <Link to="/home"> <button className="btn_login">continue</button></Link>
           </div>
        </div>
    )
}
}
export default Home;
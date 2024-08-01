import React, { Component } from 'react'
import fire from '../contact/firebaselogin';
export default class Logout extends Component {
    constructor(props)
{
    super(props)
    this.state={
        
    }
}
logout(){
    fire.auth().signOut();
}
  render() {
    return (
      <div>
           <label onClick={this.logout}>Logout</label>
      </div>
    )
  }
}

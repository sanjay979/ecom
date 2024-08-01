import React from 'react';
import "./Contact.css";
import {db} from "./firebase";
import {useState} from "react";
import Navbar from '../Navbar';
function Contact() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <div>
      <Navbar/>
    <form className="contact_form" onSubmit={handleSubmit}>
      <h1 className="con_h1">Contact us </h1>
      <label className="con_label">Name</label>
      <input placeholder="Name" className="con_input" value={name} onChange={(e)=> setName(e.target.value)}></input>
      <label className="con_label">Email</label>
      <input placeholder="Email"className="con_input" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
      <label className="con_label">Message</label>
     <textarea className="con_textarea"  placeholder="message" value={message} onChange={(e)=> setMessage(e.target.value)}></textarea>
     <button type="submit" className="contact_btn" style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}>Submit</button>
    </form>
    </div>
  )
}

export default Contact
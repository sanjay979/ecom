import React from 'react';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Productlist from "./Components/Productlist";
import Cart        from "./Components/Cart/Cart";
import Details      from "./Components/Details";
import Default      from "./Components/Default";
import Modal     from "./Components/Modal";
import Org from "./Components/Login/Org";
import Signup from './Components/Login/Signup';
import Contact from './Components/contact/Contact';
  function App(){  
 
    
       return (
      <React.Fragment>
       
      
      
       <Routes>
         
          <Route path="/" element={<Org/>} />
          <Route path="signup" element={<Signup/>}/>
          <Route path="/details" element={<Details/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/home" element={<Productlist/>}/>
          <Route element={<Default/>} /> 
          </Routes>
          <Modal />
      </React.Fragment>
    );
 
}

export default App;

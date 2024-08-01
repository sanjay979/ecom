import React, {  useState } from 'react';
import {Link }  from 'react-router-dom' ;
import logo from "../logo.svg";
import Styled from "styled-components";
import {ButtonContainer} from "./Botton";
import "./Navbar.css";
import Logout from './Login/Logout';
const Navbar = () => {
   const [isMobile,setIsMobile] = useState(false);
  
    return (
       <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
      <Link to='/home'>
      <img src={logo} alt="store" className="navbar-brand" />
      </Link>
      <ul className="navbar-nav align-items-center">
      <li className="nav-item ml-5">
      <Link to="/home" className="nav-link">
         E zone
        </Link>
        </li>
      </ul>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={()=> setIsMobile(false)}>
                <Link to="/home" className="home">
                    <li>Home</li>
                </Link>
                <Link to="/contact" className="services">
                    <li>Contact</li>
                </Link>
              
                <Link to="/cart" className="ml-auto">
                  
                       <ButtonContainer>
                          <span className="mr-2">
                             <i class="fas fa-cart-plus"/>
                          </span>
                              MY CART 
                       </ButtonContainer>
                 
               </Link>
                <Link to="/" className="login_navbar">
                <Logout/>
                </Link>
                
              </ul>
              <button className="mobile-menu-icon"
              onClick={()=> setIsMobile(!isMobile)}
              >
                 {isMobile ? <i className="fas fa-times"/> : <i className="fas fa-bars"/>}
              </button>
     
           </NavWrapper>
    )
}
export default Navbar;
const NavWrapper = Styled.nav`
background: var(--mainblue);
.nav-link{
   color:var(--mainwhite) !important;
   font-size: 1.3rem;
   text-tranfrom: capitalize !important;
}
.position-right{
   position: absolute;
right:0;
top:0;
}
`
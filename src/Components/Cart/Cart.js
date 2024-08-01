import React, { Component } from 'react';
import CartColumns from "./CartColumns";
import Emptycart from "./Emptycart";
import {ProductConsumer} from "../../Context";
import Title from "../Title";
import Cartlist from "./Cartlist";
import Carttotals from "./Carttotals"
import Navbar from '../Navbar';
export default class Cart  extends Component {
   render () {
    return (
       <section>
           <Navbar/>
            <ProductConsumer>
                {value =>{
                    const {cart} = value;
                    if(cart.length>0) {
                        return (
                            
                                <React.Fragment>
                         <Title name="your" title="cart" />
                        <CartColumns />
                        <Cartlist value={value} />
                        <Carttotals value={value} history={this.props.history} />
                       
                      
                        </React.Fragment> 
                        ); 
                    }
                    else{
                      return  <Emptycart /> 
                    }
                }}
            </ProductConsumer>
            
            
       </section>
    );
}
}

import React, { Component } from "react";
import Product from  "./Product";
 import Title from "./Title";
 import {ProductConsumer} from '../Context';
import Slider from "./Slider";
import "./Slider.css";
import Navbar from "./Navbar";
 export default class Productlist extends Component {

   render () {
       
    return (
        <React.Fragment>
             <Navbar/>
            <div className="over py-5">
           
                <div className="container">
                    
                    <Title name="our" title="products"/>
                    <Slider/>
                   <div className="row">
                   <ProductConsumer>
                       {value => {
                            return value.products.map ( product => {
                            return <Product key={product.id} product={product}  />;
                     });
                       }}
                       
                   </ProductConsumer>
                   </div>
                </div>
            </div>
        </React.Fragment>
        
    );
}
}

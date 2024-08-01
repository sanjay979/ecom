import React, { Component } from "react";
import {storeProducts, detailProduct} from "./data";
import { db,fs } from "./Components/contact/firebase";
import {useState,useEffect,useTracker} from "react";
const  ProductContext = React.createContext();
 function Mycartcrud(){
     const [products,setProducts]=useState([]);
     const [detailProduct,setDetailProduct]= useTracker(() => {
      const noDataAvailable = { detailProduct: [] };
  
    })
     const [cart,setCart]=useState([]);
     const [modalOpen,setModalOpen]=useState(false);
     const [modalProduct,setModalProduct]=useState(detailProduct);
     const [cartSubTotal,setCartSubTotal]=useState(0);
     const [cartTax,setCartTax]=useState(0);
     const [cartTotal,setCartTotal]=useState(0);
     useEffect(()=>{
       
            db.collection("cart")
              .onSnapshot((querySnapshot) => {
                var p = [];
                querySnapshot.forEach((doc) => {
                  p.push(doc.data());
                  products.map((i) => {
                    if (i.id == doc.data().id) {
                      i.cart = true
                    }
                  })
                });
        
                setCart(p)
              });
   
  }, [])
 const openModal =id =>{
    const product =this.getItem(id);
    setModalProduct(product);
    setModalOpen(true);
}
const closeModal =() =>{
    setModalOpen(false);
};
const handleDetail = id =>{
    const product = this.getItem(id);
    setDetailProduct(product);
 
}
  function addtocart(item) {


    products.map((i) => {
      if (i.id == item.id) {
        i.cart = true
      }
    })

    db.collection('cart').doc(`${item.id}`).set(item, { merge: true })

  }
  function removetocart(item) {

    products.map((i) => {
      if (i.id == item.id) {
        i.cart = false
      }
    })
    db.collection('cart').doc(`${item.id}`).delete()

  }
  function increase(item) {
    db.collection('cart').doc(`${item.id}`).update("quantity", fs.firestore.FieldValue.increment(1))

  }
  function decrease(item) {
    db.collection('cart').doc(`${item.id}`).update("quantity", fs.firestore.FieldValue.increment(-1))
  }
  function total() {
    let x = 0
    cart.map((i) => {
      x += i.price * i.quantity

    })
    return x
  }
  const clearCart  =(id)=> {
    this.setState(()=>{
        return { cart :[]}
    }, ()=>{
   this.setProducts();
 this.addTotals();
    }); 
   }
  return (
    <ProductContext.Provider value={{
     
     handleDetail: handleDetail,
     addTocart: addtocart()  ,
     openModal :openModal ,
     closeModal: closeModal,
     increment:increase(),
     decrement:decrease(),
     removeItem:removetocart(),
    clearCart:clearCart
    }} 
    >
        
        {this.props.children}
    </ProductContext.Provider>
);
 }
class ProductProvider extends Component {
    state = {
       products: [], 
       detailProduct:detailProduct,
       cart: [],
       modalOpen:false,
       modalProduct:detailProduct,
       cartSubTotal:0, 
       cartTax:0,
       cartTotal:0
      
    };
    componentDidMount() {
        this.setProducts();
      
    }
    setProducts =() =>{
        let tempProducts= [];
        storeProducts.forEach(item =>{
            const singleItem ={...item};
             tempProducts= [...tempProducts,singleItem];

        });
        this.setState(()=> {
        return {products:tempProducts };
        },this.checkCartItems);
    };
          getItem = id =>{
    const product = this.state.products.find(item => item.id ===id );
    return product;
};


    handleDetail = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product};
        });
     
}
   
    addTocart = id =>{
        let tempProducts =[...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product =tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total =price;
        
        this.setState(()=>{
            return {
                products: tempProducts, 
                cart :[...this.state.cart, product]};
        },
        ()=>{
           this.addTotals();
        }
        );
        db.collection("addTocart")
         .add({
            productdetails:product
            
      })
     
      };
    
   
        openModal =id =>{
            const product =this.getItem(id);
            this.setState( ()=>{
            return {modalProduct: product, modalOpen:true  };
            });
        }
        closeModal =() =>{
            this.setState(()=> {
            return {modalOpen: false};
            });
        };
        increment =(id)=> {
          let tempCart=[...this.state.cart];
          const selectedProduct= tempCart.find(item=>item.id===id)

 
          const index =tempCart.indexOf(selectedProduct);
          const product =tempCart[index];
            product.count=product.count+1;
            product.total= product.count *product.price;


            this.setState(()=>{return{
              cart:[...tempCart]  
            }},()=>{this.addTotals()})

            
        }
        decrement =(id)=> {
            let tempCart=[...this.state.cart];
          const selectedProduct= tempCart.find(item=>item.id === id);


          const index =tempCart.indexOf(selectedProduct);
          const product =tempCart[index];
          product.count= product.count - 1;

if(product.count === 0) {
    this.removeItem(id)
}
else{
    product.total = product.count * product.price;
    
    this.setState(()=>{return{
        cart:[...tempCart]  
      }},()=>{this.addTotals()})

}
            
        }
        removeItem =(id) => {
            let tempProducts =[...this.state.products];
            let tempCart =[...this.state.cart];
 tempCart = tempCart.filter(item =>item.id !==id);         
 
 const index = tempProducts.indexOf(this.getItem(id));
 let removedProduct = tempProducts[index];
removedProduct.inCart=false;
removedProduct.count=0;
removedProduct.total=0;
console.log(this.state.cart)
this.setState(()=>{
    return {
        
        cart:[...tempCart],
        products : [...tempProducts]
    };
},
()=>{
    this.addTotals();
}
)
db.collection("addTocart").doc(`${tempProducts.indexOf(this.getItem(id))}`).delete()
        }
        clearCart  =(id)=> {
         this.setState(()=>{
             return { cart :[]}
         }, ()=>{
        this.setProducts();
      this.addTotals();
         }); 
        

        
         
         
        }
      
       
        addTotals =() => {
            let subTotal =0;
            this.state.cart.map(item =>(subTotal += item.total));
            const tempTax = subTotal *0.1;
            const tax =parseFloat(tempTax.toFixed(2));
            const total = subTotal+tax
            this.setState(() =>{
                return {
                    cartSubTotal:subTotal,
                    cartTax:tax,
                    cartTotal:total
                }
            })
        }
       
        render() {
        return (
            <ProductContext.Provider value={{
             ...this.state, 
             handleDetail: this.handleDetail,
             addTocart: this.addTocart  ,
             openModal :this.openModal ,
             closeModal: this.closeModal,
             increment:this.increment,
             decrement:this.decrement,
             removeItem:this.removeItem,
             clearCart:this.clearCart,
            
            }} 
            >
                
                {this.props.children}
            </ProductContext.Provider>
        );
    }
} 
const ProductConsumer = ProductContext.Consumer;

export  { ProductProvider , ProductConsumer};  
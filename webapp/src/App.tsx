import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Header from './components/fragments/NavBar';
import Footer from './components/fragments/Footer';
import  {getCart} from './api/api';
import {ItemCart} from './shared/shareddtypes';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';

import AboutUs from "./components/other/about_us"
import SOLIDLogin from "./components/user/SOLIDLogin";
import UserProfile from "./components/user/UserProfile";

import Shipping from './components/checkout-shipping/Shipping';

import MainProducts from './components/products/MainProducts';
import ProductPage from './components/products/ProductPage';

import { addToCart } from './api/api';

import ShoppingCart from './components/cart/ShoppingCart';
import Checkout from './components/checkout-shipping/Checkout';
import AdminView from './components/administrator/AdminView';


function App(): JSX.Element {

  const [cart,setCart] = useState<ItemCart[]>([]);


 

  const refreshCartList =  () => {
    setCart( getCart());
  }

  useEffect(()=>{
    refreshCartList();
  },[]);

  return (
    <>


      <Header cart={cart}/>
        <Container style={{alignContent: "center", marginTop: "5%", minHeight: "50vh"}} maxWidth="lg">
        <Router>
          <Routes>
             <Route path='/' element={<MainProducts refreshCartList={refreshCartList}/>} />
              <Route path="/products/:id" element={<ProductPage refreshCartList={refreshCartList}/>} />
              <Route path='/about_us' element={<AboutUs/>} />
              <Route path='/login' element={<SOLIDLogin/>} />
              <Route path='/profile' element={<UserProfile/>} />
              <Route path='/shipping' element={<Shipping refreshCartList={refreshCartList}/> } />
              <Route path='/checkout' element={<Checkout items={cart} refreshCartList={refreshCartList}/>}/>
              <Route path='/cart' element={<ShoppingCart items={cart} refreshCartList={refreshCartList} />} />
              <Route path='/admin' element={<AdminView/>}/>
          </Routes>
          </Router>
        </Container>
      <Footer/>

      
    </>
  );
}

export default App;

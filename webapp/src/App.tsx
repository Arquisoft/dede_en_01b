import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import ProductList from './components/ProductList';
import Header from './components/NavBar';
import Footer from './components/Footer';
import  {getProducts} from './api/api';
import {Product, User} from './shared/shareddtypes';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from "./about_us"

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);

  const refreshUserList = async () => {
    setProducts(await getProducts());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>


      <Header />
        <Container maxWidth="sm">
        <Router>
          <Routes>
              <Route path='/' element={<ProductList products={products}/>} />
              <Route path='/about_us' element={<AboutUs/>} />
              <Route path='/cart' element={<ProductList products={products}/>} />
              <Route path='/login' element={<ProductList products={products}/>} />
          </Routes>
          </Router>
        </Container>

      <Footer/>

      
    </>
  );
}

export default App;

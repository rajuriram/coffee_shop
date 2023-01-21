import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import{BrowserRouter,Link,Routes,Route} from 'react-router-dom';
import Book_Coffee from './components/CoffeeList';
import Home from './components/Home';
import Orders from './components/Orders';
import BookForm from "./components/BookForm"
import logo from "./img/logo5.jpeg"







function App() {
  
  return ( <React.Fragment>
    <BrowserRouter>
    <div className="App">
          
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link to="/home" className="navbar-brand" href="#"><img style={{height:"8vh"}} src={logo}/></Link>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link to="/book" className="nav-link">Book Cofee</Link>
      </li>
      <li className="nav-item active">
        <Link to="/orders" className="nav-link">Orders List</Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-inline-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
      
      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/book' element={<Book_Coffee/>}></Route>
        <Route path="/book/:title" element={<BookForm/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
      </Routes>
      
     
      </div>
      </BrowserRouter>
      </React.Fragment>
    
  );
}

export default App;

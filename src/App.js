import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Users/Login';
import Footer from './Component/Footer';
import Header from './Component/Header';
import SignUp from './Users/Signup';
import Store from './Component/Store';
import Playgrounds from './Component/Playgrounds';
import ProductDetails from './HomeStore/ProductDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/playgrounds" element={<Playgrounds />} />
          {/* Use the "element" prop instead of "component" for JSX rendering */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        <br />
        <Footer />
      </Router>
    </div>
  );
}

export default App;

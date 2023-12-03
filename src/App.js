import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Users/Login';
import Footer from './Component/Footer';
import Header from './Component/Header';
import SignUp from './Users/Signup';
import Store from './Component/Store';
import Playgrounds from './Component/Playgrounds';
import ProductDetails from './HomeStore/ProductDetails';
import Academies from './Component/Academies';
import ForgotPassword from './Users/ForgotPassword';
import StadiumDetails from './Plygroud/StadiumDetails';
import BookingForm from './Plygroud/BookingForm';
import PaymentForm from './Plygroud/PaymentForm';
import Profile from './Profile/UserProfile';
import ShoppingCart from './HomeStore/ShoppingCart';
import Addformplay from './Home/Addformplay';
import Price from './Home/Price';
import SearchResultsPage from '../src/HomeStore/SearchResultsPage ';
import Category from '../src/HomeStore/Category';
import CategoryPage from '../src/HomeStore/CategoryPage';
import ContactUs from './Component/ContactUs';
import AboutUs1 from './Component/AboutUs1';
import Done from './Home/Done';
import Notfound from './Component/Notfound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') ? true : false
  );

  return (
    <div className="App">
      <Router>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs1 />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/details/:id" element={<StadiumDetails />} />
          <Route path="/store" element={<Store />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/academies" element={<Academies />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/playgrounds" element={<Playgrounds />} />

          {isAuthenticated && (
            <>
              <Route path="/bookingform" element={<BookingForm />} />
              <Route path="/paymentform" element={<PaymentForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/price" element={<Price />} />
              <Route path="/addformplay" element={<Addformplay />} />
              <Route path="/shoppingcart" element={<ShoppingCart />} />
              <Route path="/done" element={<Done />} />
            </>
          )}

          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

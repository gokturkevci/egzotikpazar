import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ListingDetail from "./components/ListingDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Messages from "./components/Messages";
import AddListing from "./components/AddListing";
import Settings from "./components/Settings";
import CartAnimation from "./components/CartAnimation";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <CartProvider>
      <div className="App min-h-screen flex flex-col bg-white transition-colors duration-300">
        <BrowserRouter>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="/listings" element={<Home />} />
              <Route path="/blog" element={<div className="p-8 text-center">Blog coming soon!</div>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/sellers" element={<div className="p-8 text-center">Sellers page coming soon!</div>} />
              <Route path="/about" element={<div className="p-8 text-center">About page coming soon!</div>} />
              <Route path="/contact" element={<div className="p-8 text-center">Contact page coming soon!</div>} />
            </Routes>
          </main>
          <Footer />
          <CartAnimation />
          <Toaster />
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./Front/Pages/Home/IndexHome";
import Contact from "./Front/Pages/ContactUs/IndexContactUs";
import AboutUs from "./Front/Pages/AboutUs/IndexAbout";
import Products from "./Front/Pages/Shop/Products"
import Login from "./Front/Pages/Authentication/Login";
import SignUp from "./Front/Pages/Authentication/SignUp";
import ForgetPassword from "./Front/Pages/Authentication/ForgetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} >Home</Route>
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<AboutUs/>} /> 
        {/* these 3 page are same  */}
        <Route path="/monaghan-medical" element={<Products />} />
        <Route path="/product" element={<Navigate to="/monaghan-medical" replace />} />
        <Route path="/products" element={<Navigate to="/monaghan-medical" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />        
      </Routes>
    </>
  );
}

export default App;

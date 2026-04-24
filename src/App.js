import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Front/Pages/Home/IndexHome";
import Contact from "./Front/Pages/ContactUs/IndexContactUs";
import AboutUs from "./Front/Pages/AboutUs/IndexAbout";
import Products from "./Front/Pages/Shop/Products"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} >Home</Route>
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<AboutUs/>} /> 
        <Route path="/monaghan-medical" element={<Products />} />
        
      </Routes>
    </>
  );
}

export default App;

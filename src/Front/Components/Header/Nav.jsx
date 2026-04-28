import React from 'react';
import { NavLink, Link } from "react-router-dom";
import ProductsSearch from "../../Pages/Shop/ProductsSearch";
import NavUser from "./NavUser";
import { User, LogIn, UserPlus, Menu, LogOut } from "lucide-react";

export default function Nav(){
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }

    // Listen for login/logout events
    const handleLoginEvent = () => {
      const updatedUser = localStorage.getItem('currentUser');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    const handleLogoutEvent = () => {
      setUser(null);
    };

    window.addEventListener('userLoggedIn', handleLoginEvent);
    window.addEventListener('userLoggedOut', handleLogoutEvent);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleLoginEvent);
      window.removeEventListener('userLoggedOut', handleLogoutEvent);
    };
  }, []);

  return(
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg d-lg-flex d-none navbar-web">
        <div className="container-xl">
          <NavLink className="navbar-brand" to="/">
            MyApp
          </NavLink>

          <div className="search-wrapper ms-3 ms-lg-4 flex-grow-1" style={{ maxWidth: "400px" }}>
            <ProductsSearch />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact-us">
                  Contact Us
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle btn-link" 
                  type="button"
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Partners
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/monaghan-medical">
                      Monaghan
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* NavUser Component - Login/Signup or User Icon */}
              <li className="nav-item">
                <NavUser />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="navbar navbar-expand-lg d-lg-none navbar-mobile">
        <div className="container-xl">
          {/* Left side - Logo */}
          <NavLink className="navbar-brand" to="/">
            MyApp
          </NavLink>

          {/* Right side - Icons */}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              // After login - User icon (outside hamburger)
              <Link to="/profile" className="btn p-1">
                <User size={24} />
              </Link>
            ) : (
              // Before login - Login & Register icons
              <>
                <Link to="/login" className="btn p-1" title="Login">
                  <LogIn size={24} />
                </Link>
                <Link to="/signup" className="btn p-1" title="Sign Up">
                  <UserPlus size={24} />
                </Link>
              </>
            )}
            
            {/* Logout icon - after login, outside hamburger menu */}
            {user && (
              <button 
                className="btn p-1" 
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  window.dispatchEvent(new Event('userLoggedOut'));
                  window.location.href = '/';
                }}
                title="Logout"
              >
                <LogOut size={24} />
              </button>
            )}
            
            {/* Hamburger menu */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mobileNavbar"
              aria-controls="mobileNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="collapse navbar-collapse" id="mobileNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/contact-us">
                  Contact Us
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle btn-link" 
                  type="button"
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Partners
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/monaghan-medical">
                      Monaghan
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

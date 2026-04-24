import { NavLink } from "react-router-dom";
import ProductsSearch from "../../Pages/Shop/ProductsSearch";

export default function Nav(){
  return(
    <>
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

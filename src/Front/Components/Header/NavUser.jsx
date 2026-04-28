import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const NavUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for logged in user on mount
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
  };

  // If user is logged in, show user info
  if (user) {
    return (
      <div className="d-flex align-items-center gap-3">
        <Link to="/profile" className="d-flex align-items-center text-decoration-none">
          <div className="user-icon-wrapper">
            <User size={20} />
          </div>
          <span className="ms-2 user-name d-none d-lg-inline">{user.firstName}</span>
        </Link>
        <button 
          className="btn btn-link text-decoration-none p-0" 
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    );
  }

  // If user is not logged in, show login/signup buttons
  return (
    <div className="d-flex align-items-center gap-2">
      <Link to="/login" className="btn btn-outline-primary btn-sm">
        Login
      </Link>
      <Link to="/signup" className="btn btn-primary btn-sm">
        Sign Up
      </Link>
    </div>
  );
};

export default NavUser;
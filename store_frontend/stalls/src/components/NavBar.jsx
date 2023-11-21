import React, { useContext } from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/Context";

export default function NavBar() {
  const {token, loginToken, logoutToken} = useContext(ShopContext);
  const navigate = useNavigate()
  console.log("state now is:", token)
  return (
    <div className="nav-container">
    <Link className="logo" to="/"></Link>
      <div className="nav-links">
        <NavLink className={({isActive})=> isActive ? "active" : null} to="/">Home</NavLink>
        <NavLink to="/stores">Stores</NavLink>
        <NavLink to="/about">About Us</NavLink>
        {token && token !== '' && token !== undefined  ? 

        (<button className="logout-btn" onClick={()=> {
          logoutToken(null)
          navigate('/login')
          }}>Logout</button>)
          :
          (<>
          <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
          </>)

        }
      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { ShopContext } from "../context/Context";

export default function Login() {
  const navigate = useNavigate()
  const {token, loginToken, logoutToken} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

 async function handleSubmit(e) {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
        console.log("Fill in all details")
        return
    } 
    const data = await loginUser(formData)
    if (data.category === 'success') {
      console.log(formData);
      loginToken(data.user.isAuthenticated)
      navigate('/');
    }
    
  }
  console.log(token)
  return (
    <div className="form-container">
      <h1>Sign in to your account</h1>
      <form method="post" className="form" onSubmit={handleSubmit} replace="true">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button>Log in</button>
        <Link to="/signup"><p className="account">Don't have an account? Register</p></Link>
      </form>
    </div>
  );
}

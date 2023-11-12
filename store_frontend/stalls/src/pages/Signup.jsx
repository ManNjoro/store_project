import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, redirect } from "react-router-dom";
import { createUser } from "../api";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password1: "",
    password2: "",
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
    if (
      formData.email === "" ||
      formData.password1 === "" ||
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.password2 === "" ||
      formData.phoneNumber === ""
    ) {
      console.log("Fill in all details");
      return;
    }else if (formData.password1 !== formData.password2) {
        console.log("passwords do not match")
        return
    } else if (formData.password1.length < 8) {
        console.log("Password must be at least 8 characters")
        return
    } else{
      const data = await createUser(formData)
      if (data.category === 'success') {
        window.location.href = '/';
      }
    }
  }
  const [typePassword, setTypePassword] = useState(true)
  function togglePassword(){
    // const eye = document.querySelector('.eye')
    const password1 = document.querySelector('#password1')
    setTypePassword(prevType => !prevType)
    password1.type = typePassword ? "password" : "text"
    console.log(password1.type)
  }
  return (
    <div className="form-container">
      <h1>Create new account</h1>
      <form
        method="post"
        className="form"
        onSubmit={handleSubmit}
        replace="true"
      >
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="phoneNumber"
          type="text"
          placeholder="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password1"
          type="password"
          placeholder="Password"
          value={formData.password1}
          onChange={handleChange}
          id="password1"
          required
        />
        {typePassword  ?
        <FaEye className="eye" onClick={togglePassword}/>
        :
        <FaEyeSlash className="eye" onClick={togglePassword}/>
        }
        
        
        <input
          name="password2"
          type="password"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          id="password2"
          required
        />
        <button>Register</button>
        <Link to='/login'><p className="account">Already have an account? Login</p></Link>
      </form>
    </div>
  );
}

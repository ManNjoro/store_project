import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
        <div className='contact'>
            <h1>Contact us</h1>
            <p>Tell:</p>
            <p>Email:</p>
        </div>
        <div>
        <h1>Connect with us</h1>
        <div className="social-icons">
            
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaTiktok />
        </div>
        </div>
        <div>
            <p className='copyright'>&copy; 2023 Shoppers. All rights</p>
        </div>
    </footer>
  )
}

import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id='footer'>
        <div className='contact'>
            <h1>Contact us</h1>
            <p>Tel: +254723124576</p>
            <p>Email: <a href='mailto:shoppers@gmail.com'>shoppers@gmail.com</a></p>
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

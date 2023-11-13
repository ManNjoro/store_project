import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const url = "http://localhost:5000/stores";
  const id2 = "62c60e34fb54404cb33c8d5186d33f9c"
  const id1 = "f9acef52f1ad42388a640e76d77253ab"
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Shoppers</h1>
        <p>Discover the perfect space for your business in the heart of premier shopping destinations.</p>
        <Link to="/stores" className="explore-button">Explore Available Stores</Link>
      </div>

      <div className="featured-stores-section">
        <h2>Featured Stores</h2>
        <div className="featured-store">
          <img src={`${url}/${id1}/image`} alt="Store 1" />
          <h3>Chic Boutique</h3>
          <p>Explore the latest fashion trends at Chic Boutique. Prime location with high foot traffic.</p>
        </div>
        <div className="featured-store">
          <img src={`${url}/${id2}/image`} alt="Store 2" />
          <h3>Tech Haven</h3>
          <p>Experience cutting-edge technology at Tech Haven. Ideal space for electronic gadgets and devices.</p>
        </div>
      </div>

      <div className="about-us-section">
        <h2>About Us</h2>
        <p>
          Shoppers is your gateway to premium retail spaces in popular malls. Our platform connects businesses with prime locations, making it easier for you to showcase your products and services to a broader audience. Explore a diverse range of stores and kickstart your entrepreneurial journey with us.
        </p>
        <Link to="/about" className="learn-more-button">Learn More About Us</Link>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or need assistance? Contact our team for personalized support and guidance on finding the perfect store for your business.</p>
        <a href="#footer" className="contact-button">Get in Touch</a>
      </div>
    </div>
  );
}

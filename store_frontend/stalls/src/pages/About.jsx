import React from 'react';

export default function About() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
      </div>

      <div className="about-us-section">
        <h2>Our Mission</h2>
        <p>
          At Shoppers, we believe in fostering a vibrant business community by providing accessible and flexible retail spaces. Our mission is to empower entrepreneurs and small businesses by offering a diverse range of stores within popular malls. We understand that the right location can make all the difference, and we are committed to helping you find the ideal space to showcase your products or services.
        </p>
      </div>

      <div className="about-us-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>
            <strong>Diverse Portfolio:</strong> Explore a wide array of stores in various sizes and styles, ensuring there's a perfect fit for every business.
          </li>
          <li>
            <strong>Prime Locations:</strong> Our team meticulously selects stores situated in high-traffic areas of well-known malls, maximizing your visibility and potential customer base.
          </li>
          <li>
            <strong>User-Friendly Platform:</strong> Easily browse through available stores, view detailed information, and make informed decisions with our intuitive and user-friendly website.
          </li>
          <li>
            <strong>Transparent Process:</strong> We believe in transparency. Our straightforward rental process and clear terms make it easy for you to navigate and understand every step.
          </li>
          <li>
            <strong>Dedicated Support:</strong> Our team is here to assist you at every stage, from browsing available stores to finalizing your rental. We are dedicated to ensuring a smooth and positive experience for all our users.
          </li>
        </ul>
      </div>

      <div className="about-us-section">
        <h2>How It Works</h2>
        <div className="how-it-works-steps">
          <div className="how-it-works-step">
            <h3>Browse Stores</h3>
            <p>Explore our catalog of available stores. Filter by location, size, and amenities to find the perfect match for your business.</p>
          </div>
          <div className="how-it-works-step">
            <h3>View Details</h3>
            <p>Click on a store to view detailed information, including floor plans, rental rates, and any additional features.</p>
          </div>
          <div className="how-it-works-step">
            <h3>Contact Us</h3>
            <p>Have questions or need assistance? Reach out to our friendly team for personalized support and guidance.</p>
          </div>
          <div className="how-it-works-step">
            <h3>Secure Your Space</h3>
            <p>Once you've found the ideal store, follow our easy rental process to secure your space and embark on your business journey.</p>
          </div>
        </div>
      </div>

      <div className="contact-us-container">
        <div className="contact-us-header">
          <h2>Contact Us</h2>
        </div>
        <div className="contact-us-info">
          <p>Have inquiries or need further assistance? Feel free to reach out to our team at shoppers@gmail.com. We're here to help you turn your business aspirations into reality.</p>
        </div>
      </div>
    </div>
  );
}

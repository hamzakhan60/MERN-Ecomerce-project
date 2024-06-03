import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaDiscord, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-400 to-purple-500 py-12 text-white relative">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center px-4">
        <div className="flex flex-col lg:flex-row lg:justify-center w-full">
          <div className="mb-4 lg:mb-0 lg:mr-20">
            <h3 className="text-lg font-semibold mb-2">Information</h3>
            <ul>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Wholesaler</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
          </div>
          <div className="mb-4 lg:mb-0 lg:mr-20">
            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Delivery & Orders</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Track My Order</a></li>
              <li><a href="#">Payment Guide</a></li>
            </ul>
          </div>
          <div className="mb-4 lg:mb-0 lg:mr-20">
            <h3 className="text-lg font-semibold mb-2">Need Help</h3>
            <p className="mb-1">Call us: +1234567890</p>
            <p>Email: info@example.com</p>
            <div className="flex items-center mt-2">
              <a href="#" className="text-white hover:text-gray-400 mr-2">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400 mr-2">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400 mr-2">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400 mr-2">
                <FaDiscord size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

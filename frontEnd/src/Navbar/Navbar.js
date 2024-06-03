import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavbarLogo from './NavbarLogo.png';
import { AiOutlineSearch, AiOutlineHeart, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import AccountVerification from './AccountVerification';
import AddtoFavorite from './AddtoFavorite';
import { UserSearch } from '../context/userContext';
import CartSlider from '../cartSlider'; // Import CartSlider

const Navbar = () => {
  const [showAccountVerification, setShowAccountVerification] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCartSlider, setShowCartSlider] = useState(false); // State for CartSlider
  const { setUserSearch } = useContext(UserSearch);

  const setUserQuery = (e) => {
    setUserSearch(e.target.value);
  }

  const toggleAccountVerification = () => {
    setShowAccountVerification(!showAccountVerification);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const toggleCartSlider = () => {
    setShowCartSlider(!showCartSlider); // Toggle CartSlider state
  };

  const closeAccountVerification = () => {
    setShowAccountVerification(true);
  };

  return (
    <nav className="bg-transparent border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="block">
              <img className="block h-8 w-auto" src={NavbarLogo} alt="Demo" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <div className="group">
                <Link to="/sales" className="text-gray-500 hover:text-gray-900 px-3 py-2 relative" onClick={closeAccountVerification}>
                  Sales
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                </Link>
              </div>
              <div className="group">
                <Link to="/new-arrival" className="text-gray-500 hover:text-gray-900 px-3 py-2 relative" onClick={closeAccountVerification}>
                  New Arrival
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                </Link>
              </div>
              <div className="group">
                <Link to="/men" className="text-gray-500 hover:text-gray-900 px-3 py-2 relative" onClick={closeAccountVerification}>
                  Men
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                </Link>
              </div>
              <div className="group">
                <Link to="/women" className="text-gray-500 hover:text-gray-900 px-3 py-2 relative" onClick={closeAccountVerification}>
                  Women
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                </Link>
              </div>
              <div className="group">
                <Link to="/kids" className="text-gray-500 hover:text-gray-900 px-3 py-2 relative" onClick={closeAccountVerification}>
                  Kids
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                </Link>
              </div>
              <div className="group">
                <Link to="/fragrances" className="text-gray-500 hover:text-gray-900 px-3 py-2 relative" onClick={closeAccountVerification}>
                  Fragrances
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input onChange={setUserQuery}
                  type="text"
                  className="px-2 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
                <button className="text-gray-500 hover:text-gray-900 p-2 bg-gray-200 rounded-r-md">
                  <AiOutlineSearch size={15} />
                </button>
              </div>
              <button onClick={toggleFavorites} className="text-gray-500 hover:text-gray-900"><AiOutlineHeart /></button>
              <Link to="/login"><button className="text-gray-500 hover:text-gray-900"><AiOutlineUser /></button></Link>
              <button onClick={toggleCartSlider} className="text-gray-500 hover:text-gray-900"><AiOutlineShoppingCart /></button>
            </div>
          </div>
        </div>
      </div>
      {showFavorites && <AddtoFavorite />}
      <CartSlider open={showCartSlider} setOpen={setShowCartSlider} /> {/* Include CartSlider */}
    </nav>
  );
};

export default Navbar;

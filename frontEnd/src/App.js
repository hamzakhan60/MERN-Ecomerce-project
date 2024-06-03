import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import AccountVerification from './Navbar/AccountVerification';
import { UserSearchProvider } from './context/userContext';
import { UserLoginContextProvider, UserLoginContext } from './context/userLoginContext';
import { UpdateCartContextProvider } from './context/updatedCartContext';
import Profile from "./profile.js";
import OrderHistory from './orderHistory.js';
import { PendingOrdersProvider } from './context/pendingOrdersContext';

// Import Admin components
import NavbarAdmin from './AadminNavbar/Navbar';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import adminImage from './AadminNavbar/1.jpg'; // Import the admin image
import Product from './components/Products';
import AdminOrderHistory from './components/Orders';
import Customer from "./components/Customers";

// Import CardsPages components
import MenCards from './CardsPages.js/MenCards';
import WomenCards from './CardsPages.js/WomenCards';
import SalesCards from './CardsPages.js/SalesCards';
import NewArrivalCards from './CardsPages.js/NewArrivalCards';
import KidsCards from './CardsPages.js/KidsCards';
import FragrancesCards from './CardsPages.js/FragrancesCards';
import DetailPage from './DetailPage';

function App() {
  return (
    <Router>
      <PendingOrdersProvider>
        <UserLoginContextProvider>
          <UserSearchProvider>
            <UpdateCartContextProvider>
              <MainApp />
            </UpdateCartContextProvider>
          </UserSearchProvider>
        </UserLoginContextProvider>
      </PendingOrdersProvider>
    </Router>
  );
}

function MainApp() {
  const { userLoginCredential } = useContext(UserLoginContext);
  const [isAdmin, setIsAdmin] = useState(true);
  console.log(userLoginCredential);

  useEffect(() => {
    if (userLoginCredential && userLoginCredential.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userLoginCredential]);

  return (
    <>
      {/* Admin Routes */}
      {isAdmin ? (
        <Routes>
          <Route path="/admin/dashboard" element={
            <>
              {/* <NavbarAdmin adminName="Admin" adminImage={adminImage} /> */}
              <Sidebar />
            </>
          }/>
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/orders" element={<AdminOrderHistory />} />
          <Route path="/admin/customers" element={<Customer />} />
        </Routes>
      ) : (
        <>
          {/* Navbar */}
          <Navbar />
          {/* User Routes */}
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<SalesCards />} />
              <Route path="/new-arrival" element={<NewArrivalCards />} />
              <Route path="/men" element={<MenCards />} />
              <Route path="/women" element={<WomenCards />} />
              <Route path="/kids" element={<KidsCards />} />
              <Route path="/fragrances" element={<FragrancesCards />} />
              <Route path="/details/:_id" element={<DetailPage />} />
              <Route path="/login" element={<AccountVerification />} />
            </Routes>
          </div>
          {/* Footer */}
          <Footer />
        </>
      )}
    </>
  );
}

export default App;

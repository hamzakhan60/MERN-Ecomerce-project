import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserLoginContext } from "../context/userLoginContext";
import { useNavigate } from "react-router-dom";

const AccountVerification = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { userLoginCredential, setuserLoginCredential } = useContext(UserLoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoginCredential) {
      if (userLoginCredential.role === 'user') {
        navigate("/profile");
      } else if (userLoginCredential.role === 'admin') {
        navigate("/admin/dashboard");
      }
    }
  }, [userLoginCredential, navigate]);

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password.');
      return;
    }

    const url = "http://localhost:8000/login";
    const queryParams = {
      email: email,
      password: password,
    };

    axios.get(url, { params: queryParams })
      .then((response) => {
        setuserLoginCredential(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));

        if (response.data.role === 'user') {
          navigate("/profile");
        } else if (response.data.role === 'admin') {
          navigate("/admin/dashboard");
        }
      })
      .catch(err => {
        alert("Error occurred during login.");
      });
  };

  const handleSignup = () => {
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || phoneNumber.trim() === '' || streetName.trim() === '' || cityName.trim() === '' || countryName.trim() === '' || pinCode.trim() === '' || dateOfBirth.trim() === '') {
      alert('Please fill in all the fields.');
      return;
    }

    axios.post("http://localhost:8000/signUp", {
      email: email,
      password: password,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      address: {
        streetName: streetName,
        city: cityName,
        country: countryName,
        pinCode: pinCode,
      }
    }).then((response) => {
      alert(response.data);
      setIsLogin(true);
    }).catch(err => {
      alert(err.response.data);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <div className='flex flex-row justify-between'>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="border border-gray-300 rounded px-5 py-2 mb-2 w-2/6"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Middle Name (Optional)"
                className="border border-gray-300 rounded px-5 py-2 mb-2 w-2/6"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-300 rounded px-5 py-2 mb-2 w-2/6"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
        </div>
        <div className='flex flex-row justify-between'>
          {!isLogin && (
            <>
              <input
                type="tel"
                placeholder="Phone Number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date Of Birth"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </>
          )}
        </div>
        <div className='flex flex-row justify-between'>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Street"
                className="border border-gray-300 rounded px-5 py-2 mb-2 w-1/2"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 rounded px-5 py-2 mb-2 w-1/2"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
            </>
          )}
        </div>
        <div className='flex flex-row justify-between'>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Country"
                className="border border-gray-300 rounded px-5 py-2 mb-2 w-1/2"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Pin Code"
                className="border border-gray-300 rounded px-5 py-2 mb-2 w-1/2"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </>
          )}
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button className="text-blue-500 hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AccountVerification;

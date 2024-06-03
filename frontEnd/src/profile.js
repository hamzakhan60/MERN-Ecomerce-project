import React, { useState, useEffect, useContext } from 'react';
import { UserLoginContext } from './context/userLoginContext';
import axios from 'axios';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { userLoginCredential,setuserLoginCredential } = useContext(UserLoginContext);
    const [updatedStatus, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const requestProfile = async () => {
            if (!userLoginCredential) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/user', {
                    params: userLoginCredential,
                });
                setUserData(response.data);
            } catch (err) {
                if (err.response) {
                    alert(err.response.data);
                    localStorage.removeItem('userData');
                    navigate("/login");
                } else {
                    alert("Server Not Found");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        requestProfile();
    }, [userLoginCredential, updatedStatus, navigate]);

    const handleEditClick = () => {
        if (isEditing) {
            axios.put("http://localhost:8000/user", userData, { params: userLoginCredential })
                .then((response) => {
                    alert("Updated successfully!");
                    setUserData(response.data);
                    setStatus(!updatedStatus);
                })
                .catch(err => {
                    if (err.response) {
                        alert(err.response.data);
                    } else {
                        alert("Server Not Found");
                    }
                });
        }
        setIsEditing(!isEditing);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setuserLoginCredential(null);
        navigate("/login");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/src/assets/background.jpg')" }}>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-6 text-center">{userData.firstName}'s Profile</h2>
                <form>
                    <div className="flex flex-wrap -mx-2 mb-6">
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.firstName}
                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-sm font-bold mb-2" htmlFor="middleName">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                id="middleName"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.middleName}
                                onChange={(e) => setUserData({ ...userData, middleName: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2">
                            <label className="block text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.lastName}
                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={userData.login?.email || ''}
                            onChange={(e) => setUserData({
                                ...userData, login: {
                                    ...userData.login,
                                    email: e.target.value
                                }
                            })}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-6">
                        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                            <label className="block text-sm font-bold mb-2" htmlFor="age">
                                Age
                            </label>
                            <input
                                type="text"
                                id="age"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.age}
                                onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label className="block text-sm font-bold mb-2" htmlFor="dateOfBirth">
                                Date Of Birth
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.dateOfBirth ? formatDate(userData.dateOfBirth) : ''}
                                onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={userData.phoneNumber}
                            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-6">
                        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                            <label className="block text-sm font-bold mb-2" htmlFor="streetName">
                                Street Name
                            </label>
                            <textarea
                                id="streetName"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.address?.streetName || ''}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        address: {
                                            ...userData.address,
                                            streetName: e.target.value,
                                        },
                                    })
                                }
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label className="block text-sm font-bold mb-2" htmlFor="city">
                                City
                            </label>
                            <textarea
                                id="city"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.address?.city || ''}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        address: {
                                            ...userData.address,
                                            city: e.target.value,
                                        },
                                    })
                                }
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-6">
                        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                            <label className="block text-sm font-bold mb-2" htmlFor="country">
                                Country
                            </label>
                            <textarea
                                id="country"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.address?.country || ''}

                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        address: {
                                            ...userData.address,
                                            country: e.target.value,
                                        },
                                    })
                                }
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label className="block text-sm font-bold mb-2" htmlFor="pinCode">
                                Pin Code
                            </label>
                            <textarea
                                id="pinCode"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                value={userData.address?.pinCode || ''}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        address: {
                                            ...userData.address,
                                            pinCode: e.target.value,
                                        },
                                    })
                                }
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isEditing ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;

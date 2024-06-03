import { createContext, useContext, useState,useEffect } from "react";

export const UserLoginContext=createContext();

export const UserLoginContextProvider=({children})=>{
    const [userLoginCredential,setuserLoginCredential]=useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const userData = localStorage.getItem('userData');
        if (userData) {
            setuserLoginCredential(JSON.parse(userData));
        }
    }, []);

    return(
        <UserLoginContext.Provider value={{userLoginCredential,setuserLoginCredential}}>
        {children}
        </UserLoginContext.Provider>
    )
}

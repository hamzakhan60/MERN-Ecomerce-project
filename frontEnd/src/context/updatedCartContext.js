import { createContext, useContext, useState } from "react";

export const UpdateCartContext=createContext();

export const UpdateCartContextProvider=({children})=>{
    const [updateCart,setUpdateCart]=useState(true);


    return(
        <UpdateCartContext.Provider value={{updateCart,setUpdateCart}}>
        {children}
        </UpdateCartContext.Provider>
    )
}

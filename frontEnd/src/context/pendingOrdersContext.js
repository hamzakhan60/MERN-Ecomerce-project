import React, { createContext, useState } from 'react';

export const PendingOrdersContext = createContext();

export const PendingOrdersProvider = ({ children }) => {
    const [pendingOrders, setPendingOrders] = useState([]);

    return (
        <PendingOrdersContext.Provider value={{ pendingOrders, setPendingOrders }}>
            {children}
        </PendingOrdersContext.Provider>
    );
};

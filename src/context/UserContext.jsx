import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
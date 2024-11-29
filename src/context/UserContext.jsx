import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updatedUserData) => {
        setUser(prevUser => {
            const newUserData = { ...prevUser, ...updatedUserData };
            sessionStorage.setItem('user', JSON.stringify(newUserData));
            return newUserData;
        });
    };

    const getUser = () => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : user;
    };

    const contextValue = useMemo(() => ({
        user,
        login,
        logout,
        updateUser,
        getUser
    }), [user]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
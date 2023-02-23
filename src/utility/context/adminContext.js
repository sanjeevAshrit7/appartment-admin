import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        name: '',
        role: '',
        email: '',
        mobile: '',
        UserId: '',
        Image: '',
        id: ''
    });

    const getUserData = async () => {
        // const token = localStorage.getItem("token");
        setUser({
            name: '',
            role: '',
            email: '',
            mobile: '',
            UserId: '',
            Image: '',
            id: ''
        });
    };

    useEffect(() => {
        getUserData();
        return () => {
            console.log("This will be logged on unmount");
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };

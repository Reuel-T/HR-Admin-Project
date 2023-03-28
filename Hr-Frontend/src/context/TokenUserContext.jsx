import React, { createContext, useState } from "react";

const TokenUserContext = createContext();

export default TokenUserContext;

export function TokenUserProvider({ children }) {
    //storing default token value in state
    const [token, setToken] = useState(sessionStorage.getItem("access_token"));
    const [user, setUser] = useState(null);

    //storing the info of the user
    const updateUser = (userIn) => {
        setUser(userIn);
    }

    //method to update the jwt token
    const updateToken = (newToken) => {
        sessionStorage.setItem("access_token", newToken)//store the token in session storage
        setToken(newToken);//update the token in session storage
    }

    const clearToken = () => {
        //remove the token from session storage
        sessionStorage.removeItem("access_token");
        //set the token in the state value to null
        setToken(null);
    }

    //return the provider
    return (
        <TokenUserContext.Provider value={{ token ,user, updateUser, updateToken, clearToken }}>
            {children}
        </TokenUserContext.Provider>
    )
};


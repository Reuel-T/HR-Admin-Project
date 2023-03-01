import React from 'react'

const UserContext = React.createContext({
    user: null,
    setUser: () => { }
});

/* 
    Create a user context that can be accessed by all components
*/

export default UserContext;
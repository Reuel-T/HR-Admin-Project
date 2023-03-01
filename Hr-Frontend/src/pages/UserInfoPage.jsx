import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function UserInfoPage() {
    /**
     * Getting the user context
    */
    const { user, setUser } = useContext(UserContext);
   
    const navigate = useNavigate();
    
    useEffect(() => {
        //check if the user is null
        if (user === null) {
            navigate('/login');
        }
    })

    return (
        <div>UserInfoPage</div>
    )
}

export default UserInfoPage
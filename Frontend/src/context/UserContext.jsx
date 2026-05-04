import axios from 'axios';

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './AuthContext';

export const userDataContext = createContext();

const UserContext = ({ children }) => {

    const [currentUser, setCurrentUser] = useState("");
    let {serverUrl} = React.useContext(authDataContext);

    const getcurrentUser = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/user/getCurrentUser`, {
                withCredentials: true,
            });
            setCurrentUser(result.data.user);

            console.log(result.data.user);

        } catch (error) {
            setCurrentUser(null);
            console.log(error);
        }
    }

    useEffect(() => {
        getcurrentUser();
    }, [])

    let value = {
        currentUser,
        setCurrentUser,
        getcurrentUser

    }

    
  return (
    <div>
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
    </div>
  )
}

export default UserContext

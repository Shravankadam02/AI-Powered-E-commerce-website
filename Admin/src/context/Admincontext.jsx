import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';
import { authDataContext } from './Authcontext.jsx';
import axios from 'axios';


export const adminDataContext = React.createContext();
const Admincontext = ({children}) => {
    let [adminData, setAdminData] = useState(null);
    let {serverUrl} = React.useContext(authDataContext);

    const getAdmin = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/user/getAdmin`, {
                withCredentials: true
            });
            
           setAdminData(response.data);

           console.log("Admin data fetched successfully:", response.data);
        } catch (error) {
            setAdminData(null);
            console.error("Error fetching admin data:", error);
        }
    }

    useEffect(() => {
        getAdmin();
    }, [])

    let value = {
        adminData,
        setAdminData,
        getAdmin
        
    }
  return ( 
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  )
}

export default Admincontext

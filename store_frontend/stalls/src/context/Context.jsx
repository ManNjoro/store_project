import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();


export const ShopContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const loginToken = (newToken) => {
    setToken(newToken);
  };
  const logoutToken = () => {
    localStorage.removeItem("token")
    setToken(null);
  };
  const url = 'http://localhost:5000'
  async function loginUser(creds) {
    try{

      const res = await fetch(`${url}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      const data = await res.json();
      localStorage.setItem("token", data.access_token)
      setToken(data.access_token)
      if (!res.ok) {
        // eslint-disable-next-line
        throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status,
        };
      }
      return true;
    } catch(e){
      console.log("Error:", e)
    }
  }
  
  useEffect(()=>{
    loginToken(localStorage.getItem(("token")))
  ,[]} )


  const contextValue = {loginToken, logoutToken, token, loginUser};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

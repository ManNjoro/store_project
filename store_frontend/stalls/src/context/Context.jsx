import React, { createContext, useState } from "react";

export const ShopContext = createContext();


export const ShopContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const loginToken = (newToken) => {
    setToken(newToken);
  };
  const logoutToken = () => {
    setToken(null);
  };

  const contextValue = {loginToken, logoutToken, token};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

import React, {useState} from 'react';

export const AuthContext = React.createContext({token: '', user: {}});

// export default AuthContext;

const AuthContextProvider = (props) => {
  const [token, setToken] = useState({token: ''});
  const value = {token, setToken};

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

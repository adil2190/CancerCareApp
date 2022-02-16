import React, {useState} from 'react';
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [doctorData, setDoctorData] = useState({});

  return (
    <AuthContext.Provider value={{doctorData, setDoctorData}}>
      {children}
    </AuthContext.Provider>
  );
};

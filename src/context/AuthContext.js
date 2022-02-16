import React, {useState} from 'react';
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [doctorData, setDoctorData] = useState({});
  const [patientData, setPatientData] = useState({});
  return (
    <AuthContext.Provider
      value={{doctorData, setDoctorData, setPatientData, patientData}}>
      {children}
    </AuthContext.Provider>
  );
};

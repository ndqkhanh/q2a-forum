import React, { useEffect, useState } from "react";
import { getMyProfile } from "~services/getProfile";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const fetchUserInformation = async () => {
    let data = getMyProfile();
    console.log("data", data);
    setUserData(data);
  };
  useEffect(() => {
    fetchUserInformation();
  }, []);
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        fetchUserInformation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

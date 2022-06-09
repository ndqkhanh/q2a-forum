import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const fetchUserInformation = async (userId) => {
    try {
      let data = await fetch(`http://localhost:3000/v1/users/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      setUserData(data);
      console.log("data", data);
    } catch (error) {
      console.error("error", error);
    }
  };
  // useEffect(() => {
  //   fetchUserInformation("088d3c0a-d428-443e-ae40-79caa7286355");
  // }, []);
  return (
    <UserContext.Provider
      value={{
        userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

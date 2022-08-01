import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { getConfiguration } from "~services/getConfig";
import { API_URL } from "@env";
import { UserContext } from "~provider/UserProvider";

const ConfigContext = React.createContext();

ConfigContext.displayName = "ConfigContext";

const ConfigProvider = ({ children }) => {
  const { auth, userData } = useContext(UserContext);
  const [configData, setConfigData] = useState(null);
  const fetchConfigInformation = async () => {
    let data = await getConfiguration();

    if (data) {
      console.log(data);
      setConfigData(data);
    }
  };

  useEffect(() => {
    if (auth && userData) {
      fetchConfigInformation();
    }
  }, [auth, userData]);

  return (
    <ConfigContext.Provider
      value={{
        configData,
        setConfigData,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, ConfigContext };

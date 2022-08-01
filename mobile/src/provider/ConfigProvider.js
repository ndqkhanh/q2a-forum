import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { getConfiguration } from "~services/getConfig";
import { API_URL } from "@env";

const ConfigContext = React.createContext();

ConfigContext.displayName = "ConfigContext";

const ConfigProvider = ({ children }) => {
  const [configData, setConfigData] = useState(null);
  const fetchConfigInformation = async () => {
    let data = await getConfiguration();

    if (data) {
      console.log(data);
      setConfigData(data);
    }
  };

  useEffect(() => {
    fetchConfigInformation();
  }, []);

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

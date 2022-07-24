import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { getMyProfile } from "~services/getProfile";
import { API_URL } from "@env";

const ConfigContext = React.createContext();

import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { data } from "cheerio/lib/api/attributes";
import { Alert } from "react-native";

const getUser = async () => {
  const token = await AsyncStorage.getItem("UserToken");

  try {
    let userData = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    userData = await userData.json();
    return userData;
  } catch (error) {
    console.log("error: ", error);
    Alert.alert("error: ", error);
  }
  return null;
};

export { getUser };

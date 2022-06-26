import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getFeed = async (page) => {
  const token = await AsyncStorage.getItem("UserToken");
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NDdiNzNjOC01ZGMzLTQ2ZWUtOGU0Yy1iZDlmYmFmN2RlN2YiLCJpYXQiOjE2NTYyNDg1NDAsImV4cCI6MTY1NjI1MDM0MCwidHlwZSI6ImFjY2VzcyJ9.okWLM3sxOQSnEaFpIx333L6t_NNU1jtrtp1dsyR5r-Y";
  try {
    let data = await fetch(`${API_URL}/question/feed/${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = await data.json();
    return data;
  } catch (error) {
    console.error("error---", error);
  }

  return null;
};

export { getFeed };

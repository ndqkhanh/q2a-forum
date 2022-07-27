import { API_URL } from "@env";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const postAnswer = async (passContent, passQid) => {
  let message = {};
  try {
    const token = await AsyncStorage.getItem("UserToken");
    let responsePostQuestion = await fetch(`${API_URL}/answer`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: `${passContent}`,
        qid: `${passQid}`,
      }),
    });

    const mjson = await responsePostQuestion.json();
    if (mjson.hasOwnProperty("id")) {
      message = {
        header: "Sucess",
        content: "Your answer have been posted!",
      };
    } else if (mjson.hasOwnProperty("message"))
      message = { header: "Error", content: mjson.message };
    else return null;
  } catch (error) {
    message = { header: "Error", content: error };
    //console.log(error);
  }
  return message;
};
export { postAnswer };

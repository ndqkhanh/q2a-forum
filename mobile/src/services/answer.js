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
const pickACorrectAnswer = async (answerId) => {
  const token = await AsyncStorage.getItem("UserToken");
  try {
    let data = await fetch(`${API_URL}/answer/${answerId}/pick-correct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = await data.json();
    return data;
  } catch (error) {
    console.log("error", error);
    Alert.alert("error", error.message);
  }
  return null;
};

const deleteAnswer = async (answerId) => {
  const token = await AsyncStorage.getItem("UserToken");
  try {
    let data = await fetch(`${API_URL}/answer/${answerId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = await data.json();
    return data;
  } catch (error) {
    console.log("error", error);
    Alert.alert("error", error.message);
  }
  return null;
};

const getAllAnswersAndVotings = async (questionId, page, limit) => {
  const token = await AsyncStorage.getItem("UserToken");
  try {
    let data = await fetch(
      `${API_URL}/question/${questionId}/${page}/${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    data = data.json();
    return data;
  } catch (error) {
    console.log("error", error);
    Alert.alert("error", error);
  }
  return null;
};

export {
  postAnswer,
  pickACorrectAnswer,
  deleteAnswer,
  getAllAnswersAndVotings,
};

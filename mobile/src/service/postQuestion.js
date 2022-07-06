import React from "react";
import { API_URL } from "@env";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const postQuestion = async (passTitle, passContent) => {
  let message = {};
  if (passTitle == null || passContent == null) {
    message = {
      header: "Can not post pending question list",
      content: "Missing title or content",
    };
  } else {
    try {
      const token = await AsyncStorage.getItem("UserToken");
      let responsePostQuestion = await fetch(`${API_URL}/question`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `${passTitle}`,
          content: `${passContent}`,
        }),
      });

      const mjson = await responsePostQuestion.json();
      if (mjson.hasOwnProperty("id")) {
        message = { header: "Sucess", content: 'Quesion are in the pending list' };
      }else
      message = { header: "Error", content: mjson.message };
    } catch (error) {
      message = { header: "Error", content: error };
      console.log(error);
    }
  }
  return message;
};

export { postQuestion };

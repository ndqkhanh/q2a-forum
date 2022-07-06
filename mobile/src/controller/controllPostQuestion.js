import React from "react";
import { Alert } from "react-native";
import { postQuestion } from "~service/postQuestion";
const controllPostQuestion = async (passTitle, passContent) => {
  try {
    let message = await postQuestion(passTitle, passContent);
    Alert.alert(message.header, JSON.stringify(message.content));
  } catch (error) {
    console.log(error);
    Alert.alert("error", error);
  }
};

export { controllPostQuestion };

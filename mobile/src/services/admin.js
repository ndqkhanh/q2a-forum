// import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { Alert } from "react-native";

const getMetrics = async (token) => {
  try {
    // let token = await AsyncStorage.getItem("UserToken");
    let data = await fetch(`${API_URL}/admin/metrics`, {
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
};

const getPendingQuestions = async (token, page, limit) => {
  try {
    // let token = await AsyncStorage.getItem("UserToken");
    let data = await fetch(
      `${API_URL}/admin/manage-questions/${page}/${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    data = await data.json();
    return data;
  } catch (error) {
    console.error("error---", error);
  }
};

const approveDeclineQuestion = async (token, questionId, status) => {
  try {
    // let token = await AsyncStorage.getItem("UserToken");
    let data = await fetch(`${API_URL}/admin/manage-questions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        questionId,
        status,
      }),
    });
    data = await data.json();
    return data;
  } catch (error) {
    console.error("error---", error);
  }
};

const getUsers = async (token, page, limit) => {
  try {
    // let token = await AsyncStorage.getItem("UserToken");
    let data = await fetch(`${API_URL}/admin/list-users/${page}/${limit}`, {
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
};

export { getMetrics, getPendingQuestions, approveDeclineQuestion, getUsers };

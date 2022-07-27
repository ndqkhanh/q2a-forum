import { Alert } from "react-native";
import { postAnswer } from "~services/answer";
const controllPostAnswer = async (passContent, passQid) => {
  try {
    let message = await postAnswer(passContent, passQid);
    Alert.alert(message.header, JSON.stringify(message.content));
  } catch (error) {
    return null;
    // console.log(error);
    // Alert.alert("error", error);
  }
};
export { controllPostAnswer };

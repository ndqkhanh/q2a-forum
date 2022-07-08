import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { data } from "cheerio/lib/api/attributes";
import { Alert } from "react-native";


const pickACorrectAnswer = async(token, answerId) =>
{
    try 
    {
        let data = await fetch (
            `${API_URL}/answer/${answerId}/pick-correct`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            },
        );
        data = await data.json();
        return data;
    }
    catch (error)
    {
        console.log("error", error);
        Alert.alert("error", error.message);
    }
    return null;
}

const deleteAnswer = async (token, answerId) =>
{
    try
    {
        let data = await fetch(
            `${API_URL}/answer/${answerId}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            },
        );
        data = await data.json();
        return data;
    }
    catch (error)
    {
        console.log("error", error);
        Alert.alert("error", error.message);
    }
    return null;
}

const getAllAnswersAndVotings = async (questionId,page,limit) =>
{
    const token = await AsyncStorage.getItem("UserToken");
    try 
    {
        let data = await fetch (
            `${API_URL}/question/${questionId}/${page}/${limit}`,
            {
                method: "GET",
                headers: {
                    Accept : "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            },
        )
        // console.log("duong dan");
        console.log(`${API_URL}/question/${questionId}/${page}/${limit}`);
        data = data.json();
        return data;
    }
    catch (error)
    {
        console.log("error", error);
        Alert.alert("error", error);
    }
    return null;
}
export {pickACorrectAnswer, deleteAnswer, getAllAnswersAndVotings};
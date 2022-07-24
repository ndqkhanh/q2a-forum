import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDistance } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
import Post from "~components/Common/Post";
import Q2APagination from "~components/Q2A/Pagination";
import { UserContext } from "~provider/UserProvider";
import {
  deleteAnswer,
  getAllAnswersAndVotings,
  pickACorrectAnswer,
} from "~services/Answer";
import { deleteQuestion } from "~services/Question";

const ScreensQ2AMain = ({ navigation, route }) => {
  const { questionId } = route.params;

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(0);
  const [indexCorrectAns, setIndexCorrectAns] = useState(0);

  const [question, setQuestion] = useState(null);
  const [countAnswer, setCountAnswer] = useState(0);
  const [answersAndVotes, setAnswersAndVotes] = useState([]);
  const [answerId, setAnswerId] = useState("");

  // Use context to get userdata
  const { userData } = useContext(UserContext);

  // Fetch Pick correct answer
  const fetchPickACorrectAnswer = async (answerId, status) => {
    const res = await pickACorrectAnswer(answerId, status);
    if (res.success == true) {
      for (let i = 0; i < answersAndVotes.length; i++) {
        if (answersAndVotes[i].answer.id == answerId) {
          setIndexCorrectAns(i);
        }
      }
    }
  };

  // Fetch Delete Answer
  const fetchDeleteAnswer = async (answerId) => {
    const response = await deleteAnswer(answerId);
    console.log("response: ", response);
  };

  // Fetch Delete Question
  const fetchDeleteQuestion = async () => {
    Alert.alert(
      "Delete Question",
      "Are you sure to delete this question?",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            let token = await AsyncStorage.getItem("UserToken");
            const response = await deleteQuestion(token, questionId);
            if (response.success == true) {
              navigation.navigate("Home");
            } else {
              Alert.alert("Delete question failure.");
            }
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog.",
          ),
      },
    );
  };

  // Fetch get all answer and voting
  const fetchGetAllAnswersAndVotings = async (questionId, page, limit) => {
    const data = await getAllAnswersAndVotings(questionId, page, limit);
    setQuestion(data.question);
    setCountAnswer(data.answers.count);
    setAnswersAndVotes(data.answers.data);
    setPage(page);
    setLimit(limit);
  };

  useEffect(() => {
    fetchGetAllAnswersAndVotings(questionId, 0, 5);
    for (let i = 0; i < answersAndVotes.length; i++) {
      if (answersAndVotes[i].answer.correct == true) {
        setIndexCorrectAns(i);
      }
    }
  }, []);

  if (!question || !userData) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View style={styles.headerContainer}>
        <TouchableHighlight
          onPress={() => navigation.pop()}
          style={{
            position: "absolute",
            alignSelf: "center",
            left: 0,
          }}
          underlayColor={"transparent"}
        >
          <Icon name="arrow-back-outline" style={styles.back} />
        </TouchableHighlight>

        <Text style={styles.header}>{question.questionInfo.title}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        style={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <Post
          dateText={formatDistance(
            new Date(question.questionInfo.updated_at),
            Date.now(),
            { addSuffix: true },
          )}
          content={question.questionInfo.content}
          userData={{
            name: question.name,
            avatarUrl: question.avatarUrl,
          }}
          onDelete={
            userData.id == question.questionInfo.uid
              ? fetchDeleteQuestion
              : null
          }
        />
        <View style={styles.answerContainer}>
          <Text style={styles.numOfAnswers}>{countAnswer} answers</Text>
        </View>

        <Q2APagination page={page + 1} />
        {answersAndVotes.map((item, index) => (
          <Post
            voting={item.minus_upvote_downvote}
            key={index}
            correctAnswer={index == indexCorrectAns}
            dateText={formatDistance(
              new Date(item.answer.updated_at),
              Date.now(),
              { addSuffix: true },
            )}
            content={item.answer.content}
            userData={{
              name: item.name,
              avatarUrl: item.profilepictureurl,
            }}
            onPickCorrectAnswer={
              userData.id == question.questionInfo.uid
                ? () => {
                    setAnswerId(item.answer.id);
                    fetchPickACorrectAnswer(answerId, true);
                  }
                : null
            }
            onDelete={
              userData.id == item.answer.uid
                ? () => {
                    setAnswerId(item.answer.id);
                    fetchDeleteAnswer(answerId);
                  }
                : null
            }
            // onUpdate={() => console.log("test")}
          />
        ))}
        <Q2APagination page={3} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: "center",
    marginHorizontal: 20,
    alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.blue40,
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.cyan70,
  },
  back: {
    fontSize: 30,
    color: Colors.cyan10,
  },
  answerContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    marginTop: 20,
  },
  numOfAnswers: {
    fontWeight: "bold",
    fontSize: 23,
    color: Colors.blue40,
  },
});
export default ScreensQ2AMain;

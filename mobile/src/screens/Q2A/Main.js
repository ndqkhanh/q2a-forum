import AsyncStorage from "@react-native-async-storage/async-storage";
import { text } from "cheerio/lib/api/manipulation";
import { formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { Button, Colors } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
import Post from "~components/Common/Post";
import User from "~components/Common/UserList";
import Q2APagination from "~components/Q2A/Pagination";
import {
  deleteAnswer,
  getAllAnswersAndVotings,
  pickACorrectAnswer,
} from "~services/answer";

import { getUser } from "~services/user";

const ScreensQ2AMain = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(0);
  const [indexCorrectAns, setIndexCorrectAns] = useState(0);

  const [question, setQuestion] = useState(null);
  const [countAnswer, setCountAnswer] = useState(0);
  const [answersAndVotes, setAnswersAndVotes] = useState([]);
  const [answerId, setAnswerId] = useState("");

  const [user, setUser] = useState(null);

  // Fetch Get User who log in
  const fetchGetUser = async () => {
    const userData = await getUser();
    setUser(userData);
  };

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
    console.log("response: ", res);
  };

  // Fetch Delete Answer
  const fetchDeleteAnswer = async (answerId) => {
    const response = await deleteAnswer(answerId);
    console.log("response: ", response);
  };

  // Fetch get all answer and voting
  const fetchGetAllAnswersAndVotings = async (questionId, page, limit) => {
    const data = await getAllAnswersAndVotings(questionId, page, limit);
    console.log(data);
    setQuestion(data.question);
    setCountAnswer(data.answers.count);
    setAnswersAndVotes(data.answers.data);
    setPage(page);
    setLimit(limit);
  };

  useEffect(() => {
    fetchGetAllAnswersAndVotings("db0e22f6-e058-4ae3-a08f-9964289d4575", 0, 5);
    fetchGetUser();
    for (let i = 0; i < answersAndVotes.length; i++) {
      if (answersAndVotes[i].answer.correct == true) {
        setIndexCorrectAns(i);
      }
    }
  }, []);

  if (!question || !user) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View style={styles.headerContainer}>
        <Icon name="arrow-back-outline" style={styles.back} />
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
            onPickACorrectAnswer={
              user.id == question.questionInfo.uid
                ? () => {
                    setAnswerId(item.answer.id);
                    fetchPickACorrectAnswer(answerId, true);
                  }
                : null
            }
            onPickDeleteAnswer={
              user.id == item.answer.uid
                ? () => {
                    setAnswerId(item.answer.id);
                    fetchDeleteAnswer(answerId);
                  }
                : null
            }
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
    position: "absolute",
    left: 0,
    alignSelf: "center",
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

import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import HomeMainWelcome from "~components/Home/Main/Welcome";
import { UserContext } from "~provider/UserProvider";
// import { FeedContext } from "~provider/FeedProvider";
import Icon from "react-native-vector-icons/Ionicons";
import HomeMainPosting from "~components/Home/Main/Posting";
import Post from "~components/Common/Post";
const ScreensHomeMain = () => {
  const { userData } = useContext(UserContext);
  const [feedData, setFeedData] = useState({});
  const fetchFeedInformation = async (page) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NDdiNzNjOC01ZGMzLTQ2ZWUtOGU0Yy1iZDlmYmFmN2RlN2YiLCJpYXQiOjE2NTU4OTU4MzQsImV4cCI6MTY1NTg5NzYzNCwidHlwZSI6ImFjY2VzcyJ9.M1OhiIHkoGjPUhWiWO0pQMOjzxRTxxPNRE4OGnlP_Og";
    try {
      let data = await fetch(
        `http://192.168.1.116:3000/v1/question/feed/${page}`,
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
      setFeedData(data);
      console.log("data", data);
    } catch (error) {
      console.error("error---", error);
    }
  };
  useEffect(() => {
    fetchFeedInformation(0);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Q & A Forum</Text>
        <Icon
          name="log-out-outline"
          style={{
            fontSize: 30,
            color: Colors.cyan10,
          }}
        />
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <HomeMainPosting />
        <Post
          voting={30}
          dateText={"3 days ago"}
          title={"Câu hỏi về game?"}
          content={
            "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
          }
          numOfAnswers={100}
          userData={{
            name: "Bảo Dragon",
            avatarUrl:
              "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
          }}
        />

        <Post
          voting={69}
          dateText={"14 days ago"}
          title={"Alo alo?"}
          content={
            "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
          }
          numOfAnswers={22}
          image={
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          }
          userData={{
            name: "Chó Khánh",
            avatarUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: Colors.white,
    // justifyContent: "center",
    marginHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.cyan70,
  },
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 20,
  },
  votingContainer: {
    backgroundColor: Colors.grey60,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  votingUp: {
    fontSize: 35,
    color: Colors.yellow10,
  },
  votingDown: {
    fontSize: 35,
    color: Colors.red50,
  },
  votingScore: {
    color: Colors.blue10,
    fontSize: 17,
    fontWeight: "bold",
  },
  postContentContainer: {
    padding: 10,
  },
  infoUserContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.green5,
  },
  nameAndDate: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: Colors.grey30,
    fontSize: 15,
    fontWeight: "bold",
  },
  createdAt: {
    color: Colors.grey40,
    fontSize: 15,
  },
  questionTitle: {
    color: Colors.grey10,
    fontSize: 25,
    fontWeight: "bold",
  },
  questionContent: {
    color: Colors.grey30,
    fontSize: 15,
    marginTop: 5,
  },
  questionFooterContainer: {
    backgroundColor: Colors.white,
    height: 35,
    flexDirection: "row",
    borderTopColor: Colors.blue80,
    borderTopWidth: 2,
    marginHorizontal: 8,
    marginTop: 5,
    alignItems: "center",
  },
  commentIcon: {
    fontSize: 25,
    color: Colors.cyan10,
  },
  numOfAnswers: {
    marginLeft: 5,
    color: Colors.cyan30,
    fontWeight: "bold",
  },
});
export default ScreensHomeMain;

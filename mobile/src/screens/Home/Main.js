import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import HomeMainWelcome from "~components/Home/Main/Welcome";
import { UserContext } from "~provider/UserProvider";
import Icon from "react-native-vector-icons/Ionicons";
import HomeMainPosting from "~components/Home/Main/Posting";
import Post from "~components/Common/Post";
import { formatDistance } from "date-fns";
import { Alert } from "react-native";

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const ScreensHomeMain = () => {
  const [maxLength, setMaxLength] = useState(0);
  const [page, setPage] = useState(0);
  const [feedData, setFeedData] = useState([]);
  const fetchFeedInformation = async (page) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NDdiNzNjOC01ZGMzLTQ2ZWUtOGU0Yy1iZDlmYmFmN2RlN2YiLCJpYXQiOjE2NTU5OTQ3ODAsImV4cCI6MTY1NTk5NjU4MCwidHlwZSI6ImFjY2VzcyJ9.usP1fOKBPbzRanaq_5O-uktxPRTGSYFaBXIYBgwLhyM";
    try {
      let data = await fetch(
        `http://192.168.1.7:3000/v1/question/feed/${page}`,
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
      var maxLength = parseInt(data.count);
      setMaxLength(maxLength);
      setFeedData([...feedData, ...data.data]);
      setPage(page + 1);
      console.log("data:", feedData);
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
      <ScrollView
        style={styles.body}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent) && feedData.length < maxLength) {
            console.log("scrolled to bottom");
            fetchFeedInformation(page);
          }
        }}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
      >
        <HomeMainPosting />
        {feedData.map((record, index) => (
          <Post
            key={index}
            voting={30}
            dateText={formatDistance(new Date(record.updated_at), Date.now(), {
              addSuffix: true,
            })}
            title={record.title}
            content={record.content}
            numOfAnswers={record.numOfAnswers}
            userData={record.userData}
          />
        ))}
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

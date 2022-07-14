import React, { useState, useEffect } from "react";
import { View, Text, Avatar, Card, Colors } from "react-native-ui-lib";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getUserProfile, getMyProfile } from "~services/getProfile";
import MyQuestions from "~components/Profile/myQuestions";
import PersonalInfo from "~components/Profile/personalInfo";

const ProfileScreen = ({ route }) => {
  // const {userIdParam} = route.params;
  // const userId = JSON.stringify(userIdParam);
  const [userData, setUserData] = useState({});
  const fetchUserProfile = async (userId) => {
    if (userId != null) {
      let data = await getUserProfile(userId);
    } else {
      let data = await getMyProfile();
    }
    setUserData(data);
  };
  useEffect(() => {
    fetchUserProfile(userData.id);
  }, []);
  const [tab, setTab] = useState("Personal info");
  const personalInfoTab = () => {
    setTab("Personal info");
  };
  const myQuestionsTab = () => {
    setTab("My questions");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Icon
          name="log-out-outline"
          style={{
            fontSize: 30,
            color: Colors.cyan10,
          }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.infoSection}>
          <Avatar
            rounded
            source={require("../../assets/img/penguin.png")}
            size={70}
          />
          <View marginLeft={10}>
            <Text style={styles.title}>{userData.username}</Text>
            <Text>
              <Icon size={10} name="ellipse" color="blue" />
              {userData.role == 0
                ? "Admin"
                : userData.role == 1
                ? "Moderator"
                : "User"}
            </Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <Card style={styles.QA_card}>
            <Text text10 center black>
              {userData.numOfQuestions}
            </Text>
            <Text text60 center black>
              Questions
            </Text>
          </Card>
          <Card style={styles.QA_card}>
            <Text text10 center black>
              {userData.numOfAnswers}
            </Text>
            <Text text60 center black>
              Answers
            </Text>
          </Card>
        </View>
        <View style={styles.infoSection}>
          <TouchableOpacity onPress={personalInfoTab}>
            <Card
              style={styles.menu}
              {...(tab == "Personal info"
                ? { backgroundColor: Colors.blue60 }
                : {})}
            >
              <Text black>Personal info</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={myQuestionsTab}>
            <Card
              style={styles.menu}
              {...(tab == "My questions"
                ? { backgroundColor: Colors.blue60 }
                : {})}
            >
              <Text black>My questions</Text>
            </Card>
          </TouchableOpacity>
        </View>
        {tab == "Personal info" ? (
          <View>
            <PersonalInfo userData />
          </View>
        ) : null}
        {tab == "My questions" ? (
          <View>
            <MyQuestions
              dateText={"3 days ago"}
              title={"Câu hỏi về game?"}
              content={
                "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
              }
              userData={{
                name: "Bảo Dragon",
                avatarUrl:
                  "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
              }}
            />
          </View>
        ) : null}
        {/* <TouchableOpacity activeOpacity={0.7}>
          <Text
            style={{
              lineHeight: 50,
              fontSize: 20,
              textDecorationLine: "underline",
              color: "#1e90ff",
            }}
          >
            <Icon size={20} name="create-outline" /> Edit Profile
          </Text>
        </TouchableOpacity>             */}
        {/* <View style={styles.logOutButton}>
          <TouchableOpacity
            style={{ backgroundColor: "red", borderRadius: 20 }}
            activeOpacity={0.7}
          >
            <Text style={styles.logOutText}>Log out</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerContainer: {
    height: 50,
    backgroundColor: Colors.white,
    // justifyContent: "center",
    //marginHorizontal: 20,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoSection: {
    margin: 10,
    flexDirection: "row",
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  QA_card: {
    height: 120,
    width: "45%",
    padding: 5,
    marginLeft: 10,
  },
  logOutButton: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  logOutText: {
    fontSize: 20,
    margin: 7,
    color: "white",
    fontWeight: "bold",
  },
  menu: {
    borderRadius: 0,
    paddingLeft: 20,
    paddingRight: 30,
    marginRight: 2,
  },
});

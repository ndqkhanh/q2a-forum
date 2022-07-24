import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Colors, Text, View } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
import MyQuestions from "~components/Profile/myQuestions";
import PersonalInfo from "~components/Profile/personalInfo";
import { getMyProfile, getUserProfile } from "~services/getProfile";
import { updateUserInformation, getMyQuestions } from "~services/user";
import { UserContext } from "~provider/UserProvider";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 100;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const ProfileScreen = ({ navigation, route }) => {
  const userId = route.params;
  const { userData, setUserData } = useContext(UserContext);
  // const [userData, setUserData] = useState({});
  const [myQuestionsData, setMyQuestionsData] = useState([]);
  const [maxLength, setMaxLength] = useState(0);
  const [page, setPage] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const fetchUserProfile = async (userId) => {
    let data;
    if (userId != null) {
      data = await getUserProfile(userId);
    } else {
      data = await getMyProfile();
    }
    if (data) setUserData(data);
  };
  const limit = 5;
  const fetchMyQuestions = async (page, limit) => {
    let token = await AsyncStorage.getItem("UserToken");
    let data = await getMyQuestions(token, page, limit);
    var maxLength = 5;
    try {
      maxLength = parseInt(data.count);
    } catch (error) {
      console.error("error---", error);
    }
    setMaxLength(maxLength);
    setMyQuestionsData((myQuestionsData) => [...myQuestionsData, ...data.questions]);
    setPage((page) => page + 1);
    setRefetch(false);
  }
  const saveInformation = async () => {
    let token = await AsyncStorage.getItem("UserToken");
    let data = await updateUserInformation(token, {
      name: userData.name,
      profilepictureurl: userData.profilepictureurl,
    });
    if (data.username) {
      Alert.alert("Update account successfully.");
    } else {
      Alert.alert("Update account failure.");
    }
    setUserData(data);
  };
  useEffect(() => {
    fetchUserProfile(userData.id);
  }, []);
  useEffect(() => {
    fetchMyQuestions(0, 5);
    // Reload
    return () => {
      setPage(0);
      setRefetch(false);
      setMyQuestionsData([]);
      setMaxLength(0);
    };
  }, []);
  const [tab, setTab] = useState("Personal info");
  const personalInfoTab = () => {
    setTab("Personal info");
  };
  const myQuestionsTab = () => {
    setTab("My questions");
  };
  const editProfile = () => {
    setTab("Edit Profile");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon
            name="arrow-back-outline"
            style={{
              fontSize: 30,
              color: Colors.cyan10,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
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
          <TouchableOpacity style={{ flex: 1 }} onPress={personalInfoTab}>
            <Card
              style={styles.menu}
              {...(tab == "Personal info"
                ? { backgroundColor: Colors.blue60 }
                : {})}
            >
              <Text
                black
                style={{
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                Personal info
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={myQuestionsTab}>
            <Card
              style={styles.menu}
              {...(tab == "My questions"
                ? { backgroundColor: Colors.blue60 }
                : {})}
            >
              <Text
                black
                style={{
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                My questions
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={editProfile}>
            <Card
              style={styles.menu}
              {...(tab == "Edit Profile"
                ? { backgroundColor: Colors.blue60 }
                : {})}
            >
              <Text
                black
                style={{
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                Edit Profile
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
        {tab == "Personal info" ? (
          <View
            style={{
              margin: 10,
            }}
          >
            <PersonalInfo userData={userData} />
          </View>
        ) : tab == "My questions" ? (
          <View
            style={{
              margin: 10,
            }}
          >
            <ScrollView
              onScroll={({ nativeEvent }) => {
                if (
                  !refetch &&
                  isCloseToBottom(nativeEvent) &&
                  myQuestionsData.length < maxLength
                ) {
                  console.log("scrolled to bottom of feed");
                  setRefetch(true);
                  fetchMyQuestions(page, limit);
                }
              }}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              //scrollEventThrottle={400}
              showsVerticalScrollIndicator={false}
            >
              {myQuestionsData.map((record) => (
                <MyQuestions
                  dateText = {formatDistance(new Date(record.updated_at), Date.now(), {
                    addSuffix: true,
                  })}
                  content = {record.content}
                  title = {record.title}
                  status = {record.status}
                  userData = {userData}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          tab == "Edit Profile" && ( 
            <View
              style={{
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 5,
                margin: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Full Name:
                </Text>
                <TextInput
                  value={userData.name}
                  onChangeText={(value) => {
                    userData.name = value;
                    setUserData({ ...userData });
                  }}
                  style={{
                    flex: 1,
                    height: 40,
                    marginLeft: 5,
                    borderRadius: 5,
                    backgroundColor: Colors.cyan80,
                    paddingHorizontal: 5,
                    fontSize: 16,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Profile Picturl URL:
                </Text>
                <TextInput
                  value={userData.profilepictureurl}
                  onChangeText={(value) => {
                    userData.profilepictureurl = value;
                    setUserData({ ...userData });
                  }}
                  style={{
                    flex: 1,
                    height: 40,
                    marginLeft: 5,
                    borderRadius: 5,
                    backgroundColor: Colors.cyan80,
                    paddingHorizontal: 5,
                    fontSize: 16,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  width: 100,
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.red30,
                  borderRadius: 5,
                  marginTop: 15,
                }}
                onPress={saveInformation}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}

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
        </TouchableOpacity>
        <View style={styles.logOutButton}>
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
    paddingHorizontal: 20,
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
  // logOutButton: {
  //   justifyContent: "flex-end",
  //   alignItems: "flex-end",
  // },
  // logOutText: {
  //   fontSize: 20,
  //   margin: 7,
  //   color: "white",
  //   fontWeight: "bold",
  // },
  menu: {
    borderRadius: 0,
  },
});

import React, { useState, useEffect } from "react";
import { View, Text, Avatar, Card, Colors } from "react-native-ui-lib";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const fetchUserInformation = async (userId) => {
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NjdkMGJiMC02ODY0LTQ2ODEtYjg5Yi0zMTE4MjAxMmRmNTgiLCJpYXQiOjE2NTU5NTA4MzcsImV4cCI6MTY1NTk1MjYzNywidHlwZSI6ImFjY2VzcyJ9.JByCeeBnv5VmQ5NM8g2RARBBZcXedxe39GmWlO1AiCE";
    try {
      let data = await fetch(`http://192.168.2.104:3000/v1/user/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      data = await data.json();
      setUserData(data);
      console.log("data", data);
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    fetchUserInformation("467d0bb0-6864-4681-b89b-31182012df58");
  }, []);
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
              {userData.role == 0 ? "Admin" : (userData.role == 1 ? "Moderator" : "User")}
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
        <Text style={styles.title}>Personal information</Text>
        <Card style={styles.infoCard}>
          <Text text60>
            <Text black>Full Name:{"  "}</Text>
            {userData.name}
          </Text>
        </Card>
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            style={{
              lineHeight: 50,
              fontSize: 20,
              textDecorationLine: "underline",
              color: "#1e90ff",
            }}
          >
            <Icon size={20} name="eye" /> My questions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
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
          <TouchableOpacity
            style={{ backgroundColor: "red", borderRadius: 20 }}
            activeOpacity={0.7}
          >
            <Text style={styles.logOutText}>Log out</Text>
          </TouchableOpacity>
        </View>
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
  infoCard: {
    height: 100,
    width: "100%",
    padding: 10,
    justifyContent: "space-around",
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
});

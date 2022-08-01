import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors, Card } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
import Post from "~components/Common/Post";
const MyQuestions = ({ content, title, status, userData, dateText, image }) => {
  return (
    <View>
      {status == 0 ?
      <Card style={styles.verifyCard}>
        <Text style={styles.status}>Pending</Text>
      </Card>
      : null}
      <Post
        content={content}
        title={title}
        userData={userData}
        dateText={dateText}
        image={image}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  verifyCard: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    backgroundColor: Colors.yellow20,
  },
  status: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.black,
  },
});
export default MyQuestions;

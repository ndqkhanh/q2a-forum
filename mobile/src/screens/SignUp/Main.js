import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
const ScreensSignUpMain = ({ navigation }) => {
  const onSignIn = () => {
    navigation.navigate("login_screen");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.mainIntro}>
          <Image
            source={require("~assets/img/signUp.gif")}
            style={styles.imgIntro}
          />
          <Text style={styles.title}>Create better together.</Text>
          <Text style={styles.subTitle}>Join our community</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.signInText}>Sign up</Text>

          <View style={styles.fieldContainer}>
            <Icon name="person-outline" style={styles.fieldIcon} />

            <TextInput style={styles.fieldInput} placeholder="Username" />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="lock-closed-outline" style={styles.fieldIcon} />

            <TextInput style={styles.fieldInput} placeholder="Password" />
          </View>
          <View style={styles.fieldContainer}>
            <Icon name="lock-closed-outline" style={styles.fieldIcon} />

            <TextInput
              style={styles.fieldInput}
              placeholder="Re-enter Password"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Icon name="image-outline" style={styles.fieldIcon} />

            <TextInput style={styles.fieldInput} placeholder="Picture" />
          </View>

          <View style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </View>
        </View>
        <View style={styles.signUpText}>
          <Text style={styles.newForum}>
            Joined us before?{" "}
            <Text
              style={{
                color: Colors.blue40,
                fontWeight: "bold",
              }}
              onPress={onSignIn}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainIntro: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imgIntro: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 25,
    color: Colors.blue20,
    fontWeight: "bold",
    marginTop: 5,
  },
  subTitle: {
    fontSize: 18,
    color: Colors.cyan10,
    marginTop: 10,
  },
  inputContainer: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
  signInText: {
    fontSize: 30,
    color: Colors.blue40,
    fontWeight: "bold",
  },
  fieldContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  fieldIcon: {
    fontSize: 28,
    color: Colors.cyan20,
  },
  fieldInput: {
    flex: 1,
    borderBottomColor: Colors.cyan70,
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.blue40,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.white,
  },
  signUpText: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: Colors.grey70,

    borderTopWidth: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  newForum: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.cyan10,
  },
});

export default ScreensSignUpMain;

import * as React from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  LogoImage: {
    flex: 1,
    width: null,
    height: 350,
  },
  HeaderText: {
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 20,
  },
  LoginView: {
    marginTop: 10,
  },
  LoginMenu: {
    alignItems: "center",
  },
  styleBackground: {
    flex: 1,
  },
  body: {
    justifyContent: "space-between",
  },
  inputStyle: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 10,
    width: 300,
    borderColor: "#2364AA",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 30,
  },
  buttonStyle: {
    width: 150,
    height: 50,
    backgroundColor: "#4933FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  pressText: {
    color: "#4933FF",
    fontSize: 20,
    textDecorationLine: "underline",
    marginLeft: 20,
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
const backGroundImg = require("../../assets/img/backgroundLogin.png");
const logo = require("../../assets/img/logo.png");

const LoginScreen = ({ navigation }) => {
  const toSignUp = () => {
    navigation.navigate("signup_screen");
  };
  return (
    <ImageBackground source={backGroundImg} style={styles.styleBackground}>
      <ScrollView>
        <Image source={logo} style={styles.LogoImage} />
        <View style={styles.LoginView}>
          <Text style={styles.HeaderText}>Log-in</Text>
          <View style={styles.LoginMenu}>
            <TextInput
              placeholder="Enter username"
              style={styles.inputStyle}
              maxLength={20}
            />
            <TextInput
              placeholder="Enter password"
              style={styles.inputStyle}
              maxLength={20}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>
          <Pressable onPress={toSignUp}>
            <Text style={styles.pressText}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default LoginScreen;

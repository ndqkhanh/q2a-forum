import * as React from "react";
import { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  LogoImage: {
    flex: 1,
    width: null,
    height: 300,
  },
  HeaderText: {
    fontWeight: "bold",
    fontSize: 40,
    marginLeft: 20,
  },
  SignupView: {
    marginTop: 10,
  },
  SignupMenu: {
    marginLeft: 10,
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  pressText: {
    color: "#4933FF",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
const color = StyleSheet.create({
  signUp: {
    backgroundColor: "#4933FF",
  },
  goBack: {
    backgroundColor: "#FF3333",
  },
});
const backGroundImg = require("../../assets/img/backgroundLogin.png");
const logo = require("../../assets/img/logo.png");

const SignupScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [hidePass, setHidePass] = useState(true);

  return (
    <ImageBackground source={backGroundImg} style={styles.styleBackground}>
      <ScrollView>
        <View style={styles.SignupView}>
          <Text style={styles.HeaderText}>Create your account</Text>
          <View style={styles.SignupMenu}>
            <TextInput
              placeholder="Enter username"
              style={styles.inputStyle}
              maxLength={20}
            />
            <TextInput
              placeholder="Enter password"
              style={styles.inputStyle}
              maxLength={20}
              secureTextEntry={hidePass}
            />
            <TextInput
              placeholder="Re-Enter password"
              style={styles.inputStyle}
              maxLength={20}
              secureTextEntry={hidePass}
            />
            <TextInput
              placeholder="Enter picture url"
              style={styles.inputStyle}
              maxLength={20}
            />
            <TouchableOpacity
              style={[styles.buttonStyle, color.signUp]}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goBack}
              style={[styles.buttonStyle, color.goBack]}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default SignupScreen;

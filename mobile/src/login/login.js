import * as React from "react";

import { View, Text, TextField, Button } from "react-native-ui-lib";
import { ScrollView } from "react-native";
const LoginScreen = ({ route }) => {
  const SignUp = route.params?.SignUp;
  const { username, setUsername } = React.useState(null);
  const { passWord, setPassWord } = React.useState(null);
  const { rePassWord, setRePassWord } = React.useState(null);
  const { pictureURL, setPictureURL } = React.useState(null);
  const thisLabel = SignUp == true ? "Sign up" : "Log in";
  return (
    <ScrollView>
      <View margin-5 style={{ flex: 1, justifyContent: "flex-start" }}>
        <View marginB-50 centerH>
          <Text text20>{SignUp == true ? "Register" : "Q&A forum"}</Text>
        </View>
        <TextField
          text50
          floatingPlaceholder
          placeholder="Enter username"
          placeholderTextColor="#4682B4"
          onChangeText={setUsername}
        />
        <TextField
          text50
          floatingPlaceholder
          placeholder="Enter password"
          placeholderTextColor="#4682B4"
          onChangeText={setPassWord}
        />
        {SignUp == true ? (
          <View>
            <TextField
              text50
              floatingPlaceholder
              placeholder="Re-enter password"
              placeholderTextColor="#4682B4"
              onChangeText={setRePassWord}
            />
            <TextField
              text50
              floatingPlaceholder
              placeholder="Enter picture url"
              placeholderTextColor="#4682B4"
              onChangeText={setPictureURL}
            />
          </View>
        ) : (
          <></>
        )}
        <View marginT-50>
          <Button text50 label={thisLabel} />
        </View>
      </View>
    </ScrollView>
  );
};

export { LoginScreen };

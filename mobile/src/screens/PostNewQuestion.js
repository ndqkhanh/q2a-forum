import React from "react";
import { View, Text, Card, Colors } from "react-native-ui-lib";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostQuestionScreen = ({navigation}) => {
  const richText = React.useRef();
  const [title, setTitle] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const postQuestion = async (passTitle, passContent) => {
    if (passTitle == null || passContent == null) {
      Alert.alert('Require','Title and content must contain something!')
    } else {
      try {
        var question = {
          Title: passTitle,
          Content: passContent
        };
        //await AsyncStorage.setItem("PostQuestion", JSON.stringify(question));
        navigation.navigate("Your Feed",question)
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Post a question</Text>
        <Icon
          name="log-out-outline"
          style={{
            fontSize: 30,
            color: Colors.cyan10,
          }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.textTitle}>Title</Text>
        <Card style={styles.typingTitle}>
          <TextInput onChangeText={(tilteText) => setTitle(tilteText)} />
        </Card>
        <Text style={styles.textTitle}>Content</Text>
        <RichToolbar
          editor={richText}
          actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
        />
        <Card style={styles.typingContent}>
          <RichEditor
            useContainer={false}
            ref={richText}
            onChange={(descriptionText) => {
              setContent(descriptionText);
              console.log("descriptionText:", descriptionText);
            }}
          />
        </Card>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={{ backgroundColor: Colors.red30, borderRadius: 20 }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Your Feed");
          }}
        >
          <Text style={styles.submitText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.blue40,
            borderRadius: 20,
            leftMargin: 20,
          }}
          activeOpacity={0.7}
          onPress={()=>postQuestion(title, content)}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120,
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerContainer: {
    height: 50,
    backgroundColor: Colors.white,
    //justifyContent: "center",
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
  body: {
    margin: 10,
    marginTop: 30,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    marginTop: 10,
  },
  typingTitle: {
    marginLeft: 10,
    marginTop: 10,
    width: "95%",
  },
  typingContent: {
    marginLeft: 10,
    marginTop: 10,
    width: "95%",
    height: "50%",
  },
  button: {
    justifyContent: "flex-end",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  submitText: {
    fontSize: 20,
    margin: 7,
    color: "white",
    fontWeight: "bold",
  },
});

import * as React from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Colors } from "react-native-ui-lib";
import SearchBar from "~components/SearchBar/SearchBar";
import Post from "~components/Common/Post";
import Icon from "react-native-vector-icons/Ionicons";
import { controllsSearchQuestion } from "~controller/controllQuestion";
import Q2APagination from "~components/Q2A/Pagination";
const SearchScreen = ({ navigation }) => {
  const [titleSearch, setTitleSearch] = React.useState("");
  const [feedData, setFeedData] = React.useState([{title:'aa', content:'bb'}])
  return (
    <SafeAreaView style={styles.backgroundView}>
      {/* <Text style={{ fontSize: 30, alignSelf: 'center', color: Colors.blue40 }}>Find question</Text> */}
      <View style={styles.headerContainer}>
        <View
          style={{
            height: 50,
            marginHorizontal: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.header}>Q & A Forum</Text>
          <Icon
            name="log-out-outline"
            style={{
              fontSize: 30,
              color: Colors.cyan10,
            }}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <SearchBar textChange={setTitleSearch}
        onPressSearch = {()=>controllsSearchQuestion(titleSearch,0,1)}
        >
        </SearchBar>
        <Q2APagination page={3} />
      </View>
      
      <ScrollView
        style={styles.body}>
      {feedData.map((record, index) => (
          <Post
            key = {index}
            title={record.title}
            content={record.content}
            numOfAnswers={'record.numOfAnswers'}
            userData={{
              name: 'record.userData.name',
              avatarUrl: 'record.userData.profilepictureurl',
            }}
            correctAnswer={'record.correctAnswerExists'}
          />
        ))}
        </ScrollView>
      {/* <View style={{ flex: 1 }}>
      <Image
          source={require("~assets/img/bloodbros-search.gif")}
          style={styles.imgIntro}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default SearchScreen;


const styles = StyleSheet.create({
  imgIntro: {
    marginTop:40,
    alignSelf:'center',
    width: 300,
    height: 300,
  },
  backgroundView: {
    flex: 1,
    backgroundColor: Colors.cyan70,
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.cyan70,
  },
  headerContainer: {
    backgroundColor: Colors.white,
    // justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

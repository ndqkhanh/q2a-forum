import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { Colors } from "react-native-ui-lib";
const HomeMainPosting = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        padding: 10,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: Colors.green5,
          }}
        ></Image>

        <View
          style={{
            flex: 1,
            marginLeft: 10,
          }}
        >
          <Text
            onPress={props?.clickText}
            style={[
              {
                fontSize: 15,
              },
              props.content
                ? { color: Colors.black }
                : { color: Colors.grey40 },
            ]}
          >
            {props.content ? props.content : "Write something..."}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderTopColor: Colors.grey70,
          borderTopWidth: 2,
          alignItems: "flex-end",
          marginTop: 10,
        }}
      >
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("....", {
              userId: "34343asdasd",
            });
          }}
          style={{
            backgroundColor: Colors.blue30,
            width: 70,
            height: 30,
            borderRadius: 5,
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: Colors.blue30,
              width: 70,
              height: 30,
              borderRadius: 5,
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Post
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default HomeMainPosting;

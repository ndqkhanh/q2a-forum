/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/Ionicons";
import { UserProvider } from "~provider/UserProvider";
import ScreensHomeMain from "~screens/Home/Main";
import SignupAndLogin from "~screens/SignupAndLogin/signupAndLogin";
import SearchScreen from "~screens/Search/Search";
import ProfileScreen from "~screens/Profile/UserProfile";

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}


const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home" // What tab do we want to default to
      screenOptions={{
        // This gives us the ability to add addtional
        headerShown: false,
        tabBarShowLabel: false, // options when we create the bottom tab
        tabBarStyle: [
          {
            // most importantly the style component
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            shadowColor: "#7F5DF0",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
            paddingBottom: 5,
          },
        ],
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search-circle-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Your Feed"
        component={ScreensHomeMain}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={ScreensHomeMain}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => console.log("test")}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon size={65} name="add-circle" color={Colors.purple10} />
            </TouchableOpacity>
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function TabBarIcon(props) {
  return <Icon size={30} style={{ marginBottom: -3 }} {...props} />;
}



const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{
            headerShown: false,
          }}>
          {/* <Stack.Screen name='Login' component={SignupAndLogin}/> */}
          <Stack.Screen name="Home" component={BottomTabNavigator} />
        </Stack.Navigator>

      </NavigationContainer>
    </UserProvider>

  );
};

export default App;

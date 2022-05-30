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
import {
  Easing,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "~assets/colors/colors";
import ScreensHomeMain from "~screens/Home/Main";
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const Stack = createNativeStackNavigator();

const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
  headerShown: false,
};
const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home" // What tab do we want to default to
      screenOptions={{
        // This gives us the ability to add addtional
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
            // ...style.shadow,
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
        name="Home1"
        component={ScreensHomeMain}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={ScreensHomeMain}
        options={{
          tabBarButton: () => (
            <TouchableWithoutFeedback onPress={() => console.log("test")}>
              <Icon size={65} name="add-circle" color={Colors.purple} />
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <BottomTab.Screen
        name="About"
        component={ScreensHomeMain}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="alarm" color={color} />,
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
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;

import * as React from "react";
import {useState} from 'react';

import {
    Text, View, StyleSheet,
    ScrollView, Image, TextInput, ImageBackground, TouchableOpacity
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "./login/login";
import { SignupScreen } from "./signup/signup";

const stack = createNativeStackNavigator();

const SignupAndLogin = () =>{
    return(
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name = 'login_screen' component={LoginScreen} 
                options = {{header: () => null}}
                />
                <stack.Screen name = 'signup_screen' component={SignupScreen}
                options = {{header: () => null}}
                />
            </stack.Navigator>
        </NavigationContainer>
    );
}
export {SignupAndLogin};
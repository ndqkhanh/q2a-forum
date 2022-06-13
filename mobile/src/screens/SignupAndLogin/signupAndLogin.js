import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./login/login";
import SignupScreen from "./signup/signup";

const stack = createNativeStackNavigator();

const SignupAndLogin = () =>{
    return(
            <stack.Navigator>
                <stack.Screen name = 'login_screen' component={LoginScreen} 
                options = {{header: () => null}}
                />
                <stack.Screen name = 'signup_screen' component={SignupScreen}
                options = {{header: () => null}}
                />
            </stack.Navigator>
    );
}
export default SignupAndLogin;
import * as React from "react";

import { View, Text, TextField, Button } from "react-native-ui-lib"

const LoginScreen = (prop) => {
    const thisLabel = prop.SignIn == true ? 'Sign up' : 'Log in';
    return (

        <View margin-50>
            <View marginB-50 centerH>
                <Text text20 >
                    {prop.SignIn == true ? 'Register' : 'Q&A forum'}
                </Text>
            </View>
            <TextField
                text50
                floatingPlaceholder
                placeholder='Enter username'
                placeholderTextColor='#4682B4'
            />
            <TextField
                text50
                floatingPlaceholder
                placeholder='Enter password'
                placeholderTextColor='#4682B4'
            />
            {prop.SignIn == true ?
                <TextField
                    text50
                    floatingPlaceholder
                    placeholder='Re-enter password'
                    placeholderTextColor='#4682B4'
                /> :
                <></>}
            <View marginT-50>
                <Button text50 label={thisLabel} />
            </View>
        </View>
    )
}

export { LoginScreen };
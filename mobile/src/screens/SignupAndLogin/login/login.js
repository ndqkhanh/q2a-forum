import * as React from "react";

import {
    Text, View, StyleSheet,
    ScrollView, Image, TextInput, Dimensions, Pressable, TouchableOpacity, SafeAreaView, Alert
} from 'react-native';
import { Colors } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const backGroundImg = require('../../assets/img/backgroundLogin.png');
const logo = require('~assets/img/logo.png');
const heigh = Dimensions.get('screen').height;

const LoginScreen = ({ navigation }) => {
    const toSignUp = () => {
        navigation.navigate('signup_screen')
    }
    const [userName, setUserName] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    React.useEffect(() => { getLocalToken(); }, [])

    const getLocalToken = () => {
        try {
            AsyncStorage.getItem('UserAccount').then(
                (value) => {
                    let user = JSON.parse(value)
                    if (user.username == 'Hoang')
                    {
                        navigation.navigate('Home');
                    //or if token exist => navigate('Home')
                        
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    const requestUserNamePassword = async () => {
        // request on database to get token and then if valid username and password, 
        //we will store them or store token
        if (userName.length == 0) {
            Alert.alert('Warning!', 'Please enter your username')
        } else {
            try {
                var UserAccount ={
                    username: userName,
                    pass: password,
                }
                await AsyncStorage.setItem('UserAccount', JSON.stringify(UserAccount));
                //store token as well.
                navigation.navigate('Home');
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.scorllViewStyle} showsVerticalScrollIndicator={false}>
                <View style={styles.screenView}>
                    <Image source={logo}
                        style={styles.LogoImage}
                    />
                    <View style={styles.LoginView}>

                        <Text style={styles.HeaderText}>
                            Log-innn
                        </Text>
                        <View style={styles.LoginMenu}>
                            <TextInput placeholder="Enter username" style={styles.inputStyle} maxLength={20}
                                onChangeText={(name) => setUserName(name)}
                            />
                            <TextInput placeholder="Enter password" style={styles.inputStyle} maxLength={20} secureTextEntry={true}
                                onChangeText={(pass) => setPassword(pass)}
                            />
                            <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.8}
                                onPress={requestUserNamePassword}
                            >
                                <Text style={styles.buttonText}>
                                    Log in
                                </Text>
                            </TouchableOpacity>
                            <Pressable onPress={toSignUp}>
                                <Text style={styles.pressText}>
                                    Sign Up
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default LoginScreen;
const styles = StyleSheet.create({
    LogoImage: {
        flex: 1,
        width: null,
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    LoginView: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,
    },
    LoginMenu: {
        alignItems: 'center',
    },
    inputStyle: {
        borderWidth: 3,
        borderRadius: 10,
        width: 300,
        borderColor: '#2364AA',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    buttonStyle: {
        width: 150,
        height: 50,
        backgroundColor: '#4933FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    pressText: {
        color: '#4933FF',
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    buttonText: {
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    scorllViewStyle: {
        backgroundColor: Colors.cyan70,
    },
    screenView: {
        height: heigh,
    }

});
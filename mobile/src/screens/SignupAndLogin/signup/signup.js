import * as React from "react";
import {useState} from 'react';

import {
    Text, View, StyleSheet,
    ScrollView, Image, TextInput, ImageBackground, TouchableOpacity
} from 'react-native';
import { Colors } from "react-native-ui-lib";

const styles = StyleSheet.create({
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    SignupView: {
        marginTop: 10,
        alignItems: 'center',
    },
    SignupMenu: {
        alignItems: 'center',
    },
    inputStyle: {
        borderWidth: 3,
        borderRadius: 10,
        width: 300,
        borderColor: '#2364AA',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 30,
    },
    buttonStyle: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    pressText: {
        color: '#4933FF',
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    buttonText: {
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: 20
    },
    scorllViewStyle: {
        backgroundColor: Colors.cyan70,
    },

});
const color = StyleSheet.create({
    signUp:{
        backgroundColor: '#4933FF',
    },
    goBack:{
        backgroundColor: '#FF3333',
    }
});

const SignupScreen = ({navigation}) => {
    const goBack = () =>{
        navigation.goBack();
    }
    const [hidePass, setHidePass] = useState(true);

    return (
            <ScrollView style = {styles.scorllViewStyle}>
                <View style={styles.SignupView}>

                    <Text style={styles.HeaderText}>
                        Create your account
                    </Text>
                    <View style={styles.SignupMenu}>
                        <TextInput placeholder="Enter username" style={styles.inputStyle} maxLength={20} />
                        <TextInput placeholder="Enter password" style={styles.inputStyle} maxLength={20} secureTextEntry = {hidePass}/>
                        <TextInput placeholder="Re-Enter password" style={styles.inputStyle} maxLength={20} secureTextEntry = {hidePass}/>
                        <TextInput placeholder="Enter picture url" style={styles.inputStyle} maxLength={20} />
                        <TouchableOpacity style = {[styles.buttonStyle, color.signUp]} activeOpacity = {0.8}>
                            <Text style = {styles.buttonText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {goBack} style = {[styles.buttonStyle, color.goBack]} activeOpacity = {0.8}>
                            <Text style = {styles.buttonText}>
                                Go Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
    );
}
export default SignupScreen;
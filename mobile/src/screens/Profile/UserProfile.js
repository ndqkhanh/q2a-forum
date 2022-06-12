import React from "react";
import {View, Text, Avatar, Card} from "react-native-ui-lib";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoSection}>
                <Avatar
                    rounded
                    source={
                        require('~assets/img/penguin.png')
                    }
                    size={70}
                />
                <View marginLeft={10}>
                    <Text style={styles.title}>
                        Gavasto02
                    </Text>
                    <Text>
                        <Icon size={10} name="ellipse" color="blue"/>
                        Role
                    </Text>
                </View>
            </View>
            <View style={styles.infoSection}>
                <Card style={styles.QA_card}>
                    <Text text10 center black>
                        150
                    </Text>
                    <Text text60 center black>
                        Questions
                    </Text>
                </Card>
                <Card style={styles.QA_card}>
                    <Text text10 center black>
                        1500
                    </Text>
                    <Text text60 center black>
                        Answers
                    </Text>
                </Card>
            </View>
            <Text style={styles.title}>
                Personal information
            </Text>
            <Card style={styles.infoCard}>
                <Text text60>
                    <Text black>
                        Full Name:{'  '}
                    </Text>
                    Nguyễn Vũ Kiến Quốc
                </Text>
                <Text text60>
                    <Text black>
                        Join date:{'   '}
                    </Text>
                    30/5/2022
                </Text>
            </Card>
            <TouchableOpacity activeOpacity={0.7}>
                <Text style={{lineHeight:50, fontSize:20, textDecorationLine:'underline', color:'#1e90ff'}}>
                    <Icon size={20} name="create-outline"/>
                    {' '}Edit Profile
                </Text>
            </TouchableOpacity>
            <View style={styles.logOutButton}>
                <TouchableOpacity style={{backgroundColor:'red', borderRadius: 20}}>
                    <Text style={styles.logOutText}>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10
    },
    infoSection: {
        margin: 10,
        flexDirection: 'row'
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10
    },
    QA_card: {
        height: 120,
        width: '45%',
        padding: 5,
        marginLeft: 10
    },
    infoCard: {
        height: 100,
        width: '100%',
        padding: 10,
        justifyContent: 'space-around'
    },
    logOutButton:{
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 90,
        alignItems: 'flex-end',
    },
    logOutText:{
        fontSize: 20,
        margin: 7,
        color: 'white',
        fontWeight: 'bold'
    }
});
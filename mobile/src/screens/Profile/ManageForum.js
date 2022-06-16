import React, { useState, useContext } from "react";
import {View, Text, Avatar, Card, Colors} from "react-native-ui-lib";
import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "~provider/UserProvider";
import PendingQuestion from "~components/Common/PendingQuestionList";
import User from "~components/Common/UserList";
import { TextInput } from "react-native-gesture-handler";

const ManageForumScreen = () => {
    const [isPressed, setIsPressed] = useState([true,false,false]);
    const { userData } = useContext(UserContext);
    const questionsPressed = () => {
        setIsPressed([true,false,false]);
    }
    const usersPressed = () => {
        setIsPressed([false,true,false]);
    }
    const configPressed = () => {
        setIsPressed([false,false,true]);
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Manage Forum</Text>
                <Icon
                name="log-out-outline"
                style={{
                    fontSize: 30,
                    color: Colors.cyan10,
                }}
                />
            </View>
            <View style={styles.body}>
                <View style={styles.infoSection}>
                    <Card style={styles.QA_card}>
                        <Text style={{fontWeight:'bold', fontSize:30}} center black>
                            150
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:12}} center black >
                            Questions
                        </Text>
                    </Card>
                    <Card style={styles.QA_card}>
                        <Text style={{fontWeight:'bold', fontSize:30}} center black>
                            1500
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:12}} center black>
                            Users
                        </Text>
                    </Card>
                    <Card style={styles.QA_card}>
                        <Text style={{fontWeight:'bold', fontSize:30}} center black>
                            15000
                        </Text>
                        <Text style={{fontWeight:'bold', fontSize:12}} center black >
                            Answers
                        </Text>
                    </Card>
                </View>
                <View style={styles.infoSection}>
                    <TouchableOpacity onPress={questionsPressed}>
                        <Card style={styles.menu}  {...isPressed[0] ? {backgroundColor:Colors.blue60}:{}}>
                            <Text black>
                                Pending questions
                            </Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={usersPressed}>
                        <Card style={styles.menu} {...isPressed[1] ? {backgroundColor:Colors.blue60}:{}}>
                            <Text black>
                                Users
                            </Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={configPressed}>
                        <Card style={styles.menu} {...isPressed[2] ? {backgroundColor:Colors.blue60}:{}}>
                            <Text black>
                                Config
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </View>
                {isPressed[0] ?
                    
                    <View>
                    <PendingQuestion
                        dateText={"3 days ago"}
                        title={"Câu hỏi về game?"}
                        content={
                            "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
                        }
                        userData={{
                            name: "Bảo Dragon",
                            avatarUrl:
                            "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
                        }}
                        />
                    <PendingQuestion
                        dateText={"14 days ago"}
                        title={"Alo alo?"}
                        content={
                            "Mọi người em có 1 thắc mắc là làm sao mình là như thế làm thế nọ ạ."
                        }
                        image={
                            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        }
                        userData={{
                            name: "Chó Khánh",
                            avatarUrl:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU",
                        }}
                    />
                    </View>
                    
                    :
                    null
                }
                {isPressed[1] ?
                    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                    <User
                        userData={{
                            name: "Bảo Dragon",
                            avatarUrl:
                            "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg",
                        }}
                        />
                    <User
                        userData={{
                            name: "Chó Khánh",
                            avatarUrl:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU",
                        }}
                    />
                    </ScrollView>
                    :
                    null
                }
                {isPressed[2] ?
                    <View>
                        <View style={styles.config}>
                        <Text style={styles.configText}>
                            Number of questions in feed:
                        </Text>
                        <Card style={styles.inputCard} paddingRight={50}>
                                <TextInput maxLength={2} style={styles.inputText}>
                                </TextInput>
                        </Card>
                        </View>
                        <View style={styles.config}>
                            <Text style={styles.configText}>
                                Forum name:
                            </Text>
                            <Card style={styles.inputCard} paddingRight={95}>
                                    <TextInput placeholder="Max 20 letters" maxLength={20}>
                                    </TextInput>
                            </Card>
                        </View>
                    </View>
                    :
                    null
                }
                    
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ManageForumScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    //   marginLeft: 10,
    //   marginRight: 10
    },
    body: {
        marginLeft: 10,
        marginRight: 10
    },
    headerContainer: {
        height: 50,
        backgroundColor: Colors.white,
        // justifyContent: "center",
        //marginHorizontal: 20,
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      header: {
        fontSize: 20,
        fontWeight: "bold",
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
        height: 80,
        width: '30%',
        padding: 5,
        marginLeft: 10
    },
    menu: {
        borderRadius: 0,
        paddingLeft: 20,
        paddingRight: 30,
        marginRight:2
    },
    config: {
        backgroundColor:'white',
        borderRadius:40,
        borderWidth:2,
        borderColor:Colors.blue20,
        margin: 20,
        padding: 10,
        alignItems:'center',
        flexDirection:'row',
    },
    configText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        
    },
    inputCard: {
        marginLeft:10,
        backgroundColor:Colors.grey60,
        height:'80%',
        
    },
    inputText: {
        textAlign: 'center',
    },
});
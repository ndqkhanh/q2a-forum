import React from "react";
import StyleSheet from "react-native"
import { View, Text, Card, } from "react-native-ui-lib";
const PersonalInfo = ({userData}) => {
    return (
        <View>
            <Card style={{
                height: 100,
                width: "100%",
                padding: 10,
                justifyContent: "space-around",
            }}>
                <Text text40 black>
                    Full name:{' '}
                    <Text>
                        {userData.name}dasjdak
                    </Text>
                </Text>
            </Card>
        </View>
    )
}

export default PersonalInfo;
import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { Button, Card, Text, View } from "react-native-ui-lib";
import HomeMainWelcome from "~components/Home/Main/Welcome";
import { UserContext } from "~provider/UserProvider";

const ScreensHomeMain = () => {
  const { userData } = useContext(UserContext);
  return (
    <SafeAreaView>
      <View flex padding-page>
        <Text heading marginB-s4>
          My Screen
        </Text>
        <HomeMainWelcome name={userData.name} />

        <Button label="Button" body bg-primaryColor square></Button>
      </View>
    </SafeAreaView>
  );
};

export default ScreensHomeMain;

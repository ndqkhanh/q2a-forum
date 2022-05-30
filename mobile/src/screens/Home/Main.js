import * as React from "react";
import { SafeAreaView } from "react-native";
import { Button, Card, Text, View } from "react-native-ui-lib";

const ScreensHomeMain = () => {
  const [user, setUser] = React.useState({});
  const fetchUserInformation = async () => {
    try {
      let data = await fetch("https://api.ipify.org/?format=json", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      setUser(data);
      console.log("data", data);
    } catch (error) {
      console.error("error", error);
    }
  };

  React.useEffect(() => {
    fetchUserInformation();
  }, []);
  return (
    <SafeAreaView>
      <View flex padding-page>
        <Text heading marginB-s4>
          My Screen
        </Text>
        <Card height={100} center padding-card marginB-s4>
          <Text body>Hi {user.username}</Text>
        </Card>

        <Button label="Button" body bg-primaryColor square></Button>
      </View>
    </SafeAreaView>
  );
};

export default ScreensHomeMain;

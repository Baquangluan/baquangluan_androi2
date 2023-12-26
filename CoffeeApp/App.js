const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Onboarding from "./screens/Onboarding";
import Order from "./screens/Order";
import DetailItem from "./screens/DetailItem";
import Home from "./screens/Home";
import LoginScreen1 from "./screens/LoginScreen1";
import LoginScreen2 from "./screens/LoginScreen2";
import Success from "./screens/Success";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { AuthProvider } from "./screens/AuthContext";


const App = () => {

  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
    <AuthProvider>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator   screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
              
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Order"
              component={Order}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailItem"
              component={DetailItem}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen1"
              component={LoginScreen1}
              options={{ headerShown: false }}
           
            />
            <Stack.Screen
              name="LoginScreen2"
              component={LoginScreen2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
      </AuthProvider>
    </>
  );
};
export default App;

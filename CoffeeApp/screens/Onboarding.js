import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, TouchableHighlight,Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily } from "../GlobalStyles";



const Onboarding = ({navigation}) => {

  const onPressHome = () => {
    navigation.navigate("Home");

  };
  const onPressLogin = () => {
    navigation.navigate("LoginScreen1");
  };
  
  return (
    <View style={styles.onboarding}>
      <Image
        style={[styles.image3Icon, styles.image3IconPosition]}
        contentFit="cover"
        source={require("../assets/image-3.png")}
      />
      <LinearGradient
        style={[styles.onboardingChild, styles.image3IconPosition]}
        locations={[0, 0.24]}
        colors={["rgba(0, 0, 0, 0)", "#000"]}
      />
      <Text style={[styles.coffeeSoGood, styles.coffeeSoGoodPosition]}>
        Coffee so good, your taste buds will love it.
      </Text>
      <Text style={[styles.theBestGrain, styles.coffeeSoGoodPosition]}>
        The best grain, the finest roast, the powerful flavor.
      </Text>
      <TouchableHighlight onPress={onPressLogin}>
      <View style={[styles.getStartedWrapper, styles.coffeeSoGoodPosition]}>
        <Text style={[styles.getStarted, styles.getStartedTypo]}>
          Get Started
        </Text>
      </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  image3IconPosition: {
    left: 0,
    position: "absolute",
  },
  coffeeSoGoodPosition: {
    width: 315,
    left: 55,
    position: "absolute",
  },
  getStartedTypo: {
    color: Color.colorWhite,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  image3Icon: {
    top: -40,
    width: "105%",
    height: 702,
  },
  onboardingChild: {
    top: 450,
    width: 415,
    height: 402,
    backgroundColor: "transparent",
  },
  coffeeSoGood: {
    top: 462,
    fontSize: 34,
    letterSpacing: 0.3,
    textAlign: "center",
    width: 315,
    left: 30,
    color: Color.colorWhite,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  theBestGrain: {
    top: 589,
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 22,
    fontFamily: FontFamily.soraRegular,
    color: "#a9a9a9",
    textAlign: "center",
    width: 315,
    left: 30,
  },
  getStarted: {
    fontSize: 16,
    textAlign: "left",
  },
  getStartedWrapper: {
    top: 647,
    borderRadius: 16,
    backgroundColor: "#c67c4e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 109,
    paddingVertical: 21,
    width: 315,
    left: 30,
  },
  onboarding: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default Onboarding;

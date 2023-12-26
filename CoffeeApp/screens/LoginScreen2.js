import React, { useState } from 'react';
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, Border } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
import { Alert } from 'react-native';

const LoginScreen2 = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleLogin = async () => {
    if (!fullname || !password) {
      Alert.alert('Điền thông tin đầy đủ!');
      return;
    }
    // Địa chỉ URL của API
    const apiUrl = 'http://192.168.137.167:8081/api/users';

    const data = {
      fullname: fullname,
      password: password,
      email:email,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      if (response.ok) {

        navigation.navigate("LoginScreen1");
        Alert.alert('Đăng ký thành công');
      } else {
        Alert.alert('Đăng ký không thành công');
        const errorData = await response.json(); // Đọc dữ liệu lỗi từ phản hồi JSON
        console.error('Lỗi đăng nhập:', errorData);
      }
    } catch (error) {
      console.error('Lỗi kết nối: ', error);
    }
  };
  // const onPressRegister = () => {
  //   navigation.navigate("LoginScreen1");
  // };
  return (
    <View style={styles.loginScreen2}>
      <Image
        style={[styles.saly16Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/saly16.png")}
      />
      <View style={styles.illustration}>
        <Image
          style={[styles.avatarIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/avatar.png")}
        />
        <Image
          style={styles.illustrationChild}
          contentFit="cover"
          source={require("../assets/ellipse-14.png")}
        />
        <Image
          style={[styles.image1Icon, styles.strongPosition]}
          contentFit="cover"
          source={require("../assets/image-1.png")}
        />
      </View>
  
      <View style={styles.title}>
        <Text style={styles.getStartedFree}>Get Started Free</Text>
        <Text style={[styles.freeForeverNo, styles.yourNameTypo]}>
          Free Forever. No Credit Card Needed
        </Text>
      </View>
      <Pressable
        style={[styles.signupButton, styles.signupLayout1]}
        onPress={() => {}}
      >
        <TouchableHighlight onPress={handleLogin}>
        <LinearGradient
          style={[styles.signupButtonChild, styles.signupLayout1]}
          locations={[0, 1]}
          colors={["#9c3fe4", "#c65647"]}
        />
        </TouchableHighlight>
        <TouchableHighlight onPress={handleLogin}>
        <Text style={[styles.signUp, styles.signTypo]}>Sign up</Text>
        </TouchableHighlight>
      </Pressable>
      <View style={[styles.name, styles.nameLayout]}>
        <Image
          style={[styles.cardIcon, styles.nameLayout]}
          contentFit="cover"
          source={require("../assets/card.png")}
        />
        <Image
          style={[styles.vectorIcon, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
        <TextInput style={[styles.yourname, styles.yournameTypo]}  onChangeText={text => setFullname(text)}
        value={fullname} placeholder="Your Name"></TextInput>
      </View>
      <Text style={[styles.emailAdress, styles.yourNameTypo]}>
        Email Adress
      </Text>
      <Text style={[styles.yourName, styles.yourNameTypo]}>Your Name</Text>
      <Text style={[styles.password, styles.yourNameTypo]}>Password</Text>
      <Text style={[styles.password, styles.yourNameTypo]}>Password</Text>
      <View style={[styles.password2, styles.nameLayout]}>
        <Image
          style={[styles.cardIcon, styles.nameLayout]}
          contentFit="cover"
          source={require("../assets/card1.png")}
        />
        <Image
          style={[styles.vectorIcon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />
        <TextInput style={styles.ellipseParent }  onChangeText={text => setPassword(text)}
        value={password} placeholder="******">
      
        </TextInput>
        <View style={[styles.strong, styles.strongPosition]}>
          <Text style={[styles.strong1, styles.signTypo]}>Strong</Text>
          <View style={[styles.strongChild, styles.strongLayout]} />
          <View style={[styles.strongItem, styles.strongLayout]} />
          <View style={[styles.strongInner, styles.strongLayout]} />
        </View>
      </View>
      <View style={styles.signupWith}>
        <Text style={[styles.orSignUp, styles.signTypo]}>Or sign up with</Text>
        <Image
          style={[styles.signupWithChild, styles.signupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-3.png")}
        />
        <Image
          style={[styles.signupWithItem, styles.signupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4.png")}
        />
      </View>
      <Image
        style={[styles.buttonsIcon, styles.buttonsIconLayout]}
        contentFit="cover"
        source={require("../assets/buttons.png")}
      />
      <Image
        style={[styles.buttonsIcon1, styles.buttonsIconLayout]}
        contentFit="cover"
        source={require("../assets/buttons1.png")}
      />
      <View style={styles.objects}>
        <Image
          style={styles.frontShapesIcon}
          contentFit="cover"
          source={require("../assets/front-shapes.png")}
        />
        <Image
          style={[styles.frontShapesIcon1, styles.frontIconPosition]}
          contentFit="cover"
          source={require("../assets/front-shapes1.png")}
        />
        <Image
          style={styles.frontShapesIcon2}
          contentFit="cover"
          source={require("../assets/front-shapes2.png")}
        />
        <Image
          style={[styles.frontShapesIcon3, styles.frontIconPosition]}
          contentFit="cover"
          source={require("../assets/front-shapes3.png")}
        />
      </View>
      <View style={[styles.email, styles.nameLayout]}>
        <Image
          style={[styles.cardIcon, styles.nameLayout]}
          contentFit="cover"
          source={require("../assets/email.png")}
        />
        <TextInput style={[styles.yournamegmailcom, styles.yournameTypo]}  onChangeText={text => setEmail(text)}
        value={email} placeholder="yourname@gmail.com">
          
        </TextInput>
        <Image
          style={[styles.vectorIcon2, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
      </View>
      <Image
        style={[styles.buttonsIcon2, styles.buttonsIconLayout]}
        contentFit="cover"
        source={require("../assets/buttons2.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  strongPosition: {
    top: 20,
    position: "absolute",
  },
  yourNameTypo: {
    color: Color.colorDarkgray,
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  signupLayout1: {
    height: 50,
    width: 314,
    position: "absolute",
  },
  signTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  nameLayout: {
    height: 55,
    width: 314,
    position: "absolute",
  },
  vectorIconPosition: {
    top: "36.36%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  yournameTypo: {
    top: 19,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: 14,
    textAlign: "left",
    position: "absolute",
  },
  frameLayout: {
    height: 5,
    width: 5,
  },
  strongLayout: {
    height: 2,
    width: 11,
    borderRadius: Border.br_3xs,
    top: 8,
    position: "absolute",
  },
  signupLayout: {
    height: 1,
    width: 98,
    top: 8,
    position: "absolute",
  },
  buttonsIconLayout: {
    height: 44,
    width: 58,
    top: 793,
    position: "absolute",
  },
  frontIconPosition: {
    top: 37,
    position: "absolute",
  },
  saly16Icon: {
    height: "23.07%",
    width: "20.93%",
    top: "23.71%",
    right: "-3.95%",
    bottom: "53.22%",
    left: "83.02%",
  },
  avatarIcon: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  illustrationChild: {
    left: 81,
    width: 48,
    height: 48,
    top: 11,
    position: "absolute",
  },
  image1Icon: {
    left: 89,
    width: 24,
    height: 30,
  },
  illustration: {
    height: "25.54%",
    width: "78.6%",
    top: "0.86%",
    right: "-12.79%",
    bottom: "73.61%",
    left: "34.19%",
    position: "absolute",
  },
  backgroundIcon: {
    top: 126,
    width: 904,
    height: 1037,
    left: 0,
    position: "absolute",
  },
  getStartedFree: {
    fontSize: 40,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: "#efefef",
    textAlign: "left",
    top: 0,
    left: 0,
    position: "absolute",
  },
  freeForeverNo: {
    top: 52,
    left: 24,
  },
  title: {
    top: 201,
    left: 65,
    width: 330,
    height: 73,
    position: "absolute",
  },
  signupButtonChild: {
    borderRadius: 15,
    backgroundColor: "transparent",
    top: 0,
    left: 0,
  },
  signUp: {
    left: 130,
    fontSize: 18,
    color: "#fff",
    top: 13,
  },
  signupButton: {
    top: 629,
    left: 53,
  },
  cardIcon: {
    top: 0,
    left: 0,
  },
  vectorIcon: {
    height: "30.4%",
    width: "5.54%",
    right: "87.77%",
    bottom: "33.24%",
    left: "6.69%",
  },
  yourname: {
    left: 57,
  },
  name: {
    top: 433,
    left: 53,
    height: 55,
  },
  emailAdress: {
    top: 306,
    left: 53,
  },
  yourName: {
    top: 406,
    left: 53,
  },
  password: {
    top: 500,
    left: 53,
  },
  vectorIcon1: {
    height: "33.29%",
    width: "5.83%",
    top: "35.82%",
    right: "87.8%",
    bottom: "30.9%",
    left: "6.37%",
  },
  frameItem: {
    marginLeft: 3.03,
  },
  ellipseParent: {
    top: 20,
    flexDirection: "row",
    left: 58,
    position: "absolute",
  },
  strong1: {
    left: 44,
    fontSize: 10,
    color: "#9fdba1",
    top: 0,
  },
  strongChild: {
    left: 28,
    backgroundColor: "#8f8f8f",
  },
  strongItem: {
    backgroundColor: "#4caf50",
    left: 14,
  },
  strongInner: {
    backgroundColor: "#009606",
    left: 0,
  },
  strong: {
    left: 223,
    width: 79,
    height: 16,
  },
  password2: {
    top: 537,
    left: 53,
    height: 55,
  },
  orSignUp: {
    left: 109,
    fontSize: 11,
    color: "#b6b6b6",
    top: 0,
  },
  signupWithChild: {
    left: 0,
  },
  signupWithItem: {
    left: 205,
  },
  signupWith: {
    top: 758,
    left: 60,
    width: 303,
    height: 17,
    position: "absolute",
  },
  buttonsIcon: {
    left: 265,
  },
  buttonsIcon1: {
    left: 186,
  },
  frontShapesIcon: {
    top: 261,
    width: 83,
    height: 125,
    left: 14,
    position: "absolute",
  },
  frontShapesIcon1: {
    width: 150,
    height: 129,
    left: 14,
  },
  frontShapesIcon2: {
    top: 316,
    left: 348,
    width: 96,
    height: 106,
    position: "absolute",
  },
  frontShapesIcon3: {
    left: 355,
    width: 89,
    height: 65,
  },
  objects: {
    top: -37,
    left: -14,
    width: 477,
    height: 418,
    position: "absolute",
  },
  yournamegmailcom: {
    left: 58,
  },
  vectorIcon2: {
    height: "27.27%",
    width: "6.05%",
    right: "86.94%",
    bottom: "36.36%",
    left: "7.01%",
  },
  email: {
    top: 339,
    left: 53,
  },
  buttonsIcon2: {
    left: 108,
  },
  loginScreen2: {

    backgroundColor: "#151316",
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default LoginScreen2;

import React, { useState } from 'react';
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, TouchableHighlight,TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';  
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';

const LoginScreen1 = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const handleLogin = () => {
    axios.get('http://192.168.137.167:8081/api/users')
      .then(response => {
     
        const data = response.data;
        const users = data.content;
        const user = users.find(user => user.email === email);
        if (user) {
          if (user.password === password) {
            const fullname = user.fullname;
            setUser(user);
            navigation.navigate("Home");
            Alert.alert(`Xin chào ${fullname}`);
          } else {
            Alert.alert('Mật khẩu không đúng.');
          }
        } else {
          Alert.alert('Tên người dùng không tồn tại.');
        }
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu người dùng:', error);
      });
  };

//ấn hiện *
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onPressLogin = async () => {
    navigation.navigate("LoginScreen2");
  };
  const onPressHome = () => {
    navigation.navigate("Home");
  };
  
  return (
    <View style={styles.loginScreen1}>
      <Image
        style={[styles.illustrationIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/illustration.png")}      
      />
    
      <View style={styles.objects}>
        <Image
          style={styles.frontShapesIcon}
          contentFit="cover"
          source={require("../assets/front-shapes.png")}
        />
        <Image
          style={styles.frontShapesIcon1}
          contentFit="cover"
          source={require("../assets/front-shapes1.png")}
        />
        <Image
          style={[styles.saly16Icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/saly16.png")}
        />
      </View>
      
      <Pressable
        style={[styles.signinButton, styles.signinLayout]}
        onPress={() => {}}
      >
        <TouchableHighlight onPress={handleLogin}>
        <LinearGradient
          style={[styles.signinButtonChild, styles.signinLayout]}
          locations={[0, 1]}
          colors={["#9c3fe4", "#c65647"]}
        />
        </TouchableHighlight>
        <TouchableHighlight onPress={handleLogin} >
        <Text style={[styles.signIn, styles.signInFlexBox]}>Sign in</Text>
        </TouchableHighlight>
      </Pressable>
      
      <View style={styles.continueWith}>
        <Text style={[styles.orContinueWith, styles.signInFlexBox]}>
          Or continue with
        </Text>
        <Image
          style={[styles.continueWithChild, styles.continueLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-3.png")}
        />
        <Image
          style={[styles.continueWithItem, styles.continueLayout]}
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
      <Image
        style={[styles.buttonsIcon2, styles.buttonsIconLayout]}
        contentFit="cover"
        source={require("../assets/buttons2.png")}
      />
      <View style={[styles.username, styles.usernameLayout]}>
        <Image
          style={[styles.cardIcon, styles.usernameLayout]}
          contentFit="cover"
          source={require("../assets/card.png")}
        />
        <Image
          style={[styles.vectorIcon, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
      <TextInput style={[styles.username1, styles.passwordTypo] } onChangeText={text => setEmail(text)}
        value={email} placeholder="Enter your email"
        placeholderTextColor="#928F8F"></TextInput>
      </View>
      <Text style={[styles.username2, styles.passwordTypo]}>Email</Text>
      <Text style={[styles.password, styles.passwordTypo]}>Password</Text>
      <Text style={[styles.password, styles.passwordTypo]}>Password</Text>
      <TouchableHighlight onPress={onPressLogin}>
      <Text style={[styles.forgotPassword, styles.passwordTypo]}>
        Reigister?
      </Text>
      </TouchableHighlight>
      <View style={[styles.password2, styles.usernameLayout]}>
        <Image
          style={[styles.cardIcon, styles.usernameLayout]}
          contentFit="cover"
          source={require("../assets/card1.png")}
        />
        <Image
          style={[styles.vectorIcon1, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />

      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Image
          style={[styles.vectorIcon2]}
          contentFit="contain"
          source={require("../assets/vector2.png")}
        /> 
      </TouchableOpacity>

        <TextInput style={styles.ellipseParent} onChangeText={text => setPassWord(text)}
        value={password}
        secureTextEntry={!showPassword} 
        placeholder="Enter your password"
        placeholderTextColor="#A8A6A6"
        >
        

        </TextInput>
      </View>
      <View style={styles.title}>
        <Text style={[styles.welcomeBackWe, styles.passwordTypo]}>
          welcome back we missed you
        </Text>
        <Text style={[styles.welcomeBack, styles.signInFlexBox]}>
          Welcome Back!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  signinLayout: {
    height: 50,
    width: 314,
    position: "absolute",
  },
  signInFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  continueLayout: {
    height: 1,
    width: 98,
    top: 8,
    position: "absolute",
  },
  buttonsIconLayout: {
    height: 44,
    width: 58,
    top: 652,
    position: "absolute",
  },
  usernameLayout: {
    height: 55,
    width: 314,
    position: "absolute",
  },
  vectorIconPosition: {
    left: "6.37%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  passwordTypo: {
    color: Color.colorDarkgray,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  frameLayout: {
    height: 5,
    width: 5,
  },
  illustrationIcon: {
    height: "42.17%",
    width: "100.47%",
    top: "0%",
    right: "-0.47%",
    bottom: "57.83%",
    left: "0%",
  },
  backgroundIcon: {
    top: 126,
    width: 904,
    height: 1037,
    left: 0,
    position: "absolute",
  },
  frontShapesIcon: {
    top: -6,
    left: 14,
    width: 83,
    height: 125,
    position: "absolute",
  },
  frontShapesIcon1: {
    top: 49,
    left: 348,
    width: 96,
    height: 106,
    position: "absolute",
  },
  saly16Icon: {
    height: "109.14%",
    width: "19.13%",
    top: "-4.57%",
    right: "2%",
    bottom: "-4.57%",
    left: "78.87%",
  },
  objects: {
    top: 230,
    left: -14,
    width: 470,
    height: 197,
    position: "absolute",
  },
  signinButtonChild: {
    borderRadius: 15,
    backgroundColor: "transparent",
    top: 0,
    left: 0,
  },
  signIn: {
    top: 13,
    left: 126,
    fontSize: 18,
    color: "#fff",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  signinButton: {
    top: 549,
    left: 50,
  },
  orContinueWith: {
    left: 105,
    color: "#b6b6b6",
    fontSize: 11,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "left",
    top: 0,
  },
  continueWithChild: {
    left: 0,
  },
  continueWithItem: {
    left: 205,
  },
  continueWith: {
    top: 617,
    left: 55,
    width: 303,
    height: 17,
    position: "absolute",
  },
  buttonsIcon: {
    left: 258,
  },
  buttonsIcon1: {
    left: 101,
  },
  buttonsIcon2: {
    left: 179,
  },
  cardIcon: {
    top: 0,
    left: 0,
  },
  vectorIcon: {
    height: "30.4%",
    width: "5.54%",
    top: "36.36%",
    right: "88.09%",
    bottom: "33.24%",
  },
  username1: {
    top: 18,
    fontSize: 14,
    color: Color.colorDarkgray,
    left: 58,
  },
  username: {
    top: 359,
    left: 50,
  },
  username2: {
    top: 326,
    fontSize: 14,
    color: Color.colorDarkgray,
    left: 50,
  },
  password: {
    top: 426,
    fontSize: 14,
    color: Color.colorDarkgray,
    left: 50,
  },
  forgotPassword: {
    top: 518,
    left: 295,
    fontSize: 11,
  },
  vectorIcon1: {
    height: "33.29%",
    width: "5.83%",
    top: "35.82%",
    right: "87.8%",
    bottom: "30.9%",
  },
  vectorIcon2: {
    height: "65.65%",
    width: "5.57%",
    top: "45%",
    right: "5.58%",
    bottom: "34.35%",
    left: "88.85%",
  },
  frameItem: {
    marginLeft: 3.03,
  },
  ellipseParent: {
    top: -17,
    flexDirection: "row",
    left: 58,
    
  },
  password2: {
    top: 453,
    left: 50,
  },
  welcomeBackWe: {
    top: 52,
    left: 61,
    fontSize: 14,
    color: Color.colorDarkgray,
  },
  welcomeBack: {
    fontSize: 40,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: "#efefef",
    top: 0,
    left: 18,
  },
  title: {
    top: 231,
    left: 55,
    width: 320,
    height: 73,
    position: "absolute",
  },
  loginScreen1: {

    backgroundColor: "#151316",
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default LoginScreen1;

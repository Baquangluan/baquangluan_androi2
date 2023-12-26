import React from 'react';
import { View,Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';

const Success = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginBottom:300,marginRight:95 }}>
      <LottieView
        source={require('../assets/Animation - 1699452018351.json')} 
        autoPlay
        loop={false}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.Success}>Đặt hàng thành công</Text>
    </View>
  );
  
};
const styles = StyleSheet.create({
    Success:{
        fontSize:30,
        top:440,
        left:72,
        fontWeight:"bold",
        color:"#1FB333",
        position:"absolute"
    }
});

export default Success;
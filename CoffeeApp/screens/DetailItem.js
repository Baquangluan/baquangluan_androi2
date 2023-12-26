import * as React from "react";
import { Text, StyleSheet, View, TouchableHighlight,TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Padding, Color, Border } from "../GlobalStyles";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ScrollView } from "react-native-gesture-handler";
import { GET_IMG } from "./apiService";
const DetailItem = ({navigation}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceModifier, setPriceModifier] = useState(0);
  
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    if (size === 'M') {
      setPriceModifier(-0.5);
    } else if (size === 'L') {
      setPriceModifier(0.5);
    } else {
      setPriceModifier(0);
    }
  };
  const route = useRoute();
  const { product } = route.params;

  const onPressHome = () => {
    navigation.navigate("Home");
  };



 
  //cap nhat gia size
  const finalPrice = (product.price + priceModifier).toFixed(2);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const limitedDescription = product.description.slice(0, 100);




  return (
    <View style={styles.detailItem}>
      <Text style={[styles.home, styles.homeTypo]}>Detail</Text>
      <TouchableHighlight onPress={onPressHome}>
      <Image
        style={[styles.iconarrowLeft, styles.iconbeanLayout]}
        contentFit="cover"
        source={require("../assets/iconarrowleft.png")}
      />
      </TouchableHighlight>
      <Image
        style={[styles.iconlylightheart, styles.homePosition]}
        contentFit="cover"
        source={require("../assets/iconlylightheart.png")}
      />
      <Image
        style={[styles.detailItemChild, styles.detailItemChildPosition]}
        contentFit="contain"
        source={GET_IMG("products",product.photo)}
       
      />
      <View style={[styles.cappucinoParent, styles.parentPosition]}>
        <Text style={[styles.cappucino, styles.homeTypo]}>
        {product.title.length > 10 ? product.title.slice(0, 30) + "..." : product.title}
        </Text>
        <Text style={[styles.withChocolate, styles.text3SpaceBlock]}>
          with {product.category.title}
        </Text>
      </View>
      
      <Text style={[styles.size, styles.sizeTypo]}>Size</Text>
      <View style={styles.ratingParent}>
        <Image
          style={styles.ratingIcon}
          contentFit="cover"
          source={require("../assets/rating.png")}
        />
        <Text style={styles.text}>
          <Text style={[styles.text1, styles.sizeTypo]}>5.0</Text>
          <Text style={styles.text2}>  </Text>
        </Text>
      </View>
      <View style={[styles.iconbeanWrapper, styles.wrapperPosition]}>
        <Image
          style={[styles.iconbean, styles.iconbeanLayout]}
          contentFit="cover"
          source={require("../assets/iconbean.png")}
        />
      </View>
      <View style={[styles.iconmilkWrapper, styles.wrapperPosition]}>
        <Image
          style={[styles.iconbean, styles.iconbeanLayout]}
          contentFit="cover"
          source={require("../assets/iconmilk.png")}
        />
      </View>


      <ScrollView style={[styles.scv]}>
  
      <Text style={[styles.description, styles.sizeTypo]}>Description</Text>
      <Text style={[styles.aCappuccinoIsContainer, styles.sTypo]}>
          {showFullDescription ? product.description : limitedDescription}
          {product.description.length > 100 && (
            <Text
              style={[styles.readMore, styles.homeTypo]}
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              {" "}{showFullDescription ? 'Read Less' : 'Read More'}
            </Text>
          )}
      </Text>
      
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.sWrapper,
          styles.wrapperFlexBox,
          selectedSize === 'M' ? { backgroundColor: 'orange' ,borderColor:"red"} : null,
        ]}
        onPress={() => handleSizeSelection('M')}
      >
        <Text style={[styles.s, styles.sTypo]}>S</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.mWrapper,
          styles.wrapperFlexBox,
          selectedSize === 'S' ? { backgroundColor: 'orange',borderColor:"red" } : null,
        ]}
        onPress={() => handleSizeSelection('S')}
      >
        <Text style={[styles.m, styles.sTypo]}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[
          styles.lWrapper,
          styles.wrapperFlexBox,
          selectedSize === 'L' ? { backgroundColor: 'orange',borderColor:"red" } : null,
        ]}
        onPress={() => handleSizeSelection('L')}
      >
        <Text style={[styles.s, styles.sTypo]}>L</Text>
        </TouchableOpacity>
      <View style={[styles.bgParent, styles.bgPosition]}>
        <View style={[styles.bg, styles.bgPosition]} />
        <View style={[styles.priceParent, styles.parentPosition]}>
          <Text style={styles.price}>Price</Text>
          <Text style={[styles.text3, styles.text3SpaceBlock]}>$ {finalPrice}</Text>
        </View>
        <TouchableHighlight onPress={() => {
          if(selectedSize)
          {
            const updatedCartItems={...product,finalPrice};
            navigation.navigate("Order",{
              product:updatedCartItems,
              
            });
            
          }
          else{
            Alert.alert("Vui lòng", "Chọn Size sản phẩm!");
          }
      

        }}>
        <View style={[styles.buyNowWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.buyNow, styles.sizeTypo]}>Buy Now</Text>
        </View>
        </TouchableHighlight>
      </View>
      <View style={styles.bgche}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  homeTypo: {
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },


  scv :{
    zIndex:-1
  },
  iconbeanLayout: {
    height: 24,
    width: 24,
  },
  homePosition: {
    top: "4.7%",
    position: "absolute",
  },
  detailItemChildPosition: {
    width: 365,
    height:226,
    left: 25,
    position: "absolute",
    
  },
  parentPosition: {
    left: 30,
    position: "absolute",
  },
  text3SpaceBlock: {
    marginTop: 8,
    textAlign: "left",
  },
  sizeTypo: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  wrapperPosition: {
    padding: Padding.p_3xs,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: Border.br_sm,
    top: 394,
    flexDirection: "row",
    position: "absolute",
  },
  sTypo: {

    lineHeight: 23,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  wrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  bgPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  home: {
    left: "42.93%",
    textAlign: "center",
    color: Color.colorDarkslategray,
    fontSize: FontSize.size_lg,
    fontWeight: "600",
    top: "4.39%",
    position: "absolute",
  },
  iconarrowLeft: {
    top: 30,
    left: 30,
    position: "absolute",
  },
  iconlylightheart: {
    height: "2.96%",
    width: "6.4%",
    right: "8%",
    bottom: "89.66%",
    left: "85.6%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  detailItemChild: {
    top: 78,
    height: 226,
    borderRadius: Border.br_base,
  },
  cappucino: {
    fontSize: 20,
    textAlign: "left",
    color: Color.colorDarkslategray,
  },
  withChocolate: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.soraRegular,
    fontSize: FontSize.size_xs,
  },
  cappucinoParent: {
    top: 324,
  },
  description: {
    top: 448,
    textAlign: "left",
    left: 30,
    position: "absolute",
    color: Color.colorDarkslategray,
  },
  size: {
    top: 629,
    textAlign: "left",
    left: 30,
    position: "absolute",
    color: Color.colorDarkslategray,
  },
  ratingIcon: {
    width: 20,
    height: 20,
  },
  text1: {
    color: Color.colorDarkslategray,
  },
  text2: {
    color: "#808080",
    fontFamily: FontFamily.soraRegular,
    fontSize: FontSize.size_xs,
  },
  text: {
    marginLeft: 4,
    textAlign: "left",
  },
  ratingParent: {
    top: 398,
    alignItems: "center",
    flexDirection: "row",
    left: 30,
    position: "absolute",
  },
  iconbean: {
    overflow: "hidden",
  },
  iconbeanWrapper: {
    left: 285,
  },
  iconmilkWrapper: {
    left: 341,
  },
  detailItemItem: {
    top: 468,
    borderColor: "#eaeaea",
    borderTopWidth: 1,
    width: 316,
    height: 1,
    borderStyle: "solid",
    left: 55,
    position: "absolute",
  },
  withChocolateClr: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.soraRegular,
  },
  readMore: {
    color: Color.colorPeru,
  },
  aCappuccinoIsContainer: {
    top: 480,
    width: 315,
    left: 30,
    position: "absolute",
    
  },
  s: {
    fontFamily: FontFamily.soraRegular,
    color: Color.colorDarkslategray,
  },
  sWrapper: {
    left: 53,
    height: 43,
    justifyContent: "center",
    width: 96,
    borderWidth: 1,
    borderRadius: Border.br_xs,
    top: 561,
    borderStyle: "solid",
    padding: Padding.p_3xs,
    borderColor: Color.colorGainsboro,
    backgroundColor: Color.colorWhite,
  },

  mWrapper: {
    left: 161,
    backgroundColor: Color.colorWhite,
    borderColor: Color.colorGainsboro,
    height: 43,
    justifyContent: "center",
    width: 96,
    borderWidth: 1,
    borderRadius: Border.br_xs,
    top: 561,
    borderStyle: "solid",
    padding: Padding.p_3xs,
  },
  lWrapper: {
    left: 269,
    width: 96,
    borderWidth: 1,
    borderRadius: Border.br_xs,
    top: 561,
    justifyContent: "center",
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    padding: Padding.p_3xs,
    backgroundColor: Color.colorWhite,
  },
  bg: {
    height: "100%",
    top: "0%",
    borderRadius: 24,
    shadowColor: "rgba(228, 228, 228, 0.25)",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    backgroundColor: Color.colorWhite,
    bottom: "0%",
    right: "0%",
  },
  price: {
    fontSize: FontSize.size_sm,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.soraRegular,
    textAlign: "left",
  },
  text3: {
    color: Color.colorPeru,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_lg,
  },
  priceParent: {
    top: 22,
  },
  buyNow: {
    color: Color.colorWhite,
    textAlign: "left",
  },
  buyNowWrapper: {
    top: 16,
    left: 175,
    backgroundColor: Color.colorPeru,
    width: 217,
   
    paddingVertical: 21,
    borderRadius: Border.br_base,
  },
  bgParent: {
    height: "14.9%",
    top: "85.1%",
  },
  detailItem: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default DetailItem;

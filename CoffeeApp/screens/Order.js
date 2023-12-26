import * as React from "react";
import { Text, StyleSheet, View, TouchableHighlight, TouchableOpacity, Button  } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Padding, FontSize, Border, Color } from "../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_IMG } from "./apiService";
import InputSpinner from "react-native-input-spinner";
import {v4 as uuidv4} from "uuid";
import { useAuth } from "./AuthContext";
import Swipeout from 'react-native-swipeout';
import { PanGestureHandler, State } from 'react-native-gesture-handler';


const Order = ({navigation,route}) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = React.useState([]);
  const finalPriceItem = cartItems.find(item => item.finalPrice);
  const [finalPrice, setFinalPrice] = React.useState(route.params.finalPrice);
  const [total, setTotal] = React.useState(route.params.finalPrice || 0);

  const [quantity, setQuantity] = React.useState(1);
  const { email, fullname } = user ;
  
    React.useEffect(() => {
      if (route.params && route.params.product) {
        handleAddCoffee(route.params.product);
      }
    }, [route.params]);
    
    const handleAddCoffee = (product) =>{
      if (product){
        product.key = uuidv4();
        setCartItems((prevData)=>[...prevData,product]);
      }
    }
    const handleDeleteItem = (index) => {
      // Create a copy of the cart items array
      const updatedCartItems = [...cartItems];
  
      // Remove the item at the specified index
      updatedCartItems.splice(index, 1);
  
      // Update the state with the new cart items
      setCartItems(updatedCartItems);
  
      // Recalculate the total based on the updated cart items
      const newTotal = updatedCartItems.reduce((acc, item) => acc + item.quantity * item.finalPrice, 0);
      setTotal(newTotal);
    };
    const onPressDetail = () => {
      navigation.navigate("DetailItem");
    };
    const onPressSuccess = async () => {
      try {
        const orderData = {
          email: email,
          fullname: fullname,        
          order_date: new Date(),
          total_money: total,
     
        };
   
     
        const response = await fetch('http:/192.168.137.167:8081/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        
        if (response.ok) {
          // Order successfully placed
          navigation.navigate("Success");
        } else {
          const errorData = await response.json();
       
        }
      } catch (error) {
  
      
      }
    };
    
    var swipeoutBtns = [
  {
    text: 'Button'
  }
]
   
  return (
    
    <View style={styles.order}>
      <Text style={[styles.home, styles.textTypo2]}>Order</Text>
      <TouchableHighlight onPress={onPressDetail}>
      <Image
        style={[styles.iconarrowLeft, styles.icondotsLayout]}
        contentFit="cover"
        source={require("../assets/iconarrowleft.png")}
      />
      </TouchableHighlight>
      <View style={styles.frameParent}>
        <View style={[styles.deliverWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.deliver, styles.pickUpTypo]}>Deliver</Text>
        </View>
        <View style={[styles.pickUpWrapper, styles.wrapperLayout]}>
          <Text style={[styles.pickUp, styles.pickUpTypo]}>Pick Up</Text>
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameGroupPosition]}>
        <View>
          <Text style={[styles.deliveryAddress, styles.pickUpTypo]}>
            Delivery Address
          </Text>
          <View style={styles.jlKpgSutoyoParent}>
            <Text style={[styles.jlKpgSutoyo, styles.textTypo1]}>
              Jl. Kpg Sutoyo
            </Text>
            <Text style={[styles.kpgSutoyoNo, styles.kpgSutoyoNoTypo]}>
              Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
            </Text>
          </View>
        </View>
        <View style={styles.frameContainer}>
          <View style={styles.parentBorder}>
            <Image
              style={styles.iconedit}
              contentFit="cover"
              source={require("../assets/iconedit.png")}
            />
            <Text style={[styles.editAddress, styles.kpgSutoyoNoTypo]}>
              Edit Address
            </Text>
          </View>
          <View style={[styles.iconnoteParent, styles.parentBorder]}>
            <Image
              style={styles.iconedit}
              contentFit="cover"
              source={require("../assets/iconnote.png")}
            />
            <Text style={[styles.editAddress, styles.kpgSutoyoNoTypo]}>
              Add Note
            </Text>
          </View>
        </View>
      </View>
      <View>
        <ScrollView style={[styles.container]}>
        {/* ----------------------------------------------------- */}
 
      <View  style={[styles.productCart]}>

      {cartItems.map((item, index) => (
      
        <View key={index} style={[styles.frameView, styles.frameFlexBox]}>
          <View style={styles.rectangleParent}>
            <Image
              style={styles.frameChild}
              contentFit="contain"
              source={GET_IMG("products",item.photo)}
            />
            <View style={styles.cappucinoParent}>
              <Text style={[styles.deliveryAddress, styles.pickUpTypo]}>
              {item.title.length > 10 ? item.title.slice(0, 10) + "..." : item.title}
              </Text>
              <Text style={[styles.withChocolate, styles.kpgSutoyoNoTypo]}>
                with {item.category.title}
              </Text>
            </View>
          </View>
   
          <InputSpinner
              max={10}
              min={1}
              step={1}
              skin={"round"}
              color={"#fff"}
              value={0}
              height={40}
              width={100}
              shadow={false}
              style={styles.plus}
              background={"#FFF"}
              showBorder={false}
              onChange={(num)=>{
                const newTotal = num * item.finalPrice;
                setTotal(newTotal); 
                setQuantity(num);
              }}
            />
             <View style={{ marginLeft: 20 }}>
              <Button 
                title="X"
                color="red" 
                onPress={() => handleDeleteItem(index)}
              />
            </View> 
        </View>
        
        
      ))}
     
     

      </View>
 
      </ScrollView>
       </View>
       <View style={[styles.square]}></View>
       <View style={[styles.square1]}></View>
      <View style={[styles.orderChild, styles.orderLayout]} />
      <View style={[styles.orderItem, styles.orderLayout]} />
      <View style={[styles.orderInner, styles.orderInnerPosition]} />
      <Text style={[styles.paymentSummary, styles.pickUpTypo]}>
        Payment Summary
      </Text>
      <View style={[styles.priceParent, styles.parentLayout]}>
        <Text style={[styles.price, styles.pricePosition]}>Price</Text>
        <Text style={[styles.text1, styles.textTypo]}>$ {total}</Text>

      </View>
      <View style={[styles.deliveryFeeParent, styles.parentLayout]}>
        <Text style={[styles.price, styles.pricePosition]}>Delivery Fee</Text>
        <View style={[styles.parent, styles.text1Position]}>
          <Text style={[styles.text3, styles.textTypo]}>Free ship</Text>
        </View>
      </View>
      <View style={[styles.totalPaymentParent, styles.parentLayout]}>
        <Text style={[styles.price, styles.pricePosition]}>Total Payment</Text>
        <Text  style={[styles.text1, styles.textTypo]}>$ {total} </Text>

      </View>

      <View style={[styles.homeIndicator, styles.orderInnerPosition]}>
        <View style={[styles.container, styles.bgPosition]} />
        <View style={styles.indicator} />
      </View>
      <View style={[styles.bgParent, styles.bgPosition]}>
        <View style={[styles.bg, styles.bgPosition]} />
        <TouchableHighlight onPress={onPressSuccess}>
        <View style={styles.orderWrapper}>
          <Text style={[styles.deliver, styles.pickUpTypo]}>Order</Text>
        </View>
        </TouchableHighlight>
        <Image
          style={[styles.vuesaxlinearmoneysIcon, styles.parentPosition]}
          contentFit="cover"
          source={require("../assets/vuesaxlinearmoneys.png")}
        />
        <View style={[styles.frameParent2, styles.parentPosition]}>
          <View style={[styles.cashWrapper, styles.wrapperLayout]}>
            <Text style={[styles.cash, styles.cashTypo]}>Cash</Text>
          </View>
       
          <Text style={[styles.text5, styles.cashTypo]}>$ {total}</Text>
   
        </View>
        <Image
          style={[styles.icondots, styles.parentPosition]}
          contentFit="cover"
          source={require("../assets/icondots.png")}
        />
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCart:{
    flexDirection:"column",
    flexWrap: 'wrap',
   
  },
  bin:{
    marginLeft:130
  },
  plus:{
    marginLeft:70
  },
  square:{
    backgroundColor:"white",
    width:800,
    height:340,
    zIndex:1,
    position: 'absolute',
    bottom:0,

  },
  square1:{
    backgroundColor:"white",
    width:800,
    height:240,
    zIndex:1,
    position: 'absolute',
    top:80
  },
  textTypo2: {
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    
  },
  icondotsLayout: {
    height: 24,
    width: 24,
    
  },
  wrapperFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_sm,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  pickUpTypo: {
    textAlign: "left",
    fontSize: FontSize.size_base,
    
  },
  wrapperLayout: {
    borderRadius: Border.br_xl,
    flexDirection: "row",
  },
  frameGroupPosition: {
    left: 30,
    position: "absolute",
  },
  textTypo1: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  kpgSutoyoNoTypo: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.soraRegular,
    textAlign: "left",
  },
  parentBorder: {
    paddingVertical: Padding.p_7xs,
    paddingHorizontal: Padding.p_xs,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    borderRadius: Border.br_base,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
    
  },
  frameFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    
  },
  orderLayout: {
    height: 1,
    borderTopWidth: 1,
    width: 316,
    borderColor: Color.colorWhitesmoke_200,
    borderStyle: "solid",
    left: 55,
    position: "absolute",
  },
  orderInnerPosition: {
    width: 375,
    left: 20,
    position: "absolute",
  },
  parentLayout: {
    height: 18,
    width: 315,
    left: 30,
    position: "absolute",
  },
  pricePosition: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  textTypo: {
    textAlign: "right",
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray_200,
  },
  text1Position: {
    top: 0,
    position: "absolute",
  },
  parentPosition: {
    top: 16,
    position: "absolute",
  },
  bgPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  cashTypo: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.soraRegular,
    textAlign: "left",
  },
  home: {
    top: "7.39%",
    left: "42.67%",
    fontSize: 18,
    textAlign: "center",
    color: Color.colorDarkslategray_200,
    position: "absolute",
    zIndex:5,
  },
  iconarrowLeft: {
    top: 60,
    left: 30,
    position: "absolute",
    
  },
  deliver: {
    color: Color.colorWhite,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",

    
  },
  deliverWrapper: {
    borderRadius: 10,
    backgroundColor: Color.colorPeru,
    flexDirection: "row",

  },
  pickUp: {
    fontFamily: FontFamily.soraRegular,
    color: Color.colorDarkslategray_200,
  },
  pickUpWrapper: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_sm,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.colorWhitesmoke_100,
  },
  frameParent: {
    top: 108,
    padding: 4,
    flexDirection: "row",
    width: 315,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: Border.br_sm,
    left: 40,
    position: "absolute",
    zIndex:5,

  },
  deliveryAddress: {
    color: Color.colorDarkslategray_200,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
      zIndex:2
  },
  jlKpgSutoyo: {
    color: Color.colorDarkslategray_100,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  kpgSutoyoNo: {
    color: "#808080",
    marginTop: 8,
    width: 315,
  },
  jlKpgSutoyoParent: {
    marginTop: 16,
        zIndex:2
  },
  iconedit: {
    width: 14,
    height: 14,
    
  },
  editAddress: {
    marginLeft: 4,
    color: Color.colorDarkslategray_100,
    
  },
  iconnoteParent: {
    marginLeft: 8,
  },
  frameContainer: {
    marginTop: 16,
    flexDirection: "row",
    zIndex:2
  },
  frameGroup: {
    top: 180,
    zIndex:5,
  },
  frameChild: {
    borderRadius: 12,
    width: 54,
    height: 54,
  },
  withChocolate: {
    color: "#9b9b9b",
    marginTop: 4,
  },
  cappucinoParent: {
    marginLeft: 12,
  },
  rectangleParent: {
    alignItems: "center",
    flexDirection: "row",
    left:30
  },
  iconminus: {
    width: 16,
    height: 16,
  },
  iconminusWrapper: {
    padding: Padding.p_7xs,
    borderColor: Color.colorWhitesmoke_200,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_xl,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  text: {
    color: Color.colorDarkslategray_200,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  frameParent1: {
    width: 90,
    left:50,
  },
  frameView: {
    top: 340,
    width: 315,
    left: 30,


  },
  frameView1: {
    top: 405,
    width: 315,
    left: 30,
    position: "absolute",
  },
  frameView2: {
    top: 465,
    width: 315,
    left: 30,
    position: "absolute",
  },
  orderChild: {
    top: 320,
    zIndex:1
  },
  orderItem: {
    top: 678,
    zIndex:1
  },
  orderInner: {
    top: 484,
    backgroundColor: "#f4f4f4",
    height: 4,
    zIndex:1
  },
  
  paymentSummary: {
    top: 494,
    left: 30,
    position: "absolute",
    color: Color.colorDarkslategray_200,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",  
    zIndex:1
  },
  price: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.soraRegular,
    color: Color.colorDarkslategray_200,
  },
  text1: {
    left: 300,
    top: 0,
    position: "absolute",
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  priceParent: {
    top: 520,
    zIndex:1
  },
  text2: {
    textDecoration: "line-through",
    fontFamily: FontFamily.soraRegular,
  },
  text3: {
    marginLeft: 9,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  parent: {
    right: -45,
    flexDirection: "row",
  },
  deliveryFeeParent: {
    top: 544,
    zIndex:1
  },
  totalPaymentParent: {
    top: 574,
    zIndex:1
  },
  groupChild: {
    height: 57,
    width: 316,
    left: 0,
    borderColor: Color.colorWhitesmoke_200,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_sm,
    backgroundColor: Color.colorWhite,
  },
  iconarrowRight: {
    top: 18,
    left: 279,
    width: 20,
    height: 20,
    position: "absolute",
  },
  discountIsApplied: {
    marginLeft: 12,
    color: Color.colorDarkslategray_200,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
  },
  iconlybolddiscountParent: {
    left: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
  },
  rectangleGroup: {
    top: 498,
    height: 56,
    width: 315,
    zIndex:1
  },
  container: {
    top: "0%",
    height: "100%",
    bottom: "0%",
    right: "0%",

  },
  indicator: {
    height: "14.71%",
    width: "35.73%",
    top: "55.88%",
    right: "32%",
    bottom: "29.41%",
    left: "32.27%",
    borderRadius: 3,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
  },
  homeIndicator: {
    bottom: 0,
    height: 34,
    
  },
  bg: {
    borderRadius: 24,
    shadowColor: "rgba(228, 228, 228, 0.25)",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 24,
    elevation: 24,
    shadowOpacity: 1,
    top: "0%",
    height: "100%",
    bottom: "0%",
    right: "0%",
    backgroundColor: Color.colorWhite,
  },
  orderWrapper: {
    top: 65,
    paddingHorizontal: 109,
    paddingVertical: 21,
    borderRadius: Border.br_base,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorPeru,
    flexDirection: "row",
    width: 315,
    left: 55,
    position: "absolute",
  },
  vuesaxlinearmoneysIcon: {
    left: 29,
    height: 24,
    width: 24,
  },
  cash: {
    color: Color.colorWhite,
  },
  cashWrapper: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 5,
    backgroundColor: Color.colorPeru,
  },
  text5: {
    marginLeft: 10,
    color: Color.colorDarkslategray_200,
  },
  frameParent2: {
    left: 65,
    backgroundColor: "#f6f6f6",
    paddingRight: Padding.p_sm,
    borderRadius: Border.br_xl,
    flexDirection: "row",
    alignItems: "center",
  },
  icondots: {
    left: 351,
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  bgParent: {
    height: "19.83%",
    top: "80.17%",   
     zIndex:1
  },
  order: {
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
});

export default Order;

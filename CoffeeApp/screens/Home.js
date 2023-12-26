import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Touchable, TouchableOpacity, Animated  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { FontFamily, Padding, Border, Color, FontSize } from "../GlobalStyles";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { GET_IMG } from './apiService';
import axios from 'axios';



const Home = ({navigation}) => {

  const [products, setProducts] = useState([]);
  // Lọc danh mục duy nhất từ danh sách sản phẩm
  const categories = [...new Set(products.map((product) => product.category.title))];
 
  useEffect(() => {
    axios.get('http://192.168.137.167:8081/api/products')
      .then(response => {
        setProducts(response.data.content);
      })
      .catch(error => {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
      });
  }, []);


    const onPressDetail = (product) => {
      navigation.navigate("DetailItem" , { product });
    };
    const onPressOrder = () => {
      navigation.navigate("Order");
    };
  //tim kiem san pham
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchProduct = () => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };  
  //category
  const [selectedCategory, setSelectedCategory] = useState(null);
  const onPressCategory = (category) => {
    if (category === 'All product') {
     
      setSelectedCategory(null); 
    } else {
     
      setSelectedCategory(category);
      
    }
    
  };
  
  return (
    <View style={styles.home}>
      <LinearGradient
        style={[styles.homeChild, styles.childIconPosition]}
        locations={[0, 1]}
        colors={["#131313", "#313131"]}
      />
      <View style={styles.location}>
        <View style={[styles.locationParent, styles.childIconPosition]}>
          <Text style={[styles.location1, styles.location1Typo]}>Location</Text>
          <View style={styles.bilzenTanjungbalaiParent}>
            <Text style={[styles.bilzenTanjungbalai, styles.cappucinoTypo]}>
              Bilzen, Tanjungbalai
            </Text>
            <Image
              style={styles.iconlylightarrowDown2}
              contentFit="cover"
              source={require("../assets/iconlylightarrow--down-2.png")}
            />
          </View>
        </View>
      </View>
      <View style={[styles.imageWrapper, styles.imageLayout]}>
        <TouchableHighlight onPress={onPressOrder}>
        <Image
          style={[styles.imageIcon, styles.imageLayout]}
          contentFit="cover"
          source={require("../assets/cartdowload.png")}
        />
        </TouchableHighlight>
      </View>
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <TextInput  onChangeText={(text) => setSearchText(text)} style={[styles.searchCoffee, styles.location1Typo]} placeholder='Search for your product' placeholderTextColor="#928F8F"
        >
          
        </TextInput>
        <TouchableHighlight onPress={searchProduct}>
        <Image
          style={[styles.vuesaxlinearsearchNormalIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vuesaxlinearsearchnormal.png")}
        />
        </TouchableHighlight>
        <View style={styles.furniturIconWrapper}>
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/furnituricon.png")}
          />
        </View>
      </View>
     
      
      <View style={styles.image8Parent}>
        <Image
          style={[styles.image8Icon, styles.childIconPosition]}
          contentFit="cover"
          source={require("../assets/image-8.png")}
        />
        <View style={styles.promoWrapper}>
          <Text style={[styles.cappuccino, styles.textTypo1]}>Promo</Text>
        </View>
        <View style={styles.frameChild} />
        <View style={styles.frameItem} />
        <Text style={[styles.buyOneGet, styles.textTypo1]}>
          Buy one get one FREE
        </Text>
      </View>
      <ScrollView style={styles.container} >
         
          <View style={styles.frameParent}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
            {[ 'All product', ...categories ].map((category, index) => (
            <TouchableHighlight underlayColor="transparent" onPress={() => onPressCategory(category)}>
            <View key={index} style={[styles.cappuccinoWrapper, styles.wrapperSpaceBlock,category === 'All product' ? styles.allProductCategory : null]}>      
              <Text style={[styles.cappuccino, styles.textTypo1]}>{category}</Text>
            </View>
            </TouchableHighlight>
            ))}
          </ScrollView>
          
          </View>

        
      <View style={[styles.productsItem]}>
      {searchResults.length > 0 || selectedCategory ? (
             searchResults
             .filter((product) => !selectedCategory || product.category.title === selectedCategory)
             .map((product) => (
            <View key={product.id} style={[styles.rectangleGroup]}>
              
              <View style={[styles.groupItem, styles.groupLayout1]} />
              <TouchableHighlight  underlayColor="transparent" onPress={() => onPressDetail(product)}>
              
              <Image
                style={[styles.groupInner, styles.groupPosition]}
                contentFit="contain"
                 
                source={GET_IMG("products",product.photo)}
              />
              </TouchableHighlight>
              <View style={styles.furniturIconParent}>
                <Image
                  style={styles.furniturIcon1}
                  contentFit="cover"
                  source={require("../assets/furnituricon1.png")}
                />
                <Text style={[styles.text]}>5.0</Text>
              </View>
              <View style={styles.cappucinoParent}>
                <Text style={[styles.cappucino, styles.cappucinoTypo]}>
                {product.title.length > 10 ? product.title.slice(0, 11) + "..." : product.title}
                </Text>
                <Text style={[styles.withChocolate, styles.location1Typo]}>
                  with {product.category.title}
                </Text>
              </View>
              <Text style={[styles.text1, styles.textTypo]}>$ {product.price}</Text>
              
              <View style={[styles.iconplusWrapper, styles.iconplusFlexBox]}>
              <TouchableHighlight  underlayColor="transparent" onPress={() => onPressDetail(product)}>
                <Image
                  style={styles.iconplus}
                  contentFit="cover"
                  source={require("../assets/iconplus.png")}
                />
                   </TouchableHighlight>
              </View>
            </View>
            
            ))
        ) :(
          products.map(product => (
            <View key={product.id} style={[styles.rectangleGroup]}>
              
              <View style={[styles.groupItem, styles.groupLayout1]} />
              <TouchableHighlight  underlayColor="transparent" onPress={() => onPressDetail(product)}>
              
              <Image
                style={[styles.groupInner, styles.groupPosition]}
                contentFit="contain"
                
                source={GET_IMG("products",product.photo)}
              />
              </TouchableHighlight>
              <View style={styles.furniturIconParent}>
                <Image
                  style={styles.furniturIcon1}
                  contentFit="cover"
                  source={require("../assets/furnituricon1.png")}
                />
                <Text style={[styles.text]}>5.0</Text>
              </View>
              <View style={styles.cappucinoParent}>
                <Text style={[styles.cappucino, styles.cappucinoTypo]}>
                {product.title.length > 10 ? product.title.slice(0, 11) + "..." : product.title}
                </Text>
                <Text style={[styles.withChocolate, styles.location1Typo]}>
                  with {product.category.title}
                </Text>
              </View>
              <Text style={[styles.text1, styles.textTypo]}>$ {product.price}</Text>
              
              <View style={[styles.iconplusWrapper, styles.iconplusFlexBox]}>
              <TouchableHighlight  underlayColor="transparent" onPress={() => onPressDetail(product)}>
                <Image
                  style={styles.iconplus}
                  contentFit="cover"
                  source={require("../assets/iconplus.png")}
                />
                   </TouchableHighlight>
              </View>
            </View>
            
            ))
        )}
      
         
       </View>
    
     
      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex:-1,
  },
  container1: {
    flex: 1,
    zIndex:1,

  },

  menusc:{
    zIndex:1,
     flex: 1,
  },
  allProductCategory:{
    backgroundColor:"#573110"
  },
  productsItem:{
    paddingTop:420,
    flexDirection:"row",
    flexWrap: 'wrap',
  },
  childIconPosition: {
    left: 0,
    top: 0,
  },
  location1Typo: {
    textAlign: "left",
    fontFamily: FontFamily.soraRegular,
  },
  cappucinoTypo: {
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  imageLayout: {
    height: 30,
    width: 30,
    position: "absolute",
  },
  groupChildLayout: {
    height: 52,
    width: 315,
    position: "absolute",
  },
  iconLayout: {
    height: 24,
    width: 22,
   
  },
  wrapperSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_xs,
    flexDirection: "row",
    borderRadius:6,
  },
  textTypo1: {
    color: Color.colorWhite,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  groupLayout1: {
    height: 239,
    width: 169,
    position: "absolute",
  },
  groupPosition: {
    height: 132,
    left: -5,
    top: -14,
    borderRadius: Border.br_base,
    //position: "absolute",

  },
  textTypo: {
    fontSize: FontSize.size_lg,
    top: 199,
    color: Color.colorDarkslategray_100,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    textAlign: "left",
     position: "absolute",
  },
  iconplusFlexBox: {
    padding: Padding.p_5xs,
    justifyContent: "center",
    borderRadius: Border.br_3xs,
    top: 202,
    backgroundColor: Color.colorPeru,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  groupLayout: {
    width: 150,
    height: 239,
    position: "absolute",
  },
  homeChild: {
    width: 415,
    height: 300,
    backgroundColor: "transparent",
    position: "absolute",
  },
  location1: {
    letterSpacing: 0.1,
    color: "#b7b7b7",
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.soraRegular,
  },
  bilzenTanjungbalai: {
    color: "#ddd",
    fontSize: FontSize.size_sm,
  },
  iconlylightarrowDown2: {
    width: 14,
    height: 14,
    marginLeft: 4,
  },
  bilzenTanjungbalaiParent: {
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  locationParent: {
    position: "absolute",
  },
  location: {
    top: 63,
    width: 161,
    height: 37,
    left: 30,
    position: "absolute",
    zIndex:1,
  },
  imageIcon: {

    left: 6,
    top: 6,
  },
  imageWrapper: {
    top: 60,
    left: 341,
  },
  groupChild: {
    backgroundColor: "#313131",
    borderRadius: Border.br_base,
    left: 0,
    top: 0,
  },
  searchCoffee: {
    top: 17,
    left: 48,
    color: "#989898",
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  vuesaxlinearsearchNormalIcon: {
    top: 12,
    left: 16,
    position: "absolute",
  },
  furniturIconWrapper: {
    left: 267,
    padding: 12,
    backgroundColor: Color.colorPeru,
    borderRadius: Border.br_xs,
    top: 2,
    flexDirection: "row",
    position: "absolute",
    borderTopRightRadius:13,
    borderBottomRightRadius:13,
  },
  rectangleParent: {
    top: 140,
    left: 60,
   
  },
  cappuccino: {
    fontSize: FontSize.size_sm,
    
  },
  cappuccinoWrapper: {
    backgroundColor: Color.colorPeru,
    padding:5,
    marginRight:10,
 
  },
  machiato: {
    color: Color.colorDarkslategray_100,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.soraRegular,
  },
  machiatoWrapper: {
    marginLeft: 8,
    backgroundColor: Color.colorWhite,
    padding:5,
   
  },
  frameParent: {
    top: 378,
    flexDirection: "column",
    left: 10,
    position: "absolute",
    zIndex:1
  },
  image8Icon: {
    width: 435,
    height: 290,
    position: "absolute",
  },
  promoWrapper: {
    top: 13,
    borderRadius: 8,
    backgroundColor: "#ed5151",
    paddingHorizontal: 6,
    paddingVertical: 4,
    left: 23,
    flexDirection: "row",
    position: "absolute",
  },
  frameChild: {
    top: 62,
    width: 200,
    height: 27,
    backgroundColor: Color.colorGray_100,
    left: 23,
    position: "absolute",
  },
  frameItem: {
    top: 101,
    height: 23,
    width: 149,
    backgroundColor: Color.colorGray_100,
    left: 23,
    position: "absolute",
  },
  buyOneGet: {
    top: 47,
    left: 24,
    fontSize: 32,
    width: 203,
    position: "absolute",
  },
  image8Parent: {
    top: 224,
    backgroundColor: "#eae7e7",
    height: 140,
    borderRadius: Border.br_base,
    width: 355,
    left: 35,
    position: "absolute",
    overflow: "hidden",
    zIndex:1,
  },
  groupItem: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    left: 0,
    top: 0,
  },
  groupInner: {
    width: 141,
  },
  furniturIcon1: {
    width: 10,
    height: 10,
  
  },
  text: {
    fontSize: FontSize.size_3xs,
    marginLeft: 2,
    color:"orange",
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  furniturIconParent: {
    borderTopLeftRadius: Border.br_base,
    borderBottomRightRadius: Border.br_base,
    backgroundColor: Color.colorGray_200,
    width: 51,
    height: 25,
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_10xs,
    left: 10,
    top: 5,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  cappucino: {
    fontSize: FontSize.size_base,
    color: Color.colorDarkslategray_200,
  },
  withChocolate: {
    color: Color.colorDarkgray_100,
    marginTop: 4,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.soraRegular,
  },
  cappucinoParent: {
    top: 148,
    left: 12,
    position: "absolute",
  },
  text1: {
    left: 12,
  },
  iconplus: {
    width: 16,
    height: 16,
    
  },
  iconplusWrapper: {
    left: 115,

  },
  rectangleGroup: {
    top: 430,
    left: 34,
    paddingBottom:100,
    padding:20,

  },
  rectangleContainer: {
    top: 685,
    left: 40,
  },
  groupChild1: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    left: 0,
    top: 0,
  },
  groupChild2: {
    width: 142,
  },
  text5: {
    left: 14,
  },
  iconplusFrame: {
    left: 106,
  },
  groupView: {
    left: 225,
    width: 150,
    top: 430,
  },
  rectangleParent1: {
    left: 225,
    width: 150,
    top: 685,
  },
  home: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default Home;

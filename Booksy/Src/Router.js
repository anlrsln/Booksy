import React, { useEffect, useState } from "react"
import {View} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import auth from "@react-native-firebase/auth"
import FlashMessage from "react-native-flash-message"

// Importing Navigation Kinds

const Tab=createBottomTabNavigator()
const Stack = createStackNavigator()



// Importing Pages

import Login from "./Pages/Auth/Login"
import Sign from "./Pages/Auth/Sign"
import Main from "./Pages/Main"
import Profile from "./Pages/Profile"
import Favorites from "./Pages/Favorites"
import Search from "./Pages/Search" 
import SharingPage from "./Pages/SharingPage"
import ShareButton from "./Components/Buttons/ShareButton"
import ProfileFavorite from "./Pages/ProfileFavorite"
import Edit from "./Pages/Edit"
import UserProfile from "./Pages/UserProfile"
import UserFavorites from "./Pages/UserFavorites"
import Colors from "./Colors/Colors"


// Authentication Pages Stack

const AuthStack=()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="LoginPage" component={Login}/>
      <Stack.Screen name="SignPage" component={Sign}/>
    </Stack.Navigator>
  )
}





const ProfileStack=()=>(
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="ProfilePage" component={Profile} />
    <Stack.Screen name="ProfileFavoritePage" component={ProfileFavorite}/>
    <Stack.Screen name="EditPage" component={Edit}/>
  </Stack.Navigator>
)





// Main Page of App

const MainTab=()=>{

  function returnIcon(name,color="black",size=35,onPress=null){
    return <Icon name={name} color={color} size={size} onPress={onPress}/>
  }
  
  
  function logOut(){
    auth().signOut()
  }


  return(
    <Tab.Navigator screenOptions={{
      tabBarShowLabel:false,
      tabBarHideOnKeyboard:true,
      tabBarStyle:{
        position:"absolute",
        height:60,
      },
      headerStyle:{
        backgroundColor:Colors.mainColor
      },
      headerTitleStyle:{
        color:"white",
        fontSize:25,
        fontFamily:"DancingScript-Regular"
      },
      headerTitleAlign:"center",
    }}>
      <Tab.Screen name="MainPage" component={Main} options={{
        tabBarIcon:()=>returnIcon("home-outline"),
        headerTitle:"Booksy",
      }}/>
      <Tab.Screen name="SearchPage" component={Search} options={{
        headerTitle:"Search",
        tabBarIcon:()=>returnIcon("search-web")
      }}/>
      <Tab.Screen name="SharePage" component={SharingPage} options={{
        headerShown:false,
        tabBarIcon:()=>(
          <View style={{bottom:25}}>
              <ShareButton onPress={null}/>
          </View>
        )
      }}/>
      <Tab.Screen name="FavoritesPage" component={Favorites} options={{
        headerTitle:"Favorites",
        tabBarIcon:()=>returnIcon("star-four-points-outline")
      }}/>
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
        headerTitle:"Profile",
        tabBarIcon: () => returnIcon("account-circle-outline"),
        headerRight:()=>returnIcon("logout","white",35,logOut)
        }}/>
    </Tab.Navigator>
  )
}





// Main Function

const Router=()=>{
  const [userSession,setUserSession]=useState()


  useEffect(()=>{
    auth().onAuthStateChanged((user)=>{
      setUserSession(!!user)
    })
  },[])

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {
          !userSession ? (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          ):(
            <>
              <Stack.Screen name="MainTabStack" component={MainTab}/>
              <Stack.Screen name="UserPage" component={UserProfile} options={{
                headerTitleAlign:"center",
                headerShown:true,
                headerTitle:"Profile",
                headerStyle:{
                  backgroundColor:Colors.mainColor
                },
                headerTitleStyle:{
                  fontSize:25,
                  fontWeight:"bold",
                },
                headerTintColor:"white"
              }}/>
              <Stack.Screen name="UserFavoritesPage" component={UserFavorites} options={{
                headerTitleAlign:"center",
                headerShown:true,
                headerTitle:"Favorites",
                headerStyle:{
                  backgroundColor:Colors.mainColor
                },
                headerTitleStyle:{
                  fontSize:25,
                  fontWeight:"bold",
                },
                headerTintColor:"white"
              }}/>
            </>
          )
        }
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

export default Router
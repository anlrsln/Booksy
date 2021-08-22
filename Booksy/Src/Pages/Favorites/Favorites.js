import React, { useEffect, useState } from "react"
import { View,Text, FlatList } from "react-native"
import database from "@react-native-firebase/database"
import parseContentData from "../../Utills/parseContentData"
import auth from "@react-native-firebase/auth"
import FavoritesCard from "../../Components/Cards/FavoritesCard"
import styles from "./Favorites.style"
import Loading from "../../Components/Loading/Loading"

const Favorites=({navigation})=>{
    const [loading,setLoading]=useState(false)
    const [favList,setFavList]=useState([])

    const currentUser=auth().currentUser.email
    const parsedCurrentUser=currentUser.slice(0,currentUser.indexOf("@"))

    useEffect(()=>{
        setLoading(true)
        try {
            database()
            .ref(`Favorites/${parsedCurrentUser}`)
            .on("value",snapshot=>{
                const response = snapshot.val()
                setFavList(parseContentData(response || {}))
                setLoading(false)
            })
        } catch (error) {
            console.log(error.code);
            setLoading(false)
        }

    },[])

    function lookProfile(username){
        if(!username) return
        if(username===parsedCurrentUser){
            navigation.navigate("ProfileStack",{screen:"ProfilePage"})
            return
        }
        navigation.navigate("UserPage",(username))
    }


    function renderFavorites({item}){
        return <FavoritesCard likes={item.likes} id={item.id} lookProfile={()=>lookProfile(item.username)} name={item.name} image={item.image} type={item.type} author={item.author} date={item.date} username={item.username}/>
    }

    
    if(loading){
        return <Loading/>
    }


    return(
        <View style={styles.container}>
            <FlatList contentContainerStyle={{alignItems:"center"}} style={styles.list} data={favList} renderItem={renderFavorites} numColumns={3}/>
        </View>
    )
}

export default Favorites;
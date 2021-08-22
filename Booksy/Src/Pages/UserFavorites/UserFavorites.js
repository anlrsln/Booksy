import React, { useEffect, useState } from "react"
import { View,Text, FlatList } from "react-native"
import database from "@react-native-firebase/database"
import parseContentData from "../../Utills/parseContentData"
import FavoritesCard from "../../Components/Cards/FavoritesCard"
import styles from "./UserFavorites.style"
import Loading from "../../Components/Loading/Loading"


const UserFavorites=({navigation,route})=>{
    const [loading,setLoading]=useState(false)
    const [favList,setFavList]=useState([])
    const username=route.params


    

    useEffect(()=>{
        navigation.setOptions({title:`Favorites of ${username}`})
        setLoading(true)
        try {
            database()
            .ref(`Favorites/${username}`)
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



    function renderFavorites({item}){
        return <FavoritesCard
            likes={item.likes} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            type={item.type} 
            author={item.author} 
            date={item.date}
        />
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

export default UserFavorites;
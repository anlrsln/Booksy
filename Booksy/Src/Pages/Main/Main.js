import React, { useEffect, useState } from "react"
import { View,Text, FlatList, TouchableWithoutFeedback } from "react-native"
import BookCard from "../../Components/Cards/BookCard"
import database from "@react-native-firebase/database"
import parseContentData from "../../Utills/parseContentData"
import styles from "./Main.style"
import auth from "@react-native-firebase/auth"
import Loading from "../../Components/Loading/Loading"


const Main=({navigation})=>{
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState([])

    const currentUsername=auth().currentUser.email
    const parseCurrentUsername=currentUsername.slice(0,currentUsername.indexOf("@"))

    function lookProfile(username){
        if(!username) return
        if(username===parseCurrentUsername){
            navigation.navigate("ProfileStack",{screen:"ProfilePage"})
            return
        }
        navigation.navigate("UserPage",(username))
    }
    
    useEffect(()=>{
        setLoading(true)
        try {
            database()
            .ref(`Books/`)
            .on("value",snapshot=>{
                const response = snapshot.val()
                setData(parseContentData(response || {}))
                setLoading(false)
            })
            
        } catch (error) {
            console.log(error.code);
            setLoading(false)
        }

    },[])

    

    function renderBooks({item}){
        return <BookCard
            id={item.id}
            username={item.username} 
            name={item.name} 
            type={item.type} 
            author={item.author} 
            comment={item.comment}
            date={item.date}
            image={item.image}
            likes={item.likes}
            lookProfile={()=>lookProfile(item.username)}
        />
    }


    if(loading){
        return <Loading/>
    }

    return(
        <View style={styles.container}>
            <FlatList data={data} renderItem={renderBooks}/>
        </View>
    )
}

export default Main;
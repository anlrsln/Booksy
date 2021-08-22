import React, { useEffect, useState } from "react"
import { View,Text, FlatList } from "react-native"
import styles from "./Search.style"
import Input from "../../Components/Input"
import database from "@react-native-firebase/database"
import parseContentData from "../../Utills/parseContentData"
import FavoritesCard from "../../Components/Cards/FavoritesCard"
import auth from "@react-native-firebase/auth"

const Search=({navigation})=>{

    const currentUser=auth().currentUser.email
    const parsedCurrentUser=currentUser.slice(0,currentUser.indexOf("@"))
    const [searchList,setSearchList]=useState([])
    const [parseList,setParseList]=useState([])

    useEffect(()=>{
        database()
        .ref("Books/")
        .on("value",snapshot=>{
            const response=snapshot.val()
            setSearchList(parseContentData(response) || {})
            
        })
    },[])


    function lookProfile(username){
        if(!username) return
        if(username===parsedCurrentUser){
            navigation.navigate("ProfileStack",{screen:"ProfilePage"})
            return
        }
        navigation.navigate("UserPage",(username))
    }

    function onSearch(text){
        const filteredList=searchList.filter(book=>{
            const searchedText=text.toLowerCase();
            const bookName=book.name.toLowerCase();
            return (bookName.indexOf(searchedText)) > -1
        })
        setParseList(filteredList)
    }

    console.log(parseList);


    function renderSearched({item}){
        return <FavoritesCard likes={item.likes} id={item.id} lookProfile={()=>lookProfile(item.username)} name={item.name} image={item.image} type={item.type} author={item.author} date={item.date} username={item.username}/>
    }



    return(
        <View>
            <Input icon="book-search-outline" placeholder="Start Searching Books..."  onChangeText={onSearch}/>
            <FlatList 
                contentContainerStyle={{alignItems:"center"}} 
                data={parseList} 
                renderItem={renderSearched}
                numColumns={3}
            />
        </View>
    )
}

export default Search;
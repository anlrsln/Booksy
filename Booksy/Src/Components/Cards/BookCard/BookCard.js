import React, { useEffect, useState } from "react"
import { View,Text,Image, TouchableWithoutFeedback} from "react-native"
import styles from "./BookCard.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { formatDistance, parseISO} from 'date-fns'
import {enUS} from 'date-fns/locale'
import Colors from "../../../Colors/Colors"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
//import CurrentUser from "../../../Hooks/CurrentUser/CurrentUser"


const BookCard=({username,name,type,author,comment,date,id,image,lookProfile,likes})=>{
    const [isFavorite,setIsFavorite]=useState(false)
    const [isLiked,setIsLiked]=useState(false)
    const currentUsername=auth().currentUser.email
    const parseCurrentUsername=currentUsername.slice(0,currentUsername.indexOf("@"))

    
    function clickUsername(){
        lookProfile()
    }

    const parseDate=formatDistance(parseISO(date),new Date(),{
        addSuffix: true,
        locale:enUS
    })

    useEffect(()=>{
        database()
        .ref(`Favorites/${parseCurrentUsername}/${id}-fav-${parseCurrentUsername}`)
        .on("value",snapshot=>{
            if(snapshot.val()){
                setIsFavorite(!isFavorite)
            }
        })
    },[])


    useEffect(()=>{
        database()
        .ref(`Books/${id}/likes/`)
        .on("value",snapshot=>{
            const response=snapshot.val()
            if(response){
                const isUser=( response.list.some(i=>i===`${parseCurrentUsername}`))
                if(isUser) setIsLiked(true)
            }
        })
    },[])



    function setFavorite(){
        if(isFavorite){
            database()
            .ref(`Favorites/${parseCurrentUsername}/${id}-fav-${parseCurrentUsername}`)
            .remove()
            setIsFavorite(!isFavorite)
        }else{
            const copyObject={
                id:id,
                username:username,
                name:name,
                type:type,
                author:author,
                comment:comment,
                image:image,
                isFavorite:true,
                likes:likes,
                date:date
            }
            database()
            .ref(`Favorites/${parseCurrentUsername}/${id}-fav-${parseCurrentUsername}`)
            .set(copyObject)
        } 
    }


    function setLikeButton(){
        if(!isLiked){
            likes.list.push(parseCurrentUsername)
            database().ref(`Books/${id}/likes/`).update({
                number:likes.number+1,
                list:likes.list
            })
            setIsLiked(true)
            
        }else{
            database().ref(`Books/${id}/likes/`).update({
                number:likes.number-1,
                list:likes.list.filter(i=>i!==`${parseCurrentUsername}`)
            })
            setIsLiked(false)
            
        }
    }


    return(
        <View style={styles.container}>
            <View style={styles.header_container}>
                <TouchableWithoutFeedback onPress={clickUsername}>
                    <Text style={styles.username}>{username}</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.date}>{parseDate}</Text>
            </View>
            <View style={styles.img_container}>
                <Image style={styles.img} source={{uri:image}}/>
            </View>
            <View style={styles.icon_container}>
                <View style={styles.likeComment_container}>
                    <Icon name={`heart${isLiked ? "" : "-outline"}`} color={`${isLiked ? "red" : "black"}`} size={30} style={{marginRight:10}} onPress={setLikeButton}/>
                    {likes.number ? 
                        (<Text style={{fontSize:20,fontWeight:"bold",color:Colors.mainColor}}>{likes.number}</Text>)
                    : (null)
                    }
                </View>
                <Icon name={`star-four-points${isFavorite ? "" : "-outline"}`} color={isFavorite ? Colors.mainColor : "black" } size={30} onPress={setFavorite}/>
            </View>
            <View style={styles.card_body}>
                <View style={styles.book_defs}>
                    <Text style={styles.card_question}>Name : </Text>
                    <Text style={styles.card_answer}>{name}</Text>
                </View>
                <View style={styles.book_defs}>
                    <Text style={styles.card_question}>Type : </Text>
                    <Text style={styles.card_answer}>{type}</Text>
                </View>
                <View style={styles.book_defs}>
                    <Text style={styles.card_question}>Author : </Text>
                    <Text style={styles.card_answer}>{author}</Text>
                </View>
                <View style={styles.book_defs}>
                    <Text style={styles.card_question}>Comments : </Text>
                    <Text style={styles.card_answer}>{comment}</Text>
                </View>
            </View>
        </View>
    )
}

export default BookCard;
import React, { useEffect, useState } from "react"
import { View,Text, Image, TouchableWithoutFeedback, FlatList,ScrollView} from "react-native"
import styles from "./UserProfile.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Colors from "../../Colors/Colors"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import AuthButton from "../../Components/Buttons/AuthButton"
import BookCard from "../../Components/Cards/BookCard"
import parseContentData from "../../Utills/parseContentData"
import Loading from "../../Components/Loading/Loading"

const UserProfile=({navigation,route})=>{
    const [loading,setLoading]=useState(false)
    const username=route.params
    const capitalizeUsername=username.replace(username[0],username[0].toUpperCase())
    const [userSharedData,setSharedData]=useState([])
    

    const [name,setName]=useState("")
    const [surname,setSurname]=useState("")
    const [age,setAge]=useState("")
    const [gender,setGender]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")   


    useEffect(()=>{
        try {
            database()
            .ref("Books/")
            .on("value",snapshot=>{
                const response = snapshot.val()
                const parseSharedList=parseContentData(response || {}).filter(obj=>obj.username===username)
                setSharedData(parseSharedList)
            })
        } catch (error) {
            console.log(error.code);
        }
    },[])

    function renderSharedBooks({item}){
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
        //lookProfile={()=>lookProfile(item.username)}
    />
    }

    useEffect(()=>{
        setLoading(true)
        try {
            database()
            .ref(`Profiles/${username}/`)
            .on("value",snapshot=>{
                const response=snapshot.val()
                if(response){
                    setName(response.name)
                    setSurname(response.surname)
                    setAge(response.age)
                    setGender(response.gender)
                    setEmail(response.email)
                    setImage(response.image)
                }
                setLoading(false)
            })
        } catch (error) {
            console.log(error.code);
            setLoading(false)
        }
    },[])

    function passToFavorites(){
        navigation.navigate("UserFavoritesPage",(username))
    }

    
    if(loading){
        return <Loading/>
    }


    return(
        <ScrollView>
            <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.profile_picture}>
                                {image ? (
                                        <Image 
                                            source={{uri:image}}
                                            style={{
                                                height:100,
                                                width:100,
                                                borderRadius:50,
                                            }}
                                        />
                                    ):(
                                        <Icon
                                            style={styles.icon}
                                            name="account-outline" 
                                            color={Colors.mainColor} 
                                            size={85} 
                                        />
                                    )
                                }
                        </View>
                        <Text style={styles.name}>{capitalizeUsername}</Text>
                    </View>
                <View style={styles.profile_info}>
                        <View style={styles.info_view}>
                            <Text style={styles.questions}>Name-Surname : </Text>
                            <Text style={styles.answers}>{name} {surname}</Text>
                        </View>
                        <View style={styles.info_view}>
                            <Text style={styles.questions}>Age : </Text>
                            <Text style={styles.answers}>{age}</Text>
                        </View>
                    
                        <View style={styles.info_view}>
                            <Text style={styles.questions}>Gender : </Text>
                            <Text style={styles.answers}>{gender}</Text>
                        </View>
                        
                        <View style={styles.info_view}>
                            <Text style={styles.questions}>E-mail : </Text>
                            <Text style={styles.answers}>{email}</Text>
                        </View>
                    </View>
                    <View style={{padding:10,alignItems:"center",borderBottomWidth:1,borderColor:"grey"}}>
                        <AuthButton name="Favorites" onPress={passToFavorites} icon="star-four-points-outline"/>
                    </View>
                    <View style={styles.list}>
                            <FlatList data={userSharedData} renderItem={renderSharedBooks}/>
                    </View>
            </View>
        </ScrollView>                        
    )
}

export default UserProfile;
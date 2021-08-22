import React, { useEffect, useState } from "react"
import { View,Text, Button, Image, TouchableWithoutFeedback } from "react-native"
import styles from "./Profile.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Colors from "../../Colors/Colors"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import AuthButton from "../../Components/Buttons/AuthButton"
import Loading from "../../Components/Loading/Loading"


const Profile=({navigation})=>{
    const [loading,setLoading]=useState(false)
    const currentUsername=auth().currentUser.email
    const parseCurrentUsername=currentUsername.slice(0,currentUsername.indexOf("@"))
    const capitalizeUsername=parseCurrentUsername.replace(parseCurrentUsername[0],parseCurrentUsername[0].toUpperCase())
    

    const [name,setName]=useState("")
    const [surname,setSurname]=useState("")
    const [age,setAge]=useState("")
    const [gender,setGender]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")   

    function passToEditPage(){
        navigation.navigate("EditPage")
    }


    useEffect(()=>{
        setLoading(true)
        try {
            database()
            .ref(`Profiles/${parseCurrentUsername}/`)
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


    if(loading){
        return <Loading/>
    }



    return(
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
                <AuthButton name="Edit Profile" onPress={passToEditPage} icon="account-cog-outline"/>
        </View>
    )
}

export default Profile;
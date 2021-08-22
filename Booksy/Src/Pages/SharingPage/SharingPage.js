import React, { useState } from "react"
import { ImageBackground, View,Text, TouchableWithoutFeedback} from "react-native"
import styles from "./SharingPage.style"
import Input from "../../Components/Input"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Colors from "../../Colors/Colors"
import ContentButton from "../../Components/Buttons/ContentButton"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import ImagePicker from "react-native-image-crop-picker"



const SharingPage=({navigation})=>{
    const [name,setName]=useState("")
    const [type,setType]=useState("")
    const [author,setAuthor]=useState("")
    const [comment,setComment]=useState("")
    const [image,setImage]=useState("")    

    

    function setEmptyAfterShare(){
        setName(""),
        setType(""),
        setAuthor(""),
        setComment("")
    }


    function onAdd(){
        const userMail=auth().currentUser.email
        if(name==="" || type==="" || author==="" || image==="" ) return;
        const bookObject={
            username:userMail.slice(0,userMail.indexOf("@")),
            name:name,
            type:type,
            author:author,
            date:(new Date()).toISOString(),
            comment:comment,
            image:image,
            likes:{
                list:["a"],
                number:0,
            }

        }
        database()
        .ref(`Books/`)
        .push(bookObject)
        setEmptyAfterShare()
        navigation.navigate("MainPage")
    }
    

    function editImage(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            setImage(image.path)
          });
          
    }
    
    return(
            <View style={styles.container}>
                <View style={styles.btn_body}>
                    <ContentButton name="Share" icon="share" onPress={onAdd}/>
                </View>
                <View style={styles.img_container}>
                    <TouchableWithoutFeedback onPress={editImage}>
                        <ImageBackground 
                        source={{uri:image ? image : null}}
                        style={{height:300,width:400,alignItems:"center",justifyContent:"center"}}
                        >
                            {
                                image !=="" ? null : 
                                (
                                    <>
                                        <Icon name="plus" color={Colors.mainColor} size={60} onPress={editImage}/>
                                        <Text style={{color:"grey"}}>Add image</Text>
                                    </>
                                )
                            }
                            
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.body}>
                    <Input placeholder="Name" onChangeText={setName} value={name} icon={"book-open-page-variant"}/>
                    <Input placeholder="Type" onChangeText={setType} value={type} icon={"drama-masks"}/>
                    <Input placeholder="Author" onChangeText={setAuthor} value={author} icon={"fountain-pen-tip"}/>
                    <Input placeholder="Add Comments" onChangeText={setComment} value={comment} icon={"comment-processing-outline"}/>
                </View>
            </View>
    )
}

export default SharingPage;
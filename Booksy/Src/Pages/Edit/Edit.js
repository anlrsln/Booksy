import React,{useState} from "react"
import { View,Text,TouchableWithoutFeedback,Image} from "react-native"
import styles from "./Edit.style"
import Input from "../../Components/Input"
import { Formik } from "formik"
import AuthButton from "../../Components/Buttons/AuthButton"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Colors from "../../Colors/Colors"
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import {showMessage}  from "react-native-flash-message"
import ImagePicker from "react-native-image-crop-picker"



const Edit=({navigation})=>{
    const currentUsername=auth().currentUser.email
    const parseCurrentUsername=currentUsername.slice(0,currentUsername.indexOf("@"))
    const [image,setImage]=useState("")   


    function editImage(){
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true
          }).then(image => {
            setImage(image.path)
          });
          
    }


    function editProfile(values){
        if(values.name==="" || values.surname==="") {
            showMessage({
                message:"Name or surname can't be empty.",
                type:"danger"
            })
            return
        }
        const personObject={
            name:values.name,
            surname:values.surname,
            age:values.age,
            gender:values.gender,
            email:values.email,
            image:image
        }
        database()
        .ref(`Profiles/${parseCurrentUsername}/`)
        .set(personObject)
        showMessage({
            message:"Saved",
            type:"success"
        })
        navigation.navigate("ProfilePage")
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profile_picture}>
                            {image ? (
                                <TouchableWithoutFeedback onPress={editImage}>
                                    <Image 
                                        source={{uri:image}}
                                        style={{
                                            height:100,
                                            width:100,
                                            borderRadius:50,
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                                ):(
                                    <Icon
                                        style={styles.icon}
                                        name="account-plus-outline" 
                                        color={Colors.mainColor} 
                                        size={85} 
                                        onPress={editImage}
                                    />
                                )
                            }
                    </View>
            </View>
            <Formik
                initialValues={{name:"",surname:"",age:"",gender:"",email:""}}
                onSubmit={editProfile}
            >{({handleChange,handleSubmit,values})=>(
                <>
                    <Input placeholder="Name" onChangeText={handleChange("name")} value={values.name}/>
                    <Input placeholder="Surname" onChangeText={handleChange("surname")} value={values.surname}/>
                    <Input placeholder="Age" onChangeText={handleChange("age")} value={values.age}/>
                    <Input placeholder="Gender" onChangeText={handleChange("gender")} value={values.gender}/>
                    <Input placeholder="E-mail" onChangeText={handleChange("email")} value={values.email}/>
                    <AuthButton name="Save" icon="content-save-all-outline" onPress={handleSubmit}/>
                </>
            )}


            </Formik>
        </View>
    )
}

export default Edit;
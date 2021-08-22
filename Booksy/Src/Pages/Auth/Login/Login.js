import React, { useState } from "react"
import { View,Text, Image } from "react-native"
import AuthButton from "../../../Components/Buttons/AuthButton"
import Input from "../../../Components/Input"
import styles from "./Login.style"
import {Formik} from "formik"
import auth from "@react-native-firebase/auth"
import { showMessage } from "react-native-flash-message"
import authErrorMessageParser from "../../../Utills/authErrorMessageParser"


const Login=({navigation})=>{

    const [loading,setLoading]=useState(false)

    function passToMain(){
        navigation.navigate("MainTabStack")
    }

    function passToSign(){
        navigation.navigate("SignPage")
    }


    async function handleLogin(values){
        if(values.email==="" || values.password===""){
            showMessage({
              message:"Email or password can't be empty",
              type:"danger"
            })
            return
        }
        try{
            setLoading(true)
            await auth()
            .signInWithEmailAndPassword(values.email,values.password)
            showMessage({
                message:"Login successful",
                type:"success"
            })
            setLoading(false)
            passToMain()
        }catch(error){
            showMessage({
                message:authErrorMessageParser(error.code),
                type:"danger"
              })
              setLoading(false)
        }

    }


    return(
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img} source={require("../../../Assets/Logo/0ad9702ff5ed4bbb9d38dcea7040ed1e.png")}/>
            </View>
            <View style={styles.form_body}>
                <Formik
                    initialValues={{email:"",password:""}}
                    onSubmit={handleLogin}
                >
                {({handleChange,handleSubmit,values})=>(
                    <>
                        <Input placeholder="Email" onChangeText={handleChange("email")} value={values.email} icon={"card-account-mail-outline"}/>
                        <Input 
                            placeholder="Password" 
                            onChangeText={handleChange("password")} 
                            value={values.password} icon={"lock-outline"} 
                            isSecure
                        />
                        <AuthButton name="Login" onPress={handleSubmit} icon={"login"}/>
                    </>
                )}

                </Formik>
                <AuthButton name="Sign Up" onPress={passToSign} theme="secondary" icon={"account-plus-outline"}/>
            </View>

        </View>
    )
}

export default Login;
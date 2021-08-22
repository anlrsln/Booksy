import React, { useState } from "react"
import { View,Text, Image } from "react-native"
import AuthButton from "../../../Components/Buttons/AuthButton"
import Input from "../../../Components/Input"
import styles from "./Sign.style"
import {Formik} from "formik"
import auth from "@react-native-firebase/auth"
import { showMessage } from "react-native-flash-message"
import authErrorMessageParser from "../../../Utills/authErrorMessageParser"


const Sign=({navigation})=>{

    const [loading,setLoading]=useState(false)

    function passToLogin(){
        navigation.navigate("LoginPage")
    }


    async function handleSign(values){
        if(values.email==="" || values.password===""){
            showMessage({
              message:"Email or password can't be empty",
              type:"danger"
            })
            return
        }
        if(values.password!==values.rePassword){
            showMessage({
                message:"Passwords are not matched.",
                type:"danger"
              })
              return
        }
        try{
            setLoading(true)
            await auth()
            .createUserWithEmailAndPassword(values.email,values.password)
            showMessage({
                message:"Login successful",
                type:"success"
            })
            setLoading(false)
            passToLogin()
        }catch(error){
            showMessage({
                message:authErrorMessageParser(error.code),
                type:"danger"
              })
              setLoading(false)
        }

    }

    function goBack(){
        navigation.goBack()
    }


    return(
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img} source={require("../../../Assets/Logo/0ad9702ff5ed4bbb9d38dcea7040ed1e.png")}/>
            </View>
            <View style={styles.form_body}>
                <Formik
                    initialValues={{email:"",password:"",rePassword:""}}
                    onSubmit={handleSign}
                >
                {({handleChange,handleSubmit,values})=>(
                    <>
                        <Input 
                            placeholder="Email" 
                            onChangeText={handleChange("email")} 
                            value={values.email} 
                            icon={"card-account-mail-outline"}
                        />
                        <Input 
                            placeholder="Password" 
                            onChangeText={handleChange("password")} 
                            value={values.password} icon={"lock-outline"} 
                            isSecure
                        />
                        <Input 
                            placeholder="Password-Again" 
                            onChangeText={handleChange("rePassword")} 
                            value={values.rePassword} icon={"lock-outline"} 
                            isSecure
                        />
                        <AuthButton name="Sign Up" onPress={handleSubmit} icon={"login"}/>
                    </>
                )}

                </Formik>
                <AuthButton name="Back" onPress={goBack} theme="secondary" icon={"keyboard-backspace"}/>
            </View>

        </View>
    )
}

export default Sign;
import React, { useState } from "react"
import { View,Text } from "react-native"
import AuthButton from "../../../Components/Buttons/AuthButton"
import Input from "../../../Components/Input"
import styles from "./Login.style"
import {Formik} from "formik"
import auth from "@react-native-firebase/auth"
import { showMessage } from "react-native-flash-message"
import authErrorMessageParser from "../../../Utills/authErrorMessageParser"


const Login=({navigation})=>{

    const [loading,setLoading]=useState(false)

    function cross(){
        navigation.navigate("MainTab",{screen:"MainPage"})
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
            cross()
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
                <Text style={{fontSize:60}}>LOGO</Text>
            </View>
            <View style={styles.form_body}>
                <Formik
                    initialValues={{email:"",password:""}}
                    onSubmit={handleLogin}
                >
                {({handleChange,handleSubmit,values})=>(
                    <>
                        <Input placeholder="Email" onChangeText={handleChange("email")} value={values.email} icon={"card-account-mail-outline"}/>
                        <Input placeholder="Password" onChangeText={handleChange("password")} value={values.password} icon={"lock-outline"} isSecure/>
                        <AuthButton name="Login" onPress={handleSubmit} icon={"login"}/>
                    </>
                )}

                </Formik>
                <AuthButton name="Sign Up" onPress={null} theme="secondary" icon={"account-plus-outline"}/>
            </View>

        </View>
    )
}

export default Login;
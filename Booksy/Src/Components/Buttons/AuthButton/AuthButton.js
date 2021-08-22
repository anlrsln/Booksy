import React from "react"
import { View,Text,TouchableOpacity} from "react-native"
import styles from "./AuthButton.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const AuthButton=({name,onPress,theme="primary",icon})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles[theme].container}>
            <View style={styles[theme].btn_body}>
                <Icon style={styles[theme].icon_color} name={icon} size={30}/>
                <Text style={styles[theme].btn_name}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AuthButton;
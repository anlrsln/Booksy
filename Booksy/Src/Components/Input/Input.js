import React from "react"
import { View,Text,TextInput} from "react-native"
import styles from "./Input.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Colors from "../../Colors/Colors"


const Input=({placeholder,onChangeText,value,icon,isSecure})=>{
    
    return(
        <View style={styles.container}>
            <Icon style={{marginHorizontal:10}} name={icon} color={Colors.secondColor} size={30}/>
            <TextInput
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                multiline
                secureTextEntry={isSecure}
            />
        </View>
    )
}

export default Input;
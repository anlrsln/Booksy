import React from "react"
import { View,Text,TouchableOpacity} from "react-native"
import styles from "./ContentButton.style"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Colors from "../../../Colors/Colors"

const ContentButton=({name,onPress,icon})=>{
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                {icon && <Icon name={icon} color={Colors.mainColor} size={30}/>}
                <Text style={styles.btn_name}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ContentButton;
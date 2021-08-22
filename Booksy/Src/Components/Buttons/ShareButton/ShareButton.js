import React from "react"
import { View,Image} from "react-native"
import styles from "./ShareButton.style"

const ShareButton=({onPress})=>{
    return(
        <View style={styles.container} onPress={onPress}>
            <Image style={styles.img} source={require("../../../Assets/book.png")}/>
        </View>

    )
}

export default ShareButton;
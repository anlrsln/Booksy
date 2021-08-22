import { StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors"

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.mainColor
    },
    img_container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    img:{
        resizeMode:"contain",
        height:250,
        width:300
    },
    form_body:{
        flex:2
        //alignItems:"center"
    }
})
import { StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";

export default StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        margin:10,
        height:42,
        width:100,
        borderRadius:20,
        
    },
    btn_name:{
        fontSize:20,
        fontWeight:"bold",
        color:Colors.mainColor,
    }
})
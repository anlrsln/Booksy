import { StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";

export default StyleSheet.create({
    container:{
        margin:10,
        padding:5,
        height:65,
        width:65,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:100,
        backgroundColor:Colors.mainColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
    
        elevation: 11,
    },
    img:{
        height:40,
        resizeMode:"contain"
    },

})
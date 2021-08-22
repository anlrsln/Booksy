import { StyleSheet } from "react-native";
import Colors from "../../Colors/Colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    header:{
        alignItems:"center"
    },
    icon_container:{
        margin:30,
        alignItems:"center"
    },
    title:{
        fontSize:50
    },
    profile_picture:{
        margin:15,
        height:100,
        width:100,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center"
    },
    icon:{
        padding:5,
        height:100,
        width:100,
        borderWidth:3,
        borderRadius:50,
        borderColor:Colors.mainColor
    },
})
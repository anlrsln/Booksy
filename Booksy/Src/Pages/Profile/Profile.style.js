import { StyleSheet } from "react-native";
import Colors from "../../Colors/Colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor
    },
    header:{
        alignItems:"center"
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
        paddingHorizontal:8,
        paddingVertical:4,
        height:100,
        width:100,
        borderWidth:3,
        borderRadius:50,
        borderColor:Colors.mainColor
    },
    name:{
        fontSize:35,
        fontWeight:"bold"
    },
    profile_info:{
        marginVertical:50
    },
    questions:{
        fontSize:20,
        fontWeight:"bold",
        color:Colors.mainColor
    },
    info_view:{
        margin:10,
        flexDirection:"row",
        
    },
    answers:{
        fontSize:20
    }
})
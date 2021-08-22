import { StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";

export default StyleSheet.create({
    container:{
        margin:10,
        marginBottom:35,
        borderColor:"#e0e0e0",
        borderRadius:15,
        backgroundColor:"white"
    },
    header_container:{
        flexDirection:"row",
        alignItems:"center",
        padding:8
    },
    username:{
        flex:1,
        fontSize:25,
        fontWeight:"bold",
        color:Colors.mainColor
        
    },
    date:{
        fontSize:20,
        fontStyle:"italic",
        fontWeight:"bold"
    },
    img_container:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"grey",
        alignItems:"center"
    },
    img:{
        resizeMode:"cover",
        height:400,
        width:371
    },
    icon_container:{
        flexDirection:"row",
        padding:5
    },
    likeComment_container:{
        flexDirection:"row",
        flex:1
    },
    card_body:{
        padding:10,
    },
    book_defs:{
        flexDirection:"row"
    },
    card_question:{
        fontSize:18,
        fontWeight:"bold",
        color:Colors.mainColor
    },
    card_answer:{
        flex:1,
        fontSize:18,
        fontWeight:"bold",
        
    }

})
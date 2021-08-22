import { StyleSheet,Dimensions} from "react-native";
import Colors from "../../../Colors/Colors";

export default StyleSheet.create({
    container:{
        margin:10,
        marginBottom:30,
        borderRadius:15,
        height:Dimensions.get("window").height/4,
        width:Dimensions.get("window").width/4,
    },
    img_container:{
        flex:3,
        alignItems:"center",
        justifyContent:"center"
    },
    img:{
        resizeMode:"cover",
        height:112,
        width:103,
        borderTopRightRadius:15,
        borderTopLeftRadius:15
    },
    body:{
        backgroundColor:Colors.mainColor,
        padding:10,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        flex:1,
        alignItems:"flex-start"
    },
    name:{
        fontSize:15,
        color:"white",
        fontWeight:"bold"
    },
    modal:{
        margin:10,
        borderColor:"#e0e0e0",
        borderRadius:15,
    }

})
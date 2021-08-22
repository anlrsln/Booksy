import { StyleSheet } from "react-native";
import Colors from "../../../Colors/Colors";


const common_styles={
    container:{
        margin:10,
        padding:3,
        backgroundColor:"white",
        alignItems:"center",
        borderRadius:15,
        width:250,
        alignSelf:"center"

    },
    btn_body:{
        flexDirection:"row",
    },
    btn_name:{
        fontSize:20,
        color:"black",
        fontWeight:"bold"
    }
}

export default {
    primary:StyleSheet.create({
        ...common_styles,
        container:{
            ...common_styles.container,
            backgroundColor:Colors.secondColor,
        },
        btn_name:{
            ...common_styles.btn_name,
            color:"white"
        },
        icon_color:{
            color:"white"
        }
    }),
    secondary:StyleSheet.create({
        ...common_styles,
        container:{
            ...common_styles.container,
            backgroundColor:"white"
        },
        btn_name:{
            ...common_styles.btn_name,
            color:Colors.secondColor
        },
        icon_color:{
            color:Colors.secondColor
        }
    })
}
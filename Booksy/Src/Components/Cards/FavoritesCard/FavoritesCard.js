import React,{useState} from "react"
import { View,Text,Image, TouchableWithoutFeedback} from "react-native"
import styles from "./FavoritesCard.style"
import Modal from "react-native-modal"
import BookCard from "../BookCard"


const FavoritesCard=({name,image,author,comment,type,date,id,lookProfile,username,likes})=>{

    const [visible,setVisible]=useState(false)

    function onToggleModal(){
        setVisible(!visible)
    }


    return(
        <TouchableWithoutFeedback onPress={onToggleModal}>
            <View style={styles.container}>
                <View style={styles.img_container}>
                    <Image style={styles.img} source={{uri:image}}/>
                </View>
                <View style={styles.body}>
                    <Text style={styles.name}>{name}</Text>
                </View>
                <Modal
                    style={styles.modal}
                    isVisible={visible}
                    onBackdropPress={onToggleModal}
                    onBackButtonPress={onToggleModal}
                >
                    <BookCard likes={likes} username={username} lookProfile={lookProfile} id={id} name={name} image={image} author={author} comment={comment} type={type} date={date}/>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
        
    )
}

export default FavoritesCard;
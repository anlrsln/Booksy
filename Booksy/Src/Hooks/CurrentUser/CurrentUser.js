export default function CurrentUser(){
    const currentUsername=auth().currentUser.email
    return currentUsername.slice(0,currentUsername.indexOf("@"))
}
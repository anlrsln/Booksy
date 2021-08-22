export default function(error){
    switch (error) {
        default:
            const errorCode=error.slice(error.indexOf("/")+1)
            const errorCodeList=errorCode.split("-")
            errorCodeList[0]=errorCodeList[0][0].toUpperCase()+errorCodeList[0].slice(1)
            return [...errorCodeList].join(" ")
    }
}
let serverUrl = "https://tasty-server.herokuapp.com/api"

window.onload = function(){

    checkWebToken()

    setTimeout(checkWebToken, 1000*60*30);
}

let checkWebToken = function(){
    let webToken = JSON.parse(window.localStorage.getItem('webToken'))
        console.log(webToken)

        if(webToken == null){
            window.localStorage.removeItem("profile")
            window.localStorage.removeItem("webToken")
            window.location.replace("index.html")
        }

        fetch(serverUrl+"/webToken", {
            method: "post",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(webToken)
        }).then(response => response.json())
        .then(data =>{
            if(data.username == null || data.token == null || data.expiryDate==null){
                window.localStorage.removeItem("profile")
                window.localStorage.removeItem("webToken")
                window.location.replace("index.html")
            }
            else{
                window.localStorage.setItem("webToken", JSON.stringify(data))
            }
            
        })
}


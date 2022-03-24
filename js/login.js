const registerButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");

let serverUrl = "https://tasty-server.herokuapp.com/api"

registerButton.addEventListener("click",()=>{

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const repeatedPassowrd = document.getElementById("register-repeat-password").value;

    if(password == repeatedPassowrd){

        let profile ={
            id: username,
            password: password
        }

        fetch(serverUrl+"/profileCreate",{
            method: "post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        })

    }

})

loginButton.addEventListener("click",()=>{
 
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    let profile={
        id: username,
        password: password
    }

    fetch(serverUrl+"/profileLogIn",{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(profile)
    }).then(response=>response.json())
    .then(data =>{

            console.log(data)

            if(data.id == null){
                throw "Bad username or password";
            }

            window.localStorage.setItem('profile', JSON.stringify(data));

            console.log(JSON.parse(window.localStorage.getItem('profile')));        
    }).then(()=>{
        fetch(serverUrl+"/webTokenFirst",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body: window.localStorage.getItem('profile')
        }).then(response => response.json())
        .then(data =>{
            window.localStorage.setItem('webToken',JSON.stringify(data));
            console.log(JSON.parse(window.localStorage.getItem('webToken')));
            window.location.replace("TastyFrontendApp/html/home.html")
        })  
    })

    
})
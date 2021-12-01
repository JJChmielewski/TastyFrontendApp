let urlParams;
let profileName;

window.addEventListener("load",()=>{
    urlParams = new URLSearchParams(window.location.search);
    profileName = urlParams.get("username");
    
    
    if(profileName == JSON.parse(window.localStorage.getItem("profile")).id){
        window.location.replace("/html/my-profile.html");
    }

    let myProfileButtonImg = document.querySelector("#topbar .profile img");
    myProfileButtonImg.src = "http://localhost:8080/api/profilePhoto?username="+JSON.parse(window.localStorage.getItem("profile")).id;

})
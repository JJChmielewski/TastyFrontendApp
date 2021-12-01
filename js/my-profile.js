let profileName;

window.addEventListener("load",()=>{

    profileName = JSON.parse(window.localStorage.getItem("profile")).id;
    console.log(profileName);

    let myProfileButtonImg = document.querySelector("#topbar .profile img");
    myProfileButtonImg.src = "http://localhost:8080/api/profilePhoto?username="+JSON.parse(window.localStorage.getItem("profile")).id;
})
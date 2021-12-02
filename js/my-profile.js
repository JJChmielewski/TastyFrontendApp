let profileName;


window.addEventListener("load",()=>{

    let profile = JSON.parse(window.localStorage.getItem("profile"))

    profileName = profile.id;
    console.log(profileName);

    let myProfileButtonImg = document.querySelector("#topbar .profile img");
    myProfileButtonImg.src = "http://localhost:8080/api/profilePhoto?username="+JSON.parse(window.localStorage.getItem("profile")).id;

    document.getElementById("profile-section").innerHTML=generateProfileHTML(profile);
})


let generateProfileHTML = function(profile){

    console.log(profile)

    let profileHTML='<div class="profile-photo">'+
    '<button class="edit-profile-photo">'+
                '<img src="'+serverUrl+'/profilePhoto?username='+profile.id+'" alt="">'+
                '<div class="edit-icon icon"><span class="fas fa-pen"></span></div>'+
            '</button>'+
            '</div>'+
    '<div class="profile-description">'+
        '<div class="profile-name-and-buttons">'+
            '<div class="profile-name">'+profile.id+'</div>'+
            '<div class="profile-buttons">'+
            '<button class="icon edit-profile"><span class="fas fa-pen"></span></button>'+
            '</div>'+
        '</div>'+
        '<div class="about-me">';
        if(profile.description == null){
            profileHTML+='</div>'+
            '</div>';
        }
        else{
            profileHTML+= profile.description + '</div>'+
            '</div>';
        }
            
        

    return profileHTML;

}
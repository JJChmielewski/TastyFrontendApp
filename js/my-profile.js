let profileName;
let editDescriptionButton;
let editProfilePhotoButton;

window.addEventListener("load",()=>{

    let profile = JSON.parse(window.localStorage.getItem("profile"))

    profileName = profile.id;
    console.log(profileName);

    let myProfileButtonImg = document.querySelector("#topbar .profile img");
    myProfileButtonImg.src = serverUrl+"/profilePhoto?username="+JSON.parse(window.localStorage.getItem("profile")).id;

    document.getElementById("profile-section").innerHTML=generateProfileHTML(profile);

    editProfilePhoto = document.querySelector(".edit-photo");
    editDescriptionButton = document.querySelector(".edit-description");
})




let generateProfileHTML = function(profile){

    console.log(profile)

    let profileHTML='<div class="profile-photo">'+
    '<button class="edit-profile-photo">'+
                '<img src="'+serverUrl+'/profilePhoto?username='+profile.id+'" alt="">'+
                '<div class="edit-photo icon"><span class="fas fa-pen"></span></div>'+
            '</button>'+
            '</div>'+
    '<div class="profile-description">'+
        '<div class="profile-name-and-buttons">'+
            '<div class="profile-name">'+profile.id+'</div>'+
            '<div class="profile-buttons">'+
            '<button class="icon edit-description"><span class="fas fa-pen"></span></button>'+
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
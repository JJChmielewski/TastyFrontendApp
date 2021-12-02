let urlParams;
let profileName;
let visitedProfile;

window.addEventListener("load",()=>{
    urlParams = new URLSearchParams(window.location.search);
    profileName = urlParams.get("username");
    
    console.log(profileName);
    
    if(profileName == JSON.parse(window.localStorage.getItem("profile")).id){
        window.location.replace("/html/my-profile.html");
    }

    let myProfileButtonImg = document.querySelector("#topbar .profile img");
    myProfileButtonImg.src = serverUrl+"/profilePhoto?username="+JSON.parse(window.localStorage.getItem("profile")).id;


    loadProfile(profileName);
})

let loadProfile = function(profileName){

    console.log(profileName);

    fetch(serverUrl+"/profile?username="+profileName).then(response => response.json())
    .then(profile => {
        visitedProfile =profile;

        console.log(visitedProfile);

        document.getElementById("profile-section").innerHTML = generateProfileHTML(visitedProfile);
    })

}


let generateProfileHTML = function(profile){

    console.log(profile)

    let profileHTML=
    '<div class="profile-photo">'+
        '<img src="'+serverUrl+'/profilePhoto?username='+profile.id+'" alt="">'+
    '</div>'+
    '<div class="profile-description">'+
        '<div class="profile-name-and-buttons">'+
            '<div class="profile-name">'+profile.id+'</div>'+
            '<div class="profile-buttons">'+
                '<button class="icon follow"><span class="fas fa-user-plus"></span></button>'+
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
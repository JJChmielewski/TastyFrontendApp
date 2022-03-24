let postsArea;
let likeButtons;
let commentButtons;
let recipeButtons;
let pageNumber;
let loadedPosts;

let profile = JSON.parse(window.localStorage.getItem("profile"));

window.addEventListener("load",()=>{

    postsArea = document.getElementById("posts");
    likeButtons =[];
    commentButtons=[];
    recipeButtons=[];
    pageNumber=0;
    loadedPosts=[];

    loadPosts();
    
})


let loadPosts = function(){

    if(typeof profileName =="undefined"){
        profileName ="";
    }
    else{
        if(profileName ==null){
        
        }
        else{
            profileName = "?username="+profileName;
        }
    }

    fetch(serverUrl+"/post/"+pageNumber+profileName)
        .then(response => response.json())
            .then(posts =>{
                for(let i=0;i<posts.length;i++){

                    loadedPosts.push(posts[i])

                    console.log(loadedPosts[i]);

                    postsArea.innerHTML += generatePostHTML(posts[i]);
                }
                pageNumber++;

                likeButtons = document.querySelectorAll(".like");
                commentButtons = document.querySelectorAll(".comment");
                recipeButtons = document.querySelectorAll(".recipe");

                for(let i=0; i<recipeButtons.length;i++){

                    likeButtons[i].addEventListener("click",()=>{
                        let postId = likeButtons[i].closest(".post").id;
                        likePost(postId, i);
                    })

                    commentButtons[i].addEventListener("click",()=>{
                        let postId = commentButtons[i].closest(".post").id;
                        showCommentSection(postId);
                    })


                    recipeButtons[i].addEventListener("click",()=>{
                        let postId = recipeButtons[i].closest(".post").id;
                        showRecipe(postId,i);
                    })
                }

            })
}

let likePost = function(postId, buttonIndex){


    console.log(profile);

    if(profile.likedPosts ==null){
        profile.likedPosts = [];
    }

    for(let i=0;i<loadedPosts.length;i++){
        if(loadedPosts[i].id == postId){
            if(likeButtons[buttonIndex].classList.contains("liked")){
                likeButtons[buttonIndex].classList.remove("liked");
                likeButtons[buttonIndex].firstChild.classList.replace("fas","far");
                profile.likedPosts.pop(postId);
            }
            else{
                likeButtons[buttonIndex].classList.add("liked");
                likeButtons[buttonIndex].firstChild.classList.replace("far","fas");
                profile.likedPosts.push(postId);
            }

            window.localStorage.setItem("profile",JSON.stringify(profile));

            
            fetch(serverUrl+"/profile",{
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(profile)
            });
        }
    }
}

let showCommentSection = function(postId){
    
}

let showRecipe = function(postId, buttonIndex){

    let post;

    for(let i=0;i<loadedPosts.length;i++){
        if(loadedPosts[i].id == postId){
            post = loadedPosts[i];
        }
    }
    if(post == null) return;

    const popup = document.querySelector(recipeButtons[buttonIndex].dataset.popupTarget);
    openPopup(popup);

    const images = document.querySelector("#recipe-popup .images .img-container");
    const ingredients = document.querySelector("#recipe-popup .ingredients ul");
    const steps = document.querySelector("#recipe-popup .steps ul");
    images.innerHTML = "\0";
    ingredients.innerHTML = "\0";
    steps.innerHTML="\0";

    if(post.pathsToImages != null){
        if(post.pathsToImages.length > 1){
            document.querySelector("#recipe-popup .images .left").classList.remove("disabled");
            document.querySelector("#recipe-popup .images .right").classList.remove("disabled");

            for(let i=0;i<post.pathsToImages.length;i++){
                images.innerHTML += '<img class="post-image" src="'+serverUrl+'/image/?pathToImage='+post.pathsToImages[i]+'" alt="">';
            }
        }
        else{
            document.querySelector("#recipe-popup .images .left").classList.add("disabled");
            document.querySelector("#recipe-popup .images .right").classList.add("disabled");
            images.innerHTML +='<img class="post-image" src="'+serverUrl+'/image/?pathToImage='+post.pathsToImages[0]+'" alt="">';
            
        }
    }
    else{
        document.querySelector("#recipe-popup .images .left").classList.add("disabled");
            document.querySelector("#recipe-popup .images .right").classList.add("disabled");
    }
    
    for(let i=0;i<post.ingredients.length;i++){
        ingredients.innerHTML+='<li><div class="dot"><span class="fas fa-circle"></span><div class="line"></div></div>'+post.ingredients[i]+'</li>';
    }

    for(let i=0;i<post.steps.length;i++){
        steps.innerHTML+='<li><div class="dot"><span class="fas fa-circle"></span><div class="line"></div></div>'+post.steps[i]+'</li>';
    }

}

let generatePostHTML = function(post){

    if(typeof post == 'undefined'){
        return "\0";
    }
    
    let postHTML = '<div class="post" id="'+post.id+'">'+
    '<div class="profile-info">'+
        '<a href="/TastyFrontendAppprofile.html?username='+post.author+'">'+
            '<div class="profile-photo">'+
                '<img src="'+serverUrl+'/profilePhoto?username='+post.author+'" alt="">'+
            '</div>'+
            '<span>'+post.author+'</span>'+
        '</a>'+
        '<button class="icon"><span class="fas fa-ellipsis-h"></span></button>'+
   ' </div>'+
   

    '<div class="description">'+
        '<span>'+post.description+'</span>'+
    '</div>';

    if(post.pathsToImages != null){
        if(post.pathsToImages.length == 1){
            postHTML += '<div class="images">'+
            '<button class="left disabled"><i class="fas fa-chevron-left"></i></button>'+
            '<div class="img-container">'+
            '<img class="post-image" src="'+serverUrl+'/image/?pathToImage='+post.pathsToImages[0]+'" alt="">'+
            '</div>'+
            '<button class="right disabled"><i class="fas fa-chevron-right"></i></button>'+
            '</div>';    
        }
        else{
            postHTML += '<div class="images">'+
            '<button class="left"><i class="fas fa-chevron-left"></i></button>'+
            '<div class="img-container">';
        
            for(let i=0;i<post.pathsToImages.length;i++){
                postHTML += '<img class="post-image" src="'+serverUrl+'/image/?pathToImage='+post.pathsToImages[i]+'" alt="">'
            }

            postHTML += '</div>'+
            '<button class="right"><i class="fas fa-chevron-right"></i></button>'+
            '</div>';
        }
    }

    let liked = false;

    if(profile.likedPosts != null){
        for(let temp of profile.likedPosts){
            if(temp==post.id)
                liked = true;
        }
    }

    postHTML +='<div class="post-icons">';
    if(liked){
        postHTML+='<button class="icon like liked"><span class="fas fa-heart"></span></button>'
    }
    else{
        postHTML+='<button class="icon like"><span class="far fa-heart"></span></button>';
    }

    postHTML+='<button class="icon comment"><span class="far fa-comments"></span></button>'+
    '<button data-popup-target="#recipe-popup" class="icon recipe"><span class="fas fa-bars"></span></button>'+
    '<span class="views"></span>'+
    '</div>'+

    '<div class="comments">'+

        '<div class="my-comment">'+
            '<div class="profile-photo">'+
                '<img src="'+serverUrl+'/profilePhoto?username='+profile.id+'" alt="">'+
            '</div>'+
            '<div class="textarea-container"><textarea name="my-comment" id="#" placeholder="Your comment..."></textarea></div>'+
           ' <button class="send-icon">'+
                '<span class="far fa-paper-plane"></span>'+
           ' </button>'+
        '</div>'+

    '</div>'+
    
'</div>';

    return postHTML;
}
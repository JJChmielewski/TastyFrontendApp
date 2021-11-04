let postsArea = document.getElementById('posts');
let likeButtons;
let commentButtons;
let recipeButtons;
let pageNumber = 0;
let loadedPosts = [];


window.addEventListener("load",()=>{

    loadPosts();

})


let loadPosts = function(){

    fetch("http://localhost:8080/api/post/"+pageNumber)
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

                for(let i=0; i<likeButtons.length;i++){

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
    for(let i=0;i<loadedPosts.length;i++){
        if(loadedPosts[i].id == postId){
            if(likeButtons[buttonIndex].classList.contains("liked")){
                likeButtons[buttonIndex].classList.remove("liked");
                likeButtons[buttonIndex].firstChild.classList.replace("fas","far");
            }
            else{
                likeButtons[buttonIndex].classList.add("liked");
                likeButtons[buttonIndex].firstChild.classList.replace("far","fas");
            }
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
                images.innerHTML += '<img class="post-image" src="http://localhost:8080/api/image/?pathToImage='+post.pathsToImages[i]+'" alt="">';
            }
        }
        else{
            document.querySelector("#recipe-popup .images .left").classList.add("disabled");
            document.querySelector("#recipe-popup .images .right").classList.add("disabled");
            images.innerHTML +='<img class="post-image" src="http://localhost:8080/api/image/?pathToImage='+post.pathsToImages[0]+'" alt="">';
            
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
        '<a href="profile.html?username='+post.author+'">'+
            '<div class="profile-photo">'+
                '<img src="http://localhost:8080/api/image?pathToImage=/Users/Chmielu/TastyFileSystem/Chmielu/1634830283168/220764.jpg" alt="">'+
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
            '<img class="post-image" src="http://localhost:8080/api/image/?pathToImage='+post.pathsToImages[0]+'" alt="">'+
            '</div>'+
            '<button class="right disabled"><i class="fas fa-chevron-right"></i></button>'+
            '</div>';    
        }
        else{
            postHTML += '<div class="images">'+
            '<button class="left"><i class="fas fa-chevron-left"></i></button>'+
            '<div class="img-container">';
        
            for(let i=0;i<post.pathsToImages.length;i++){
                postHTML += '<img class="post-image" src="http://localhost:8080/api/image/?pathToImage='+post.pathsToImages[i]+'" alt="">'
            }

            postHTML += '</div>'+
            '<button class="right"><i class="fas fa-chevron-right"></i></button>'+
            '</div>';
        }
    }


    postHTML +='<div class="post-icons">'+
    '<button class="icon like"><span class="far fa-heart"></span></button>'+
    '<button class="icon comment"><span class="far fa-comments"></span></button>'+
    '<button data-popup-target="#recipe-popup" class="icon recipe"><span class="fas fa-bars"></span></button>'+
    '<span class="views">69 likes</span>'+
    '</div>'+

    '<div class="comments">'+

        '<div class="my-comment">'+
            '<div class="profile-photo">'+
                '<img src="https://cdn.pixabay.com/photo/2021/06/27/14/32/raspberry-6368999_960_720.png" alt="">'+
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
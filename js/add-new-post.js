const descriptionInput = document.getElementById('description-input')
const ingredientsInput = document.getElementById('ingredients-input')
const stepsInput = document.getElementById('steps-input')
const tagsInput = document.getElementById('tags-input')
const postImagesInput = document.getElementById('myImages')
const sendButton = document.getElementById('post')

let description
let ingredients = []
let steps = []
let tags= []
let images =[]
let ingredientsNumber =0
let stepsNumber=0
let tagsNumber=0

let username = "Chmielu"

ingredientsInput.addEventListener('change', function(){
    const ingredientsList = document.querySelector('.ingredients-list')
    ingredientsList.innerHTML += '<li id="ingredient'+ingredientsNumber+'" class="ingredient"><div class="dot"><span class="fas fa-circle"></span><div class="line"></div></div>'+ingredientsInput.value+'<button class="remove-item remove-ingredient"><i class="fas fa-times"></i></button></li>'
    ingredientsNumber++
    ingredientsInput.value=null
    const removeIngredientsButtons = document.querySelectorAll('.remove-ingredient')
    removeIngredientsButtons.forEach(button => {
        button.addEventListener('click', function(){
            const id = button.closest('.ingredient').id
            const removedItem = document.getElementById(id)
            removedItem.classList.add('removing')
            setTimeout(()=>{removedItem.remove()},150)
        })
    });
})

stepsInput.addEventListener('change', function(){
    const stepsList = document.querySelector('.steps-list')
    stepsList.innerHTML += '<li id="step'+stepsNumber+'" class="step"><div class="dot"><span class="fas fa-circle"></span><div class="line"></div></div>'+stepsInput.value+'<button class="remove-item remove-step"><i class="fas fa-times"></i></button></li>'
    stepsNumber++
    stepsInput.value=null
    const removeStepsButtons = document.querySelectorAll('.remove-step')
    removeStepsButtons.forEach(button => {
        button.addEventListener('click', function(){
            const id = button.closest('.step').id
            const removedItem = document.getElementById(id)
            removedItem.classList.add('removing')
            setTimeout(()=>{removedItem.remove()},150)
        })
    })
})

tagsInput.addEventListener('change', function(){
    const tagsList = document.querySelector('.tags-list')
    tagsList.innerHTML += '<li id="tag'+tagsNumber+'" class="tag"><div class="dot"><span class="fas fa-tag"></span></div></div>'+tagsInput.value+'<button class="remove-item remove-tag"><i class="fas fa-times"></i></button></li>'
    tagsNumber++
    tagsInput.value=null
    const removeTagsButtons = document.querySelectorAll('.remove-tag')
    removeTagsButtons.forEach(button => {
        button.addEventListener('click', function(){
            const id = button.closest('.tag').id
            const removedItem = document.getElementById(id)
            removedItem.classList.add('removing')
            setTimeout(()=>{removedItem.remove()},150)
        })
    })
})



postImagesInput.addEventListener('change',()=>{
    
    document.querySelector('.selected-imgs').innerHTML=null
    images = []

    for(const file of postImagesInput.files){
        images.push(file)
    }   

    let numberOfImgs = images.length
    for(let i=0;i<numberOfImgs;i++){
        document.querySelector('.selected-imgs').innerHTML+='<div id="image-'+i+'"><img src="'+URL.createObjectURL(images[i])+'"><button class="delete-image"><span>&times;</span></button></div>'
    }
    const removeImagesButtons = document.querySelectorAll('.delete-image')
    removeImagesButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            const id = button.closest('div').id
            let arrayIndex = id.split('-')[1]
            images[arrayIndex] = null
            const removedImage = document.getElementById(id)
            removedImage.classList.add('removing')
            setTimeout(()=>{removedImage.remove()},200)
        })
    })
    
})

sendButton.addEventListener('click',()=>{
    const stepsList = document.querySelector('.steps-list').querySelectorAll('li')
    const ingredientsList = document.querySelector('.ingredients-list').querySelectorAll('li')
    const tagsList = document.querySelector('.tags-list').querySelectorAll('li')

    description = descriptionInput.value

    stepsList.forEach(step => {
        steps.push(step.textContent)
    });
    
    ingredientsList.forEach(ingredient => {
        ingredients.push(ingredient.textContent)
    });

    tagsList.forEach(tag=>{
        tags.push(tag.textContent)
    })

    let tempImages =[]
    images.forEach(image=>{
        if(image != null){
            tempImages.push(image)
        }
    })
    images=tempImages

    let pathsToImages = []

    if(images.length > 0){

        postImagesToServer("http://localhost:8080/api/postImages/"+username, images).then(data =>{
            data.forEach(tempData => {
                pathsToImages.push(tempData)
                console.log(pathsToImages)
            });
        }).then(()=>{
            let post = {
                description: description,
                ingredients: ingredients,
                steps: steps,
                tags: tags,
                pathsToImages: pathsToImages
            }
        
            console.log(post.description)
            console.log(post.ingredients)
            console.log(post.steps)
            console.log(post.tags)
            console.log(post.pathsToImages)
        
            postPostDataToServer("http://localhost:8080/api/postData/"+username, post)
        }).then(()=>{
            emptyPostPopup()
        })
    }
    else{

        let post = {
            description: description,
            ingredients: ingredients,
            steps: steps,
            tags: tags,
            pathsToImages: pathsToImages
        }
    
        console.log(post.description)
        console.log(post.ingredients)
        console.log(post.steps)
        console.log(post.tags)
        console.log(post.pathsToImages)
    
        postPostDataToServer("http://localhost:8080/api/postData/"+username, post).then(()=>{
            emptyPostPopup()
        })
    }
})


let postImagesToServer = async function(url, imagesToSend){
    const formData = new FormData()

    for(const file of imagesToSend){
        formData.append('images',file)
    }

    for(const [key,value] of formData){
        console.log(`Key: ${key}`)
    }

    let pathsToImages = await fetch(url, {
        method: "post",
        body: formData
    })

    return pathsToImages.json()
}

let postPostDataToServer = function(url, post){
    fetch(url,{
        method: "post",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
}

let emptyPostPopup = function(){

    descriptionInput.value = null
    const stepsList = document.querySelector('.steps-list')
    const ingredientsList = document.querySelector('.ingredients-list')
    const tagsList = document.querySelector('.tags-list')

    stepsList.innerHTML = null
    ingredientsList.innerHTML = null
    tagsList.innerHTML = null
    document.querySelector('.selected-imgs').innerHTML = null

    description = null
    images = []
    steps = []
    ingredients = []
    tags = []
    stepsNumber=0
    ingredientsNumber=0
    tagsNumber = 0

    document.getElementById('add-post-popup').classList.remove('active')
    document.getElementById('overlay').classList.remove('active')

}
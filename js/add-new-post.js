const descriptionInput = document.getElementById('description-input')
const ingredientsInput = document.getElementById('ingredients-input')
const stepsInput = document.getElementById('steps-input')
const postImagesInput = document.getElementById('myImages')
const sendButton = document.getElementById('post')

let description
let ingredients = []
let steps = []
let ingredientsNumber =0
let stepsNumber=0
let images =[]


descriptionInput.addEventListener('change', function(){
    description = descriptionInput.value
})

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

    stepsList.forEach(step => {
        steps.push(step.textContent)
    });
    
    ingredientsList.forEach(ingredient => {
        ingredients.push(ingredient.textContent)
    });

    let tempImages =[]
    images.forEach(image=>{
        if(image != null){
            tempImages.push(image)
        }
    })
    images=tempImages

    let pathsToImages = []

    postImagesToServer("http://localhost:8080/api/post/chmielu", images).then(data =>{
        data.forEach(tempData => {
            pathsToImages.push(tempData)
        });
    })
    console.log(pathsToImages)

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
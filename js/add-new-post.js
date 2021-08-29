const descriptionInput = document.getElementById('description-input')
const ingredientsInput = document.getElementById('ingredients-input')
const stepsInput = document.getElementById('steps-input')
let removeIngredientsButtons =[]
let removeStepsButtons = []

let description
let ingredients = []
let steps = []
let ingredientsNumber =0
let stepsNumber=0


descriptionInput.addEventListener('change', function(){
    description = descriptionInput.value
})

ingredientsInput.addEventListener('change', function(){
    const ingredientsList = document.querySelector('.ingredients-list')
    ingredientsList.innerHTML += '<li id="ingredient'+ingredientsNumber+'" class="ingredient">'+ingredientsInput.value+'<button class="remove-item remove-ingredient">&times;</button></li>'
    ingredientsNumber++
    ingredientsInput.value=null
    removeIngredientsButtons = document.querySelectorAll('.remove-ingredient')
    removeIngredientsButtons.forEach(button => {
        button.addEventListener('click', function(){
            const id = button.closest('.ingredient').id
            const removedItem = document.getElementById(id)
            removedItem.remove()
        })
    });
})

stepsInput.addEventListener('change', function(){
    const stepsList = document.querySelector('.steps-list')
    stepsList.innerHTML += '<li id="step'+stepsNumber+'" class="step">'+stepsInput.value+'<button class="remove-item remove-step">&times;</button></li>'
    stepsNumber++
    stepsInput.value=null
    removeStepsButtons = document.querySelectorAll('.remove-step')
    removeStepsButtons.forEach(button => {
        button.addEventListener('click', function(){
            const id = button.closest('.step').id
            const removedStep = document.getElementById(id)
            removedStep.remove()
        })
    })
})
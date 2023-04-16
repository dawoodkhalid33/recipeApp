var imgArr = [], titleArr = [], ingredientsArr = [];
var userInput, recipeId, recipe;
button = document.getElementById('button');
button.addEventListener("click", search)

function search() {
  // Clear existing titles and images
  titleArr = [];
  imgArr = [];
  
  const mainElement = document.querySelector('.main');
  const recipeElements = mainElement.querySelectorAll('.recipe');
  for (let i = 0; i < recipeElements.length; i++) {
    mainElement.removeChild(recipeElements[i]);
  }

  // Fetch new data based on user input
  userInput = document.getElementById('search').value;
  file = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=428624ce5ace4b2ab69f01a82c044cf1&query=' + userInput;
  fetch(file)
    .then(res => res.json())
    .then(data => {
      // Create new div for each title, image, and ingredients
      for (let i = 0; i < data.results.length; i++) {

        recipeId = data.results[i].id;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.id = 'recipe-'+recipeId;

        titleArr[i] = data.results[i].title
        const titleElement = document.createElement('h2');
        titleElement.innerHTML = titleArr[i];
        recipeElement.appendChild(titleElement);

        imgArr[i] = data.results[i].image;
        const imgElement = document.createElement('img');
        imgElement.src = imgArr[i];
        recipeElement.appendChild(imgElement);

        // Create new div for ingredients
        const ingredientsElement = document.createElement('div');
        ingredientsElement.classList.add('ingredients');
        recipeElement.appendChild(ingredientsElement);

        // Create new button for showing instructions
        const instructionButton = document.createElement('button');
        instructionButton.innerHTML = 'Show Instructions';
        instructionButton.classList.add('instruction-button');
        instructionButton.id = 'instruction-'+recipeId;
        recipeElement.appendChild(instructionButton);

        mainElement.appendChild(recipeElement);

        const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=428624ce5ace4b2ab69f01a82c044cf1`;
        fetch(recipeUrl)
          .then(res => res.json())
          .then(recipeData => {
            // Add ingredients to the ingredients div
            const ingredientElements = [];
            for (let j = 0; j < recipeData.ingredients.length; j++) {
                const ingredientElement = document.createElement('p');
                ingredientElement.innerHTML = recipeData.ingredients[j].name+', ';
                ingredientElements.push(ingredientElement);
            }
            ingredientsElement.append(...ingredientElements);
          })
          
        const instUrl =  'https://api.spoonacular.com/recipes/'+recipeId+'/analyzedInstructions?apiKey=428624ce5ace4b2ab69f01a82c044cf1'
        fetch(instUrl)
    .then(resp => resp.json())
    .then(instructions => {
        for (let k = 0; k < instructions.length; k++) {
            const card = document.createElement('div');
            card.id = 'card-'+recipeId;
            card.classList.add('instruction-card');
            
            const stepsLength = instructions[k].steps.length;
            for (let m = 0; m < stepsLength; m++) {
                const stepNumber = document.createElement('p');
                stepNumber.classList.add('step-number');
                stepNumber.textContent = instructions[k].steps[m].number;
                card.appendChild(stepNumber);

                const stepDescription = document.createElement('div');
                stepDescription.classList.add('step-description');
                stepDescription.textContent = instructions[k].steps[m].step;
                card.appendChild(stepDescription);
            }
            document.body.appendChild(card); // add the card to the document
        }
    });
    
    document.getElementById('instruction-'+recipeId).addEventListener('click', toggle);
        function toggle() {
            const cardElement = document.getElementById('card-' + recipeId);
            if (cardElement.style.display === 'none') {
            cardElement.style.display = 'block';
            } else {
            cardElement.style.display = 'none';
            }
        }
//   break;
      }
    });
}

// const recipes = document.querySelectorAll('.instruction-button');
// recipes.forEach((recipeElement) => {
//   recipeElement.addEventListener('click', toggle);
// });
// instruction_Button = 'instruction-'+recipeId;



  


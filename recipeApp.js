var imgArr = [], titleArr = [], ingredientsArr = [], idArr=[];
var instructions, userInput, recipeId, recipe, card, button, count=0, myElement, ingredientsElement, mainElement;
button = document.getElementById('form');
button.addEventListener("submit", event=> {
  event.preventDefault();
  search();
}
)


function search() {
  clearData();
  getSearchData();
}

function clearData() {
  titleArr = [];
  imgArr = [];
  
  mainElement = document.querySelector('.main');
  recipeElements = mainElement.querySelectorAll('.recipe');
  for (let i = 0; i < recipeElements.length; i++) {
    mainElement.removeChild(recipeElements[i]);
  }

  const body1 = document.body;
  const cardElements = document.querySelectorAll('.instruction-card');
  for (let i = 0; i < cardElements.length; i++) {
    body1.removeChild(cardElements[i]);
  }
}
function getSearchData() {
  userInput = document.getElementById('search').value;
file = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=428624ce5ace4b2ab69f01a82c044cf1&query=' + userInput;
fetch(file)
  .then(res => res.json())
  .then(data => {
    // Create new div for each title, image, and ingredients
    for (let i = 0; i < data.results.length; i++) {

      recipeId = data.results[i].id;
      idArr.push(recipeId);
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

      const ingredientsTitle = document.createElement('h3');
      ingredientsTitle.classList.add('ingredients-title');
      ingredientsTitle.textContent = "Ingredients:";
      ingredientsElement.appendChild(ingredientsTitle);

      // Create new button for showing instructions
      const instructionButton = document.createElement('button');
      instructionButton.innerHTML = 'Show Instructions';
      instructionButton.classList.add('instruction-button');
      instructionButton.id = 'instruction-'+recipeId;
      recipeElement.appendChild(instructionButton);

      mainElement.appendChild(recipeElement);
      getIngredients(ingredientsElement);
      showInstructions();
      count++;

      // break;      
    }
  });
}
function getIngredients(ingredientsElement) {
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
            // ingredientsElement.append(...ingredientElements);
            for (let i = 0; i < ingredientElements.length; i++) {
              ingredientsElement.appendChild(ingredientElements[i]);
            }
            
          })

}
function showInstructions() {
  let myElement = document.getElementById('instruction-'+idArr[count])
    myElement.addEventListener('click', toggle)
    function toggle() {
        const body1 = document.body;
        const cardElements = document.querySelectorAll('.instruction-card');
        for (let i = 0; i < cardElements.length; i++) {
        body1.removeChild(cardElements[i]);
        }


          const instUrl =  'https://api.spoonacular.com/recipes/'+myElement.id.substring(12)+'/analyzedInstructions?apiKey=428624ce5ace4b2ab69f01a82c044cf1'
          fetch(instUrl)
          .then(resp => resp.json())
          .then(instructions => {
  
              card = document.createElement('div');
              card.id = 'card-'+myElement.id;
              card.classList.add('instruction-card');
              const heading = document.createElement('h4');
              heading.innerHTML='Instructions'
              card.appendChild(heading);
              console.log(instructions);
              for (let k = 0; k < instructions[0].steps.length; k++) {

                  const stepWrapper = document.createElement('div');
                  stepWrapper.classList.add('step-wrapper');
  
                  const stepNumber = document.createElement('p');
                  stepNumber.classList.add('step-number');
                  stepNumber.textContent = instructions[0].steps[k].number;
                  stepWrapper.appendChild(stepNumber);
  
                  const stepDescription = document.createElement('div');
                  stepDescription.classList.add('step-description');
                  stepDescription.textContent = instructions[0].steps[k].step;
                  stepWrapper.appendChild(stepDescription);
  
                  card.appendChild(stepWrapper);
              }  
              
              document.body.appendChild(card); // add the card to the document
              const cardElement = document.getElementById('card-' + myElement.id);
              
              cardElement.style.display = 'block';
              cardElement.scrollIntoView(); // scroll to the instruction-card element
              
          })                    
}
}

document.getElementById('recipes-link').addEventListener('click', getRandomRecipes);
function getRandomRecipes() {
  fetch('https://api.spoonacular.com/recipes/random?apiKey=428624ce5ace4b2ab69f01a82c044cf1&number=1')
    .then(response => response.json())
    .then(data => {
      console.log(data.recipes[0]);
    })
}


          



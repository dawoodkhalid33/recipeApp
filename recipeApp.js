var imgArr = [], titleArr = [], ingredientsArr = [], idArr=[];
var instructions, userInput, recipeId, recipe, card, button, count=0, myElement, ingredientsElement, mainElement;
button = document.getElementById('button');
button.addEventListener("click", search)

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
file = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=8e785c77944c4fae8ae4277c451f727f&query=' + userInput;
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
  const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=8e785c77944c4fae8ae4277c451f727f`;
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


          const instUrl =  'https://api.spoonacular.com/recipes/'+myElement.id.substring(12)+'/analyzedInstructions?apiKey=8e785c77944c4fae8ae4277c451f727f'
          fetch(instUrl)
          .then(resp => resp.json())
          .then(instructions => {


              
  
          card = document.createElement('div');
              card.id = 'card-'+myElement.id;
              card.classList.add('instruction-card');
          for (let k = 0; k < instructions[0].steps.length; k++) {
              // console.log(instructions[0].steps[k].step);
              
  
              const stepNumber = document.createElement('p');
                  stepNumber.classList.add('step-number');
                  stepNumber.textContent = instructions[0].steps[k].number;
                  card.appendChild(stepNumber);
  
                  const stepDescription = document.createElement('div');
                  stepDescription.classList.add('step-description');
                  stepDescription.textContent = instructions[0].steps[k].step;
                  card.appendChild(stepDescription);
                  
  
          }  
          document.body.appendChild(card); // add the card to the document
          const cardElement = document.getElementById('card-' + myElement.id);
          
                  //if (cardElement.style.display === 'none') {
                  cardElement.style.display = 'block';
                  //} else {
                  //cardElement.style.display = 'none';
                  //}
          })                

    
    //  count +=1;
}
        }
          



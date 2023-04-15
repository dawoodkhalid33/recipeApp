var imgArr = [], titleArr = [], ingredientsArr = [];
var userInput;
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
  file = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=d94f4b127ecb42f89a082ca47293754e&query=' + userInput;
  fetch(file)
    .then(res => res.json())
    .then(data => {
      // Create new div for each title, image, and ingredients
      for (let i = 0; i < data.results.length; i++) {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

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

        mainElement.appendChild(recipeElement);

        const recipeId = data.results[i].id;
        const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=d94f4b127ecb42f89a082ca47293754e`;
        fetch(recipeUrl)
          .then(res => res.json())
          .then(recipeData => {
            // Add ingredients to the ingredients div
            for (let j = 0; j < recipeData.ingredients.length; j++) {
                const ingredientElement = document.createElement('p');
                ingredientElement.innerHTML = recipeData.ingredients[j].name+', ';
                ingredientsElement.appendChild(ingredientElement);
            }
          })
          
        const instUrl =  'https://api.spoonacular.com/recipes/'+recipeId+'/analyzedInstructions?apiKey=d94f4b127ecb42f89a082ca47293754e'
        fetch(instUrl)
            .then(resp => resp.json())  
            .then(instructions => {
               for (let k = 0; k < instructions.length; k++) {
                stepsLength = instructions[k].steps.length;
                for (let m = 0; m < stepsLength; m++) {
                    console.log(instructions[k].steps[m].number);
                    console.log(instructions[k].steps[m].step);
                }                
               } 
            })
      }
    });
}

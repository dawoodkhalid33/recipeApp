var imgArr = [], titleArr = [];
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
  file = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=d4d08be08d2945b1a25ae0ea1ea02baa&query=' + userInput;
  fetch(file)
    .then(res => res.json())
    .then(data => {
      // Create new div for each title and image
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

        mainElement.appendChild(recipeElement);

        const recipeId = data.results[i].id;
        const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=d4d08be08d2945b1a25ae0ea1ea02baa`;
        fetch(recipeUrl)
          .then(res => res.json())
          .then(recipeData => {
            console.log(recipeData.ingredients[1].name)
          })
      }
    });
}



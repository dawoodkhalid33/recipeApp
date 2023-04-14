var imgArr = [], titleArr = [];
var userInput;


button = document.getElementById('button');
button.addEventListener("click", search)
function search() {
    userInput = document.getElementById('search').value;
    file = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=d4d08be08d2945b1a25ae0ea1ea02baa&query=' + userInput
    fetch(file)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 10; i++) {
                imgArr[i] = data.results[i].image
                document.getElementById('image_' + i).src = imgArr[i]
                titleArr[i] = data.results[i].title
                document.getElementById('title_' + i).innerHTML = titleArr[i]
            }
            console.log(data.results)
        }
        )
}
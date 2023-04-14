var imgArr = [], titleArr = [];
var userInput;
button = document.getElementById('button');
button.addEventListener("click", search)
function search() {
    const titleElements = document.getElementsByTagName('h2');
    while (titleElements.length > 0) {
        titleElements[0].parentNode.removeChild(titleElements[0]);
    }
    const imgElements = document.getElementsByTagName('img');
    while (imgElements.length > 0) {
        imgElements[0].parentNode.removeChild(imgElements[0]);
    }

    userInput = document.getElementById('search').value;
    file = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=d4d08be08d2945b1a25ae0ea1ea02baa&query=' + userInput
    fetch(file)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.results.length; i++) {
                titleArr[i] = data.results[i].title
                const titleElement = document.createElement('h2');
                titleElement.innerHTML = titleArr[i];
                document.body.appendChild(titleElement);
                imgArr[i] = data.results[i].image;
                const imgElement = document.createElement('img');
                imgElement.src = imgArr[i];
                document.body.appendChild(imgElement);
            }
        }
        )
}
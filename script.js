let result = document.getElementById("result");
let userInput = document.getElementById("userInput").value;
let searchUserInput = document.getElementById("searchUserInput");
let url = "https:/www.themealdb.com/api/json/v1/1/search.php?s=";

fetch(url + "beef")
    .then((response) => response.json())
    .then((data) => {
        let meal = data.meals[0];

        console.log(meal);
        console.log(meal.strMealThumb);
        console.log(meal.strMeal);
        console.log(meal.strArea);
        console.log(meal.strInstructions);

        let allIngredient = [];
        let count = 1;

        for (let i in meal) {
            let ingredient = "";
            let measure = "";

            if (i.startsWith("strIngredient") && meal[i]) {
                ingredient = meal[i];
                measure = meal[`strMeasure` + count++];

                allIngredient.push(`${measure} ${ingredient}`)
            }
        }

        console.log(allIngredient);

        result.innerHTML = `
        <img class="" src=${meal.strMealThumb}>
        `

    })
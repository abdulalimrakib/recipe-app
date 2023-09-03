
let result = document.getElementById("result");
let searchUserInput = document.getElementById("searchUserInput");
let url = "https:/www.themealdb.com/api/json/v1/1/search.php?s=";



searchUserInput.addEventListener("click", ()=>{
    let userInput = document.getElementById("userInput").value;
    let length = userInput.length;
    if(length === 0){
        result.innerHTML=`
           <h3 class="font-bold mt-5 text-center">Your input is empty</h3>
        `
    }
    else{
        fetch(url + userInput)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
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
        <img class="w-[50%] rounded-md mx-auto mt-5" src=${meal.strMealThumb}>

        <div class="text-center bg-yellow-400 relative rounded-md mt-[-4em] py-3 shadow-md">
            <h2 class="text-[24px] font-medium">${meal.strMeal}</h2>
            <h2>${meal.strArea}</h2>
        </div>

        <div id="ingredient" class=""></div>

        <div id="recipe" class="absolute bg-white left-0 top-0 min-h-full w-full rounded-md hidden">
           <button id="return" class="px-3 py-1 top-[20px] left-[90%] bg-yellow-400 relative rounded-sm">x</button>
           <pre class="whitespace-pre-wrap pt-10 px-8 font-bold text-justify">
            ${meal.strInstructions}
            </pre>
        </div>
        <div class="flex justify-center mt-8">
            <button id="show-recipe" class="bg-yellow-400 py-1 px-3 rounded-md font-medium shadow-md">Show Recipe</button>
            </div>
        `
        let ingredientList = document.getElementById("ingredient");
        let parent = document.createElement("ul");
        parent.style.padding ="20px 0";
        parent.style.display ="grid";
        parent.style.gap ="10px";

        parent.style.gridTemplateColumns ="auto auto";
        let recipe = document.getElementById("recipe");
        let returnBtn = document.getElementById("return");
        let showRecipe = document.getElementById("show-recipe");

        allIngredient.forEach(element => {
            let child = document.createElement("li");
            child.style.listStyleType = "disc";
            child.style.listStylePosition = "inside";
            child.innerText = element;  
            parent.appendChild(child);
            ingredientList.appendChild(parent);
        });

        showRecipe.addEventListener("click", ()=>{
            recipe.style.display="block";
        });

        returnBtn.addEventListener("click", ()=>{
            recipe.style.display="none";
        });
    });
    }
})
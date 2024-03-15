// Navbar dropdown functionality
let contact = document.getElementById('contact');//getting the contact link in the navbar
let subMenu = document.getElementById('subMenu');//getting the submenu field

contact.addEventListener('click', function () {
    subMenu.classList.toggle('open-menu');
})

// Validating The Recipe Search Form

//Regular Expression to ensure user input acceptable dish name, ingredient and an African region
const dishRegEx = /^[A-Za-z0-9\s\-]+$/;
const ingredientRegEx = /^[a-zA-Z]+$/;
const regionRegEx = /^[north africa|northern africa|west africa|western africa|central africa|east africa|eastern africa|southern africa]$/;


const sForm = document.getElementById('searchform');//getting the form for searching recipes

sForm.addEventListener('submit', function (e) {
    e.preventDefault();//preventing the form from submitting

    const sRecipe = document.getElementById('searchrecipe');//getting the input field for searching recipes
    const sBtn = document.getElementById('searchBtn');//getting the button for searching recipes
    const result = document.getElementById('result');//getting the field where results will be displayed
    const rSmall = document.getElementById('rsmall');//getting the field for displaying error message
    const recipeLower = sRecipe.value.toLowerCase();//converting whatever the user input to lowercase

    //Preventing the user from submitting an empty form
    if (sRecipe.value.trim() === '') {
        sRecipe.focus();
        //Error message with styling to be displayed to user if an empty form is submitted
        rSmall.innerHTML = 'you have to enter an ingredient or an African region!';
        rSmall.style.color = 'red';
        rSmall.style.backgroundColor = 'white';
        rSmall.style.border = 'solid red';
        rSmall.style.display = 'block';
        rSmall.style.width = '450px';
        rSmall.style.fontWeight = 'bold'
        rSmall.style.paddingLeft = '2px';
        rSmall.style.margin = 'auto';
        rSmall.style.marginTop = '5px'       
    } else if (!ingredientRegEx.test(recipeLower)) {
        rSmall.innerHTML = 'you have to enter an ingredient or African region!';
    } else if (!regionRegEx.test(recipeLower)) {
        rSmall.innerHTML = 'you have to enter an ingredient or African region!';
    }
    else {
        sForm.submit();//submitting the form if the above conditions are not met
    }

     
    //Using Fetch API
    async function recipe () {
        const searchValue = sRecipe.value.trim();
        const response = await fetch ("https://spoonacular.com/food-api/data"& app_key)
        const data = await response.json();
        displayRecipes(data.hits);
    }
})

//Generating template for the HTML
function recipeSearch(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
            <div>
                <img src = "${recipe.recipe.image}" alt = "${recipe.recipe.label}">
                <h3> ${recipe.recipe.label}</h3>
                <ul>
                    ${recipe.recipe.ingredientLines.map(ingredient =>  '<li> $ {ingredient} </li>').join('')}
                </ul>
                <a href = "${recipe.recipe.url}" target ="_blank">View Recipe</a>
            </div>
        `            
    });
    result.innerHTML = html;
}


// Validating The Upload Recipe Form
const uForm = document.getElementById('newrecipe');//getting the form for uploading recipes

//const region = document.getElementById('region');//getting the input field for selecting region
//const country = document.getElementById('country');//getting the input field for selecting country
    // const nAfrica = document.getElementById('na');//getting countries under Northern Africa 
// const wAfrica = document.getElementById('wa');//getting countries under Western Africa 
// const cAfrica = document.getElementById('ca');//getting countries under Central Africa 
// const eAfrica = document.getElementById('ea');//getting countries under Eastern Africa
// const sAfrica = document.getElementById('sa');//getting countries under Southern Africa 

//Defining an object with the regions and corresponding countries
const africa = {
    north: ['Algeria', 'Canary Islands', 'Ceuta', 'Libya', 'Madeira', 'Morocco', 'Sudan', 'Tunisia', 'Western Sahara'], 
    west: ['Benin', 'Burkina Faso', 'Cape Verde', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Liberia', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal', 'Sierra Leone', 'Togo'],
    central: ['Congo, Democratic Republic of The', 'Congo, Republic of The', 'Equatorial Guinea', 'Gabon', 'Sao Tome and Principe'],
    east: ['Burundi', 'Comoros', 'Djibouti', 'Eritrea', 'Ethiopia', 'French Southern Territories', 'Kenya', 'Madagascar', 'Malawi', 'Mauritius', 'Mayotte', 'Mozambique', 'Reunion', 'Rwanda', 'Seychelles', 'Somalia', 'South Sudan', 'Tanzania', 'Uganda', 'Zambia', 'Zimbabwe'],
    southern: ['Botswana', 'Eswatini(Swaziland)', 'Lesotho', 'Namibia', 'South Africa']
};

// Referencing the region and country select inputs
const regionSelect = document.getElementById('region');//getting the input field for selecting region
const countrySelect = document.getElementById('country');//getting the input field for selecting country

// Function to update the country options based on the selected region
function updateCountryOptions() {
    const selectedRegion = regionSelect.value;// Getting the selected region value
    countrySelect.innerHTML = "";// Clearing the country select options
    regions[selectedRegion].forEach((country) => {
        //Creating a new option element
        const option = document.createElement('options');
        option.value = country;
        option.text = country;
        //Appending the option to the country select
        countrySelect.appendChild(option);
    })
}

 updateCountryOptions();
// region.addEventListener('focus', function () {
    
// })

// region.addEventListener('blur', function () {
//     switch (region) {
//         case 'northernafrica':
//             nAfrica.style.display = 'show';
//             break;
        
    
//         default: 
//             break;
//     }
// })

uForm.addEventListener('submit', function (e) {
    e.preventDefault();//preventing the form from submitting
    
    const dish = document.getElementById('dish');//getting the input field for entering dish by user
    const ingredient = document.getElementById('ingredient');//getting the input field for entering ingredients by user
    const instruction = document.getElementById('instruction');//getting the input field for entering instructions by user
    const duration = document.getElementById('duration');//getting the input field for entering duration 
    
    
    if (dish.value.trim() === '') {
        alert ('you did not input a dish name');
        dish.focus();
    } else if (ingredient.value.trim() === '') {
        alert ('you did not input ingredients');
        ingredient.focus();
    } else if (instruction.value.trim() === '' || instruction.value.trim().length < 30) {
        alert ('you did not input instruction or the instruction is not explanatory enough');
        instruction.focus();
    } //else if () {

    // }
    else {
        uForm.submit();//submitting the form if the above conditions are not met
    }     
    
})

const loadPage = () =>{
    
    fetchRecipe();

}
let recipe = {"name":"", "ingredients":[], "instructions": []};
const addInstruction = () => {
    const text = document.getElementById('instructions-text');
    recipe.instructions.push(text.value);
    console.log(recipe.instructions);
}

const addIngredient = () =>{
    const ingredientsText = document.getElementById('ingredients-text');
    recipe.ingredients.push(ingredientsText.value);
    console.log(recipe.ingredients);

}
const setRecipe = (data) => {
    const title = document.getElementById('recipeName');
    
    const instructions = document.getElementById('instructions');
    const ingredients = document.getElementById('ingredients');
    title.innerHTML= data.name;
    instructions.innerHTML = data.instructions;
    ingredients.innerHTML = data.ingredients;
}
const submitRecipe = () => {
    const name = document.getElementById('name-text');
    const imageInput = document.getElementById('image-input');
    recipe.name = name.value;

    fetch('http://localhost:3000/recipe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
    })
    .then(response => {
    if (!response.ok) {
        console.error("There was error while fetching");
    }
    return response.json(); 
    })
    .then(data =>{
        setRecipe(data)
        recipe = {"name":"", "ingredients":[], "instructions": []};
    })
    const formData = new FormData();
    const files = imageInput.files;
    for (var i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    };
    fetch('http://localhost:3000/images', {
    method: 'POST',
    
    body: formData
    })
    .then(response => {
    if (!response.ok) {
        console.error("There was error while fetching");
    }
    return response.json(); 
    })
    .then(data =>{
        
    })

}

const fetchRecipe = () => {
    const title = document.getElementById('recipeName');
    
    const instructions = document.getElementById('instructions');
    const ingredients = document.getElementById('ingredients');
    fetch(`http://localhost:3000/recipe/pizza`, {
        
        
    })
    .then(response => {
    if (!response.ok) {
        console.error("There was error while fetching");
    }
    return response.json(); 
    })
    .then(data =>{

        
        // title.innerHTML= data.name;
        // instructions.innerHTML = data.instructions;
        // ingredients.innerHTML = data.ingredients;
        setRecipe(data);
        
    })


}
loadPage();
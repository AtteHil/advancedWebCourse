

let categories= []

let recipe = {"name":"", "ingredients":[], "instructions": [], "categories":[], "images":[]};
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
const setRecipe =async (data) => {
    const title = document.getElementById('recipeName');
    const imageDiv = document.getElementById('foodImage');
    const instructions = document.getElementById('instructions');
    const ingredients = document.getElementById('ingredients');
    
    title.innerHTML= data.name;
    instructions.innerHTML = data.instructions;
    if(data.images[0]){
        // console.log(await findImage(data.images[0]))
        const img= await findImage(data.images[0])
        imageDiv.src = img.imageUrl;
    }else{
        imageDiv.src="";
    }
    ingredients.innerHTML = data.ingredients;
    
    
    
}
const submitRecipe = async () => {
    const name = document.getElementById('name-text');
    const imageInput = document.getElementById('image-input');
    recipe.name = name.value;
    
    for(let i=0; i<categories.length; i++){
        console.log(categories[i].name);
        const checkbox = document.getElementById(categories[i].name)
        if(checkbox.checked){
            recipe.categories.push(categories[i]._id)
        }
    }
    const formData = new FormData();
    const files = imageInput.files;
    for (var i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    };
    if(files.length>0){
        const response = await fetch('http://localhost:3000/images', {
        method: 'POST',
        
        body: formData
        })
        
        if (!response.ok) {
            console.error("There was error while fetching");
        
            return; 
        }
        const data1 = await response.json(); 
        
        console.log("imagen id pitäisi olla tässä: " ,data1);
        recipe.images.push(data1.id);
    }
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
        console.log(data)
        
        setRecipe(data)
        recipe = {"name":"", "ingredients":[], "instructions": [], "categories":[], "images":[]};
    })
    
    
        
    

}

const  search =async (food, event) => {
    let recipeData= null;
    let image = null;
    if(event.key === 'Enter'){
        const response =await fetch(`http://localhost:3000/recipe/${food.value}`)
    
    if (!response.ok) {
        console.error("There was error while fetching");
        return;
    }
    const data = await response.json();
    recipeData = data;
    console.log(recipeData)
    
    // if (recipeData[0].images[0]){
    //     // const response1 = await fetch(`/images/${recipeData[0].images[0]}`)
            
    //     // if (!response1.ok) {
    //     //     console.error("There was error while fetching");
    //     //     return;
    //     // }
    //     // const data1 = await response1.json();
    //     //image = findImage(recipeData[0].images[0])
    // }
    
   
    
            
    // console.log(image);
    // console.log(recipeData,"Pitäöisi olla image url", image.imageUrl);
    setRecipe(recipeData[0]);
    
    }

}
//find image

const findImage= async (id)=>{
    const response1 = await fetch(`/images/${id}`)
            
        if (!response1.ok) {
            console.error("There was error while fetching");
            return;
        }
        const data1 = await response1.json();
    return data1;
}


// find the categories from database. Add categories to to array to use them in submit
const findCategories=() =>{
    const categoriesDiv = document.getElementById('categories');
    fetch(`/categories`)
    .then((data => data.json()))
    .then((data)=>{
        for (i in data){
            categories.push(data[i]);
            //console.log(data[i].name);
            const p = document.createElement('p');
            p.innerHTML= `<label>
            <input type="checkbox" class="filled-in" id=${[data[i].name]} />
            <span>${data[i].name}</span> </label>`
            categoriesDiv.appendChild(p);
        }

    })
    console.log(categories)
}
findCategories()




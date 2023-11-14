
const sendData = () => {


    const inputName = document.getElementById('input-name');
    const inputTask = document.getElementById('input-task');
    const result = document.getElementById('result')
    const data = {"name": inputName.value,
                    "todos": inputTask.value};
    
    fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
        if (!response.ok) {
            console.error("There was error while fetching");
        }
        return response.json(); 
        })
        .then(data =>{
            result.innerHTML=data.status
        })


}

const search=()=>{
    const name = document.getElementById('search-name').value
    const result = document.getElementById('search-result');
    fetch(`http://localhost:3000/user/${name}`)
    .then(response => {
        if (!response.ok) {
            console.error("There was error while fetching");
        }
        return response.json(); 
        })
        .then(data =>{
            if(data.status){
                result.innerHTML=data.status;
            }
            else{
                result.innerHTML = "name: "+data.dude.name +"<br>"+"Tasks: "
                clickableTodo(data.dude.todos, data.dude.name);
                
                let deleteButton = document.getElementById('delete-user');
                if (!deleteButton){
                    deleteButton = makeButton();
                    document.body.appendChild(deleteButton);
                }
                
                deleteButton.addEventListener("click", function(){
                    deleteRequest(name);
                });
            }
        })
}
const makeButton = () =>{
    const deleteButton = document.createElement('button');
    deleteButton.textContent="Delete user";
    deleteButton.id = "delete-user";
    return deleteButton;
}
const clickableTodo= (todoArray,name) =>{
    const todosDiv = document.getElementById('todos');
    todoArray.forEach(function(todo){
        const clickTodo = document.createElement('div');
        clickTodo.className = 'delete-task';
        clickTodo.textContent = todo;
        clickTodo.addEventListener('click',function(){
            console.log(`Clicked ${todo}`)
            updateTodo(todo, name)

        })
        todosDiv.appendChild(clickTodo);
    })
}

const updateTodo=(todo, name)=>{
    const todos = document.getElementById('todos');
    const result = document.getElementById('search-result');
    const data = {'name': name, 'task': todo};
    fetch(`http://localhost:3000/user/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    .then(response => {
    if (!response.ok) {
        console.error("There was error while fetching");
    }
    return response.json(); 
    })
    .then(data =>{
        
        result.innerHTML= data.status 
        todos.innerHTML=""
        
    })
}


const deleteRequest=(name) =>{
    const result = document.getElementById('search-result');
    fetch(`http://localhost:3000/user/${name}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
    .then(response => {
    if (!response.ok) {
        console.error("There was error while fetching");
    }
    return response.json(); 
    })
    .then(data =>{
        
        result.innerHTML = data.status;
        const deleteButton= document.getElementById('delete-user');
        document.body.removeChild(deleteButton);
        document.getElementById('todos').innerHTML =""
        
    })
}
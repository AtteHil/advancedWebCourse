


const onLoad= async () =>{
    const token = window.localStorage.getItem("auth_token");
    if(token){
        const response = await fetch("/api/private",{
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        })
        const result = await response.json();
        if(response.status === 200){
            makeElements(result.email);
        }
        const response1 = await fetch("/api/gettodos",{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result1 = await response1.json();
        console.log(result1);
        if(result1.allItems != null){
            makeList(result1);
        }
    }else {
        makeLinks();
    }
}
    
    
    
        
      
    
    
   



const makeElements = (email) => {
    const div = document.getElementById("email");
    const textField = document.createElement("h2");
    const inputField = document.createElement("input");

    inputField.setAttribute("id", "add-item");
    inputField.addEventListener("keydown", function(event){if(event.code === "Enter"){sendItem(event)}});
    inputField.setAttribute("placeholder", "Items to todos");
    textField.innerHTML = email;
    const button = document.createElement("button");
    button.setAttribute("onclick", "logout()");
    button.setAttribute("id", "logout");
    button.textContent= "Logout";
    
    div.appendChild(textField);
    div.appendChild(button);
    div.appendChild(inputField);
}

const logout = () => {
    console.log("works");
    window.localStorage.removeItem("auth_token");
    window.location.reload();
}
const sendItem =async (event) => {
    const token = window.localStorage.getItem("auth_token");
    const item = document.getElementById("add-item").value;
    const inputField = document.getElementById("add-item");
    inputField.value= "";
    // console.log(JSON.stringify({"items": [item]}));
    const response = await fetch("/api/todos",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({"items": [item]})
    })
    if(!response.ok){
        return alert("Items error");
    }
    const result = await response.json();
    console.log(result);
    makeList(result);
    
}

const makeList = (result) =>{
    const list = document.getElementById("list");
    list.innerHTML ="";
    for(let i =0; i<result.allItems.length; i++){
        const li = document.createElement("li");
        li.textContent = result.allItems[i];
        list.appendChild(li);
    }
}
const makeLinks = () =>{
    const div =document.getElementById("email");
    const loginLink = document.createElement("a");
    const registerLink = document.createElement("a");
    const row = document.createElement("br");
    loginLink.setAttribute("href", "/login.html");
    loginLink.textContent= "Login";
    registerLink.setAttribute("href", "/register.html");
    registerLink.textContent = "Register";
    div.appendChild(loginLink);
    div.appendChild(row);
    div.appendChild(registerLink);
}



onLoad();

const sendRegister= async () =>{
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    let p=document.getElementById("password")
    console.log(!document.getElementById("password"))
    if(!p){
        p = document.createElement("p");
        p.setAttribute("id", "password")
        document.body.appendChild(p);
    }
    
    console.log(email, password)
    if(email && password){
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"email": email, "password":password})
        });
        if(!response.ok){
            console.log("error while registering");
        }
        if(response.status === 400){
            
            p.textContent = "Password is not strong enough";
            
            return;
        }
        if(response.status === 403){

            p.textContent = "Email already in use";
            
            return;
 
        }
        if(response.status == 200){
            window.location.replace("/login.html")
        }


    }
}
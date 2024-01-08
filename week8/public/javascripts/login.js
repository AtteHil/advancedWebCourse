const sendLogin =async () => {
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    console.log(email, password)
    if(email && password){
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"email": email, "password":password})
        });
        if(!response.ok){
            console.log("error");
        }
        if(response.status === 403){
            if ( document.getElementById("invalid credentials")){
                return;
            }else {
                const p = document.createElement("p");
                p.setAttribute("id", "invalid credentials")
                p.textContent = "Invalid credentials";
                document.body.appendChild(p);
            }
            
        }
        const result = await response.json();
        if(response.status === 200 ){
            
            window.localStorage.setItem("auth_token",result.token)
            window.location.replace("/");
        }
        



    }
}
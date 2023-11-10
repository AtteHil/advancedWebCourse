
const express = require("express");
const os = require("os");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

const list = [];


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});
app.get("/hello", (req, res) => {
    res.send({msg: "Hello world"});
});

app.get("/echo/:id", (req, res) => {
    res.send({id: req.params.id});
});

app.post("/sum", (req,res) =>{
    const numbers = req.body.numbers;
    let summ = 0
    
    for (let i=0;i<numbers.length;i++){
        summ+=numbers[i]
    }
    res.send({sum: summ})
})

app.post("/list", (req,res) =>{
    const text = req.body.text
    if (text) {
        
        list.push(text);
        console.log(list);
    
    res.send({list: list})
    }
})


app.listen(port, () => console.log(`Server listening a port ${port}!`));

import express, {Express, Request, Response } from "express"

const app : Express = express();
const port: number = 3000;
app.use(express.json());

const vehicles: Array<Vehicle|Car|Plane|Boat> = []
type Vehicle = {
    model: string,
    color: string,
    year: number,
    power: number,
    
    
    

}
type Boat = Vehicle &{
    draft: number
}
type Plane = Vehicle &{
    wingspan: number 
}
type Car = Vehicle & {
    bodyType: string,
    wheelCount: number
}
app.listen(port, () =>{
    console.log("server is up'n'running")
})
app.get("/", (req: Request, res: Response) => {
    res.send("hello from TS-Express application")

})


app.get("/hello", (req: Request, res: Response)=>{
    const text: string = "Hello world"
    
    res.send(text)
})


app.post("/vehicle/add", (req: Request, res: Response) =>{
    const {model, color, year, power, wheelCount, bodyType, draft, wingspan}= req.body 
    if (draft){
        const boat: Boat= {model, color, year, power, draft};
        vehicles.push(boat);
    }
    else if(wheelCount && bodyType){
        const car: Car = {model, color, year, power,  bodyType,wheelCount};
        vehicles.push(car);
    }
    else if(wingspan){
        const plane: Plane = {model, color, year, power, wingspan}
        vehicles.push(plane);
    }
    else{
        const vehicle: Vehicle = {model, color, year, power};
        vehicles.push(vehicle);
    }
    // console.log(vehicles)
    res.status(201).send("Vehicle added");
    


})
// found help to find command there => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
app.get("/vehicle/search/:model", (req: Request, res: Response)=>{
    const modelName:string = req.params.model;
    const result = vehicles.find(vehicle=> vehicle.model === modelName);
    if (result){
        res.status(200).send( result)
    }else{
        res.send({status: 404})
    }
})



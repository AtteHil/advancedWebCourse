"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const vehicles = [];
app.listen(port, () => {
    console.log("server is up'n'running");
});
app.get("/", (req, res) => {
    res.send("hello from TS-Express application");
});
app.get("/hello", (req, res) => {
    const text = "Hello world";
    res.send(text);
});
app.post("/vehicle/add", (req, res) => {
    const { model, color, year, power, wheelCount, bodyType, draft, wingspan } = req.body;
    if (draft) {
        const boat = { model, color, year, power, draft };
        vehicles.push(boat);
    }
    else if (wheelCount && bodyType) {
        const car = { model, color, year, power, bodyType, wheelCount };
        vehicles.push(car);
    }
    else if (wingspan) {
        const plane = { model, color, year, power, wingspan };
        vehicles.push(plane);
    }
    else {
        const vehicle = { model, color, year, power };
        vehicles.push(vehicle);
    }
    // console.log(vehicles)
    res.status(201).send("Vehicle added");
});
// found help to find command there => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
app.get("/vehicle/search/:model", (req, res) => {
    const modelName = req.params.model;
    const result = vehicles.find(vehicle => vehicle.model === modelName);
    if (result) {
        res.status(200).send(result);
    }
    else {
        res.send({ status: 404 });
    }
});

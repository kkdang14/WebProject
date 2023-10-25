const express =  require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Products = require("./models/products.model");
const Users = require("./models/users.model");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({massage: "Welcome to Music Album E-commerce"});
});

//Product properties

app.post('/products', async (req, res) =>{
    try {
        const product = await Products.create(req.body);
        res.status(200).json(product);
    } catch{
        res.status(500).json({massage: "Error!"});
    } 
})

app.get('/products', async (req, res) =>{
    try {
        const product = await Products.find({});
        res.status(200).json(product);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
})

app.get('/products/:id', async (req, res) =>{
    try {
        const product = await Products.findById(req.params.id)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json(product);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
})

app.put('/products/:id', async (req, res) =>{
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json({message: "Product was updated"});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
})

app.delete('/products/:id', async (req, res) =>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id, req.body)
        if(!product){
            res.status(404).json({message: `Can not find product with ID: ${req.params.id}` })
        }
        res.status(200).json({message: `Product with ID: ${req.params.id} was deleted`});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
})

// User properties
app.post('/users', async (req, res) =>{
    try {
        const user = await Users.create(req.body);
        res.status(200).json(user);
    } catch{
        res.status(500).json({massage: "Error!"});
    } 
})

app.get('/users', async (req, res) =>{
    try {
        const user= await Users.find({});
        res.status(200).json(user);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
})

app.get('/users/:id', async (req, res) =>{
    try {
        const user = await Users.findById(req.params.id)
        if(!user){
            res.status(404).json({message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json(user);
    } catch{
        res.status(500).json({massage: "Error!"});
    }
})

app.put('/users/:id', async (req, res) =>{
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body)
        if(!user){
            res.status(404).json({message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json({message: "User profile was updated"});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
})

app.delete('/users/:id', async (req, res) =>{
    try {
        const user = await Users.findByIdAndDelete(req.params.id, req.body)
        if(!user){
            res.status(404).json({message: `Can not find user with ID: ${req.params.id}` })
        }
        res.status(200).json({message: `User with ${req.params.id} was deleted`});
    } catch {
        res.status(500).json({massage: "Error!"});
    }
})

// app.get('/users/admin', async (req, res) =>{
//     try {
//         const user = await Users.find({ isAdmin: true })
//         if(!user){
//             res.status(404).json({message: "Error"})
//         }
//         res.status(200).json(user);
//     } catch {
//         res.status(500).json({massage: "Error!"});
//     }
// })

app.listen(3000, () => {
    console.log(`Server Nodejs API running`)
})


mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/MusicAlbumDB')
.then(() => {
    console.log("Connected");
}).catch((error) =>{
    console.log(error)
})

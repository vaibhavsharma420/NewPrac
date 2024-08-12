const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/person');
const MenuItem = require('./models/menuItem');
const bodyParser = require('body-parser');

//Middleware BodyParser
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send("Hello World");
})

//POST route to add a person
app.post('/person', async (req,res)=>{
    try{
        const newPersonData = req.body; //Assuming the request body contains the person data
        const newPerson = new Person(newPersonData); //Create a new Person document using the Mongoose Model

        const savedPerson = await newPerson.save(); //Save the new Person to the database using await

        console.log("saved person to the database");
        res.status(201).json(savedPerson);
    }catch(err){    
        console.error("Error saving person",err);
        res.status(500).json({error:'Internal server error'});

    }
    
});

app.get('/person', async(req,res)=>{

    const persons = await Person.find(); //Use the Mongoose Model to fetch all persons from the database
    res.json(persons); //Send the list of persons as a json respoe
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App is listening on Port ${PORT}`);
})
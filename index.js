const express = require("express")
const mongoose = require("mongoose")

const { Person } = require("./models");

//inicializa o express
const app = express()

//padrão de arquivo será json
app.use(express.json())

//exibe todos os persons
app.get('/person', async (req, res) => {
    const allPerson = await Person.find()
    return res.status(200).json(allPerson)
})

//exibe apenas um person
app.get("/person/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Person.findById(id);
  return res.status(200).json(person);
})


//adc um novo person
app.post("/person", async (req, res) => {
  const newPerson = new Person({ ...req.body })
  const insertPerson = await newPerson.save();
  return res.status(201).json(insertPerson);
})

//atualiza person
app.put("/person/:id", async (req, res) => {
  const { id } = req.params;
  await Person.updateOne({ id }, req.body);
  const updatePerson = await Person.findById(id);
  return res.status(200).json(updatePerson);
})

//deleta person
app.delete("/person/:id", async (req,res) => {
  const { id } = req.params;
  const deletePerson = await Person.findByIdAndDelete(id);
  return res.status(200).json(deletePerson);
})


const start = async () => {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017/testeapi"
      );
      app.listen(3000, () => console.log("Server started"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();

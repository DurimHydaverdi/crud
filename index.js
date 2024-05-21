const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TaskModel = require('./models/Users');
const EmployeeModel = require('./models/Employee');

const app = express();

app.use(cors());
app.use(express.json());

const crudDBUrl = 'mongodb://127.0.0.1:27017/crud';
mongoose.connect('mongodb://127.0.0.1:27017/employee');

app.post('/login', (req,res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if account already exists
    EmployeeModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                // Account with the same email already exists
                return res.status(400).json({ message: "An account with this email already exists." });
            } else {
                // Check if account with the same name exists
                EmployeeModel.findOne({ name: name })
                    .then(existingUserWithName => {
                        if (existingUserWithName) {
                            // Account with the same name already exists
                            return res.status(400).json({ message: "An account with this name already exists." });
                        } else {
                            // Create a new account
                            return EmployeeModel.create({ name, email, password })
                                .then(newEmployee => res.json(newEmployee))
                                .catch(err => res.status(500).json({ message: "Internal server error." }));
                        }
                    })
                    .catch(err => res.status(500).json({ message: "Internal server error." }));
            }
        })
        .catch(err => res.status(500).json({ message: "Internal server error." }));
});

app.post('/logout', (req, res) => {
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    TaskModel.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});

app.get('/getTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findById({ _id: id })
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

app.put('/editTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(id, {
        task: req.body.task,
        description: req.body.description,
    })
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

app.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/createTask", (req, res) => {
    TaskModel.create(req.body)
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is Running");
});
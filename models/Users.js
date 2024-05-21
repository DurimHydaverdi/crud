const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: String,
    description: String,
});

const TaskModel = mongoose.model("tasks", taskSchema);
module.exports = TaskModel;






// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const joi = require('joi');
// const passwordComplexity = require('joi-password-complexity')

// const TaskSchema = new mongoose.Schema({
//     task: String,
//     description: String,
// });

// const userSchema = new mongoose.Schema({
//     firstName: { type: String, require: true },
//     lasttName: { type: String, require: true },
//     email: { type: String, require: true },
//     password: { type: String, require: true },
// });

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'})
//     return token
// }

// const User = mongoose.model("user", userSchema);

// const validate = (data) => {
//     const schema = joi.object({
//         firstName: joi.string().required().label("Fist Name"),
//         lastName: joi.string().required().label("Last Name"),
//         lastName: joi.email().required().label("Email"),
//         password: passwordComplexity().required().label("Password"),
//     });
//     return schema.validate(data)
// }

// module.exports = {User, validate}

// const TaskModel = mongoose.model("tasks", TaskSchema);
// module.exports = TaskModel;
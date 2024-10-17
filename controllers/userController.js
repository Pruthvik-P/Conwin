const User = require("../models/userModel");
const Joi = require("joi");

const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
})

exports.createUser = async (req, res) => {
    try{
        const  {error} = userValidationSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).send({message: "User created successfully", userId: newUser._id});
    } catch (error) {
        res.status(500).send({message: "Error in creating user"});
    }
};

exports.getUserDetails = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({message: "User not found"});

        res.status(200).send(user);
    } catch (error){
        res.status(500).send({message: "Error in getting user details"});
    }
}
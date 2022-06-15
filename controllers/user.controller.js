const userService = require("../services/user.service");
const { Model: User } = require("../models/user.model");
const { validateBasicInfo, validateSkills, validateEducation, validateExperience } = require("../Utils/validation");

/* currentStep is stored in a session in the db and in a cookie on the client
to keep track of the resume building current step (current form to view on the client)
it only can be modified from the server and it will be incremented on each step successfully saved
*/
exports.getCurrentStep = (req, res, next) => {
    try {
        if (!req.session.currentStep) req.session.currentStep = 1;
        return res.json({ currentStep: req.session.currentStep });
    } catch (error) {
        next(error);
    }
}

exports.addBasicInfo = async (req, res, next) => {
    const { error } = validateBasicInfo(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const currentStep = req.session.currentStep;

    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            birthDate: req.body.birthDate,
            militaryStatus: req.body.militaryStatus
        });

        const addedUser = await userService.addBasicInfo(user, currentStep);
        req.session.userId = addedUser._id.toString();
        req.session.currentStep = 2;
        return res.status(201).json({ message: 'Sucessfully created user', user: addedUser });
    } catch (error) {
        next(error);
    }
}

exports.updateEducation = async (req, res, next) => {
    const { error } = validateEducation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    const currentStep  = req.session.currentStep;

    const user = {
        _id: req.session.userId,
        education: req.body.education
    };

    try {
        const updatedUser = await userService.updateEducation(user, currentStep);
        req.session.currentStep = 3;
        return res.json({ message: 'Sucessfully updated user education', user: updatedUser });
    } catch (error) {
        next(error);
    }
}

exports.updateExperience = async (req, res, next) => {
    const { error } = validateExperience(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    const currentStep = req.session.currentStep;

    const user = {
        _id: req.session.userId,
        experience: req.body.experience
    };

    try {
        const updatedUser = await userService.updateExperience(user, currentStep);
        req.session.currentStep = 4;
        return res.json({ message: 'Sucessfully updated user experience', user: updatedUser });
    } catch (error) {
        next(error);
    }
}

exports.updateSkills = async (req, res, next) => {    
    const { error } = validateSkills(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const currentStep = req.session.currentStep;

    const user = {
        _id: req.session.userId,
        technicalSkills: req.body.technicalSkills,
        personalSkills: req.body.personalSkills
    };

    try {
        const updatedUser = await userService.updateSkills(user, currentStep);
        req.session.currentStep = null;
        return res.json({ message: 'Sucessfully updated user skills', user: updatedUser });
    } catch (error) {
        next(error);
    }
}

exports.getUsers = async (req, res, next) => {    
    try {
        const users = await userService.getUsers();
        return res.json({ users: users });
    } catch (error) {
        next(error);
    }
}
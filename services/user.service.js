const userModel = require("../models/user.model");

exports.addBasicInfo = async (user, currentStep) => {
    try {
        if (currentStep != 1) throw ({ customMessage: 'invalid step number' });
        const addedUser = await userModel.addBasicInfo(user);
        return addedUser;
    } catch (error) {
        throw error;
    }
}

exports.updateEducation = async (user, currentStep) => {
    try {
        if (currentStep != 2) throw ({ customMessage: 'invalid step number' });
        const updatedUser = await userModel.updateEducation(user);
        delete updatedUser._id;
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

exports.updateExperience = async (user, currentStep) => {
    try {
        if (currentStep != 3) throw ({ customMessage: 'invalid step number' });
        const updatedUser = await userModel.updateExperience(user);
        delete updatedUser._id;
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

exports.updateSkills = async (user, currentStep) => {
    try {
        if (currentStep != 4) throw ({ customMessage: 'invalid step number' });
        const updatedUser = await userModel.updateSkills(user);
        delete updatedUser._id;
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

exports.getUsers = async () => {
    try {
        const users = await userModel.getUsers();
        return users;
    } catch (error) {
        throw error;
    }
}
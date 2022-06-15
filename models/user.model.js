const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // basic info
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    birthDate: String,
    militaryStatus: String,

    education: [{
        fromDate: String,
        toDate: String,
        major: String,
        university: String,
        degree: String
    }],

    experience: [{
        fromDate: String,
        toDate: String,
        jobTitle: String,
        jobType: String,
        companyName: String,
        companyLocation: String
    }],

    technicalSkills: [String],

    personalSkills: [String]
});

const User = mongoose.model('User', userSchema);

exports.addBasicInfo = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const addedUser = await user.save();
            resolve(addedUser);
        } catch (error) {
            reject(error);
        }
    });
}

exports.updateEducation = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(user._id, { education: user.education }, {new: true});;
            resolve(updatedUser);
        } catch (error) {
            reject(error);
        }
    });
}

exports.updateExperience = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(user._id, { experience: user.experience }, {new: true});;
            resolve(updatedUser);
        } catch (error) {
            reject(error);
        }
    });
}

exports.updateSkills = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(user._id, { technicalSkills: user.technicalSkills, personalSkills: user.personalSkills }, {new: true});;
            resolve(updatedUser);
        } catch (error) {
            reject(error);
        }
    });
}

exports.updateSkills = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(user._id, { technicalSkills: user.technicalSkills, personalSkills: user.personalSkills }, {new: true});;
            resolve(updatedUser);
        } catch (error) {
            reject(error);
        }
    });
}

exports.getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find({});
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

exports.Model = mongoose.model('User', userSchema);
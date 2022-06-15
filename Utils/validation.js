const Joi = require("joi");

exports.validateBasicInfo = (body) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().max(30).required(),
        email: Joi.string().email().max(150).required(),
        phone: Joi.string().required(),
        address: Joi.string().max(200).required(),
        birthDate: Joi.string(),
        militaryStatus: Joi.string().max(20).required()
    });

    return schema.validate(body);
}

exports.validateEducation = (body) => {
    const schema = Joi.object({
        education: Joi.array().items(Joi.object({
            fromDate: Joi.string().required(),
            toDate: Joi.string().required(),
            major: Joi.string().required(),
            university: Joi.string().required(),
            degree: Joi.string()
        })).required()
    });    
    return schema.validate(body);
}

exports.validateExperience = (body) => {
    const schema = Joi.object({
        experience: Joi.array().items(Joi.object({
            fromDate: Joi.string().required(),
            toDate: Joi.string().required(),
            jobTitle: Joi.string().min(5).max(50).required(),
            jobType: Joi.string().min(5).max(20).required(),
            companyName: Joi.string().min(2).max(100).required(),
            companyLocation: Joi.string().max(150)
        })).required()
    });    
    return schema.validate(body);
}

exports.validateSkills = (body) => {
    const schema = Joi.object({
        technicalSkills: Joi.array().items(Joi.string()).required(),
        personalSkills: Joi.array().items(Joi.string()).required()
    });
    return schema.validate(body);
}
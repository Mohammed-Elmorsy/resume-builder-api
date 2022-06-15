const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/* 
this API will be called first by the front end client
to get current step on which it will render the corresponding form
(assuming there will be 4 forms for 4 steps)
    step 1 => add basic info form
    step 2 => add education form
    step 3 => add experience form
    step 4 => add skills form
*/ 
router.get("/current-step", userController.getCurrentStep);

router.post("/basic-info", userController.addBasicInfo);
router.patch("/education", userController.updateEducation);
router.patch("/experience", userController.updateExperience);
router.patch("/skills", userController.updateSkills);

router.get("/all", userController.getUsers);

module.exports = router;
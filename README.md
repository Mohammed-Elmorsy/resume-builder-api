# resume-builder-api
Back-end for building a resume in incremented steps so the user can continue from the last step

#Work Flow
- At first the front end application will call the endpoint: "/user/current-step" to get the currnet step of building the resume and the server will create a session
- The front end app will render the corresponding form depending on current step
- In front end there will be 4 forms for 4 steps : 
  1. Add Basic Info Form
  2. Add Education
  3. Add Experience
  4. Add Skills (Technical and Personal)
- After each form submit the server will update user info and increase the current step in the session
- if the current step in the cookie is manipulated the server will respond with 500 invalid step number
- The order is obligatory and Incremently
- Use "/user/all" to view all users in db

#Run 
- use npm install to install required dependencies
- use npm start to start the server
- use npm test to run tests

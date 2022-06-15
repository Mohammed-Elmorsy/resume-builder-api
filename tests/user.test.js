const request = require("supertest");
const app = require("../app");
const { getCurrentRequest } = require("../Utils/event-emitters");

let session;

beforeAll(async () => {
    await request(app).get("/user/current-step"); // call this api to attach a session
    session = getCurrentRequest().session;
});

describe("GET /current-step", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(app).get("/user/current-step");
            expect(response.statusCode).toBe(200);
        });
        test("should specify json in the content type header", async () => {
            const response = await request(app).get("/user/current-step");
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });

        describe("when there is no session in request", () => {
            test("should return currentStep = 1", async () => {
                const response = await request(app).get("/user/current-step");
                expect(response.body).toEqual({ currentStep: 1 });
            });
        });
});

describe("POST /basic-info", () => {
    const user = {
        firstName: "test",
        lastName: "test",
        email: "test@test.com",
        phone: "23532525524",
        address: "cairo",
        birthDate: "1-1-1999",
        militaryStatus: "finished"
    };
    test("should respond with a status code of 500 if cookie is not sent", async () => {
        const response = await request(app).post("/user/basic-info").send(user);
        expect(response.statusCode).toBe(500);
    });
    test("should specify json in the content type header", async () => {
        const response = await request(app).post("/user/basic-info").send(user);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});

describe("PATCH /education", () => {
    let education = [{
        fromDate: "10-2-2000",
        toDate: "10-9-2005",
        major: "Software Engineering",
        university: "MIT",
        degree: "Very Good"
    }]

    test("should respond with a status code of 400 if body is not valid", async () => {
        education[0].major = 54;  // to make it invalid as it should be a string
        const response = await request(app).patch("/user/education").send({education: education});
        education[0].major = "Software Engineering"; // reset it again for other tests
        expect(response.statusCode).toBe(400);
    });

    test("should respond with a status code of 500 if current step in session is not equal to 2", async () => {
        session.currentStep = 1;
        const response = await request(app).patch("/user/education").set(session).send({education: education});
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ message: 'invalid step number'});
    });

/*     test("should respond with a status code of 200 if current step in session is equal to 2", async () => {
        session.currentStep = 2;
        const response = await request(app).patch("/user/education").set(session).send({education: education});
        console.log("res headers", response.session);
        expect(response.statusCode).toBe(200);
    }); */

    test("should specify json in the content type header", async () => {
        const response = await request(app).patch("/user/education").send({education: education});
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});
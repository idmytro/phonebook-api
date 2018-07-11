"use strict";

const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const server = require(path.join(__dirname, "..", "server", "app.js"));
const UsersModel = require(path.join(__dirname, "..", "server", "api", "v1", "users", "users.model.js"));
const PhoneBookModel = require(path.join(__dirname, "..", "server", "api", "v1", "phonebook", "phonebook.model.js"));

// const { parse } = require('cookie');
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe("Auth", () => {
	before(done => {
		UsersModel.remove({ email: process.env.TEST_EMAIL }, err => {
			done(err);
		});
	});

	it("it should register new user", done => {
		chai
			.request(server)
			.post("/api/users/register")
			.send({
				email: process.env.TEST_EMAIL,
				name: process.env.TEST_USER,
				surname: process.env.TEST_USER,
				password: process.env.TEST_PASS
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.be.a("string");
				res.body.message.should.be.eq("Register successful");
				// expect(res).to.have.cookie('sessionId');
				res.should.have.cookie("sessionId");
				// const cookie = parse(res.headers['set-cookie'][0]);
				// const session = cookie.sessionId;
				done();
			});
	});

	it("it should throw error on register exists user", done => {
		chai
			.request(server)
			.post("/api/users/register")
			.send({
				email: process.env.TEST_EMAIL,
				name: process.env.TEST_USER,
				surname: process.env.TEST_USER,
				password: process.env.TEST_PASS
			})
			.end((err, res) => {
				res.should.have.status(400);
				res.body.message.should.be.a("string");
				res.body.message.should.be.eq("User already exists");
				done();
			});
	});

	it("it should log in test user", done => {
		agent
			.post("/api/users/login")
			.send({
				email: process.env.TEST_EMAIL,
				password: process.env.TEST_PASS
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.be.a("string");
				res.body.message.should.be.eq("Log in successful");
				// expect(res).to.have.cookie('sessionId');
				res.should.have.cookie("sessionId");
				done();
			});
	});
});

describe("Files", () => {
	it("it should upload new file to service", done => {
		agent
			.post("/api/files")
			.set("Content-Type", "multipart/form-data")
			.attach("avatar", fs.readFileSync(path.join(__dirname, "test.jpg")))
			.end((err, res) => {
				res.should.have.status(200);
				res.body.message.should.be.a("string");
				res.body.message.should.be.eq("File upload successful");
				done();
			});
	});
});

const UserObj = {
	name: "Yurii",
	surname: "Chikhrai",
	position: "NodeJS developer",
	email: ["y.chikhrai@shipnext.com"],
	phone: [
		{
			value: "+380965438417"
		},
		{
			category: "work",
			value: "+380631118931"
		}
	]
};

describe("PhoneBook", () => {
	let contactId;

	before(async () => {
		try {
			const user = await UsersModel.findOne({ email: process.env.TEST_EMAIL })
				.select("_id")
				.exec();
			await PhoneBookModel.remove({ addedBy: user });
		} catch (e) {
			console.error("PhoneBook before error", e);
		}
	});

	it("it should not receive first page of user contacts", done => {
		chai
			.request(server)
			.get("/api/phonebook")
			.end((err, res) => {
				res.should.have.status(401);
				res.body.should.be.a("object");
				res.body.message.should.be.a("string");
				res.body.message.should.be.eq("Not authorized");
				done();
			});
	});

	it("it should receive first empty page of user contacts", done => {
		agent.get("/api/phonebook").end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a("array");
			res.body.should.be.empty;
			done();
		});
	});

	it("it should add new contact to phone book", done => {
		agent
			.post("/api/phonebook")
			.send(UserObj)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.message.should.be.a("string");
				res.body.message.should.be.eq("Contact added successful");
				res.body.id.should.be.a("string");
				contactId = res.body.id;
				done();
			});
	});

	it("it should receive list with one user contact", done => {
		agent.get("/api/phonebook").end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a("array");
			res.body.should.have.length(1);
			const compareObj = _.omit(res.body[0], ["__v", "_id"]);
			compareObj.should.deep.equal({ name: UserObj.name, surname: UserObj.surname });
			done();
		});
	});

	it("it should receive added user contact by id", done => {
		agent.get("/api/phonebook/" + contactId).end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a("object");
			const compareObj = _.omit(res.body, ["__v", "_id"]);
			compareObj.should.deep.equal(UserObj);
			done();
		});
	});

	it("it should delete user contact by id", done => {
		agent.delete("/api/phonebook/" + contactId).end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a("object");
			res.body.message.should.be.a("string");
			res.body.message.should.be.eq("Contact deleted successful");
			done();
		});
	});

	it("it should receive first empty page of user contacts", done => {
		agent.get("/api/phonebook").end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a("array");
			res.body.should.be.empty;
			done();
		});
	});
});

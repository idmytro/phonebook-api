"use strict";

const path = require('path');
const server = require(path.join(__dirname, '..', 'server', 'app.js'));
const UsersModel = require(path.join(__dirname, '..', 'server', 'api', 'v1', 'users', 'users.model.js'));

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('Auth', () => {
    let session;

    before((done) => {
        UsersModel.remove({email: process.env.TEST_EMAIL}, err => {
            done(err);
        });
    });

    it('it should register new user', done => {
        chai.request(server)
            .post('/api/users/register')
            .send({
                email: process.env.TEST_EMAIL,
                username: process.env.TEST_USER,
                password: process.env.TEST_PASS
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.a('string');
                res.body.message.should.be.eq('Register successful');
                expect(res).to.have.cookie('sessionId');
                done();
            });
    });

    it('it should throw error on register exists user', done => {
        chai.request(server)
            .post('/api/users/register')
            .send({
                email: process.env.TEST_EMAIL,
                username: process.env.TEST_USER,
                password: process.env.TEST_PASS
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.message.should.be.a('string');
                res.body.message.should.be.eq('User already exists');
                done();
            });
    });

    it('it should log in test user', done => {
        chai.request(server)
            .post('/api/users/login')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASS
            })
            .end((err, res) => {
                res.should.have.status(200);
                // TODO: continue
                done();
            });
    });
});
const request = require('supertest');
const app = require('./app');
const expect = require('chai').expect;


//Credentials login
describe('Login form correct', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: 'aaa@aaa.aaa', password: '12345' })
            .expect(200)
            //.expect('Content-Type', /json/)
            .expect('Content-Type', /text\/html/)
            .expect(function(response) {
                expect(response.text).to.match(/welcomeScreen/)
            })
           .end(done);
    }); 
});


//Credentials login
describe('Login form incorrect', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({ email: 'laiufdgñsrhngñaiodrhgpaiuhrgknaeriug@aaaetghqaeghaea.aaadfgarega', password: '1aergyaertga23aertgaeraer45' })
            .expect(200)
            //.expect('Content-Type', /json/)
            .expect('Content-Type', /text\/html/)
            .expect(function(response) {
                expect(response.text).to.match(/errorBlock/);
                expect(response.text).to.match(/Incorrect email/);
            })
           .end(done);
    }); 
});



//Logout
describe('Logout', function() {

    it('Should success if redirects to login', function(done) {
        request(app)
            .get('/logout')
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .expect(function(response){
                console.log(request.session);
                //expect(request.session.loggedin).to.be.equal(false)
                expect(response.text).to.match(/loginScreen/);
            })
            .end(done);
    }); 
});

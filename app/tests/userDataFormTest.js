"use strict";

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let userData = require('../models/userFormModel');

let chai = require('chai');
let expect = require('chai').expect;
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

var expectedCountryList = ['Åland Islands','Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Faroe Islands','Finland','France','Germany','Gibraltar','Greece','Guernsey','Holy See','Hungary','Iceland','Republic of Ireland','Isle of Man','Italy','Jersey','Latvia','Liechtenstein','Lithuania','Luxembourg','Republic of Macedonia','Malta','Moldova','Monaco','Montenegro','Netherlands','Norway','Poland','Portugal','Republic of Kosovo','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Svalbard and Jan Mayen','Sweden','Switzerland','Ukraine','United Kingdom'];

/*
* Test the /GET route
*/
describe('Test the GET route', () => {
    it('the country dropdown list should be populated correctly on load', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');

                // Check for all substrings
                expect(res.text).to.satisfy(string =>
                    expectedCountryList.every(bit => string.includes(bit))
                );

              done();
            });
    });


    it('display 404 page for everything else', function testPath(done) {
        chai.request(server)
          .get('/test')
          .end((err, res) => {
            res.text.should.includes('Page not found')
            res.text.should.includes('The page you are trying to access is not found. Please try again.')

            done();
          });
    });

});


/*
* Test the /POST route
*/
describe('Test the POST route', () => {

  it('it should show error message if Name is missing', (done) => {
    let userData = {
        name:'',
        age: 20,
        sex: "Male",
        country: "United Kingdom"
    }
    chai.request(server)
        .post('/')
        .send(userData)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');

            res.text.should.includes('Please enter your name');

            // Check for all substrings
            expect(res.text).to.satisfy(string =>
                expectedCountryList.every(bit => string.includes(bit))
            );

            done();
        });
  });


  it('it should show error message if Name is invalid', (done) => {
    let userData = {
        name: 9999099,
        age: 20,
        sex: "Male",
        country: "United Kingdom"
    }
    chai.request(server)
        .post('/')
        .send(userData)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');

            res.text.should.includes('Name is invalid');

            // Check for all substrings
            expect(res.text).to.satisfy(string =>
                expectedCountryList.every(bit => string.includes(bit))
            );

            done();
        });
  });


  it('it should show error message if Sex is not selected', (done) => {
    let userData = {
        name: 9999099,
        age: 20,
        country: "United Kingdom"
    }
    chai.request(server)
        .post('/')
        .send(userData)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');

            res.text.should.includes('Please select your gender');

            // Check for all substrings
            expect(res.text).to.satisfy(string =>
                expectedCountryList.every(bit => string.includes(bit))
            );

            done();
        });
  });


  it('it should show error message if Age is missing', (done) => {
    let userData = {
        name: "John",
        age: '',
        sex: "Male",
        country: "United Kingdom"
    }
    chai.request(server)
        .post('/')
        .send(userData)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');

            res.text.should.includes('Please enter your age');

            // Check for all substrings
            expect(res.text).to.satisfy(string =>
                expectedCountryList.every(bit => string.includes(bit))
            );

            done();
        });
  });


  it('it should show error message if Age is invalid', (done) => {
    let userData = {
        name: "John",
        age: "ABC",
        sex: "Male",
        country: "United Kingdom"
    }
    chai.request(server)
        .post('/')
        .send(userData)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');

            // Check for all substrings
            expect(res.text).to.satisfy(string =>
                expectedCountryList.every(bit => string.includes(bit))
            );

            res.text.should.includes('Invalid Age');
            done();
        });
  });

});



/*
* Test the Thank you page
*/
describe('Test the Thank you page', () => {

  it('it should show Thank You page if all required fields are entered', (done) => {
    let userData = {
        name: "John",
        age: 20,
        sex: "Male",
        country: "United Kingdom"
    }
    chai.request(server)
        .post('/')
        .send(userData)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');

            res.text.should.includes('John, thank you for applying to this useful goverment service.');

            done();
        });
  });

});
"use strict";

process.env.NODE_ENV = 'test';

let Utils = require('../models/utils');

let chai = require('chai');
let expect = require('chai').expect;
let server = require('../../server');
let should = chai.should();
let sinon = require('sinon');
let needle = require('needle');

describe('Test getCountryList function', function() {

    it('it should return a list of countries on success request', (done) => {
        var url = 'https://restcountries.eu/rest/v1/region/Europe';

        Utils.getCountryList(url, function(result){

            var expectedCountryList = ['Åland Islands','Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Faroe Islands','Finland','France','Germany','Gibraltar','Greece','Guernsey','Holy See','Hungary','Iceland','Republic of Ireland','Isle of Man','Italy','Jersey','Latvia','Liechtenstein','Lithuania','Luxembourg','Republic of Macedonia','Malta','Moldova','Monaco','Montenegro','Netherlands','Norway','Poland','Portugal','Republic of Kosovo','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Svalbard and Jan Mayen','Sweden','Switzerland','Ukraine','United Kingdom'];
            var countryArray = [];

            result.forEach(function(country) {
                countryArray.push(country.name);
            });

            expect(countryArray).to.have.ordered.members(expectedCountryList);
            done();
        })

    });

});



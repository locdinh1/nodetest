"use strict";
var utils = require('../models/utils');

var userFormCtrl = function(userDataRecord){

    var userFormObj = {};

    userFormObj.display404 = function(req, res){
        res.render('404',{});
    }


    userFormObj.displayForm = function(req, res){
        var url = 'https://restcountries.eu/rest/v1/region/Europe';

        utils.getCountryList(url, function(countryList){

            if(Object.keys(countryList).length === 0){
                var error = [{ location: 'body', param: 'country', msg: 'Unable to load countries', value: '' }];
            }else{
                var error = {};
            }

            res.render('index',{
                data: {},
                countryList: countryList,
                errors: error
            });
        });
    }


    userFormObj.addUserRecord = function(req, res){

        // Error message for each scenarios
        const nameRequired = 'Please enter your name';
        const invalidName = 'Name is invalid';
        const chooseGender = 'Please select your gender';
        const ageRequired = 'Please enter your age';
        const invalidAge = 'Invalid Age';
        const unableToLoadCountry = 'Unable to load countries';

        const userData = req.body;

        // Start Validation
        req.checkBody('name', nameRequired).notEmpty().trim();

        if(userData.name){
            req.checkBody('name', invalidName).isAlpha().trim();
        }

        req.checkBody('sex', chooseGender).exists();
        req.checkBody('age', ageRequired).notEmpty().trim();

        if(userData.age){
            req.checkBody('age', invalidAge).isInt().trim();
        }

        req.checkBody('country', unableToLoadCountry).exists();

        var errors = req.validationErrors();

        // render the form again showing errors
        if (errors) {
            var url = 'https://restcountries.eu/rest/v1/region/Europe';

            utils.getCountryList(url, function(countryList){
                res.render('index',{
                    data: this.data,
                    countryList:countryList,
                    errors: this.errors
                });
            }.bind({errors: errors, data: userData}));
        }
        else{
            var newUserDataRecord = new userDataRecord(userData);

            newUserDataRecord.save(function(err, data){
                if(err){
                    res.json({status: false, error: err.message});
                    return;
                }

                res.render('thankyou',{
                    data: data
                });

            });
        }

    }

  return userFormObj;
}

module.exports = userFormCtrl;
"use strict";

var request = require('request');

var Utils = {

    isJson: function(str) {
        try {
            JSON.parse(JSON.stringify(str));
        } catch (e) {
            return false;
        }
        return true;
    },
    getCountryList: function(url, callback) {

        request.get({
                url: url,
                json: true,
                headers: {'User-Agent': 'request'}
            }, (err, res, data) => {

                if (err) {
                    console.log('-----Error:', err);
                } else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                }

                if(this.isJson(data)){
                    callback(data);
                }
                else{
                    callback({});
                }
            });
    }
};

module.exports = Utils;
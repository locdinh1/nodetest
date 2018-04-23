"use strict";

let userFormModel = require('../models/userFormModel');
let userFormController = require('../controllers/userFormController')(userFormModel);

module.exports = function(app){
    app.get('/', userFormController.displayForm);
    app.post('/', userFormController.addUserRecord);
    app.get('*', userFormController.display404);
}





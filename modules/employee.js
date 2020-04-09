var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});
var conn=mongoose.connection;
var employeeSchema=new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalhours: Number
});
var employeeModel = mongoose.model('Employee', employeeSchema);
module.exports=employeeModel;

// var employee=require('../module/employee'); to export this module to another file


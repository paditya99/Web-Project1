var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});
var conn=mongoose.connection;

var uploadSchema=new mongoose.Schema({
    imagename: String,
});

var uploadModel = mongoose.model('Uploadfiles', uploadSchema);
module.exports=uploadModel;
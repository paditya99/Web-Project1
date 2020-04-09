var express = require('express');
var multer=require('multer');     //to use the file upload package
var path=require('path');
var router = express.Router();
var empModel=require('../modules/employee');
var uploadModel=require('../modules/upload');
var employee=empModel.find({}); 
var imgdata=uploadModel.find({});           // to store every data items from employee database

/* GET home page. */
router.get('/', function(req, res, next) {

  employee.exec(function(err,data){
    if(err) throw err; 
    res.render('index', { title: 'Enter Employee Records', records: data, success:'' });
  });

  
});


router.get('/upload/', function(req, res, next) {
  imgdata.exec(function(err,data){
    if(err) throw err;
 
    res.render('upload_img', { title: 'Upload Files',records: data, success: ''});
  });
});

  router.use(express.static(__dirname+'./public/'));

  var Storage=multer.diskStorage({                                  // to get the file from storage
    destination:'./public/uploads/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now(),path.extname(file.originalname));
    }
  });

  var upload=multer({     // middleware
      storage: Storage
  }).single('file');

  router.post('/upload/',upload, function(req, res, next) {
      var imageFile=req.file.filename;
    var Success=req.file.filename+'uploaded successfully';
    var imgdetails=new uploadModel({
        imagename: imageFile
    });
    imgdetails.save(function(err,doc){
        if(err) throw err;
        imgdata.exec(function(err,data){
            if(err) throw err;
            res.render('upload_img', { title: 'Upload Files',records: data, success: Success});
        });
        
    });
    
  });
  


router.post('/', function(req, res, next) {

  var empdetails= new empModel({
    name: req.body.name,
    email: req.body.email,
    etype: req.body.emptype,
    hourlyrate: req.body.hourlyrate,
    totalhours: req.body.totalhours,

  });
 empdetails.save(function(err,res1){

  if(err) throw err;
  employee.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'Enter Employee Records', records: data, success: 'Record Inserted Successfully'});
  });
 
 });

});

router.post('/search/', function(req, res, next) {

  var fltrName=req.body.fltrname;
  var fltrEmail=req.body.fltremail;
  var fltrEmptype=req.body.fltremptype;
  if(fltrName!='' && fltrEmail!='' && fltrEmptype!=''){
    var filterParameter={ $and: [{name: fltrName},{$and:[{email: fltrEmail},{etype: fltrEmptype}]}]

    }   
  }else if(fltrName!='' && fltrEmail=='' && fltrEmptype!=''){
    var filterParameter={ $and: [{name: fltrName},{etype: fltrEmptype}]

    } 
  }else if(fltrName=='' && fltrEmail!='' && fltrEmptype!=''){
    var filterParameter={ $and: [{email: fltrEmail},{etype: fltrEmptype}]

    } 
  }else if(fltrName=='' && fltrEmail=='' && fltrEmptype!=''){
    var filterParameter={etype: fltrEmptype}

    } 
  
  else{
    var filterParameter={}
  }
  var employeeFilter=empModel.find(filterParameter); 

  employeeFilter.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'Enter Employee Records', records: data});
  });
 

});

router.get('/delete/:id', function(req, res, next) {
var id=req.params.id;
var del=empModel.findByIdAndDelete(id);
  del.exec(function(err){
    if(err) throw err;
    employee.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Enter Employee Records', records: data, success: 'Record Deleted Successfully'});
    });
  });

  
});

router.get('/edit/:id', function(req, res, next) {
  var id=req.params.id;
  var edit=empModel.findById(id);
    edit.exec(function(err,data){
      if(err) throw err;
      res.render('edit', { title: 'Edit Employee Record', records: data});
    });
  
    
  });
  router.post('/update/', function(req, res, next) {
   
    var update=empModel.findByIdAndUpdate(req.body.id,{
      name: req.body.name,
      email: req.body.email,
      etype: req.body.emptype,
      hourlyrate: req.body.hourlyrate,
      totalhours: req.body.totalhours,
    });
      update.exec(function(err,data){
        if(err) throw err;
        //res.redirect("/");
        employee.exec(function(err,data){
          if(err) throw err;
          res.render('index', { title: 'Enter Employee Records', records: data, success: 'Record Updated Successfully'});
        });
      });
    
      
    });

module.exports = router;

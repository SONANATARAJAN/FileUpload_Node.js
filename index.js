var fs = require('fs');
var http =require('http');
var formidable= require('formidable');
http.createServer(function (req,res) {
    const url=req.url;

    if(url=='/')
    {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<form action="biodata" method="post" enctype="multipart/form-data">');
        res.write('<h1> Registration form </h1>');
        res.write('Name <input type="text" name="username"><br>');
        res.write('D.O.B <input type="date" name="dob"><br>'); 
        res.write('Qualification <input type="text" name="qualification"><br>');
        res.write('Email id <input type="email" name="emailid"><br>');
        res.write('Phone Number <input type="number" name="pno"><br>');
        res.write('Upload Your Resume <input type="file" name="uploadfile"><br>');
        res.write('<button type="submit"> submit</button>');
        res.end();

    }

   else if(url=='/biodata')
    {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err,fields,files){
            res.write('<h1>Name :'  + fields.username + '</h1><br>');
            res.write('<h1>D.O.B :'  + fields.dob + '</h1><br>');
            res.write('<h1>Qualification :'  + fields.qualification + '</h1><br>');
            res.write('<h1>Email :'  + fields.emailid + '</h1><br>');
            res.write('<h1>Phone Number :'  + fields.pno + '</h1><br>');
            
              var oldpath = files.uploadfile.filepath;
              var newpath = 'C:/users/Amos/Desktop/' + files.uploadfile.originaFilename;
              fs.rename(oldpath,newpath,function(err){
                 if (err) throw err;
                 res.write('<h1>your file location</h1><br>');
                 res.write('<h1>old path   : ' + oldpath + '</h1><br>');
                 res.write('<h1> new path  :'  + newpath  + '</h1><br>'); 
               res.end('<h1>your form is submited succesfully</h1>');

            });
        });



    }
    else{
        res.end('<h1> 404 page not found </h1>');
    }

    
} ).listen(8080);

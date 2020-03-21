

// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var nodemailer = require("nodemailer");
var { User } = require("./../models/users.js");
var{artist}= require("./../models/Artists.js");  //artists model
const {ObjectID}=require("mongodb");
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
const bcrypt = require('bcryptjs');
var password = "abc";
app.use(bodyparser.json());
var _ = require('lodash');
//var rand=Math.floor((Math.random() * 100) + 54); //random confirmation code

const jwt = require('jsonwebtoken');
var userservices = require("./../Services/UserServices.js");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sw.project.verify@gmail.com",
        pass: "abcd-1234"
    }
});


app.post('/users/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        console.log(req.body.userName)
        console.log(req.body.email)
        console.log(req.body.password)
        console.log(req.body.isPremium)
        console.log(req.body.gender)
        console.log(req.body.birthDate)
        var newacc = new User(
            {
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPass,
                isPremium: req.body.isPremium,
                gender: req.body.gender,
                birthDate: req.body.birthDate

            });
        console.log('2et3amal');
        newacc.save().then((doc) => {
            console.log("skod");
	
	
		
		var access= 'auth';		
		var code = jwt.sign({ _id: newacc._id.toHexString(), access }, 'secretkeyforuser',{expiresIn:'1d'});
		console.log(code);
		
		var host=req.get('host');
		var link="http://"+req.get('host')+"/users/confirm/?code="+code;
		console.log(link);
		var mailOptions={
			to : req.body.email,
			subject : "Please confirm your Email account",
			html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
			}
		console.log(mailOptions);
		smtpTransport.sendMail(mailOptions, function(error, response){
		 if(error){
				console.log(error);
			res.end("error");
		 }else{
				console.log("Message sent: " + response.message);
			res.end("sent");
			 }
			 
});

            res.status(200).send(hashedPass);
        },
            (err) => {
                console.log(err);
                res.status(403).send(err);

            })

    }

    catch
    {
        res.status(500).send();
    }
});



app.get('/users/confirm',(req,res) => {
   User.ActivateByToken(req.query.code).then((user) => {
        if(!user){
			res.status(404).send("not found");
            return Promise.reject();
        }
	
		res.status(200).send("Email confirmed successfully!");
    }).catch((e) => {
        res.status(401).send();
    })
})		



app.post('/users/login', async (req, res) => {
    console.log(1);
    var body = _.pick(req.body, ['email', 'password']);
    console.log(2);
    User.findByCredentials(body.email, body.password).then((user) => {
        console.log(3);
        return user.generateAuthToken().then((token) => {
            console.log(4);
            res.header('x-auth', token).send(user);
            console.log(5);
        });
    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    });
    //res.send(body)



});

// Get User Profile Request
app.get('/users/me',(req,res) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        res.send(user);
    }).catch((e) => {
        res.status(401).send();
    })
})






/**
 * Reset password
 * ----------------------
 * @api {post} /users/forgot      Request to send email for resetting password
 * @apiName Requestreset
 * @apiGroup User privacy
 * 
 * @apiHeader {json} Content-Type
 * 
 * @apiBody {string} userEmail       in json form
 * 
 * @apiSuccess {string} emailSent    The email contains a link with a token that should be passed in the resetPassword request
 *                                    
 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Email Sent Successfully"
 *     }
 *     
 * @apiError EmailCannotBeSent  A problem while sending email
  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 serverError
 *     {
 *       "Sending Failed"
 *     }   
  
  
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 505 serverError
 *     {
 *       "EmailCannotBeSent"
 *     }  
 */
app.post('/users/forgot', async (req, res) => {
    
    var reqEmail=req.body.email;
    console.log(reqEmail)
    try {

     await User.findByEmail(reqEmail).then((user)=>{

           if(!user)  {

              
            return res.status(404).send('Email not found')}

        console.log('henaaaa')
    var rand=Math.floor((Math.random() * 100) + 54);
    user.generateResetToken().then((token)=>{
    console.log(token);
    var host=req.get('host');
    var link="http://"+req.get('host')+"/users/reset/"+token;
    var mailOptions={
        to : reqEmail,
        subject : "Reset the password ",
        html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to verify</a>"
        }
    
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            //res.send(token);
        res.end("Email Sent Successfully");
         }

        })
    })
     });
}

    catch
    {
        res.status(500).send("Sending Failed");
    }
});

/**
 * Reset password
 * ----------------------
 * @api {put} /users/reset/:token      Request to reset password
 * @apiName Requestreset
 * @apiGroup User privacy
 * 
 * @apiHeader {json} Content-Type
 * 
 * @apiParam {string} Token  
 * @apiBody {string}  newPassword   in json form
 * 
 * @apiSuccess {string}     The id the user will use to reset his
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Password has been reset successfully""
 *     }
 *     
 * @apiError EmailCannotBeSent  A problem while sending email
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 server Error
 *     {
 *       "Reset Failed""
 *     }  
 */








app.put('/users/reset/:token',async (req,res)=>{

    var newPassword=req.body.newPassword;
    console.log(newPassword)
    console.log("helloooooo");
    var token=req.params.token;

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(newPassword, salt);
   console.log(hashedPass);
    await User.checkTokenAndFind(token).then((user)=>{

       user.password=hashedPass;
       user.resetToken=undefined;
       user.save();

       res.send("Password has been reset successfully");
       
        console.log(user);
    }).catch((e)=> {res.status(500).send('Reset Failed');})
    
    });





app.put('/users/changePassword',async (req,res)=>{
    var oldPassword=req.body.oldPassword;
    var newPassword=req.body.newPassword;
    var token=req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user){
           return Promise.reject();
        }
        console.log("you are my user");
        bcrypt.compare(oldPassword, user.password, async (err, res2) => {
            if(res2) {
                console.log('Your password mached with database hash password');
                console.log('lets change password');
                    const salt = await bcrypt.genSalt();
                    const hashedPass = await bcrypt.hash(newPassword, salt);
                    console.log(hashedPass);
                    user.password=hashedPass;
                    user.save();

                    res.status(200).send("Password has been reset successfully");
                         
            } else {
                console.log('Your password not mached.');
                res.status(403).send("this is not the correct password");

            }
        });       
    }).catch((e) => {
        res.status(401).send(e);
    });
    });

   
  

app.listen(3000,()=>{console.log('started on port 3000')});

             
              
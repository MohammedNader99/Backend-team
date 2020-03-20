var{mongoose}= require("./../db/mongoose.js");  
var{artist}= require("./../models/Artists.js");  //artists model



//library imports
const express= require('express');
const {ObjectID}=require("mongodb");  // if the id is autogenerated we have to use the ObjectID as it is not a string it is an objectid
var bodyParser= require('body-parser');
var{User}= require("./../models/users.js"); // users model
///////////
var app=express();
//configures the middlewear
app.use(bodyParser.json());

//get request to get the array of genres of the artist whom i passed his id
//and return array of artist objects who play the same genre

//the id is to be sent after artists/"your id" 
app.get('/artists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }

    var sentId=req.body.artistId; 
    if(!sentId){
        return res.status(400).send("Send the artist ID");
    }
    if(!ObjectID.isValid(sentId)){
        return res.status(404).send("Invalid Id");  
    }
    artist.findById(sentId).then((myartists)=>{ 
        if(!myartists){
            return res.status(404).send('Id not found');
        }
        artist.find({genres:{$in:myartists.genres}}).then((suggestedArtists)=>{    
        for(var count=0;count<suggestedArtists.length;count++)
        {
            if(suggestedArtists[count]._id==sentId){
                var switchvar=suggestedArtists[count];   
                suggestedArtists[count]=suggestedArtists[(suggestedArtists.length)-1];
                suggestedArtists[(suggestedArtists.length)-1]=switchvar;
                suggestedArtists.pop();
                break;
            }
        }
        res.status(302).send(suggestedArtists);
        },(e)=>{
            res.status(400).send(e);
        })

    },(e)=>{
        
        res.status(400).send(e);
    })
  }).catch((e)=>{
    res.status(401).send('Unauthorized Access');
  })   
});  

app.listen(3000,()=>{
    console.log("Started on port 3000 lets");
});



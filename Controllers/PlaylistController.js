const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var {playlist} = require("../models/playlists.js");
var {User} = require("../models/users.js");
var bodyParser= require('body-parser');
var{images}= require("./../models/images.js"); // images model

const {ObjectID}=require('mongodb');

const app=express();

app.use(bodyParser.json());

app.listen(3000,()=>{console.log('started on port 3000');});


//CREATE A NEW PLAYLIST
app.post('/playlists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        if(!req.body.playlistName){
            return res.status(400).send("Playlist must have a name");
        }
        var savedImage;
        if(req.body.image){
            images.findOne({url:req.body.image.url}).then((isImage)=>{
                    if(!isImage){
                            savedImage= new images ({
                            url:req.body.image.url,
                            height:req.body.image.height,
                            width:req.body.image.width,});
                            savedImage.save();
                        }
                        else if(isImage){
                            savedImage=isImage
                        }
                });
            }
            if(!req.body.image){
                //savedImage= image1;  to be uncommented
                // TO BE SET WITH THE DEFAULT IMAGE (IMAGE1) FROM DEMO
                return res.send("no Image");
            }
  
        //PREVENT THE USER FROM HAVING 2 PLAYLISTS WITH THE SAME NAME

        var userId2=user._id;
        playlist.find({$and:[{userId:userId2},{playlistName:req.body.playlistName }]}).then((myduplicate)=>{
            if(myduplicate.length==0){
                var playlistInstance = new playlist({
                    userId:userId2,     
                    playlistName: req.body.playlistName,
                    privacy: req.body.privacy,
                    image:savedImage,
                   // href:playlistInstance.href         // to be uncommented when href is known
                },(e)=>{
                    return res.status(400).send("Coult not create playlist due to missing info");
                });
            
                playlistInstance.save().then((doc)=>{
                    myduplicate=[];
                    res.send(doc);  
                }).catch((e)=>{
                    myduplicate=[];
                    res.status(401).send("Could not Create a new playlist");
                });
                
            }
            else if(myduplicate.length!=0){
                return res.status(400).send("Cannot create 2 playlists with the same name");
            };
        });

    
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});



//Get a User Playlist Request
app.get('/playlists/me',(req,res) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        playlist.find({userId:user._id}).then((playlist) =>
        {
            if(!playlist){
                return Promise.reject();
            }
            res.send({playlist});
        }).catch((e) => {
            res.status(401).send();
        })
    }).catch((e) => {
        res.status(401).send();
    })
})    



//DELETE A PLAYLIST
app.delete('/playlists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
    var userId2=user._id;     // id of the owner of the playlist 
    if(!req.body.playlistName){
        return res.status(400).send("Pass the playlistname to delete");
    }
    var playlistName=req.body.playlistName;
    playlist.findOneAndRemove({$and:[{userId:userId2},{playlistName:playlistName }]}).then((delPlaylist)=>{
        if(!delPlaylist){
            
            return res.status(404).send('No playlist found to delete');
        }
        
        res.status(204).send("Playlist deleted succsesfully");

    }).catch((e)=>{
        res.status(400).send();
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});




//DELETE TRACK FROM A PLAYLIST
app.delete('/playlists/tracks',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
    var userId2=user._id;     // id of the owner of the playlist 
    if(!req.body.playlistName){
        return res.status(400).send("Pass the playlistname that you want to delete a track from");
    }
    if(!req.body.trackId){
        return res.status(400).send("Pass the track id that you want to delete");
    }
    var trackId= req.body.trackId
    if(!ObjectID.isValid(trackId)){
        return res.status(404).send("Invalid Track Id");   
    }

    var playlistName=req.body.playlistName;
    playlist.findOne({$and:[{userId:userId2},{playlistName:playlistName }]}).then((delPlaylist)=>{
        if(!delPlaylist){
            
            return res.status(404).send('Playlist not found');
        }
        
        playlist.findOne({$and:[{tracks:{$eq:trackId}},{playlistName:playlistName }]}).then((delTrack1)=>{
            if(!delTrack1){
                return res.status(400).send("Track is not in the playlist");
            }
            else{
                var tracksarr= delTrack1.tracks;
                for(var count=0 ; count<tracksarr.length;count++){
                    if(tracksarr[count]==trackId){
                        var temptrack=tracksarr[count];
                        for (var count2=count ; count2<tracksarr.length-1 ; count2++){
                            tracksarr[count2]=tracksarr[count2+1]
                        }
                       tracksarr.pop();
                    }
                }
                playlist.findOneAndUpdate({$and:[{userId:userId2},{playlistName:playlistName }]},{ $set: { tracks:tracksarr  } }).then((res)=>{
                    
                    
                });
                res.status(204).send("Track is successfully deleted from playlist");
                
            }

        });

    }).catch((e)=>{
        res.status(400).send();
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});

//GET PLAYLIST COVER IMAGE

app.get('/playlists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            console.log("ddd");
            return Promise.reject();
        }
    var userId2=user._id;
    if(!req.body.playlistName){
        return res.status(400).send("Pass the playlistname to get it's image");
    }
    var pName = req.body.playlistName;
    playlist.findOne({$and:[{userId:userId2},{playlistName:pName}]}).then((fetched)=>{
        if(!fetched){
            return res.status(404).send('Playlist does not exist');
        }
        res.status(302).send(fetched.image);
    }).catch((e)=>{
        res.status(400).send();
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});

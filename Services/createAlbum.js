const express= require('express');
const multer = require("multer");
var upload=require("./uploadAlbum.js").uploadAlbum;
var bodyParser= require('body-parser');
var { mongoose } = require("./../db/mongoose.js"); 
var{artist}= require("./../models/artists.js");  //artists model
var {album} = require("./../models/album.js");
var{track}=require("./../models/track.js");
var{notification}=require("./../models/notifications.js");//notifications model
mongoose.Promise = global.Promise;
const path = require('path');
var app=express();

async function f(artistIdSent,albumname,myfiles) {
    
    var i = 0;var tracksArr = [];
    while(myfiles[i])
    {
        var trackpath = myfiles[i].originalname;
        await track.findOne({trackPath:trackpath}).then((myTrack) =>
        {
            tracksArr.push(new track);
            tracksArr[i]=myTrack;
            //console.log(albumInstance.albumName+" "+i+" "+albumInstance.tracks[i]);
        })
        i++;
        
    }
    var albumInstance = new album({
        artistId:artistIdSent,
        albumName:albumname,
        tracks:tracksArr
    });
    albumInstance.save().then((res)=>{
        console.log(res._id);
    },(err)=>{
        console.log(err);
    });
    //await album.findOne({albumName:"ddddd"}).then((myAlbum) =>{
    //    console.log("Album info" + myAlbum);
    //});
    console.log(albumInstance.albumName+" "+albumInstance.tracks);

}

app.post('/album/newRelease', upload, async (req,res,next) =>
{
    var token = req.header('x-auth');
    const files = req.files;
    await artist.findByToken(token).then((myartist)=>{
    
        if(!req.body.AlbumName){
            return res.status(400).send("Missing albumName");
        }
        if(!req.body.genre){
            return res.status(400).send("Missing genre");
        }
        if(!files)
        {
            const error = new Error ("Please Pass the files");

            error.httpStatusCode = 400;
            return next(error);
        }
        f(myartist._id,req.body.AlbumName,files);

        var notificationInstance = new notification({
            text:myartist.artistName+" released a new Album ("+req.body.AlbumName +")",
            sourceId:myartist._id,
            userType:"artist"
            
        });
        notificationInstance.save();

        res.status(201).send(files); 
    
    }).catch((e) =>
    {
        res.status(401).send();
    })

});

if(!module.parent){
    app.listen(8000,()=>{
        console.log("Started on port 8000 create album");
    });
}

module.exports={app};

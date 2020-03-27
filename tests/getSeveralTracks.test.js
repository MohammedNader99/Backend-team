const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const{app}=require("./../Controllers/TracksController")
//const {track}=require("./../Controllers/TracksController"); //tracks model
const {track}=require("./../models/track")
console.log('mmmmmmmm')


describe('Get /tracks',()=>{


it('should return array of tracks with the given ids',(done)=>{

     track.find().then((tracks)=>{

        var id=[];

          for(var i=0;i<tracks.length;i++)
          {
              id.push(tracks[i]._id.toHexString())
          }
      
        //console.log(id)
        var test=JSON.stringify( tracks)
        request(app)
        .get('/tracks')
        .send({id})
        .expect(200)
        .expect((res)=>{
           expect(JSON.stringify( res.body)).toEqual(test)  
        })
        .end(done)
          })

    })


it ('should return 404 if track was not found',(done)=>{




    track.find().then((tracks)=>{

        var id=[];

          for(var i=0;i<tracks.length;i++)
          {
              id.push(tracks[i]._id.toHexString())
          }
          id.push(new ObjectID())
     request(app)
     .get(`/tracks/${new ObjectID()}`)
     .expect(404)
     .expect((res)=>{
        expect( res.body.message).toBe("Track not found")
     })
     .end(done)
    })
      });




      it ('should return 404 in case of invalid id',(done)=>{

          request(app)
          .get('/tracks')
          .send({id:"1234"})
          .expect(404)
          .expect((res)=>{
            expect( res.body.message).toBe("invalid id")
          })
          .end(done)
           });

           it ('should return 403 in case of more than 50 ids',(done)=>{


            var id=[];

            for(var i=0;i<55;i++)
            {
                id.push(new ObjectID())
            }
            request(app)
            .get('/tracks')
            .send({id})
            .expect(403)
            .expect((res)=>{
               expect( res.body.message).toBe(" Forbidden maximum 50 Ids")
            })
            .end(done)
             });
  

})







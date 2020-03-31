// JavaScript source code
//const expect = require('expect');
const chai = require('chai');
//onst chaiSubset = require('chai-subset');
//chai.use(chaiSubset);
const expect = chai.expect;
//var should = require('chai').should();
const request = require('supertest')
//local imports
const app = require('./../Index');
var { User } = require("../Services/UserServices");
var { artist } = require("../Services/ArtistServices.js");
var { album } = require("../Services/AlbumServices");
var { track } = require("../Services/TrackServices.js");
var albumservices = require("../Services/AlbumServices");
var artistservices = require("../Services/ArtistServices");
var userservices = require("../Services/UserServices");
var { playlist } = require("../models/playlists.js");

var _ = require('lodash');
const defaultModule = require("./../defaultimage");




describe('search /Search', () => {

    it('return album when the user searches for',  (done) => {
        album.find().then((albums) => {
            var testalbum = albums[albums.length - 1];
            artistservices.GetArtistById(testalbum.artistId.toString()).then((name) => {
                request(app)
                    .get(`/Search`)
                    .query('word', testalbum.albumName)
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.Albums.map(function (value) { return value._id })).to.include(testalbum._id.toString());
                        expect(res.body.Albums.map(function (value) { return value.artistName })).to.include(name);

                    })
                    .end(done)
            });
        })
    });
    it('return user when the user searches for', (done) => {
        User.find().then((users) => {
            var testuser = users[users.length - 1];

            request(app)
                .get(`/Search`)
                .query('word', testuser.userName)
                .expect(200)
                .expect((res) => {
                    expect(res.body.Users.map(function (value) { return value._id })).to.include(testuser._id.toString());
                })
                .end(done)

        })
    });
    it('return playlist when the user searches for', (done) => {
        playlist.find().then((playlists) => {
            var testplaylist = playlists[playlists.length - 1];
            userservices.GetUserById(testplaylist.userId.toString()).then((name) => {
                console.log(name);
            request(app)
                    .get(`/Search`)
                    .query('word', testplaylist.playlistName)
                    .expect(200)
                .expect((res) => {


                        expect(res.body.Playlists.map(function (value) { return value._id })).to.include(testplaylist._id.toString());

                       expect(res.body.Playlists.map(function (value) { return value.userName })).to.include(name);
                        // end(done);

                    })
                .end(done)
                })
                

        })
    });
    it('return tracks when the user searches for', (done) => {
        track.find().then((tracks) => {
            var testtrack = tracks[tracks.length - 1];
            artistservices.GetArtistById(testtrack.artistId.toString()).then((name)=> {
                request(app)
                .get(`/Search`)
                .query('word', testtrack.teackName)
                .expect(200)
                .expect((res) => {
                    console.log(testtrack);
                    //console.log(res.body.Tracks.map(function (value) { return value._id }));
                    expect(res.body.Tracks.map(function (value) { return value._id })).to.include(testtrack._id.toString());
                    expect(res.body.Tracks.map(function (value) { return value.artistName })).to.include(name);
                })
                .end(done)
        })
        })
        })
    it('return artists when the user searches for', (done) => {

        artist.find().then((artists) => {
                var testartist = artists[artists.length - 1];
                var testalbum = new album({
                artistId: testartist._id,
                albumName: "fortesting",
                tracks: [],
                image: defaultModule.defaultImage._doc

                });
            var testtrack = new track({
                artistId: testartist._id,
                trackName: "searchtesting",
                rating: 10,
                duration: 360000,
                genre: "pop",
                image: defaultModule.defaultImage._doc,
                url: "searchtesting"  // until we get real urls 
            });
            testtrack.save().then((res2) => {

                testalbum.save().then((res1) => {

                    request(app)
                        .get(`/Search`)
                        .query('word', testartist.artistName)
                        .expect(200)
                        .expect((res) => {
                            //console.log(res.body.Tracks.map(function (value) { return value._id }));
                            expect(res.body.Artists.map(function (value) { return value._id })).to.include(testartist._id.toString());
                            expect(res.body.Albums.map(function (value) { return value._id })).to.include(testalbum._id.toString());
                            expect(res.body.Tracks.map(function (value) { return value._id })).to.include(testtrack._id.toString());

                            //album.findOneAndRemove({ _id: testalbum._id });

                            //end(done)




                            //
                            //
                        })
                        .end((err, res) => {
                            if (err) {
                                done(err)
                            }
                            album.findOneAndRemove({ _id: testalbum._id }, function (err) {
                                if (!err) {
                                    track.findOneAndRemove({ _id: testtrack._id }, function (err) {
                                        done();
                                    });

                                }
                                else {
                                    done(err);
                                }
                            });
                        })
                }, (err) => {

                    done(err);
                });
                console.log(res._id);
            }, (err) => {
                done(err);
            });
        }, (err) => {
            done(err);
        });        
                   // console.log(res._id);


            })
        });
 
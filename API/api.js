/////////////////////////// Ahmed /////////////////////////////////////////
/**
 * AddTrack
 * ---------------------
 *
 * @api {post} /tracks               Add Track
 * @apiName AddTrack
 * @apiGroup Tracks
 *
 * @apiHeader {string} Authorization    Only an Artist who has a verified account can add a track
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {String}      name              Track name. (Obligatory)
 * @apiParam {string}      URL               the track URL  (Obligatory)
 * @apiParam {int}         Duration          Duration of the track in ms  (Obligatory)
 * @apiParam {object[]}    image object      the cover image of the track (Obligatory)
 * @apiParam {String}      genre              each track has only 1 genre. (Obligatory)
 *
 * @apiSuccess 201                      [The response of the sucess case is the created track object]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 201 OK
 *    {
 *         "_id" : ObjectId("5e7511fa1a2c59902efa5539"),
 *         "artistId" : "5e7511fa1a2c59902efa552d",
 *         "trackName" : "Godzilla",
 *          "duration" : 223000,
 *          "image" : {
 *             "url" : "www.images/imag23e/23454",
 *             "height" : 176,
 *             "width" : 65,
 *             "_id" : ObjectId("5e7511fa1a2c59902efa5528")
 *          },
 *         "url" : "vvv",
 *         "genre" :"Trap"
 *         "rating" : 9,
 *         "__v" : 0
 *
 *    }
 *
 *
 *
 * @apiError  401                      [Cannot upload the track without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  400                     [Cannot upload the track without track name]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Track name is required"
 *     }
 *
 * @apiError  400                     [Cannot upload the track without an image for the track]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Track image is required"
 *     }
 *
 * @apiError  400                     [Cannot upload the track without the track url]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Track url is required"
 *     }
 *
 * @apiError  400                     [Cannot upload the track without the track duration]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Track duration is required"
 *     }
 *
 * @apiError  400                     [Cannot upload the track with any missing information from the image object(image url,image height, image width)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Image Info of track has to be provided"
 *     }
 *
 * @apiError  409                    [url of an aleardy created track is passed.Cannot create 2 tracks with the same url ]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 409 No access
 *     {
 *       "error": "This track is already created"
 *     }
 *
 * @apiError  409                    [The artist is trying to add a new track with the same name of one of his tracks (the same artist cannot have 2 tracks with the same exact name)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 409 No access
 *     {
 *       "error": "Cannot create 2 Tracks with the same name (trackName) for the same artist"
 *     }
 *
 * @apiError  500                  [wehter there is a problem in creating or saving the track (unlikely to happen)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not add track (trackName)"
 *     }
 */



 /**
 * DeleteTrack
 * ---------------------
 *
 * @api {delete} /tracks             Delete Track
 * @apiName DeleteTrack
 * @apiGroup Tracks
 *
 * @apiHeader {string} Authorization    Only an Artist who has a verified account can delete his tracks
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}    trackName           the name of the track that the artist wants to delete(an artist cannot have 2 tracks with the same name)
 *
 * @apiSuccess 200                     [the track has been deleted successfully]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *    {
 *      "Track (trackName) was deleted successfully"
 *    }
 *
 * @apiError  400                      [Cannot delete without the track name]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the track name to delete"
 *     }
 *
 * @apiError  404                     [the artist is not the owner of this track or track does not exist]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Track not found to be deleted"
 *     }
 *
 * @apiError  401                      [Cannot delete the track without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  500                     [Cannot delete the track due to internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not delete track "
 *     }
 *
 *
 */




//DELETE TRACK FROM PLAYLIST
/**
 * DeleteTrack from playlist
 * ---------------------
 *
 * @api {delete} /playlists/tracks            Delete Track from playlist
 * @apiName DeleteTrackFromPlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string} Authorization    Only a user  who has a verified account can delete a track from his playlist
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}    playlistName           the name of the playlist he want to delete a track from
 * @apiParam {string}     trackID                the track id he wants to remove from his/her playlist
 *
 * @apiSuccess 200                      [the track has been deleted successfully]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *    {
 *      "Track is successfully deleted from playlist"
 *    }
 *
 * @apiError  400                      [playlist name must be passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the playlistname that you want to delete a track from"
 *     }
 *
 * @apiError  400                      [trackId must be passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the trackId that you want to delete"
 *     }
 *
 * @apiError  404                      [the passed track id is not a valid track]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Invalid Track Id"
 *     }
 *
 * @apiError  404                      [the passed playlist name doesnot belong to this user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Playlist not found"
 *     }
 *
 * @apiError  400                     [the passed track is not in the playlist]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Track is not in the playlist"
 *     }
 *
 * @apiError  401                      [Cannot delete the track without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  500                     [Cannot delete the track due to internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not remove the track from the playlist"
 *     }
 *
 */


 //DELETE PLAYLIST
/**
 * Delete playlist
 * ---------------------
 *
 * @api {delete} /playlists            Delete playlist
 * @apiName DeletePlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string} Authorization    Only a user  who has a verified account can delete his/her playlist
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}    playlistName           the name of the playlist he want to delete a track from
 *
 * @apiSuccess 200                      [the playlist has been deleted successfully]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *    {
 *      "Playlist deleted succsesfully"
 *    }
 *
 * @apiError  400                      [playlist name must be passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the playlistname that you want to delete"
 *     }
 *
 * @apiError  404                      [the passed playlist name doesnot belong to this user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "No playlist found to delete"
 *     }
 *
 * @apiError  401                      [Cannot delete the playlist without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  500                     [Cannot delete the playlist due to internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not delete playlist"
 *     }
 *
 */

 //CREATE PLAYLIST
/**
 * Create Playlist
 * ---------------------
 *
 * @api {post} /playlists               Create a new playlist
 * @apiName CreatePlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string} Authorization    Only an User who has a verified account can create a playlist
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 * @apiParam {string}      playlistName      Playlist name. (Obligatory)
 * @apiParam {Boolean}     privacy           if the playlist is public or private (OPTIONAL default value is false)
 *
 * @apiSuccess 201                      [The response of the sucess case is the created playlist object]
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 201 OK
 *    {
 *         "_id" : ObjectId("5e7511fa1a2c59902efa5544"),
 *         "userId" : "5e7511fa1a2c59902efa552a",
 *         "playlistName" : "RecyleBin",
 *         "image" : image object
 *         "tracks" : [],
 *        "privacy" : false,
 *         "__v" : 0
 *
 *    }
 *
 *
 *
 * @apiError  401                      [Cannot create playlist without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 * @apiError  400                     [user cannot have 2 playlists with the same name]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Cannot create 2 playlists with the same name"
 *     }
 *
 * @apiError  500                  [wether there is a problem in creating or saving the playlist (unlikely to happen)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not create playlist"
 *     }
 *
 *
 * @apiError  400                     [playlist name is missing (Obligatory filed)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Coult not create playlist due to missing info"
 *     }
 *
 *
 *  */



/**
 * Get cover image of a playlist
 * -------------------------------------
 * @api {get} /playlists/images     Get a playlist cover image
 * @apiName GetPlaylistCoverImage
 * @apiGroup Playlists
 *
 * @apiHeader {string} Authorization    Only an User who has a verified account can get the image of a playlist
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 *
* @apiParam {string} playlistName       Name of the playlist he wants to get its cover image
 *
 * @apiSuccess 302                     [The response of the sucess case is the url to the image file]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 *     {
              .real Server Url will  be here/Pictures/default.png
 *     }
 *
 * @apiError  400                     [playlist name is missing (Obligatory filed)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Pass the playlistname to get it's image"
 *     }
 *
 * @apiError  404                    [The passed playlist name doesnot belong to the user]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Playlist does not exist"
 *     }
 *
 * @apiError  500                  [internal server error (Unlikely)]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 500 No access
 *     {
 *       "error": "Could not send the image"
 *     }
 *
 * @apiError  401                      [Cannot create playlist without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 *
 *
 *
 *
 *
 *
 */



/**
 * EDIT PROFILE PICTURE OF THE USER
 * -------------------------------------
 * @api {post} /users/profilepicture   Edit profile picture of the user
 * @apiName Edit profile picture of the user
 * @apiGroup Users
 *
 * @apiHeader {string} Authorization    Only an User who has a verified account can edit his/her profile picture
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 *
* @apiParam {object} Image      Image he/she wants to upload to be his/her profile picture (MUST BE AN IMAGE with any extension)
 *
 * @apiSuccess 200                     [The response of the sucess case is a message]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200
 *     {
 *            "Image changed successfully"
 *     }
 *
 * @apiError  400                  [no image file]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Please Upload an image"
 *     }
 *
 * @apiError  400                 [file that is not an image]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": Please Upload an image
 *     }
 *
 * @apiError  401                      [Cannot edit pp without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 *
 *
 *
 */

/**
* EDIT PROFILE PICTURE OF THE ARTIST
* -------------------------------------
* @api {post} /artists/profilepicture   Edit profile picture of the artist
* @apiName Edit profile picture of the artist
* @apiGroup Artists
*
* @apiHeader {string} Authorization    Only an artist who has a verified account can edit his/her profile picture
* @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
*
*
* @apiParam {object} Image      Image he/she wants to upload to be his/her profile picture (MUST BE AN IMAGE with any extension)
*
* @apiSuccess 200                     [The response of the sucess case is a message]
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200
*     {
*            "Image changed successfully"
*     }
*
* @apiError  400                  [no image file]
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 No access
*     {
*       "error": "Please Upload an image"
*     }
*
* @apiError  400                 [file that is not an image]
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 400 No access
*     {
*       "error": Please Upload an image
*     }
*
* @apiError  401                      [Cannot edit pp without auth token]
* @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 401 No access
*     {
*       "error": "Unauthorized Access"
*     }
*
*
*
*/











//GET ARTIST RELATED ARTISTS
 /**
 * Get artist related artists
 * -------------------------------------
 * @api {get} /users/artists/related    Get Artists who sing at least 1 same genre as the passed artist
 * @apiName GetArtistRelatedArtists
 * @apiGroup Users
 *
 * @apiHeader {string} Authorization    Only an User who has a verified account
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format.
 *
 *
* @apiParam {string} artistId       Id of the artist the  user wants to get his/her related artists
 *
 * @apiSuccess 302                     [The response of the sucess case is an array of artists]
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 302
 * {
 *        [
 *   {
 *       "_id": "5e7511fa1a2c59902efa552d",
 *       "password": "5080",
 *       "artistName": "Eminem",
 *       "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer, \n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
 *       "__v": 0,
 *       "isActive": false,
 *       "rating": 4.6,
 *       "genres": [
 *           "Trap",
 *           "Jazz",
 *           "pop",
 *           "Rap"
 *       ]
 *   },
 *   {
 *       "_id": "5e7511fa1a2c59902efa552c",
 *       "email": "beeka70@hotmail.com",
 *       "password": "$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS",
 *       "artistName": "HAmo Beeka",
 *       "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter \n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
 *       "__v": 0,
 *       "isActive": false,
 *       "rating": -1,
 *       "genres": [
 *           "sha3by",
 *           "R&B"
 *       ]
 *   }
 *  ]
 *
 * }
 * @apiError  401                      [Cannot get related artists without auth token]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 No access
 *     {
 *       "error": "Unauthorized Access"
 *     }
 * @apiError  404                      [the artist id is not found in the DB]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Id not found"
 *     }
 * @apiError  404
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 No access
 *     {
 *       "error": "Invalid Id"
 *     }
 * @apiError  400                   [the artist id is not passed]
 * @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 400 No access
 *     {
 *       "error": "Send the artist ID"
 *     }
 */

 ////////////////////////////////Monica/////////////////////////////////////////////////
 /**
 * forgot password
 * ----------------------
 * @api {post} /users/forgot      Request to send email after forgetting password
 * @apiName ForgotPasswordRequest
 * @apiGroup User privacy
 *
 * @apiParam {string} email       in json form
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "abc@abc.com"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message" :"Email Sent Successfully"
 *     }
 *
 * @apiError  500              [Email Cannot BeSent  A problem while sending email]
  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 serverError
 *     {
 *       "message":"Sending Failed"
 *     }
* @apiError  404       [email of the user not found ]
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 not found
 *     {
 *        "message":"Email not found"
 *     }
 */



 /**
 * Reset password
 * ----------------------
 * @api {patch} /users/reset      Request to reset password
 * @apiName ResetRequest
 * @apiGroup User privacy
 *
 * @apiParam {string} token          should be passed in query
 * @apiParam {string}  newPassword    should be passed in body in json form
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "message": "Password has been reset successfully""
 *     }
 *
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *       "message": "Reset Failed""
 *     }
 */


 //REGULAR ACCOUNT
/**
 * @api {patch} /users/:id/regular    User wants to unsubscribe from premium features
 * @apiName WithdrawPremiumServies
 * @apiGroup Users
 * @apiHeader {string} x-auth        the token Only users
 * @apiParam {String} id          the id of the user has to be passed
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Your account has been changed to regular account"
 *     }
 *
 *
 * @apiSuccessExample {json} Error-Response:
 *    HTTP/1.1 200
 *     {
 *       "message":"you are not premium , you already have a regular account "
 *     }
 *
 * @apiError 401            [ authentication failed]
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "message":"authentication Failed" "
 *     }
 *
 */




 //REQUEST FOR A PREMIUM ACCOUNT
/**
 * @api {get} /users/:id/premium    Send a confirmation mail to be a premium user
 * @apiName Join Premium Request
 * @apiGroup Users
 * @apiHeader {string} x-auth            token Only users can request to premium
 *
 * @apiParam {String} id             the id of the user should be passed in the path
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *       "message": "confirmation request has been sent, You will be a premium user soon"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *       "message": "You are already a premium user.Thanks for that"
 *     }
 *
 *
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "message":"authentication Failed" "
 *     }
 *
 * @apiError 500       EmailCannotBeSent  A problem while sending email
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 server Error
 *     {
 *       "message":"error,failed to send"
 *     }
 *
 *
*/


//CONFIRMATION OF A PREMIUM ACCOUNT
/**
 * @api {patch} /users/confirmPremium     User is confirmed to be a premium user
 * @apiName Acceptance of Premium Request
 * @apiGroup Users
 * @apiParam {String} token               the token that was sent in the link snet to the user's email
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
*           "message" : "Email confirmed successfully,Welcome To Premium Life!"
 *
 *
 *
 *     }
 *
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "message":"authentication Failed or invalid token"
 *     }
 *
 *@apiError 404    user not found
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404
 *     {
 *       "message":"not found"
 *     }
 *
 *
 *
 *
 */


 /** GetATrack
* ---------------------
*
* @api {Get} /tracks/:id               Get a Track
* @apiName GetTrack
* @apiGroup Tracks
*
*
* @apiParam {string}    id           the id of the track that the artist wants to delete
*
* @apiSuccess {object}  tracks             object of type track in JSON formatwith status code 200
*
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
*          "tracks": {
        "rating": 10,
        "duration": 360000,
        "_id": "5e6b7dac91cb724878446635",
        "trackName": "Hello",
        "url": "cccc",
        "__v": 0
    }
*      }
*
*
*
* @apiError  404                      [Track not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "Track not found"
*     }
*
* @apiError  404                    [Track not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404
*     {
*       "message": "invalid id"
*     }
*
*
*
*
*/


/**
  * GetSeveralTracks
 * ---------------------
 *
 * @api {Get} /tracks               Get several Track
 * @apiName GetSeveralTracks
 * @apiGroup Tracks
 *
 *
 * @apiParam {string[]}    id          An array of comma separated tracks Ids. Maximum 10 IDs.
 *
 * @apiSuccess {object[]}     tracks          a set objects of type tracks in JSON format with status code 200
 *
 * * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
{
    "tracks": [
        {
            "_id": "5e88ce838d92547020e1a65a",
            "artistId": "5e88ce838d92547020e1a652",
            "trackName": "Godzilla",
            "duration": 223000,
            "genre": "rap",
            "url": "vvv",
            "__v": 0,
            "imagePath": "./Pictures/default.png",
            "likes": 0,
            "rating": 9
        },
        {
            "_id": "5e88ce838d92547020e1a656",
            "artistId": "5e88ce838d92547020e1a650",
            "trackName": "Hello",
            "duration": 360000,
            "genre": "pop",
            "url": "uuu",
            "__v": 0,
            "imagePath": "./Pictures/default.png",
            "likes": 0,
            "rating": 10
        }
    ]
}
 *
 *
 * *@apiError  404                      [Track not found]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *      "message": "can not find track"
 *     }
 *
 * @apiError  404                      [invalid id]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message" : "invalid id"
 *     }
 *
 *  @apiError  403
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 forbidden
 *     {
 *       "message" : "max 50 Ids"
 *     }
 *
 *
 *
 */


/**
* AddTracksToAPlaylist
 * ---------------------
 *
 * @api {post} /tracks/:playlistId/playlists               Add tracks to a playlist
 * @apiName AddTracksToAPlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string}  x-auth
 *
 *@apiParam {string}  playlistId
 *
 * @apiParam {string[]}   url            a list of Urls to be passed in the body parameters
 * @apiSuccess 200                      [tracks has been successfully added to playlist]
 *   @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *
 *       "message": "tracks added successfully"
 *     }
 *
 *
 * *@apiError  403                      [Forbidden because you crossed the limiting number of tracks in a playlist which is 10]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message":  "Forbidden because you crossed the limiting number of tracks in a playlist which is 1000"
 *     }
 *
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "message":  "authentication failed"
 *     }
 *
 *
 *
 *
 * @apiError 404     [playlist or tracks not found]
*@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404
 *     {
 *        "message":  "playlist not found"
 *     }
 *
 * 
 * 
*@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404
 *     {
 *        "message":  "tracks not found"
 *     }
 *
 */




/** 
* @api {get} /artists Get several Artists
 * @apiName GetSeveralArtists
 * @apiGroup Artists
 *
 * @apiHeader {string}  x-auth          Authorization Required. A valid access token.
 * 
 * @apiParam {string[]}   id               ids array of each Artist's unique ID.
 *
 * @apiSuccess {object[]} artists           An array of Artist objects containing the full details of each  Artist.
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "artists": [
        {
            "artistName": "Adele",
            "genres": [
                "pop",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": 4
        },
        {
            "artistName": "HAmo Beeka",
            "genres": [
                "sha3by",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": -1
        },
        {
            "artistName": "Eminem",
            "genres": [
                "Trap",
                "Jazz",
                "pop",
                "Rap"
            ],
            "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,\n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
            "rating": 4.6
        }
    ]
}
 * @apiError 401                 [Authentication failed,The token sent didn't belong to any user]
 *
 * @apiErrorExample {json} AuthError-Response:
 *     HTTP/1.1 401  Authentication Failure
 *     {
 *        "message":"authentication failed"
 *     }
 *
 * 
 * @apiError 400  [exceeded 50 ids]
 *
 * @apiErrorExample {json}      BadRequest-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message":"maximum 50 ids"
 *     }
 *
 * 
 * 
 *     @apiError  403  [invalid id]
 *
 * @apiErrorExample {json}       forbidden-Response:
 *     HTTP/1.1 403 forbidden
 *     {
 *       "message":"invalid id"
 *     }
 *
 * @apiError 404     [artist not found]
*@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404
 *     {
 *        "message":  "artist not found"
 *     }
 * 
 * 
 * 
 *
 */




 ///////////////////////Aya Magdy/////////////////////////////

 //Sign up user
 /**
 * @api {post} api/users/signup   Create a new user
 * @apiName SignUp Request for Users
 * @apiGroup Users
 *
 * @apiParam {String} userName      Unique name of the user
 * @apiParam {String} email         email of the user
 * @apiParam {String} password      password of the user
 * @apiParam  {Boolean} isPremium   default is false
 * @apiParam  {Boolean} isActive    default is false until the email is confirmed
 * @apiParam  {Date} birthDate      birthdate of the user
 * @apiParam  {Srting} gender       gender of the user-Limited to 'M' or 'F'
 *
 * @apiSuccess  (200) User added Successfully as inActive. Waiting for Email Confirmation
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "User added Successfully as inActive. Waiting for Email Confirmation "
 *     }
 * @apiError (409)  Conflict. the user already exists: duplicate userName or email
 * @apiError (500) Internal Server Error
 * @apiErrorExample {string} Conflict Error-Response:
 *    HTTP/1.1 409
 *       "UserName and/or Email already exists "
 *
 */




//CONFIRMATION OF USER SIGNUP
/**
 * @api {get} api/users/confirm/:code      SignUp Confrimation
 * @apiName SignUp Confirmed for user
 * @apiGroup Users
 *
 * @apiParam {String} code    user-specific code to activate his account
 *
 * @apiSuccess  (200) User was activated successfully
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Email confirmed successfully!"
 *     }
 * @apiError (404)  User not found.
 * @apiError (401) Unauthorized. Recieved a corrupted code.
 *
 */



 //SIGNUP FOR THE ARTISTS
 /**
 * @api {post} api/artists/signup             Create a new artist
 * @apiName SignUp Request for artists
 * @apiGroup Artists
 *
 * @apiParam {String} artistName    Unique name of the artist
 * @apiParam {String} email         email of the artist
 * @apiParam {String} password      password of the artist
 * @apiParam  {Srting} about        A minimum of 100 characters that describe the artist
 *
 * @apiSuccess  (200) Artist added Successfully as inActive. Waiting for Email Confirmation
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "Artist added Successfully as inActive. Waiting for Email Confirmation "
 *     }
 * @apiError (409)  Conflict. the Artist already exists: duplicate artistName or email
 * @apiError (500) Internal Server Error
 * @apiErrorExample {string} Conflict Error-Response:
 *       "artistName and/or Email already exists "
 */



 //CONFIRMATION OF ARTIST SIGNUP
/**
 * @api {get} api/artists/confirm/:code      SignUp Confrimation
 * @apiName SignUp Confirmed for artists
 * @apiGroup Artists
 *
 * @apiParam {String} code    artist-specific code to activate his account
 *
 * @apiSuccess  (200) artist was activated successfully
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Email confirmed successfully!"
 *     }
 * @apiError (404)  artist not found.
 * @apiError (401) Unauthorized. Recieved a corrupted code.
 *
 */



 //edit user profile
 /**
  * @api {patch} /api/users/me/editprofile edit current user's profile
  * @apiName Edit Current User's Profile
  * @apiGroup Users
  *
  * @apiHeader (Header Fields) {string} Authorization Required. A valid access token.
  *
  * @apiParam (Body Parameters) {string} userName the name visible to othe users.
  * @apiParam (Body Parameters) {string} birthDate user's birthdate.
  * @apiParam (Body Parameters) {string} gender user's gender 'M' or 'F'.
  *
  * @apiSuccessExample {JSON} Success-Response:
  *     HTTP/1.1 200 OK
  *
  * @apiError (401) Authentication failed.
  * @apiError (404) user not found.
  * @apiError (400) Bad request. invalid body parameters such as birthDate or gender.
  * @apiError (403) Conflict. userName already exists
  *
  * @apiErrorExample {string} AuthError-Response:
  *     HTTP/1.1 401 Access denied
  *     {
  *       "error": "Authentication failed or invalied token."
  *     }
  *     
  */


////////////////////////Aya Mahmoud //////////////////////

/**
* Login by user
 * ---------------------
 *
 * @api {post} api/users/login               login for user
 * @apiName User login
 * @apiGroup Users
 *
 *
 *@apiParam {string}  email
 *
 * @apiParam {string} password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "ayamahmoudabdelfatah99@gmail.com",
 *       "password":"1234"
 *     }
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user]
 *
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Either email or passwrod is incorrect"
 *     }
 *
 *
 * @apiError  403  Forbidden                [User is not activated]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "Please go to your inbox and click the link to activate your Email."
 *     }
 *
 *
 *
 */


/**
* Login by Artist
 * ---------------------
 *
 * @api {post} api/users/login               login for artist
 * @apiName Artist login
 * @apiGroup Artists
 *
 *
 *@apiParam {string}  email
 *
 * @apiParam {string} password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "ayamahmoudabdelfatah99@gmail.com",
 *       "password":"1234"
 *     }
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user]
 *
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Either email or passwrod is incorrect"
 *     }
 *
 *
 * @apiError  403  Forbidden                [User is not activated]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "Please go to your inbox and click the link to activate your Email."
 *     }
 *
 *
 *
 */



/** Get artist
* ---------------------
*
* @api {Get} api/Artists/:id              Get artist
* @apiName Get Artist
* @apiGroup Artists
*
*
* @apiParam {string}    id           the id of the artist needed to be retrived
*
* @apiSuccess {object}               object of type artist in JSON formatwith status code 200
*
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK{
*      
*{
*    "_id" : ObjectId("5e8902475501bd142cbeff13"),
*    "email" : "be12@hotmail.com",
*    "password" : "$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS",
*    "artistName" : "Billie Eilish",
*    "about" : "Billie Eilish is an American singer-songwriter who first shot to prominence when she uploaded her breakout hit \n    \"Ocean Eyes\" to SoundCloud in 2015. ... She worked with her brother, Finneas O'Connell, to record \"Ocean Eyes,\"\n     a song O'Connell had initially written for his band",
*    "gender" : "M",
*    "birthDate" : ISODate("2001-12-18T00:00:00.000Z"),
*    "imagePath" : "./Pictures/Billie-Eilish.png",
*    "isActive" : false,
*    "rating" : -1,
*    "genres" : [
*        "sha3by",
*        "R&B"
*    ],
*    "__v" : 0
*}
*    
*      }
*
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "Token is not valid"
 *     }
 *
*
* @apiError  404                      [id is invalid]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "invalid id"
*     }
*
* @apiError  404                    [Artist not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404
*     {
*       "can not find artist"
*     }
*
* @apiError  400 Bad Request                    [Error while executing request]
 */


/** Search
* ---------------------
*
* @api {Get} api/Search             Search about a word
* @apiName Search
* @apiGroup Search
*
*
* @apiParam {string}    word         word to search about
* @apiHeader {string}  x-auth       token for frontend to send the response
* @apiSuccess {object}               object containing five simplified arrays artists albums tracks profiles and playlists
*
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
*{
*    "artists": [
*        {
*            "_id": "5e6942b6646c86bc20fc9a92",
*            "artistName": "Adele",
*            "imagePath" : "./Pictures/default.png",
*        }
*    ],
*    "Albums": [
*        {
*           "_id": "5e7a8bb2a986d07c0c22277d",
*            "albumName": "25",
*            "imagePath" : "./Pictures/default.png",
*            "artistName": "Adele",
*            "artistId": "5e6942b6646c86bc20fc9a92"
*        }
*    ],
*    "Tracks": [
*        {
*            "_id": "5e7e626d4849be7c17be3552",
*            "trackName": "Hello",
*            "imagePath" : "./Pictures/default.png",
*            "artistId": "5e6942b6646c86bc20fc9a92"
*        }
*    ],
*        "Playlists": "Playlists": [
*        {
*            "_id": "5e6942b6646c86bc20fc9a89",
*            "playlistName": "Dejavu",
*            "imagePath" : "./Pictures/default.png",
*            "userName": "hamadaaa",
*            "userId": "5e6d547b639f2ca419a1c08d"
*        }
*],
*                    ,
*   "Users": [{
*                    "_id": "5e6d547b639f2ca419a1c08d",
*            "userName": "hamadaaa",
*            "imagePath" : "./Pictures/default.png",
 *        }]
*      }
 *
 *
 *
 * @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
*
 *
 *
 * }
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401
 *     {
 *       "Token is not valid"
 *     }
 *
*
* @apiError  400 Bad Request                    [Error while executing request]
 */




/**
* Delete album
 * ---------------------
 *
 * @api {post} api/album/:id/delete              delete album
 * @apiName  Delete album
 * @apiGroup Album
 *
 *
 *@apiParam {string}  id
 *
* @apiHeader {string}  x-auth       token to delete album
*
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user]
 * @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
 *      "deleted"
 *      }
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Token is not valid"
 *     }
 *
 *
 * @apiError  403  Forbidden                [this album is not the artist's album]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "NotAuthorized"
 *     }
 *
 *
 *
  * @apiError  404  Not found                [this album is not found or the id is not an object id]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found 
 *     {
 *        "Notfound"
 *     }
 *
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "invalid id"
 *     }
 *
 */


////////////////// Ranime Hossam //////////////////
/**
* Like album
 * ---------------------
 * 
 * @api {post} api/album//like/:id              like album
 * @apiName  Like album
 * @apiGroup Album
 *   
 *  
 *@apiParam {string}  id
 * 
* @apiHeader {string}  x-auth       user token to like album
*
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user] 
 * 
 * @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
* 
 *}
*
*
 * @apiError 401   Unauthorized          [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is not valid"
 *     }
 *
 *
 * @apiError 401   Unauthorized          [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401  Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 *
 *
 *  @apiError  403  Forbidden                [Repeating the request more than once for the same user and the same album]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "You have already liked that album"
 *     }
 *
 * 
 * 
 *  @apiError  404  Not found                [this album is not found]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "No album found"
 *     }
 * 
 * 
 * @apiError  404  Not found                [this is not an ID]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "Invalid id"
 *     }
 * 
 */
/**
* Like track
 * ---------------------
 * 
 * @api {post} api/track/like/:id              like track
 * @apiName  Like track
 * @apiGroup Track
 *   
 *  
 *@apiParam {string}  id
 * 
* @apiHeader {string}  x-auth       user token to like track
*
 *@apiHeader (Response Header) {String} x-auth [token given for the logging in user] 
 * 
 * @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
* 
 *}
*
*
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Token is not valid"
 *     }
 *
 *
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401
 *     {
 *        "Token is Empty"
 *     }
 *
 *
 * @apiError  403  Forbidden                [Repeating the request more than once for the same user and the same album]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "You have already liked that track"
 *     }
 *
 * 
 * 
  * @apiError  404  Not found                [this album is not found]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "No album found"
 *     }
 * 
 * 
 *  * @apiError  404  Not found                [this is not an ID]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not found
 *     {
 *        "Invalid id"
 *     }
 * 
 */


 /**
 * change password
 * ---------------
 * @api {put} /api/changepassword Change password
 * @apiName change password
 * @apiGroup User privacy
 *
 * @apiHeader {string}  x-auth    
 * 
 * @apiParam {string} oldPassword
 * @apiParam {string} newPassword
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "Password has been changed successfully"
 *     }
 *     
 * * @apiError  403  Forbidden                [Password is incorrect]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403  Forbidden 
 *     {
 *        "Password is incorrect"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized
 *     {
 *        "Token is Empty"
 *     }
 * 
 * @apiError 401   Unauthorized               [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401   Unauthorized 
 *     {
 *        "User does not have access or does not exist"
 *     }
 * 
 * 
 * 
 */
 



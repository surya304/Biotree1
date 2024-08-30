let User = require('../models/user')
let UserShortURL = require('../models/user_shorturl')
let UserSocialMedia = require('../models/user_socialmedia')
let UserTracking = require('../models/user_tracking')
let Tracking = require('../models/tracking')
let dataTracking = require('../models/datatracking')
let UserLink = require('../models/user_link')
let ShortURL = require('../models/shorturl')
let Client = require('../models/client')
let SocialMedia = require('../models/socialmedia')
let express = require('express')
let router = express.Router()
let randomize = require('randomatic')
let moment = require('moment')
let async = require('async')



/// ////////////////////////////////////////////////
// FIXME GET create short url
router.get('/404', function(req, res) {
    res.render('404', {})


})


router.get('/create-shorturl/', requireLogin, function(req, res) {

  


            let shortcode = randomize('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 5)


            UserShortURL.find({
                shorturl: shortcode
            }, function(err1, data) {
                if (err1) {
                    console.log(err1)
                        // Restart
                    res.redirect('/create-shorturl')
                } else {
                    if (data.length > 0) // Shorturl exists
                    {
                        // Restart
                        res.redirect('/create-shorturl')
                    } else {
                        SocialMedia.find({
                            is_del: false
                        }, function(err2, socialmediaList) {
                            if (err2) {
                                console.log(url + '\n Error is - ' + err2)
                                res.status(501).send({
                                    error: 'SocialMedia does not exist',
                                    data: null,
                                    message: 'SocialMedia does not exist'
                                })
                                res.end()
                            } else {
                                console.log(socialmediaList,"socialmediaList");

                              if(socialmediaList.length > 0){

                                
                                
                              }else{
                                 socialmediaList =[{
                                    'name': 'Facebook',
                                    'id': '5c4ed70d4de05538b08c5ee6',
                                    'icon': 'fa fa-facebook fa-2x'
                                }, {
                                    'name': 'instagram',
                                    'id': '5c4ed70d4de05538b08c5ee7',
                                    'icon': 'fa fa-instagram fa-2x'
                                }];


                                if (socialmediaList == undefined || socialmediaList == null) // SocialMedia do not exist
                                {
                                    res.redirect('/dashboard')
                                } else // SocialMedia List
                                {
                                    //



                                    res.render('create-shorturl', {

                                        'socialmediaList': socialmediaList,
                                        'shortcode': shortcode,
                                        'from': 'createbio',
                                        'clientimage': '/userui/180.png',
                                        'backgroundcolor': 'purewhite',
                                        'border': 'false',
                                        'name': 'Enter your name here',
                                        'bio': 'Enter your bio here',
                                        'sociallists': [{
                                            'name': 'Facebook',
                                            'id': '5c4ed70d4de05538b08c5ee6',
                                            'icon': 'fa fa-facebook fa-2x'
                                        }, {
                                            'name': 'instagram',
                                            'id': '5c4ed70d4de05538b08c5ee7',
                                            'icon': 'fa fa-instagram fa-2x'
                                        }],
                                        'links': [{
                                            'link': 'something1.com',
                                            'title': 'title1'
                                        }, {
                                            'link': 'something2.com',
                                            'title': 'title2'
                                        }]

                                    })
                                }
                              }


                             
                            }
                        })
                    }
                }
            })


    })
    /// ///////////////////////////////////////////////////////////////
router.post('/create-instabio', requireLogin, function(req, res) {
    let client = req.body.client
    let shortcode = req.body.shortcode
    let type = req.body.type
    let socialmedia = req.body.socialmedia;
    console.log(socialmedia, "socialmedia");

    let links = req.body.links
    let title = req.body.title
    let bio = req.body.bio
    let img = req.body.img
    let dashimg = req.body.dashimg
    let bg_color = req.body.bg_color
    let rounded_border = req.body.rounded_border
    let trackingList = req.body.trackingList;

    let clicks = req.body.clicks

    let instaObj = new UserShortURL({

        user: req.session.user._id,
        shortcode: shortcode,
        type: type,
        socialmedia: socialmedia,
        links: links,
        title: title,
        bio: bio,
        clicks: clicks,
        img: img,
        dashimg: dashimg,
        bg_color: bg_color,
        rounded_border: rounded_border,
        tracking: trackingList,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()

    })


    instaObj.save(function(err, result) {
        if (err) {
            console.log('Insta Bio Creation Failed' + err)
            res.status(501).send({
                error: 'Insta Bio Creation Failed',
                data: null,
                message: 'Oops! Please try again'
            })
            res.end()
        } else {
            console.log('Insta Bio Created')
            let client_id = result._id

            res.status(200).send({
                data: 'Insta Bio Added Successfully'
            })
            res.end()
        }
    })
})


router.post('/getclientcount', requireLogin, function(req, res) {
        // console.log("motherfucker");
        let userid = req.session.user._id
        Client.find({
            is_del: false,
            user: userid
        }).populate('client').exec(function(err, clientsList) {
            if (err) {
                console.log(url + '\n Error is - ' + err)
                res.status(501).send({
                    error: 'Client Search Error',
                    data: null,
                    message: 'Oops! Please try again'
                })
                res.end()
            } else {
                let count = clientsList.length
                let newClientsList = [];
                console.log(count);

                if (count == 0) {
                    res.status(200).send({
                        data: 'Client Added Successfully',
                        id: count
                    })
                } else {
                    res.status(200).send({
                        data: 'Client Added Successfully',
                        id: clientsList[0]._id
                    })

                }

                res.end();

            }
        })
    })
    // FIXME Dashboard

router.get('/dashboard', requireLogin, function(req, res) {
    let userid = req.session.user._id;

    // Client.find({
    //     is_del: false,
    //     user: userid
    // }).populate('client').exec(function(err, clientsList) {
    //     if (err) {
    //         console.log(url + '\n Error is - ' + err)
    //         res.status(501).send({
    //             error: 'Client Search Error',
    //             data: null,
    //             message: 'Oops! Please try again'
    //         })
    //         res.end()
    //     } else {
    //         let count = clientsList.length
    //         let newClientsList = [];
    //         console.log(count);
    //         if (count > 0) {
    //             res.redirect('/dashboard/' + clientsList[0]._id);
    //         } else {
    //             res.redirect('/steps');

    //         }
    //     }
    // })





    Tracking.find({
        is_del: false
    }, function(errTracking, trackingResult) {
        UserShortURL.find({
            is_del: false,
            user: userid
        }, function(errShorturl, shorturlsList) {
            // console.log(trackingResult, "trackingResult");
            // console.log(shorturlsList, "shorturlsList");
            // ///////////////////////

            res.render('dashboard', {
                moment: moment,
                trackingList: trackingResult,
                shorturlsList: shorturlsList,
            })



            // ///////////////////////



        })
    })



})


// //////////////////////////
router.post('/savesocialorlink', function(req, res) {
    let type = req.body.type;
    let id = req.body.id;
    let recordid = req.body.recordid;
    console.log(id, "id");
    console.log(recordid, "recordid");




    UserShortURL.findById(recordid).exec(function(err1, result) {
        let updateClicks1 = "";

        if (type === "social") {

            let hat = result.socialmedia;
        } else {
            let hat = result.links;

        }

        console.log(hat, "hadsskldnlkandknskland");

        if (err1) {
            console.log(' Branch Update failed', err1);

        } else {

            // /////////////////////

            async.each(hat, function(entry, callback) {

                    let upDateusername = "";
                    if (entry.id == id) {
                        console.log(entry, "entry");
                        let resultcount = entry.clicks;
                        updateClicks1 = (Number(resultcount)) + 1;



                    }


                    callback();
                },
                function(err) {
                    console.log(updateClicks1, "updateClicks");
                    if (type === "social") {
                        UserShortURL.update({ "_id": recordid, "socialmedia.id": id }, { "$set": { "socialmedia.$.clicks": updateClicks1 } },
                            function(err, company) {
                                console.log(company)
                            });
                    } else {
                        UserShortURL.update({ "_id": recordid, "links.id": id }, { "$set": { "links.$.clicks": updateClicks1 } },
                            function(err, company) {
                                console.log(company)
                            });

                    }


                    console.log('done');
                });

        }



    });

    ////////////////////////////////////////////
    // UserShortURL.findOne({
    //     'id': id
    // }).exec(function(err41, result41) {


    //     if (result41 == null) {

    //         console.log('Insta Bio Creation Failed' + err)
    //         res.status(501).send({
    //             error: 'Insta Bio Creation Failed',
    //             data: null,
    //             message: 'Oops! Please try again'
    //         })
    //         res.end()

    //     } else {


    //         let clicks = 1;
    //         if (result41) {

    //             let resultcount = result41.clicks;
    //             console.log(resultcount, "resultcount");

    //             result41.clicks = Number(resultcount) + 1;

    //             result41.save(function(err1) {
    //                 if (err1) {
    //                     console.log('update shortcode count in tracking data Error' + err1)
    //                     res.status(501).send({
    //                         error: 'Update Client Failed',
    //                         data: null,
    //                         message: 'Oops! Please try again'
    //                     })
    //                     res.end()
    //                 } else {
    //                     console.log('update shortcode count in tracking data Successfully')
    //                     res.status(200).send({
    //                         data: 'Client Updated Successfully'
    //                     });
    //                     res.end();
    //                 }
    //             })


    //         } else {

    //             res.status(501).send({
    //                 error: 'Insta Bio Creation Failed',
    //                 data: null,
    //                 message: 'Oops! Please try again'
    //             })
    //             res.end();

    //         }

    //     }


    // });


});


router.post('/savetrackingclicks', function(req, res) {
    let shortcode = req.body.shortcode;

    // ///////////////////////////////

    UserShortURL.findOne({
        'shortcode': shortcode
    }).exec(function(err41, result41) {


        if (result41 == null) {

            console.log('Insta Bio Creation Failed' + err)
            res.status(501).send({
                error: 'Insta Bio Creation Failed',
                data: null,
                message: 'Oops! Please try again'
            })
            res.end()

        } else {


            let clicks = 1;
            if (result41) {

                let resultcount = result41.clicks;
                console.log(resultcount, "resultcount");

                result41.clicks = Number(resultcount) + 1;

                result41.save(function(err1) {
                    if (err1) {
                        console.log('update shortcode count in tracking data Error' + err1)
                        res.status(501).send({
                            error: 'Update Client Failed',
                            data: null,
                            message: 'Oops! Please try again'
                        })
                        res.end()
                    } else {
                        console.log('update shortcode count in tracking data Successfully')
                        res.status(200).send({
                            data: 'Client Updated Successfully'
                        });
                        res.end();
                    }
                })


            } else {

                res.status(501).send({
                    error: 'Insta Bio Creation Failed',
                    data: null,
                    message: 'Oops! Please try again'
                })
                res.end();

            }







        }


    })






    // ///////////////////////////////









})







router.get('/link/:id', function(req, res) {

        // Next, paste the code into the global footer of your domain either before or after the <body> tag.
        // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        let url = req.url;
        let shortcode = req.params.id;

        console.log(req.params, "params");


        SocialMedia.find({
            is_del: false
        }, function(err1, socialmediaList) {
            if (err1) {
                console.log(url + '\n Error is - ' + err)
                res.status(501).send({
                    error: 'shorturl does not exist',
                    data: null,
                    message: 'shorturl does not exist'
                })
                res.end()
            } else {
                // UserShortURL.findById(id, function(err2, result) {

                UserShortURL.findOne({
                    shortcode: shortcode,
                    is_del: false

                }).exec(function(err2, result) {
                   

console.log(result, "result shortcontroller link");

                    res.render('final', {
                        'from': 'instabio',
                        'socialmediaList': socialmediaList,
                        'shortcode': result.shortcode,
                        'clientimage': result.dashimg,
                        'backgroundcolor': result.bg_color,
                        'name': result.title,
                        'bio': result.bio,
                        'sociallists': result.socialmedia,
                        'links': result.links,
                        'border': result.rounded_border,
                        'id': result._id,


                    })
                })
            }
        })

        // ############################twitter code######################/
    })
    // ############################steps page######################/
router.get('/steps', requireLogin, function(req, res) {
        // res.render('steps', {

        // });

        let url = req.url
        let userid = req.session.user._id
        console.log(userid)
            /// ///////###################################prinitng random images
        let description = ['app-icon1.png', 'app-icon2.png', 'app-icon3.png', 'app-icon4.png', 'app-icon5.png',
            'app-icon6.png', 'app-icon7.png'
        ]
        let size = description.length
        let x = Math.floor(size * Math.random())
        let imaged = '/userui/img/' + description[x]

        // //////##############################

        Client.find({
            is_del: false,
            user: userid
        }).populate('client').exec(function(err, clientsList) {
            console.log(clientsList)
            if (err) {
                console.log(url + '\n Error is - ' + err)
                res.status(501).send({
                    error: 'Client Search Error',
                    data: null,
                    message: 'Oops! Please try again'
                })
                res.end()
            } else {
                let count = clientsList.length

                Tracking.find({
                    is_del: false
                }, function(errTracking, trackingResult) {
                    UserShortURL.find({
                        is_del: false
                    }, function(errShorturl, shorturlsList) {
                        res.render('steps', {

                            moment: moment,
                            client_count: count,
                            clientsList: clientsList,
                            trackingList: trackingResult,
                            shorturlsList: shorturlsList,
                            'from': 'steps'

                        })
                    })
                })
            }
        })
    })
    // ############################steps page######################/

router.get('/analytics', requireLogin, function(req, res) {
    let url = req.url
    let userid = req.session.user._id

    Client.find({
        is_del: false,
        user: userid
    }).populate('client').exec(function(err, clientsList) {
        if (err) {
            console.log(url + '\n Error is - ' + err)
            res.status(501).send({
                error: 'Client Search Error',
                data: null,
                message: 'Oops! Please try again'
            })
            res.end()
        } else {
            let count = clientsList.length

            Tracking.find({
                is_del: false
            }, function(errTracking, trackingResult) {
                UserShortURL.find({
                    is_del: false
                }, function(errShorturl, shorturlsList) {
                    res.render('analytics', {
                        moment: moment,
                        client_count: count,
                        clientsList: clientsList,
                        'clientname': 'surya',
                        'id': '1',
                        'linkclicks': '21',
                        'totallinkscreated': '43',
                        'totallinkclikcs': '65',
                        'pixelsconnected': '3',
                        'clientsanalyticslist': [{
                            'shorturl': 'URTW',
                            'clicks': '223',
                            'source': 'something',
                            'medium': 'sdoasndai',
                            'name': 'asdmsdmks',
                            'date': 'date',
                            'pixelsicons': [{
                                'icon': 'fa fa-facebook fa-1x'
                            }, {
                                'icon': 'fa fa-twitter fa-1x'

                            }, {
                                'icon': 'fa fa-snapchat fa-1x'

                            }]
                        }, {
                            'shorturl': 'URTW1',
                            'clicks': '2231',
                            'source': 'something1',
                            'medium': 'sdoasndai1',
                            'name': 'asdmsdmks1',
                            'date': 'date1',
                            'pixelsicons': [{
                                'icon': 'fa fa-facebook fa-1x'
                            }, {
                                'icon': 'fa fa-twitter fa-1x'

                            }, {
                                'icon': 'fa fa-snapchat fa-1x'

                            }]

                        }]

                    })
                })
            })
        }
    })
})

// router.get('/analytics', requireLogin, function(req, res) {
router.get('/analytics/:clientid', requireLogin, function(req, res) {
    let url = req.url;
    let userid = req.session.user._id;
    let clientid = req.params.clientid;
    if (clientid === "allclients") {
        Client.find({
            is_del: false,
            user: userid
        }).populate('client').exec(function(err, clientsList) {
            if (err) {
                console.log(url + '\n Error is - ' + err)
                res.status(501).send({
                    error: 'Client Search Error',
                    data: null,
                    message: 'Oops! Please try again'
                })
                res.end()
            } else {
                let count = clientsList.length
                let newClientsList = []
                Tracking.find({
                    is_del: false
                }, function(errTracking, trackingResult) {
                    UserShortURL.find({
                        is_del: false,
                        user: userid
                    }, function(errShorturl, shorturlsList) {
                        // console.log(trackingResult, "trackingResult");
                        // console.log(shorturlsList, "shorturlsList");
                        // ///////////////////////
                        let clientResult = {
                            "name": "allclients"
                        }

                        // / let d = alldata[index].created_at;
                        // let strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                        let newshort31 = [];

                        for (let o = 0; o < shorturlsList.length; o++) {
                            const type = shorturlsList[o].type;
                            const shortcode = shorturlsList[o].shortcode;
                            const tracking = shorturlsList[o].tracking;
                            const _id = shorturlsList[o]._id;
                            let d = shorturlsList[o].created_at;
                            let clicks = shorturlsList[o].clicks;

                            let strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                            let k = {};
                            k.type = type;
                            k.shortcode = shortcode;
                            k.tracking = tracking;
                            k._id = _id;
                            k.created_at = strDate;
                            if (clicks) {
                                k.clicks = shorturlsList[o].clicks;

                            } else {
                                k.clicks = 0;

                            }

                            newshort31.push(k);





                        }
                        console.log(newshort31);
                        console.log("###############################################");

                        res.render('analytics', {
                            moment: moment,
                            client_count: count,
                            clientsList: clientsList,
                            'clientname': 'surya',
                            'id': '1',
                            'linkclicks': '21',
                            'totallinkscreated': '43',
                            'totallinkclikcs': '65',
                            'pixelsconnected': '3',
                            'clientsanalyticslist': [{
                                'shorturl': 'URTW',
                                'clicks': '223',
                                'source': 'something',
                                'medium': 'sdoasndai',
                                'name': 'asdmsdmks',
                                'date': 'date',
                                'pixelsicons': [{
                                    'icon': 'fa fa-facebook fa-1x'
                                }, {
                                    'icon': 'fa fa-twitter fa-1x'

                                }, {
                                    'icon': 'fa fa-snapchat fa-1x'

                                }]
                            }],
                            trackingList: trackingResult,
                            shorturlsList: newshort31,
                            indiclientdata: clientResult,
                            'from': 'allclients',
                            "clientid": clientid,
                            'datedata': newshort31


                        })



                        // ///////////////////////



                    })
                })
            }
            // })
        })
    } else {
        // dataTracking.findOne({
        //     'shortcode': id
        // }).exec(function(err32, result67) {
        dataTracking.find({
            is_del: false,
            user: userid
        }).populate('client').exec(function(err54, result67) {
            Client.find({
                is_del: false,
                user: userid
            }).populate('client').exec(function(err, clientsList) {
                if (err) {
                    console.log(url + '\n Error is - ' + err)
                    res.status(501).send({
                        error: 'Client Search Error',
                        data: null,
                        message: 'Oops! Please try again'
                    })
                    res.end()
                } else {
                    let count = clientsList.length
                    let newClientsList = []


                    Tracking.find({
                            is_del: false
                        }, function(errTracking, trackingResult) {
                            UserShortURL.find({
                                is_del: false,
                                client: clientid
                            }, function(errShorturl, shorturlsList) {
                                // console.log(trackingResult, "trackingResult");
                                console.log(shorturlsList, "shorturlsList");
                                // ///////////////////////
                                // Client.findById(clientid, function(err, clientResult) {
                                Client.find({
                                    is_del: false,
                                    user: userid,
                                    _id: clientid
                                }).exec(function(err, clientResult) {
                                    if (err) {
                                        console.log('Update Client Error' + err)
                                        res.status(501).send({
                                            error: 'Update Client Failed',
                                            data: null,
                                            message: 'Oops! Please try again'
                                        })
                                        res.end()
                                    } else {
                                        console.log(clientResult);
                                        let newshort = [];


                                        for (let index = 0; index < shorturlsList.length; index++) {
                                            const element = shorturlsList[index].created_at;
                                            let d = shorturlsList[index].created_at;
                                            let strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                                            let k = {};
                                            k.id = "#" + shorturlsList[index]._id;
                                            k.id1 = shorturlsList[index]._id;


                                            k.created_at = strDate;

                                            newshort.push(k);
                                        }
                                        console.log("###############################################");
                                        let newshort31 = [];

                                        for (let o = 0; o < shorturlsList.length; o++) {
                                            const type = shorturlsList[o].type;
                                            const shortcode = shorturlsList[o].shortcode;
                                            const tracking = shorturlsList[o].tracking;
                                            const _id = shorturlsList[o]._id;
                                            let d = shorturlsList[o].created_at;
                                            let clicks = shorturlsList[o].clicks;

                                            let strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                                            let k = {};
                                            k.type = type;
                                            k.shortcode = shortcode;
                                            k.tracking = tracking;
                                            k._id = _id;
                                            k.created_at = strDate;
                                            if (clicks) {
                                                k.clicks = shorturlsList[o].clicks;

                                            } else {
                                                k.clicks = 0;

                                            }

                                            newshort31.push(k);





                                        }
                                        console.log(newshort31);

                                        console.log("###############################################");
                                        res.render('analytics', {
                                            moment: moment,
                                            client_count: count,
                                            clientsList: clientsList,
                                            'clientname': 'surya',
                                            'id': '1',
                                            'linkclicks': '21',
                                            'totallinkscreated': '43',
                                            'totallinkclikcs': '65',
                                            'pixelsconnected': '3',
                                            'clientsanalyticslist': [{
                                                'shorturl': 'URTW',
                                                'clicks': '223',
                                                'source': 'something',
                                                'medium': 'sdoasndai',
                                                'name': 'asdmsdmks',
                                                'date': 'date',
                                                'pixelsicons': [{
                                                    'icon': 'fa fa-facebook fa-1x'
                                                }, {
                                                    'icon': 'fa fa-twitter fa-1x'

                                                }, {
                                                    'icon': 'fa fa-snapchat fa-1x'

                                                }]
                                            }],
                                            trackingList: trackingResult,
                                            shorturlsList: newshort31,
                                            indiclientdata: clientResult[0],
                                            'from': 'allclients',
                                            "clientid": clientid,
                                            'datedata': newshort,
                                            'analytics': result67,
                                            // ///////////new 


                                        });


                                    }
                                })



                                // ///////////////////////



                            })
                        })
                        // })
                }
                // })
            })
        })

    }
});

// dashboard page date###########################################################################

router.post('/create-client', requireLogin, function(req, res) {
    let client = req.body.name
    let trackingList = req.body.trackingList

    console.log(trackingList)

    let clientObj = new Client({
        user: req.session.user._id,
        name: client,
        tracking: trackingList,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()

    })

    clientObj.save(function(err, result) {
        if (err) {
            console.log('Client Creation Failed' + err)
            res.status(501).send({
                error: 'Client Creation Failed',
                data: null,
                message: 'Oops! Please try again'
            })
            res.end()
        } else {
            console.log('Client Created')
            let client_id = result._id

            // if(trackingList!=undefined)
            // {
            // 		let clientTrackingObj = new ClientTracking({
            // 			user: req.session.user._id,
            // 			client: client_id,
            // 			tracking: trackingList,
            // 			is_active: true,
            // 			created_at: new Date(),
            // 			updated_at: new Date()
            //
            // 		});
            //
            // 		clientTrackingObj.save(function (err1, resultClientTracking) {
            // 			if (err1)
            // 			{
            // 				console.log('Client Tracking Creation Failed' + err1);
            // 				res.status(501).send({ error: "Client Tracking Creation Failed", data: null, message: "Oops! Please try again" });
            // 				res.end();
            // 			}
            // 			else
            // 			{
            // 				res.status(200).send({ data: 'Client and Tracking Pixels Added Successfully' });
            // 				res.end();
            // 			}
            // 		});
            // }
            // else
            // {
            // 	 res.status(200).send({ data: 'Client Added Successfully' });
            // 	 res.end();
            // }



            res.status(200).send({
                data: 'Client Added Successfully',
                id: client_id
            })
            res.end()
        }
    })
})

router.put('/update-client', requireLogin, function(req, res) {
        console.log("sndklsandkasnld");
        let id = req.body.clientId;
        let name = req.body.name;
        console.log(id);
        let trackingList = req.body.trackingList;
        console.log(name, "name");
        Client.findById(id, function(err, clientResult) {
            console.log(clientResult, "clientResult");
            if (err) {
                console.log('Update Client Error' + err)
                res.status(501).send({
                    error: 'Update Client Failed',
                    data: null,
                    message: 'Oops! Please try again'
                })
                res.end()
            } else {
                clientResult.name = name;
                clientResult.tracking = trackingList;
                clientResult.save(function(err1) {
                    if (err1) {
                        console.log('Update Client Error' + err1)
                        res.status(501).send({
                            error: 'Update Client Failed',
                            data: null,
                            message: 'Oops! Please try again'
                        })
                        res.end()
                    } else {
                        console.log('Client Updated Successfully')
                        res.status(200).send({
                            data: 'Client Updated Successfully'
                        });
                        res.end();
                    }
                })
            }
        })
    })
    // FIXME Delete client
router.delete('/delete-client/:id', requireLogin, function(req, res) {
    let id = req.params.id
    console.log(id);
    Client.find({
        is_del: false,
    }).populate('client').exec(function(err41, clientsList) {
        // 
        Client.findById(id, function(err42, result) {
            // 

            // UserShortURL.findById(id, function(err, result21) {
            UserShortURL.find({
                is_del: false,
                client: id
            }).exec(function(err43, result420) {
                console.log(result420, "fullshorturl");
                if (err43) {
                    console.log('Delete Client Error')
                    res.status(501).send({
                        error: 'Delete Client Failed',
                        data: null,
                        message: 'Oops! Please try again'
                    })
                    res.end()
                        // result21.remove(function(err2) {

                } else {

                    result.remove(function(err1) {

                            if (err1) {
                                console.log('Delete Client Error')
                                res.status(501).send({
                                    error: 'Delete Client Failed',
                                    data: null,
                                    message: 'Oops! Please try again'
                                })
                                res.end()
                            } else {


                                // //////////////////////////
                                async.each(result420, function(entry2, callback) {

                                        let id41 = entry2._id;
                                        UserShortURL.findById(id41).exec(function(err6, result21) {
                                            console.log(result21, "indidelete");
                                            if (err43) {
                                                console.log(err43);
                                            } else {
                                                result21.remove(function(err7) {
                                                    console.log('cart has been removed');
                                                });
                                            }


                                            callback();
                                        });
                                    },
                                    function(err43) {
                                        console.log('deleted');

                                        let count = clientsList.length
                                        let newClientsList = [];
                                        console.log(count);

                                        let clientId;
                                        if (count > 0) {

                                            clientId = clientsList[0]._id;
                                        } else {
                                            clientId = "";
                                        }

                                        console.log('Client Deleted Successfully')
                                        res.status(200).send({
                                            data: 'Client Deleted Successfully',
                                            count: count,
                                            clientid: clientId
                                        })
                                        res.end();

                                    });


                                // ////////////////////////////




                            }

                        })
                        // ///////////////////////////////////////

                }
            })
        })


    })

})

router.post('/create-shorturl', requireLogin, function(req, res) {
    let url = req.body.url;
    let from = req.body.from;
    let client = req.body.client;
    let website = req.body.website;
    let dashimg = req.body.dashimg;
    let clicks = req.body.clicks;


    let shortcode = randomize('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 5)
    console.log(shortcode)
    UserShortURL.find({
        shortcode: shortcode
    }, function(err, list) {
        if (err) {
            console.log(err + 'ShortCode Creation Error')
            res.status(501).send({
                error: 'ShortURL Creation Failed',
                data: null,
                message: 'Oops! Please try again'
            })
            res.end()
        } else {
            if (list.length == 0) {
                let shortURLObj = {}

                if (from == 'shortenurl') {
                    shortURLObj = new UserShortURL({
                        user: req.session.user._id,
                        client: client,
                        type: from,
                        website: website,
                        dashimg: dashimg,
                        shortcode: shortcode,
                        clicks: clicks,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()

                    })
                } else if (from == 'shortenurl_utm') {
                    let campaign_source = req.body.campaign_source
                    let campaign_medium = req.body.campaign_medium
                    let campaign_name = req.body.campaign_name
                    let campaign_term = req.body.campaign_term
                    let campaign_content = req.body.campaign_content
                    let utm_url = req.body.utm_url
                    let clicks21 = req.body.clicks;



                    shortURLObj = new UserShortURL({
                        user: req.session.user._id,
                        client: client,
                        type: from,
                        website: website,
                        dashimg: dashimg,
                        shortcode: shortcode,
                        clicks: clicks21,
                        campaign_source: campaign_source,
                        campaign_medium: campaign_medium,
                        campaign_name: campaign_name,
                        campaign_term: campaign_term,
                        utm_url: utm_url,
                        campaign_content: campaign_content,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()

                    })
                }

                shortURLObj.save(function(err, result) {
                    if (err) {
                        console.log('ShortURL Creation Failed' + err)
                        res.status(501).send({
                            error: 'ShortURL Creation Failed',
                            data: null,
                            message: 'Oops! Please try again'
                        })
                        res.end()
                    } else {
                        console.log('ShortURL Created')
                        let client_id = result._id

                        res.status(200).send({
                            data: 'ShortURL Created Successfully',
                            url: shortcode
                        })
                        res.end()
                    }
                })
            } else {
                console.log('ShortCode Clash');



                res.status(501).send({
                    error: 'ShortURL Creation Failed',
                    data: null,
                    message: 'Oops! Please try again'
                })
                res.end()
            }
        }
    })
})

router.put('/update-shorturl', requireLogin, function(req, res) {
    let id = req.body.id;
    // let url = req.body.url;
    let from = req.body.from
        // let client = req.body.client;
    let website = req.body.url
    let shortcode = req.body.shortcode
    console.log(id)
        // console.log(url);
    console.log(from)
    console.log(shortcode)
    console.log(website)

    UserShortURL.findById(id, function(err, shorturlResult) {
        console.log(shorturlResult)
        if (err) {
            console.log('ShortURL Update Error nnnnnnnnnnnnn' + err)
            res.status(501).send({
                error: 'Update ShortURL Failed',
                data: null,
                message: 'Oops! Please try again'
            })
            res.end()
        } else {
            if (from == 'shortenurl') {
                shorturlResult.website = website
                shorturlResult.shortcode = shortcode
                    // shorturlResult.client = client;
            } else if (from == 'shortenurl_utm') {
                let campaign_source = req.body.campaign_source
                let campaign_medium = req.body.campaign_medium
                let campaign_name = req.body.campaign_name
                let campaign_term = req.body.campaign_term
                let campaign_content = req.body.campaign_content

                // shorturlResult.client = client;
                shorturlResult.website = website
                shorturlResult.shortcode = shortcode
                shorturlResult.campaign_source = campaign_source
                shorturlResult.campaign_medium = campaign_medium
                shorturlResult.campaign_name = campaign_name
                shorturlResult.campaign_term = campaign_term
                shorturlResult.campaign_content = campaign_content
            }

            shorturlResult.save(function(err1) {
                if (err1) {
                    console.log('Update ShortURL Error' + err1)
                    res.status(501).send({
                        error: 'Update Client Failed',
                        data: null,
                        message: 'Oops! Please try again'
                    })
                    res.end()
                } else {
                    console.log('ShortURL Updated Successfully')
                    res.status(200).send({
                        data: 'ShortURL Updated Successfully'
                    })
                    res.end()
                }
            })
        }
    })
})

router.delete('/delete-shorturl/:id', requireLogin, function(req, res) {
    let id = req.params.id

    UserShortURL.findById(id, function(err, result) {
        if (err) {
            console.log('Delete ShortURL Error' + err)
            res.status(501).send({
                error: 'Delete ShortURL Failed',
                data: null,
                message: 'Oops! Please try again'
            })
            res.end()
        } else {
            result.remove(function(err1) {
                if (err1) {
                    console.log('Delete ShortURL Error' + err1)
                    res.status(501).send({
                        error: 'Delete ShortURL Failed',
                        data: null,
                        message: 'Oops! Please try again'
                    })
                    res.end()
                } else {
                    console.log('ShortURL Deleted Successfully')
                    res.status(200).send({
                        data: 'ShortURL Deleted Successfully'
                    })
                    res.end()
                }
            })
        }
    })
})

router.post('/dashboard-input-url', requireLogin, function(req, res) {
    let LinkUrl = req.body.input
    let utmUrl = req.body.fullutmurl
    console.log(LinkUrl)
    console.log(utmUrl)
})

router.post('/dashboard-individual-url-edit', requireLogin, function(req, res) {
    let input = req.body.input
    let shortUrl = req.body.short
    console.log(input)
    console.log(shortUrl)
})

router.post('/dashboard-individual-url-tracking', requireLogin, function(req, res) {
    let trackingdata = req.body.tracking
    console.log(trackingdata)
})

router.get('/short-url-onEnter/:short', requireLogin, function(req, res) {
        let trackingdata = req.params.short

        console.log(trackingdata)
    })
    // nba
    // router.get('/instabio/:id', requireLogin, function (req, res) {
    // 	let url = req.url;
    // 	let id = req.params.id;
    // 	console.log(id);

// 	UserShortURL.findById(id, function (err, data) {

// 		if (err) {
// 			console.log(url + '\n Error is - ' + err);
// 			res.status(501).send({
// 				error: "shorturl does not exist",
// 				data: null,
// 				message: "shorturl does not exist"
// 			});
// 			res.end();
// 		} else {
// 			res.render('create-shorturl', {
// 				"instadata": data

// 			});
// 		}

// 	});

// });
// ///////////////////////
// FIXME GET Instabio

router.get('/instabio/:id', requireLogin, async function(req, res) {
 res.render('create-shorturl',{
    "from": "instabio"
 });
});


router.get('/getShortUrlData/:id', requireLogin, function (req, res) {
    let url = req.url;
    let id = req.params.id;
    console.log(id);

    UserShortURL.findById(id, function (err, result) {
        if (err) {
            console.log(url + '\n Error is - ' + err);
            res.status(501).send({
                error: "shorturl does not exist",
                data: null,
                message: "shorturl does not exist"
            });
            res.end();
        } else {
            console.log(result,"result");
       res.status(200).send({
              data: result
            });
            res.end();
        }

    });

});


// res.render('create-shorturl', {
// 	'clientsList': clientsList,
// 	'socialmediaList': socialmediaList,
// 	'shortcode': result.shortcode,
// 	"clientimage": '/userui/180.png',
// 	"backgroundcolor": "Turquoiseflow",
// 	"fontcolor": "white",
// 	'poweredlogo': '/userui/logo2.png',
// 	'border': {
// 		'active': 'is-active'
// 	},
// 	"name": "Tap Short test",
// 	'bio': "Place Your Bio Here test",
// 	'sociallists': result.socialmedia,
// 	'linklists': [{
// 		"link": "something1.com",
// 		"title": "title1"
// 	}, {
// 		"link": "something2.com",
// 		"title": "title2"
// 	}, {
// 		"link": "something3.com",
// 		"title": "title3"
// 	}]

// });


router.put('/updateclicks', function(req, res) {
    let id = req.body.id


    UserShortURL.findById(id, function(err, result) {
        console.log(result.clicks, "clicks")

        result.clicks = Number(result.clicks) + 1;

        // result.updated_at = new Date();

        result.save(function(err, result) {
            if (err) {
                console.log('Insta Bio Updation Failed' + err)
                res.status(501).send({
                    error: 'Insta Bio Updation Failed',
                    data: null,
                    message: 'Oops! Please try again'
                })
                res.end()
            } else {
                console.log('Insta Bio Updation')
                res.status(200).send({
                    data: 'Insta Bio Updated Successfully'
                })
                res.end()
            }
        })
    })
})

/// /////////////////////////////////////

router.put('/update-instabio', requireLogin, async (req, res) => {
    try {
        const {
            _id,
            shortcode,
            socialmedia,
            links,
            title,
            bio,
            img,
            trackingList,
            bg_color,
            rounded_border
        } = req.body;

        // Validate required fields
        if (!_id || !shortcode || !title || !bio) {
            return res.status(400).send({
                error: 'Validation Error',
                data: null,
                message: 'ID, shortcode, title, and bio are required fields.'
            });
        }

        // Find the document by ID
        const result = await UserShortURL.findById(_id);
        if (!result) {
            return res.status(404).send({
                error: 'Not Found',
                data: null,
                message: 'Insta Bio not found.'
            });
        }

        // Update the document fields
        result.shortcode = shortcode;
        result.socialmedia = socialmedia;
        result.links = links;
        result.title = title;
        result.bio = bio;
        result.tracking = trackingList;
        result.img = img;
        result.bg_color = bg_color;
        result.rounded_border = rounded_border === 'true'; // Convert string to boolean
        result.updated_at = new Date();

        // Save the updated document
        const updatedResult = await result.save();
        console.log('Insta Bio Updated', updatedResult);

        res.status(200).send({
            data: 'Insta Bio Updated Successfully'
        });
    } catch (err) {
        console.error('Insta Bio Updation Failed', err);
        res.status(500).send({
            error: 'Insta Bio Updation Failed',
            data: null,
            message: 'Oops! Please try again'
        });
    }
});
// dashboard page date###########################################################################

router.get('/getSocialMediaList', requireLogin, function(req, res) {
    let url = req.url
    SocialMedia.find({
        is_del: false
    }, function(err, result) {
        if (err) {
            console.log(url + '\n Error is - ' + err)
            res.status(501).send({
                error: 'SocialMedia does not exist',
                data: null,
                message: 'SocialMedia does not exist'
            })
            res.end()
        } else {
            if (result == undefined || result == null) // SocialMedia do not exist
            {
                res.status(501).send({
                    error: 'SocialMedia does not exist',
                    data: null,
                    message: 'SocialMedia does not exist'
                })
                res.end()
            } else // SocialMedia List
            {
                res.status(200).send({
                    data: result
                })
                res.end()
            }
        }
    })
})

router.get('/shorturl/:id', requireLogin, function(req, res) {
    let id = req.params.id

    if (req.session.user != undefined) // User not logged in
    {
        res.redirect('/login')
    } else // User Logged in
    {
        let userid = req.session.user._id
        let query = {
            user: userid,
            shorturl: id,
            is_del: false
        }

        UserShortURL.find(query, function(err, result) {
            if (err) {
                console.log('Error finding ShortURL' + err)
                res.status(501).send({
                    error: 'Error finding ShortURL',
                    data: null,
                    message: 'Error finding ShortURL'
                })
                res.end()
            } else {
                if (result == undefined || result == null) // URL does not exist
                {
                    res.redirect('/dashboard')
                } else // URL exists and is linked to the user. Edit option can be given
                {
                    // Query UserLink, UserTracking and UserSocialMedia to get list
                    let shorturlID = result._id
                    let respObj = {}

                    respObj.profile = result

                    UserSocialMedia.find({
                        shorturl: shorturlID,
                        is_del: false
                    }, function(socialMediaErr, socialMediaResult) {
                        if (socialMediaErr) {
                            console.log(socialMediaErr)
                            res.status(501).send({
                                error: 'Error finding ShortURL SocialMedia',
                                data: null,
                                message: 'Error finding ShortURL SocialMedia'
                            })
                            res.end()
                        } else {
                            respObj.socialmedia = socialMediaResult

                            UserLink.find({
                                shorturl: shorturlID,
                                is_del: false
                            }, function(userLinkErr, userLinkResult) {
                                if (userLinkErr) {
                                    console.log(userLinkErr)
                                    res.status(501).send({
                                        error: 'Error finding ShortURL User Link',
                                        data: null,
                                        message: 'Error finding ShortURL UserLink'
                                    })
                                    res.end()
                                } else {
                                    respObj.links = userLinkResult

                                    UserTracking.find({
                                        shorturl: shorturlID,
                                        is_del: false
                                    }, function(userTrackingErr, userTrackingResult) {
                                        if (userTrackingErr) {
                                            console.log(userTrackingErr)
                                            res.status(501).send({
                                                error: 'Error finding ShortURL User Tracking',
                                                data: null,
                                                message: 'Error finding ShortURL User Tracking'
                                            })
                                            res.end()
                                        } else {
                                            respObj.tracking = userTrackingResult

                                            res.status(200).send({
                                                data: respObj
                                            })
                                            res.end()
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})

router.get('/check-shorturl/:id', requireLogin, function(req, res) {
    let id = req.params.id
    console.log(id)
    UserShortURL.find({
        shortcode: id,
        is_del: false
    }, function(err, result) {
        if (err) {
            console.log(err)
            res.status(501).send({
                error: 'Error finding ShortURL',
                data: null,
                message: 'Error finding ShortURL'
            })
            res.end()
        } else {
            console.log(result)
            if (result.length > 0) // Short URL exists
            {
                res.status(500).send({
                    error: 'Short URL exists',
                    data: null,
                    message: 'Short URL exists'
                })
                res.end()
            } else {
                res.status(200).send({
                    data: 'Short URL is available'
                })
                res.end()
            }
        }
    })
})

// POST REQUESTS

// router.post('/create-shorturl', requireLogin, function (req, res) {
//
// 	let url = req.url;
// 	let title = req.body.profile.name;
// 	let bio = req.body.profile.bio;
// 	let img = '';
// 	let bg_color = req.body.style.bg_color;
// 	let rect_border = req.body.style.rectangle_border;
// 	let rounded_border = req.body.style.rounded_border;
// 	let socialmediaList = req.body.socialmedia;
// 	let trackingList = req.body.tracking;
// 	let linksList = req.body.links;
// 	let shorturl = req.body.shorturl;
//
// 	console.log(shorturl);
//
// 	UserShortURL.find({
// 		shorturl: shorturl
// 	}, function (err, data) {
//
//
// 		if (err) {
//
// 			console.log('User ShortURL Assign Failed' + err);
// 			res.status(501).send({
// 				error: "User ShortURL Assign Failed",
// 				data: null,
// 				message: "User ShortURL Assign Failed"
// 			});
// 			res.end();
//
// 		} else {
//
// 			if (data.length > 0) // Shorturl exists
// 			{
// 				console.log('Short URL already created dumbass');
// 			} else {
// 				let userShorturlObj = new UserShortURL({
// 					user: req.session.user._id,
// 					shorturl: shorturl,
// 					title: title,
// 					bio: bio,
// 					img: img,
// 					bg_color: bg_color,
// 					rect_border: rect_border,
// 					rounded_border: rounded_border,
// 					is_active: true,
// 					created_at: new Date(),
// 					updated_at: new Date()
//
// 				});
//
// 				userShorturlObj.save(function (err1, result) {
// 					if (err1) {
// 						console.log('User ShortURL Assign Failed' + err1);
// 						res.status(501).send({
// 							error: "User ShortURL Assign Failed",
// 							data: null,
// 							message: "User ShortURL Assign Failed"
// 						});
// 						res.end();
// 					} else {
// 						console.log('User ShortURL Assign Created');
// 						res.status(200).send({
// 							data: result
// 						});
// 						res.end();
//
// 						let shorturlID = result._id;
// 						let socialArray = [];
// 						let linksArray = [];
// 						let trackingArray = [];
//
// 						if (socialmediaList.length > 0) {
// 							for (let i = 0; i < socialmediaList.length; i++) {
//
// 								let obj = {};
// 								obj.user = req.session.user._id;
// 								obj.shorturl = shorturlID;
// 								obj.socialmedia = socialmediaList[i].id;
// 								obj.username = socialmediaList[i].name;
// 								socialArray.push(obj);
// 							}
//
// 							UserSocialMedia.insertMany(socialArray, function (error, docs) {
//
// 								if (error) {
// 									console.log('Error Bulk Inserting SocialMedia');
//
// 								} else {
// 									console.log('Successfully Inserted SocialMedia');
//
// 								}
//
// 							});
// 						}
//
//
// 						if (linksList.length > 0) {
// 							for (let i = 0; i < linksList.length; i++) {
//
// 								let obj = {};
// 								obj.user = req.session.user._id;
// 								obj.shorturl = shorturlID;
// 								obj.url = linksList[i].link;
// 								obj.title = linksList[i].title;
// 								linksArray.push(obj);
//
// 							}
//
// 							UserLink.insertMany(linksArray, function (error, docs) {
//
// 								if (error) {
// 									console.log('Error Bulk Inserting Links Array');
//
// 								} else {
// 									console.log('Successfully Inserted Links Array');
//
// 								}
//
// 							});
// 						}
//
// 						if (trackingList.length > 0) {
// 							for (let i = 0; i < trackingList.length; i++) {
//
// 								let obj = {};
// 								obj.user = req.session.user._id;
// 								obj.shorturl = shorturlID;
// 								obj.tracking = trackingList[i].id;
// 								obj.userid = trackingList[i].userid;
// 								trackingArray.push(obj);
//
// 							}
//
// 							UserTracking.insertMany(trackingArray, function (error, docs) {
//
// 								if (error) {
// 									console.log('Error Bulk Inserting Links Tracking Array');
//
// 								} else {
// 									console.log('Successfully Inserted Links Tracking Array');
//
// 								}
//
// 							});
// 						}
//
// 					}
// 				});
// 			}
// 		}
// 	});
//
// });

router.post('/create-testturl', requireLogin, function(req, res) {
        let title = false

        if (title) {
            res.status(200).send({
                data: 'Short URL is available'
            })
            res.end()
        } else {
            res.status(500).send({
                error: 'Short URL exists',
                data: null,
                message: 'Short URL exists'
            })
            res.end()
        }
    })
    // //////////////////////shorturl update nba

router.put('/shorturl/:id', requireLogin, function(req, res) {
    let url = req.url
    let id = req.params.id
    let messenger = req.body.messenger
    let socialmedia = req.body.socialmedia
    let links = req.body.links
    let bg_color = req.body.bg_color
    let button_format = req.body.button_format

    UserShortURL.findById(id, function(err, data) {
        if (err) {

        } else {
            data.messenger = messenger
            data.socialmedia = socialmedia
            data.links = links
            data.bg_color = bg_color
            data.button_format = button_format
            data.is_active = true
            data.updated_at = new Date()

            data.save(function(err) {
                if (err) {
                    let x = {
                        success: '',
                        error: 'Please enter all details.'
                    }
                    res.send(x)
                } else {
                    console.log('ShortURL Updated')
                    let x = {
                        success: 'ShortURL Updated Successfully',
                        error: ''
                    }
                    res.send(x)
                }
            })
        }
    })
})

function requireLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
};

module.exports = router
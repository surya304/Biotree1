let User = require('../models/user')
let express = require('express')
let nodemailer = require('nodemailer')
let router = express.Router()
let uuid = require('uuid/v4')
let bcrypt = require('bcryptjs')
let request = require('request')
const { stringify } = require('querystring');
const crypto = require('crypto');

const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { MailtrapClient } = require("mailtrap");
require('dotenv').config();


router.get('/login', function(req, res) {
    res.render('login', {

    })

});

router.get('/signup', function(req, res) {
    res.render('signup', {})
});

router.get('/forgot-password', function(req, res) {
    res.render('forgotpwd', {})
});

router.get('/add-new-password', function(req, res) {
    res.render('add-new-password', {})
});
router.get('/resetpassword/:id', function(req, res) {
    res.render('resetPassword', {})
});


router.post('/forgotpassword', async function (req, res) {
    try {
      const { key, password, newpassword } = req.body;
  
      if (password !== newpassword) {
        throw new Error('Passwords do not match.');
      }
  
      const hash = bcrypt.hashSync(password, 10);
  
      const user = await User.findOne({ verification_key: key });
  
      if (!user) {
        throw new Error('Invalid reset password key or expired link.');
      }
  
      const now = Date.now();
      if (now > user.expires_in) {
        throw new Error('Reset password link expired.');
      }
  
      user.verification_key = uuid();
      user.password = hash;
      user.expires_in = now + 7200000; // 2 hours
      user.verification = true;
  
      await user.save();
  
      res.status(200).send({ data: "Password updated successfully. Please login to continue" });
    } catch (error) {
      console.error(req.url, error);
      res.status(500).send({ error: error.message, data: null, message: "Password update failed. Please try again." });
    }
  });
  



router.get('/profile', requireLogin, async (req, res) => {
    try {
        const userId = req.session.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                data: null,
                message: 'Unable to find user profile'
            });
        }

        res.render('profile', {
            profilename: user.name,
            email: user.email,
            is_social: user.is_social
        });

    } catch (error) {
        console.error(`Error in /profile route: ${error.message}`);
        res.status(500).json({
            error: 'Internal Server Error',
            data: null, 
            message: 'Something went wrong. Please try again.'
        });
    }
});

router.get('/logout', function(req, res) {
    req.session.reset()
    res.redirect('/login');
})

router.post('/subscribe', 
    // Validation middleware
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                data: null,
                message: 'Validation failed'
            });
        }

        try {
            const { name, email, password } = req.body;

            console.log(req.body);

            // Check if the email already exists
            const existingUser = await User.findOne({ email }).exec();
            if (existingUser) {
                return res.status(400).send({
                    error: 'email_exists',
                    data: null,
                    message: 'Email already exists'
                });
            }

            const hash = bcrypt.hashSync(password, 10);

            const userObj = new User({
                name,
                email,
                password: hash,
                tap_account: true,
                verification_key: uuid(),
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            });

            const result = await userObj.save();

            console.log(result);
            req.session.user = result;
            req.session.client = result;


   
            res.status(200).send({
                data: 'success'
            });
        } catch (err) {
            console.error(`Error during signup process: ${err.message}`);
            res.status(500).send({
                error: 'internal_server_error',
                data: null,
                message: 'An error occurred during the signup process. Please try again later.'
            });
        }
    }
);


// ///////////
router.post('/signup', async (req, res) => {
    try {
        // Extract required fields from request body
        const { name, email, password, is_social } = req.body;
        const url = req.url;

        // Validate required fields
        if (!name || !email || !password || typeof is_social === 'undefined') {
            return res.status(400).send({
                error: 'missing_fields',
                data: null,
                message: 'Please provide all required fields'
            });
        }
        

        // Hash password synchronously
        const hash = bcrypt.hashSync(password, 10);
        
        // Determine account type based on social signup flag
        const tap_account = !is_social;  // Reverse social flag for tap account
        console.log(`Signup attempt for ${email} (Social: ${is_social})`);

        // Check for existing user first
        const existingUser = await User.findOne({ email }).exec();
        
        // Handle existing user cases
        if (existingUser) {
            if (is_social) {
                // Social signup: Return existing user data
                console.log(`Social signup with existing email: ${email}`);
                req.session.user = existingUser;
                return res.status(200).send({ data: existingUser });
            }
            // Regular signup: Prevent duplicate registration
            console.log(`Duplicate registration attempt: ${email}`);
            return res.status(400).send({
                error: 'user_exists',
                data: null,
                message: 'Account already exists. Please login instead.'
            });
        }

        // Create new user object
        const userObj = new User({
            name,
            email,
            password: hash,
            is_social,
            tap_account,
            verification_key: uuid(),
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        });

        // Save new user to database
        const newUser = await userObj.save();
        const userResponse = newUser.toObject();

        // Set session and return success response
        req.session.user = userResponse;
        res.status(201).send({
            data: userResponse,
            message: 'Account created successfully'
        });

    } catch (err) {
        console.error(`Signup error: ${err.message} [${req.url}]`);
        res.status(500).send({
            error: 'server_error',
            data: null,
            message: 'Account creation failed. Please try again.'
        });
    }
});







function welcometemplate(name) {

    let mylet = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>NoticeLab 13 | Email Template</title>
        <style type="text/css">
            /*////// RESET STYLES //////*/
            
            body {
                height: 100% !important;
                margin: 0;
                padding: 0;
                width: 100% !important;
            }
            
            table {
                border-collapse: separate;
            }
            
            img,
            a img {
                border: 0;
                outline: none;
                text-decoration: none;
            }
            
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                margin: 0;
                padding: 0;
            }
            
            p {
                margin: 1em 0;
            }
            
            .input_text {
                width: 100%;
                padding: 12px 20px;
                margin: 8px 0;
                display: inline-block;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }
            
            .doc_button {
                background-color: #616ed1;
                color: #fff;
                border-style: none;
                padding: 15px 60px;
                font-size: 14px;
                border-radius: 5px;
                font-size: 14px;
                font-weight: 400;
                font-family: 'Open Sans', Helvetica, sans-serif;
                mso-line-height-rule: exactly;
                text-decoration: none;
            }
            
            .border_profile {
                padding-right: 30px;
                border-right: 1px solid #ddd;
            }
            /*////// CLIENT-SPECIFIC STYLES //////*/
            
            .ReadMsgBody {
                width: 100%;
            }
            
            .ExternalClass {
                width: 100%;
            }
            
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%;
            }
            
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            
            #outlook a {
                padding: 0;
            }
            
            img {
                -ms-interpolation-mode: bicubic;
            }
            
            body,
            table,
            td,
            p,
            a,
            li,
            blockquote {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
            /*////// GENERAL STYLES //////*/
            
            img {
                max-width: 100%;
                height: auto;
            }
            /*////// TABLET STYLES //////*/
            
            @media only screen and (max-width: 620px) {
                .shrink_font {
                    font-size: 62px;
                }
                /*////// GENERAL STYLES //////*/
                #foxeslab-email .table1 {
                    width: 90% !important;
                }
                #foxeslab-email .table1-2 {
                    width: 98% !important;
                    margin-left: 1%;
                    margin-right: 1%;
                }
                #foxeslab-email .table1-3 {
                    width: 98% !important;
                    margin-left: 1%;
                    margin-right: 1%;
                }
                #foxeslab-email .table1-4 {
                    width: 98% !important;
                    margin-left: 1%;
                    margin-right: 1%;
                }
                #foxeslab-email .table1-5 {
                    width: 90% !important;
                    margin-left: 5%;
                    margin-right: 5%;
                }
                #foxeslab-email .tablet_no_float {
                    clear: both;
                    width: 100% !important;
                    margin: 0 auto !important;
                    text-align: center !important;
                }
                #foxeslab-email .tablet_wise_float {
                    clear: both;
                    float: none !important;
                    width: auto !important;
                    margin: 0 auto !important;
                    text-align: center !important;
                }
                #foxeslab-email .tablet_hide {
                    display: none !important;
                }
                #foxeslab-email .image1 {
                    width: 98% !important;
                }
                #foxeslab-email .image1-290 {
                    width: 100% !important;
                    max-width: 290px !important;
                }
                .center_content {
                    text-align: center !important;
                }
                .center_image {
                    margin: 0 auto !important;
                }
                .center_button {
                    width: 50% !important;
                    margin-left: 25% !important;
                    max-width: 250px !important;
                }
                .centerize {
                    margin: 0 auto !important;
                }
            }
            /*////// MOBILE STYLES //////*/
            
            @media only screen and (max-width: 480px) {
                .shrink_font {
                    font-size: 48px;
                }
                .safe_color {
                    color: #6a1b9a !important;
                }
                /*////// CLIENT-SPECIFIC STYLES //////*/
                body {
                    width: 100% !important;
                    min-width: 100% !important;
                }
                /* Force iOS Mail to render the email at full width. */
                table[class="flexibleContainer"] {
                    width: 100% !important;
                }
                /* to prevent Yahoo Mail from rendering media query styles on desktop */
                /*////// GENERAL STYLES //////*/
                img[class="flexibleImage"] {
                    height: auto !important;
                    width: 100% !important;
                }
                #foxeslab-email .table1 {
                    width: 98% !important;
                }
                #foxeslab-email .no_float {
                    clear: both;
                    width: 100% !important;
                    margin: 0 auto !important;
                    text-align: center !important;
                }
                #foxeslab-email .wise_float {
                    clear: both;
                    float: none !important;
                    width: auto !important;
                    margin: 0 auto !important;
                    text-align: center !important;
                }
                #foxeslab-email .mobile_hide {
                    display: none !important;
                }
                .auto_height {
                    height: auto !important;
                }
            }
        </style>
    </head>
    
    <body style="padding: 0;margin: 0; background-color: #dee7ef;" id="foxeslab-email">
    
        <!-- template-13 -->
        <table class="table_full editable-bg-color bg_color_ffffff editable-bg-image" bgcolor="#dee7ef" width="100%" align="center" mc:repeatable="castellab" mc:variant="Header" cellspacing="0" cellpadding="0" border="0" style="background-image: url(#); background-repeat: no-repeat; background-position: center left; background-size: 100% 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            background="#">
            <!-- padding-top -->
            <tr>
                <td height="100"></td>
            </tr>
    
            <!-- header -->
            <tr>
                <td>
                    <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td bgcolor="#616ed1" style="padding-top: 30px;padding-right: 40px;padding-bottom: 0;padding-left: 40px;border: 1px solid #616ed1;">
                                <!-- Logo -->
                                <table class="no_float" align="center" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td class="editable-img" align="left">
                                            <a href="#">
                                                <img editable="true" class="centerize" mc:edit="image101" src="./images/gm-logo-08.png" style="display:block; line-height:0; font-size:0; border:0; width:175px;" border="0" alt="image" />
                                            </a>
                                        </td>
                                    </tr>
                                    <!-- margin-bottom -->
                                    <tr>
                                        <td height="30"></td>
                                    </tr>
                                </table>
                                <!-- END logo -->
    
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- END header -->
    
            <!-- horizontal gap -->
            <!-- <tr><td height="25"></td></tr> -->
    
            <!-- body -->
            <tr>
                <td>
                    <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 40px 0;border: 1px solid #f2f2f2;border-radius: 0px;">
                                <!-- body-container -->
                                <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
    
                                    <!-- email heading -->
                                    <tr>
                                        <td align="left" mc:edit="text101" class="text_color_282828" style="line-height: 1;color: #282828; font-size: 20px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;padding:0px 50px;">
                                            <div class="editable-text">
                                                <span class="text_container">Hi, ` + name + `</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- END email heading -->
    
                                    <!-- horizontal gap -->
                                    <tr>
                                        <td height="20"></td>
                                    </tr>
    
                                    <!-- email details -->
                                    <tr>
                                        <td align="left" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #656565; font-size: 15px; font-weight: 500; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly; padding:0px 50px;">
                                            <div class="editable-text">
                                                <span class="text_container">I really appreciate you joining us at GreyMetrics.
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #656565; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly; padding:15px 50px;">
                                            <div class="editable-text">
                                                <span class="text_container"> I know you’ll love it when you see how easy is it to track your acquisition numbers and build super segmented custom audience.
                                                    We built GreyMetrics to help small & medium businesses grow. I hope we can achieve that for you. <br>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #656565; font-size: 15px; font-weight: 500; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly; padding:20px 50px 0px 50px;">
                                            <div class="editable-text">
                                                <span class="text_container" style="padding: 10px 0px;">
                                                    If you wouldn’t mind, I’d love it if you answered two quick questions:<br>
                                                    <br>
                                                </span>
                                                <label for="fname"> How did you hear about us?</label>
    
                                                <input type="text" id="fname" name="firstname" placeholder="" class="input_text"><br>
    
                                                <label for="lname">Why did you sign up for Grey Metrics?</label>
                                                <input type="text" id="lname" name="lastname" placeholder="" class="input_text">
                                                <br>
    
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="30"></td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <table align="center" border="0" cellspacing="0" cellspacing="0">
                                                <tr>
    
                                                    <td>
    
                                                        <a href="contact_us.html" class="button button-blue button-bordered doc_button">
                                                            <span class="button--inner">Submit</span>
                                                        </a>
    
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="30"></td>
                                    </tr>
    
    
                                    <tr>
                                        <td align="left" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #656565; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly; padding:10px 50px;">
                                            <div class="editable-text">
    
                                                <span class="text_container">
    
                                                    I’m asking because knowing what made you sign up is really helpful for us in making sure that we’re delivering on what our users want.<br>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="50"></td>
                                    </tr>
                                    <tr>
                                        <td align="left" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #656565; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly; padding:0px 50px">
                                            <div class="border_profile">
    
                                                <img editable="true" mc:edit="image105" src="./images/circle-icon-user.png" style="display: block;line-height:0; font-size:0; border:0;" border="0" alt="image" align="left" class="border_profile" />
    
    
                                            </div>
                                            <div class="editable-text">
    
                                                <span class="text_container">
    
                                                    Thanks,<br>
                                                    Maxime<br>
                                                    CEO, GreyMetrics
                                                </span>
                                            </div>
                                        </td>
    
                                    </tr>
                                    <!-- END email details -->
    
                                    <!-- horizontal gap -->
                                    <tr>
                                        <td height="20"></td>
                                    </tr>
    
    
    
                                </table>
                                <!-- END body-container -->
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- END body -->
    
            <!-- horizontal gap -->
            <!-- <tr><td height="40"></td></tr> -->
    
            <!-- footer -->
    
    
    
            <tr>
                <td>
                    <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td bgcolor="#fcfcfc" style="padding-top: 30px;padding-right: 40px;padding-bottom: 0;padding-left: 40px; border: 1px solid #f2f2f2; border-radius: 0px;">
                                <table class="" width="" align="center" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="" mc:edit="text104" class="text_color_c6c6c6" style="line-height: 1;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                            <div class="editable-text">
                                                <span class="text_container">&copy; 2018 GreyMetrics. All Rights Reserved.</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- horizontal gap -->
                                    <tr>
                                        <td height="15"></td>
                                    </tr>
    
                                    <tr>
                                        <td align="" mc:edit="text105" class="text_color_c6c6c6" style="line-height: 1;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                            <div class="editable-text">
                                                <!-- <span class="text_container">4170 Haymond St. &middot; Mcdermitt &middot; PA 18503 USA</span> -->
                                            </div>
                                        </td>
                                    </tr>
                                </table>
    
                                <!-- social icons -->
                                <table class="no_float" width="120" align="right" border="0" cellspacing="0" cellpadding="0">
                                    <!-- <tr>
                                                        <td>
                                                            <table width="120" align="center" border="0" cellspacing="0" cellpadding="0" style="max-width: 135px;">
                                                                <tr>
                                                                    <td class="editable-img" align="center">
                                                                        <a href="#">
                                                                            <img editable="true" class="centerize" mc:edit="image102" src="./images/social-icon-twitter.png" style="display:block; line-height:0; font-size:0; border:0;" border="0" alt="image" />
                                                                        </a>
                                                                    </td>
                                                                    <td class="editable-img" align="center">
                                                                        <a href="#">
                                                                            <img editable="true" class="centerize" mc:edit="image103" src="./images/social-icon-gp.png" style="display:block; line-height:0; font-size:0; border:0;" border="0" alt="image" />
                                                                        </a>
                                                                    </td>
                                                                    <td class="editable-img" align="center">
                                                                        <a href="#">
                                                                            <img editable="true" class="centerize" mc:edit="image104" src="./images/social-icon-fb.png" style="display:block; line-height:0; font-size:0; border:0;" border="0" alt="image" />
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr> -->
                                    <!-- margin-bottom -->
                                    <tr>
                                        <td height="20"></td>
                                    </tr>
                                </table>
                                <!-- END social icons -->
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
    
            <!-- END footer -->
    
    
            <!-- padding-bottom -->
            <tr>
                <td height="100"></td>
            </tr>
        </table>
    
    </body>
    
    </html>`;


    return myvar;
}

router.post('/login', 
    // Validation middleware
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').notEmpty().withMessage('Password cannot be empty')
    ],
    async function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                data: null,
                message: 'Validation failed'
            });
        }

        try {
            const url = req.url;
            const { email, password } = req.body;

            console.log(req.body);

            const user = await User.findOne({ email }).exec();
            if (!user) {
                console.error(`${url}\n Error is - Invalid Credentials`);
                return res.status(400).send({
                    error: 'invalid credentials',
                    data: null,
                    message: 'Invalid Credentials'
                });
            }

            console.log(user, "result");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.error(`${url}\n Error is - Invalid Credentials`);
                return res.status(400).send({
                    error: 'invalid credentials',
                    data: null,
                    message: 'Invalid Credentials'
                });
            }

            req.session.user = user;
            req.session.client = user;

   

            res.status(200).send({
                data: user._id
            });
        } catch (err) {
            console.error(`Error during login process: ${err.message}`);
            res.status(500).send({
                error: 'internal_server_error',
                data: null,
                message: 'An error occurred during the login process. Please try again later.'
            });
        }
    }
);

function requireLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
};






router.post('/setnewpassword', async function(req, res) {
    const { password, key } = req.body;

    // Validate password complexity
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain both letters and numbers' });
    }


    console.log(req.body,"setnewpassword req.body");
    
    try {
        // Find the user by the key
        const user = await User.findOne({ verification_key: key });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired key' });
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        user.verification_key = undefined; // Clear the reset key
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'An error occurred while resetting the password' });
    }
});

const TOKEN = process.env.SMTP_PASS;
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};

router.post('/sendforgotemail', [
  body('email').isEmail().withMessage('Enter a valid email address')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.verification_key = token;
    await user.save();

    // Send reset email
    const resetUrl = `${process.env.DOMAIN}/resetpassword/${token}`;
    const recipients = [
      {
        email: user.email,
      }
    ];
    const htmlTemplate = gettemplate(user.name, resetUrl); // Pass user's name and reset URL to the template

    await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetUrl}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
             html: htmlTemplate, // Send the HTML version of the email

      category: "Password Reset",
    });

    res.send('Password reset email sent');
  } catch (error) {
    console.error(error, "sendforgotemail error");
    res.status(500).send('An error occurred');
  }
});


function gettemplate(name, resetUrl) {

    let $temp = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>NoticeLab 13 | Email Template</title>
    <style type="text/css">
        
        body {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
        }
        
        table {
            border-collapse: separate;
        }
        
        img,
        a img {
            border: 0;
            outline: none;
            text-decoration: none;
        }
        
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0;
            padding: 0;
        }
        
        p {
            margin: 1em 0;
        }
        
        .input_text {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        
        .doc_button {
            background-color: #616ed1;
            color: #fff;
            border-style: none;
            padding: 15px 50px;
            font-size: 14px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: 400;
            font-family: 'Open Sans', Helvetica, sans-serif;
            mso-line-height-rule: exactly;
            text-decoration: none;
        }
        
        .border_profile {
            padding-right: 30px;
            border-right: 1px solid #ddd;
        }
        /*////// CLIENT-SPECIFIC STYLES //////*/
        
        .ReadMsgBody {
            width: 100%;
        }
        
        .ExternalClass {
            width: 100%;
        }
        
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }
        
        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        #outlook a {
            padding: 0;
        }
        
        img {
            -ms-interpolation-mode: bicubic;
        }
        
        body,
        table,
        td,
        p,
        a,
        li,
        blockquote {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }
        /*////// GENERAL STYLES //////*/
        
        img {
            max-width: 100%;
            height: auto;
        }
        /*////// TABLET STYLES //////*/
        
        @media only screen and (max-width: 620px) {
            .shrink_font {
                font-size: 62px;
            }
            /*////// GENERAL STYLES //////*/
            #foxeslab-email .table1 {
                width: 90% !important;
            }
            #foxeslab-email .table1-2 {
                width: 98% !important;
                margin-left: 1%;
                margin-right: 1%;
            }
            #foxeslab-email .table1-3 {
                width: 98% !important;
                margin-left: 1%;
                margin-right: 1%;
            }
            #foxeslab-email .table1-4 {
                width: 98% !important;
                margin-left: 1%;
                margin-right: 1%;
            }
            #foxeslab-email .table1-5 {
                width: 90% !important;
                margin-left: 5%;
                margin-right: 5%;
            }
            #foxeslab-email .tablet_no_float {
                clear: both;
                width: 100% !important;
                margin: 0 auto !important;
                text-align: center !important;
            }
            #foxeslab-email .tablet_wise_float {
                clear: both;
                float: none !important;
                width: auto !important;
                margin: 0 auto !important;
                text-align: center !important;
            }
            #foxeslab-email .tablet_hide {
                display: none !important;
            }
            #foxeslab-email .image1 {
                width: 98% !important;
            }
            #foxeslab-email .image1-290 {
                width: 100% !important;
                max-width: 290px !important;
            }
            .center_content {
                text-align: center !important;
            }
            .center_image {
                margin: 0 auto !important;
            }
            .center_button {
                width: 50% !important;
                margin-left: 25% !important;
                max-width: 250px !important;
            }
            .centerize {
                margin: 0 auto !important;
            }
        }
        /*////// MOBILE STYLES //////*/
        
        @media only screen and (max-width: 480px) {
            .shrink_font {
                font-size: 48px;
            }
            .safe_color {
                color: #6a1b9a !important;
            }
            /*////// CLIENT-SPECIFIC STYLES //////*/
            body {
                width: 100% !important;
                min-width: 100% !important;
            }
            /* Force iOS Mail to render the email at full width. */
            table[class="flexibleContainer"] {
                width: 100% !important;
            }
            /* to prevent Yahoo Mail from rendering media query styles on desktop */
            /*////// GENERAL STYLES //////*/
            img[class="flexibleImage"] {
                height: auto !important;
                width: 100% !important;
            }
            #foxeslab-email .table1 {
                width: 98% !important;
            }
            #foxeslab-email .no_float {
                clear: both;
                width: 100% !important;
                margin: 0 auto !important;
                text-align: center !important;
            }
            #foxeslab-email .wise_float {
                clear: both;
                float: none !important;
                width: auto !important;
                margin: 0 auto !important;
                text-align: center !important;
            }
            #foxeslab-email .mobile_hide {
                display: none !important;
            }
            .auto_height {
                height: auto !important;
            }
        }
    </style>
</head>

<body style="padding: 0;margin: 0; background-color: #dee7ef;" id="foxeslab-email">

    <!-- template-13 -->
    <table class="table_full editable-bg-color bg_color_ffffff editable-bg-image" bgcolor="#dee7ef" width="100%" align="center" mc:repeatable="castellab" mc:variant="Header" cellspacing="0" cellpadding="0" border="0" style="background-image: url(#); background-repeat: no-repeat; background-position: center left; background-size: 100% 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
        background="#">
        <!-- padding-top -->
        <tr>
            <td height="100"></td>
        </tr>

        <!-- header -->
        <tr>
            <td>
                <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td bgcolor="#616ed1" style="padding-top: 30px;padding-right: 40px;padding-bottom: 0;padding-left: 40px;border: 1px solid #616ed1;">
                            <!-- Logo -->
                            <table class="no_float" align="center" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="editable-img" align="left">
                                        <a href="https://biotree.onrender.com">
                                            <img editable="true" class="centerize" mc:edit="image101" src="https://mybucket4345.s3.us-east-2.amazonaws.com/biotree_logo.png" style="display:block; line-height:0; font-size:0; border:0; width:175px;" border="0" alt="image" />
                                        </a>
                                    </td>
                                </tr>
                                <!-- margin-bottom -->
                                <tr>
                                    <td height="30"></td>
                                </tr>
                            </table>
                            <!-- END logo -->

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td bgcolor="#fcfcfc" style="padding: 40px 0;border: 1px solid #f2f2f2;border-radius: 5px;">
                            <!-- body-container -->
                            <table class="table1" width="480" align="center" border="0" cellspacing="0" cellpadding="0">

                                <!-- email heading -->
                                <tr>
                                    <td align="center" mc:edit="text101" class="text_color_282828" style="line-height: 1;color: #282828; font-size: 20px; font-weight: 600; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                        <div class="editable-text">
                                            <span class="text_container">Hi,${name}</span>
                                        </div>
                                    </td>
                                </tr>
                                <!-- END email heading -->

                                <!-- horizontal gap -->
                                <tr>
                                    <td height="20"></td>
                                </tr>

                                <!-- email details -->
                                <tr>
                                    <td align="center" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #525252; font-size: 15px; font-weight: 500; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                        <div class="editable-text">
                                            <span class="text_container">We received a request to reset your password for your Biotree account</span>
                                        </div>
                                    </td>
                                </tr>
                                <!-- END email details -->
                                <tr>
                                    <td height="20"></td>
                                </tr>
                                <!-- email details -->
                                <tr>
                                    <td align="center" mc:edit="text102" class="text_color_c6c6c6" style="line-height: 1.8;color: #525252; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                        <div class="editable-text">
                                            <span class="text_container">Click on the button below to change your password</span>
                                        </div>
                                    </td>
                                </tr>
                                <!-- END email details -->

                                <!-- horizontal gap -->
                                <tr>
                                    <td height="40"></td>
                                </tr>


                                <!-- horizontal gap -->
                                <tr>
                                    <td height="40"></td>
                                </tr>

                                <!-- buttons -->
                                <tr>
                                    <td align="center">
                                        <table align="center" border="0" cellspacing="0" cellspacing="0">
                                            <tr>

                                                <td>

                                                    <a href="${resetUrl}" target="_blank" class="button button-blue button-bordered doc_button">
                                                        <span class="button--inner" style="color:#fff">Change Password</span>
                                                    </a>

                                                </td> 
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- END buttons -->

                                <!-- horizontal gap -->
                                <tr>
                                    <td height="20"></td>
                                </tr>

                                <!-- Unsubscribe link -->

                            </table>
                            <!-- END body-container -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- END body -->

        <!-- horizontal gap -->
        <!-- <tr><td height="40"></td></tr> -->

        <!-- footer -->



        <tr>
            <td>
                <table class="table1" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td bgcolor="#fcfcfc" style="padding-top: 30px;padding-right: 40px;padding-bottom: 0;padding-left: 40px; border: 1px solid #f2f2f2; border-radius: 0px;">
                            <table class="" width="" align="center" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="" mc:edit="text104" class="text_color_c6c6c6" style="line-height: 1;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                        <div class="editable-text">
                                            <span class="text_container">&copy; 2024 BioTree.</span>
                                        </div>
                                    </td>
                                </tr>
                                <!-- horizontal gap -->
                                <tr>
                                    <td height="15"></td>
                                </tr>

                                <tr>
                                    <td align="" mc:edit="text105" class="text_color_c6c6c6" style="line-height: 1;color: #c6c6c6; font-size: 14px; font-weight: 400; font-family: 'Open Sans', Helvetica, sans-serif; mso-line-height-rule: exactly;">
                                        <div class="editable-text">
                                            <!-- <span class="text_container">4170 Haymond St. &middot; Mcdermitt &middot; PA 18503 USA</span> -->
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- social icons -->
                            <table class="no_float" width="120" align="right" border="0" cellspacing="0" cellpadding="0">
                                <!-- <tr>
													<td>
														<table width="120" align="center" border="0" cellspacing="0" cellpadding="0" style="max-width: 135px;">
															<tr>
																<td class="editable-img" align="center">
																	<a href="#">
																		<img editable="true" class="centerize" mc:edit="image102" src="./images/social-icon-twitter.png" style="display:block; line-height:0; font-size:0; border:0;" border="0" alt="image" />
																	</a>
																</td>
																<td class="editable-img" align="center">
																	<a href="#">
																		<img editable="true" class="centerize" mc:edit="image103" src="./images/social-icon-gp.png" style="display:block; line-height:0; font-size:0; border:0;" border="0" alt="image" />
																	</a>
																</td>
																<td class="editable-img" align="center">
																	<a href="#">
																		<img editable="true" class="centerize" mc:edit="image104" src="./images/social-icon-fb.png" style="display:block; line-height:0; font-size:0; border:0;" border="0" alt="image" />
																	</a>
																</td>
															</tr>
														</table>
													</td>
												</tr> -->
                                <!-- margin-bottom -->
                                <tr>
                                    <td height="20"></td>
                                </tr>
                            </table>
                            <!-- END social icons -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- END footer -->


        <!-- padding-bottom -->
        <tr>
            <td height="100"></td>
        </tr>
    </table>

</body>

</html>`;
    return $temp;
}



router.post('/changepwd', requireLogin, function(req, res) {
    console.log("dumb");
    let currentpassword = req.body.currentpassword;
    let newpassword = req.body.newpassword;
    let newpashwordhash = bcrypt.hashSync(newpassword, 10)
    console.log(currentpassword);
    console.log(newpassword)
    console.log(req.session.user._id);

    User.findOne({
        '_id': req.session.user._id
    }).exec(function(err, user) {
        if (user == null) {
            res.status(400).send({
                error: 'invalid credentials1',
                data: null,
                message: 'Invalid Credentials'
            })
            res.end()
        } else {
            bcrypt.compare(currentpassword, user.password, function(err1, result) {
                if (result === true) {
                    user.password = newpashwordhash

                    user.save(function(err1, result) {
                        if (err1) {
                            console.log(err1);
                            res.status(501).send({
                                error: 'invalid url',
                                data: null,
                                message: 'Password changed failed. Please try again.'
                            })
                            res.end()
                        } else {
                            res.status(200).send({
                                data: 'Password changed successfully'
                            })
                            res.end()
                        }
                    })
                } else {
                    res.status(400).send({
                        error: 'invalid credentials2',
                        data: null,
                        message: 'Invalid Credentials'
                    })
                    res.end()
                }
            })
        }


    })




    //////////////////////////////////////
    // let url = req.url
    // let password = req.body.password
    // let newpassword = req.body.newpassword
    // let renewpassword = req.body.renewpassword
    // let hash = bcrypt.hashSync(newpassword, 10)

    // if (newpassword === renewpassword) {
    //     User.findOne({
    //         '_id': req.userID
    //     }).exec(function(err, user) {
    //         if (user == null) {
    //             console.log(url + '\n Error is - ' + 'Invalid Credentials')
    //             res.status(400).send({
    //                 error: 'invalid credentials',
    //                 data: null,
    //                 message: 'Invalid Credentials'
    //             })
    //             res.end()
    //         } else {
    //             bcrypt.compare(password, user.password, function(err1, result) {
    //                 if (result === true) {
    //                     user.password = hash

    //                     user.save(function(err1, result) {
    //                         if (err1) {
    //                             console.log(url + '\n Error is - ' + err1)
    //                             res.status(501).send({
    //                                 error: 'invalid url',
    //                                 data: null,
    //                                 message: 'Password changed failed. Please try again.'
    //                             })
    //                             res.end()
    //                         } else {
    //                             res.status(200).send({
    //                                 data: 'Password changed successfully'
    //                             })
    //                             res.end()
    //                         }
    //                     })
    //                 } else {
    //                     console.log(url + '\n Error is - ' + 'Invalid Credentials')
    //                     res.status(400).send({
    //                         error: 'invalid credentials',
    //                         data: null,
    //                         message: 'Invalid Credentials'
    //                     })
    //                     res.end()
    //                 }
    //             })
    //         }
    //     })
    // } else {
    //     console.log(url + '\n Error is - ')
    //     res.status(501).send({
    //         error: 'passwords donot match',
    //         data: null,
    //         message: 'Password changed failed. Passwords donot match. Please try again.'
    //     })
    //     res.end()
    // }
});

router.post('/changesocialpassword', requireLogin, function(req, res) {
    console.log("dumb");
    let newpassword = req.body.password;
    let tap_account = req.body.tap_account;
    let is_social = req.body.is_social;

    let newpashwordhash = bcrypt.hashSync(newpassword, 10)
    console.log(newpassword)
    console.log(req.session.user._id);

    User.findOne({
        '_id': req.session.user._id
    }).exec(function(err, user) {
        if (user == null) {
            res.status(400).send({
                error: 'invalid credentials1',
                data: null,
                message: 'Invalid Credentials'
            })
            res.end()
        } else {

            user.password = newpashwordhash;
            user.tap_account = tap_account;
            user.is_social = is_social;


            user.save(function(err1, result) {
                if (err1) {
                    console.log(err1);
                    res.status(501).send({
                        error: 'invalid url',
                        data: null,
                        message: 'Password changed failed. Please try again.'
                    })
                    res.end()
                } else {
                    res.status(200).send({
                        data: 'Password changed successfully'
                    })
                    res.end()
                }
            })

        }


    })





});

router.put('/profile/:id', requireLogin, function(req, res) {
    let url = req.url
    let id = req.params.id
    let name = req.body.name

    User.findById(id, function(err, data) {
        if (err) {

        } else {
            data.name = name
            data.updated_at = new Date()

            data.save(function(err) {
                if (err) {
                    console.log(url + '\n User Profile Update Failed')
                    res.status(400).send({
                        error: 'User Profile Update Failed',
                        data: null,
                        message: 'User Profile Update Failed'
                    })
                    res.end()
                } else {
                    console.log('User Updated')
                    res.status(200).send({
                        data: 'User Updated successfully'
                    })
                    res.end()
                }
            })
        }
    })
});


router.put('/profilenamechange', requireLogin, function(req, res) {
    let url = req.url
    let name = req.body.profilename;

    console.log("name");
    // User.findById(id, function(err, data) {
    User.findOne({
        '_id': req.session.user._id
    }).exec(function(err, user) {
        if (err) {

        } else {
            user.name = name
            user.updated_at = new Date()

            user.save(function(err) {
                if (err) {
                    console.log(url + '\n User Profile Update Failed')
                    res.status(400).send({
                        error: 'User Profile Update Failed',
                        data: null,
                        message: 'User Profile Update Failed'
                    })
                    res.end()
                } else {
                    console.log('User Updated')
                    res.status(200).send({
                        data: 'UserName Updated successfully'
                    })
                    res.end()
                }
            })
        }
    })
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }

    let token = req.headers.authorization.split(' ')[1]

    if (token === null) {
        return res.status(401).send('Unauthorized Request')
    }

    let payload = jwt.verify(token, 'rahasyam#18')

    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    }

    req.userID = payload.subject;
    next()
}

module.exports = router
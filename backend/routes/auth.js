const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


var secret = "Trekdaven@shaelsingh"


// Route 1:Create a User using: POST

router.post('/createuser',[
    body('name','Enter a valid name of minimum length 3').isLength({min:3}),
    body('email','Enter a valid email address').isEmail(),
    body('password','Password Length must be 8').isLength({ min: 8}),
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try{
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({success, errors: "Sorry a user with this email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    //create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
          user:{
              id: user.id
          }
      }
      const authtoken = jwt.sign(data,secret);
      success = true;
      res.json({success,authtoken});
    }


    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
} );


//Route 2: authentication of User

router.post('/login',[
    body('email','Enter a Valid Email').isEmail(),
    body('email','Enter Password').exists(),
], async (req,res)=>{

    let success = false;

    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if (!user){
            success = false;
            return res.status(400).json({error: "Please enter correct credentials"});
        }
        const passwordcompare = await bcrypt.compare(password,user.password)
        if(!passwordcompare){

            success = false;
            return res.status(400).json({ success, error: "Check credentials"});
        }
        const payload = {
            user:{
                id : user.id,
            }
        }
        const authtoken = jwt.sign(payload,secret);
        success = true;
        res.json({ success, authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
},);

//Route 3: Get user using token
router.post('/getUser', fetchuser, async (req,res)=>{


   try{
        const userid = req.user.id;
        console.log(userid)
        const user = await User.findOne({"_id":userid}).select("-password");
        res.send(user);
   }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
);
module.exports = router;
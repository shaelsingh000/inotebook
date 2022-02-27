const express = require('express');
const router = express.Router();
const User = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchuser = require("../middleware/fetchuser");

//Route 1 : Get all the notes using : "/api/notes/fetchnotes"

router.get('/fetchnotes', fetchuser , async (req,res)=>{
  try {
    const notes = await Notes.find({userid: req.user.id});
    res.json(notes)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
    
} );



//Route 2 : Get all the notes using : "/api/notes/fetchnotes"

router.post('/addnotes', fetchuser , [
    body('title','Enter a valid name of maximum length 40').exists().isLength({max:40}),
    body('description'),
    body('tag'),
], async (req,res)=>{
    try {
      const {title,description,tag} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return req.status(400).json({errors: errors.array()});
      }
      const notes = new Notes({
        title,description,tag, userid:req.user.id
      });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
} );

//Route 3: Update a existing note.
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
  try {
    
    const {title,description,tag} = req.body;
    const newNote = {};

    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).status("Not Found")};
    if(note.userid.toString() !== req.user.id){return res.status(401).send("Not your property");}
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
} );

//Route 4: Deleting a existing note.
router.delete('/delete/:id', fetchuser, async (req,res)=>{
  try {
    let note = await Notes.findById(req.params.id);
    if(!note){res.status(404).status("Not Found")};
    if(note.userid.toString() !== req.user.id){return res.status(401).send("Not your property");}
    note = await Notes.findByIdAndRemove(req.params.id)
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
} );
module.exports = router;
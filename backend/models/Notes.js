const mongoose = require('mongoose');
const {Schema} =mongoose;

const NoteSchema = new Schema({
    title:{
        type: String,
        required : true,
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
    },
    userid:{
        type:String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
});

const Notes = mongoose.model('notes',NoteSchema)
Notes.createIndexes();
module.exports = Notes